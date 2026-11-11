/* Configuração do login (Supabase).
   Cole aqui a "Project URL" e a "Publishable key" (ou "anon key") do seu projeto Supabase,
   em Project Settings → API. Essas duas são públicas por natureza e podem ficar no site.
   NUNCA coloque aqui a chave "service_role" / "secret".
   Com os dois campos vazios, o app funciona sem login (progresso só no aparelho). */
const env = import.meta.env || {};
export const SUPABASE_URL = env.VITE_SUPABASE_URL || "";
export const SUPABASE_KEY = env.VITE_SUPABASE_PUBLISHABLE_KEY || "";

/* Assinatura. Com VITE_PAYWALL diferente de "1", todo o conteúdo fica liberado (modo atual).
   Para lançar: ative o login, crie os links de pagamento no Stripe e defina as variáveis no GitHub. */
export const PAYWALL = env.VITE_PAYWALL === "1";
export const PLANS = [
  { id: "mensal", nome: "Mensal", preco: env.VITE_PRICE_MONTHLY || "R$ 19,90/mês", link: env.VITE_STRIPE_LINK_MONTHLY || "" },
  { id: "anual", nome: "Anual", preco: env.VITE_PRICE_YEARLY || "R$ 149,90/ano", nota: "Economize 37%", link: env.VITE_STRIPE_LINK_YEARLY || "" },
];
