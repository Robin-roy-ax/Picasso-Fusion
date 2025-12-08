import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_QUERY } from "@/sanity/lib/queries";
import AboutClient from "./index";

export default async function AboutPage() {
  const { data } = await sanityFetch({ query: ABOUT_QUERY });
  
  return <AboutClient data={data} />;
}
