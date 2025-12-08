import { sanityFetch } from "@/sanity/lib/live";
import { PRICING_QUERY } from "@/sanity/lib/queries";
import Pricing from "./index";

export default async function PricingPage() {
  const { data } = await sanityFetch({ query: PRICING_QUERY });
  return <Pricing data={data} />;
}
