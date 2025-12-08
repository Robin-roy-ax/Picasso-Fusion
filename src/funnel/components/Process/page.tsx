import { sanityFetch } from "@/sanity/lib/live";
import { PROCESS_QUERY } from "@/sanity/lib/queries";
import Process from "./index";

export default async function Page() {
  const { data } = await sanityFetch({ query: PROCESS_QUERY });
  return <Process data={data as any} />;
}
