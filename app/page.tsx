// app/page.tsx
import { defaultSiteConfig } from "../lib/siteConfig";
import { CafeTemplate } from "../components/CafeTemplate";

export default function HomePage() {
  return <CafeTemplate config={defaultSiteConfig} />;
}
