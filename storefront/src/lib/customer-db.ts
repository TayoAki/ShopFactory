import { Pool } from 'pg';
let pool: Pool | undefined;
let schema: Promise<unknown> | undefined;
export async function customerDatabase() {
  if (!process.env.CHECKOUT_DATABASE_URL) throw new Error('Customer database unavailable');
  pool ||= new Pool({ connectionString: process.env.CHECKOUT_DATABASE_URL, max: 3 });
  schema ||= pool.query(`
    CREATE SCHEMA IF NOT EXISTS bogey_customer;
    CREATE TABLE IF NOT EXISTS bogey_customer.support_requests (
      id uuid PRIMARY KEY, request_key uuid UNIQUE NOT NULL, fingerprint text NOT NULL,
      reference text UNIQUE NOT NULL, name text NOT NULL, email text NOT NULL,
      kind text NOT NULL, order_reference text NOT NULL DEFAULT '', message text NOT NULL,
      status text NOT NULL DEFAULT 'open', created_at timestamptz NOT NULL DEFAULT now(), resolved_at timestamptz
    );
    CREATE TABLE IF NOT EXISTS bogey_customer.subscribers (
      email text PRIMARY KEY, status text NOT NULL DEFAULT 'pending', source text NOT NULL,
      product_handle text, consent_text text NOT NULL, requested_at timestamptz NOT NULL DEFAULT now(),
      confirmed_at timestamptz, unsubscribed_at timestamptz
    );
    CREATE TABLE IF NOT EXISTS bogey_customer.email_tokens (
      token_hash text PRIMARY KEY, email text NOT NULL, purpose text NOT NULL,
      expires_at timestamptz NOT NULL, used_at timestamptz
    );
    CREATE TABLE IF NOT EXISTS bogey_customer.sessions (
      token_hash text PRIMARY KEY, email text NOT NULL, purpose text NOT NULL,
      order_scope text, expires_at timestamptz NOT NULL
    );
    ALTER TABLE bogey_customer.sessions ADD COLUMN IF NOT EXISTS order_scope text;
    CREATE TABLE IF NOT EXISTS bogey_customer.rate_limits (
      key text PRIMARY KEY, count integer NOT NULL, expires_at timestamptz NOT NULL
    );
    CREATE TABLE IF NOT EXISTS bogey_customer.email_outbox (
      id uuid PRIMARY KEY, kind text NOT NULL, payload text, status text NOT NULL DEFAULT 'pending',
      attempts integer NOT NULL DEFAULT 0, next_attempt_at timestamptz NOT NULL DEFAULT now(),
      created_at timestamptz NOT NULL DEFAULT now(), expires_at timestamptz NOT NULL,
      provider_id text, last_error text
    );
    CREATE INDEX IF NOT EXISTS email_outbox_due ON bogey_customer.email_outbox(next_attempt_at) WHERE status='pending';
  `).catch(error => { schema = undefined; throw error; });
  await schema;
  return pool;
}
