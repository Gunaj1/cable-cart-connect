// Helper for running SQL migrations securely (for reference only)
// IMPORTANT: Do NOT use a service role key in the browser. This file documents
// a pattern you can adapt in a secure environment (Edge Function or server).

export interface RunMigrationOptions {
  serviceRoleKey: string; // DO NOT expose in browser
  projectUrl: string; // e.g. https://YOUR_PROJECT.supabase.co
  sql: string;
}

// This function is intentionally not used in the browser app.
// If you need to run migrations programmatically, create a Supabase Edge Function
// and call it from the client. Store the service role as a Function secret.
export async function runMigrationServerSide(opts: RunMigrationOptions) {
  const { serviceRoleKey, projectUrl, sql } = opts;
  const resp = await fetch(`${projectUrl}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${serviceRoleKey}`,
      'apikey': serviceRoleKey,
    },
    body: JSON.stringify({ sql }),
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Migration failed: ${resp.status} ${text}`);
  }
  return await resp.json();
}
