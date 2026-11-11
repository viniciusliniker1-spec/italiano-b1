/* Conta e sincronização do progresso (Supabase Auth + tabela public.progress).
   A biblioteca só é carregada quando o login está configurado, então o app continua
   leve e funcionando offline para quem não usa conta. */
import { SUPABASE_URL, SUPABASE_KEY } from "./config.js";

export const authEnabled = !!(SUPABASE_URL && SUPABASE_KEY);
let sb = null, user = null, listeners = [], pushTimer = null, lastSync = null, syncing = false, getState = null, setState = null, recovery = false;

const emit = () => listeners.forEach((f) => f());
export const onAuthChange = (f) => listeners.push(f);
export const currentUser = () => user;
export const lastSyncAt = () => lastSync;
export const inRecovery = () => recovery;
let premium = false;
export const hasPremium = () => premium;
/* Lê a assinatura do usuário (tabela subscriptions, gravada pelo webhook do Stripe). */
export async function loadEntitlement() {
  const c = await client(); if (!c || !user) { premium = false; return; }
  const { data } = await c.from("subscriptions").select("status,current_period_end").eq("user_id", user.id).maybeSingle();
  premium = !!data && ["active", "trialing"].includes(data.status) && (!data.current_period_end || new Date(data.current_period_end) > new Date());
  emit();
}

async function client() {
  if (!authEnabled) return null;
  if (!sb) {
    const { createClient } = await import("@supabase/supabase-js");
    sb = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { flowType: "pkce", persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: "cittadinanza-b1-auth" },
    });
  }
  return sb;
}

/* Junta dois progressos sem perder nada: fica sempre com o melhor de cada lição, cartão e prova. */
export function mergeProgress(a = {}, b = {}) {
  const maxMap = (x = {}, y = {}) => { const o = { ...x }; for (const k in y) o[k] = Math.max(o[k] || 0, y[k] || 0); return o; };
  const lessons = { ...(a.lessons || {}) };
  for (const k in b.lessons || {}) lessons[k] = { ...(lessons[k] || {}), best: Math.max((lessons[k] || {}).best || 0, b.lessons[k].best || 0) };
  const cards = { ...(a.cards || {}) };
  for (const k in b.cards || {}) {
    const x = cards[k], y = b.cards[k];
    cards[k] = !x ? y : (y.box || 0) > (x.box || 0) || ((y.box || 0) === (x.box || 0) && (y.due || 0) > (x.due || 0)) ? y : x;
  }
  const seen = new Set(), exams = [];
  for (const e of [...(a.exams || []), ...(b.exams || [])]) { const id = JSON.stringify(e); if (!seen.has(id)) { seen.add(id); exams.push(e); } }
  const newer = (a.lastDay || "") >= (b.lastDay || "") ? a : b;
  const tA = a.today || {}, tB = b.today || {};
  return {
    ...b, ...a,
    level: a.level || b.level || null,
    decks: a.decks || b.decks || null,
    xp: Math.max(a.xp || 0, b.xp || 0),
    streak: a.lastDay === b.lastDay ? Math.max(a.streak || 0, b.streak || 0) : newer.streak || 0, lastDay: newer.lastDay || null,
    today: tA.day === tB.day ? { day: tA.day, xp: Math.max(tA.xp || 0, tB.xp || 0) } : (tA.day || "") > (tB.day || "") ? tA : tB,
    lessons, cards, exams,
    audio: maxMap(a.audio, b.audio), reading: maxMap(a.reading, b.reading), writing: maxMap(a.writing, b.writing),
    speak: maxMap(a.speak, b.speak), pron: maxMap(a.pron, b.pron),
  };
}

/* get/set: funções do app para ler e substituir o estado local. */
export async function initAuth(get, set) {
  getState = get; setState = set;
  const c = await client(); if (!c) return;
  c.auth.onAuthStateChange((event, session) => {
    user = session ? session.user : null;
    if (event === "PASSWORD_RECOVERY") recovery = true;
    if (event === "SIGNED_IN" || event === "INITIAL_SESSION") { if (user) { syncNow(); loadEntitlement(); } }
    if (event === "SIGNED_OUT") premium = false;
    if (event === "SIGNED_OUT") lastSync = null;
    emit();
  });
  // Tira o ?code= da barra de endereço depois do login por link.
  if (location.search.includes("code=")) setTimeout(() => history.replaceState(null, "", location.pathname + location.hash), 1500);
}

export async function syncNow() {
  const c = await client(); if (!c || !user || syncing) return;
  syncing = true;
  try {
    const { data, error } = await c.from("progress").select("data").eq("user_id", user.id).maybeSingle();
    if (error) throw error;
    const merged = mergeProgress(getState(), data ? data.data : {});
    setState(merged);
    const { error: e2 } = await c.from("progress").upsert({ user_id: user.id, data: merged });
    if (e2) throw e2;
    lastSync = new Date();
  } catch (e) { console.warn("sync", e); } finally { syncing = false; emit(); }
}

/* Chamado a cada mudança local: envia depois de alguns segundos de calma. */
export function schedulePush() {
  if (!user) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(async () => {
    const c = await client(); if (!c || !user) return;
    const { error } = await c.from("progress").upsert({ user_id: user.id, data: getState() });
    if (!error) { lastSync = new Date(); emit(); }
  }, 2500);
}
if (typeof document !== "undefined") document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden" && pushTimer) { clearTimeout(pushTimer); pushTimer = null; if (user && sb) sb.from("progress").upsert({ user_id: user.id, data: getState() }).then(() => {}, () => {}); } });

const PT = [
  [/invalid login credentials/i, "E-mail ou senha incorretos."],
  [/email not confirmed/i, "Confirme seu e-mail primeiro: abra o link que enviamos para a sua caixa de entrada."],
  [/already registered|already been registered/i, "Este e-mail já tem conta. Use Entrar ou Esqueci a senha."],
  [/password should be at least|weak password/i, "A senha precisa ter pelo menos 8 caracteres, com letras e números."],
  [/rate limit|too many|security purposes/i, "Muitas tentativas seguidas. Espere um minuto e tente de novo."],
  [/unable to validate email|invalid email|email address .* is invalid/i, "Este e-mail não parece válido. Confira se digitou certo."],
  [/same password|different from the old/i, "A nova senha precisa ser diferente da anterior."],
  [/fetch|network/i, "Sem conexão com a internet. Tente de novo quando estiver online."],
];
const tr = (e) => { const m = (e && e.message) || String(e); const hit = PT.find(([r]) => r.test(m)); return hit ? hit[1] : "Não deu certo: " + m; };
const redirect = () => location.origin + location.pathname + "#conta";

export async function signUp(email, password, name) {
  const c = await client();
  const { data, error } = await c.auth.signUp({ email, password, options: { data: { name }, emailRedirectTo: redirect() } });
  if (error) throw new Error(tr(error));
  return { needsConfirm: !data.session };
}
export async function signIn(email, password) {
  const c = await client();
  const { error } = await c.auth.signInWithPassword({ email, password });
  if (error) throw new Error(tr(error));
}
export async function sendReset(email) {
  const c = await client();
  const { error } = await c.auth.resetPasswordForEmail(email, { redirectTo: redirect() });
  if (error) throw new Error(tr(error));
}
export async function setNewPassword(password) {
  const c = await client();
  const { error } = await c.auth.updateUser({ password });
  if (error) throw new Error(tr(error));
  recovery = false; emit();
}
export async function signOut() {
  const c = await client(); clearTimeout(pushTimer);
  if (user) await c.from("progress").upsert({ user_id: user.id, data: getState() }).then(() => {}, () => {});
  await c.auth.signOut(); user = null; emit();
}
