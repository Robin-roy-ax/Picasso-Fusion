import { sanityFetch } from "@/sanity/lib/live";
export const dynamic = "force-dynamic";
import { BENEFITS_QUERY } from "@/sanity/lib/queries";
import Benefits from "./index";

interface BenefitsPageProps {
  id?: string;
}

export default async function BenefitsPage({ id }: BenefitsPageProps) {
    const { data } = await sanityFetch({ query: BENEFITS_QUERY });
    return <Benefits data={data as any} id={id} />;
}
