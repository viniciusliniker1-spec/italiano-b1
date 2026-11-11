// Webhook do Stripe → tabela public.subscriptions.
// Segredos (Supabase → Edge Functions → Secrets): STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET.
// SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY já existem nas Edge Functions.
// Deploy: supabase functions deploy stripe-webhook --no-verify-jwt
import Stripe from "npm:stripe@17.7.0";
import { createClient } from "npm:@supabase/supabase-js@2.118.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!);
const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

async function save(sub: Stripe.Subscription, userId?: string | null) {
  const row: Record<string, unknown> = {
    status: sub.status,
    plan: sub.items.data[0]?.price?.recurring?.interval === "year" ? "anual" : "mensal",
    stripe_customer_id: String(sub.customer),
    stripe_subscription_id: sub.id,
    current_period_end: new Date((sub.items.data[0]?.current_period_end ?? (sub as any).current_period_end) * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  };
  if (userId) return db.from("subscriptions").upsert({ user_id: userId, ...row });
  return db.from("subscriptions").update(row).eq("stripe_subscription_id", sub.id);
}

Deno.serve(async (req) => {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig!, Deno.env.get("STRIPE_WEBHOOK_SECRET")!);
  } catch {
    return new Response("assinatura inválida", { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    const s = event.data.object as Stripe.Checkout.Session;
    // O app abre o Payment Link com client_reference_id = id do usuário no Supabase.
    if (s.subscription && s.client_reference_id) {
      const sub = await stripe.subscriptions.retrieve(String(s.subscription));
      await save(sub, s.client_reference_id);
    }
  } else if (event.type.startsWith("customer.subscription.")) {
    await save(event.data.object as Stripe.Subscription);
  }
  return new Response("ok");
});
