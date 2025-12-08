import { sanityFetch } from "@/sanity/lib/live";
import { HERO_QUERY } from "@/sanity/lib/queries";
import HeroClient from "./index";

export default async function HeroPage() {
  const { data } = await sanityFetch({ query: HERO_QUERY });
  
  return <HeroClient data={data} />;
}
