import { sanityFetch } from "@/sanity/lib/live";
import { FAQ_LIST_QUERY } from "@/sanity/lib/queries";
import FaqPage from "@/funnel/components/FaqPage/index";

export default async function FAQPage() {
  const { data } = await sanityFetch({ query: FAQ_LIST_QUERY });
  return <FaqPage data={data as any} />;
}
