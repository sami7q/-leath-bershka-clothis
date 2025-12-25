// app/[client]/page.tsx
import { getClientConfig } from "../../lib/clientsConfig";
import { CafeTemplate } from "../../components/CafeTemplate";

interface ClientPageProps {
  params: Promise<{
    client: string;
  }>;
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { client } = await params; // 👈 لازم await هنا

  const config = getClientConfig(client);

  return <CafeTemplate config={config} />;
}
