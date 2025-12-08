import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_PAGE_QUERY } from "@/sanity/lib/queries";
import AboutUs from "@/funnel/components/AboutUS/index";

export default async function Home() {
  const { data } = await sanityFetch({ query: ABOUT_PAGE_QUERY });
  return (
    <main>
      {/* Other sections */}
      <AboutUs data={data} />
      {/* Other sections */}
    </main>
  );
}