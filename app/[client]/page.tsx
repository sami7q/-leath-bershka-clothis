// app/[client]/page.tsx
import { notFound } from "next/navigation";
import { getClientConfig } from "../../lib/clientsConfig";
import { CafeTemplate } from "../../components/CafeTemplate";

interface ClientPageProps {
  params: Promise<{
    client: string;
  }>;
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { client } = await params;

  // ✅ Reserve /cart so it becomes a real page (/cart)
  if (client === "cart") notFound();

  const config = getClientConfig(client);

  // ✅ If client is invalid, return 404 (do NOT fallback to homepage)
  if (!config) notFound();

  return <CafeTemplate config={config} />;
}
