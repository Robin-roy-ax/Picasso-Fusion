import { sanityFetch } from "@/sanity/lib/live";
import { WORKS_QUERY } from "@/sanity/lib/queries";
import Dribbble from "./index";

export default async function DribbblePage() {
  const { data } = await sanityFetch({ query: WORKS_QUERY });

  return (
    <main className="min-h-screen bg-white">
      <Dribbble data={data as any} />
    </main>
  );
}