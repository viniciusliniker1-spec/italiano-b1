/* Configuração do login (Supabase).
   Cole aqui a "Project URL" e a "Publishable key" (ou "anon key") do seu projeto Supabase,
   em Project Settings → API. Essas duas são públicas por natureza e podem ficar no site.
   NUNCA coloque aqui a chave "service_role" / "secret".
   Com os dois campos vazios, o app funciona sem login (progresso só no aparelho). */
const env = import.meta.env || {};
export const SUPABASE_URL = env.VITE_SUPABASE_URL || "";
export const SUPABASE_KEY = env.VITE_SUPABASE_PUBLISHABLE_KEY || "";
