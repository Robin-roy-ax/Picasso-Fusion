import { sanityFetch } from "@/sanity/lib/live";
import { TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import Testimonials from "./index";


export default async function TestimonialsPage() {
  const { data } = await sanityFetch({ query: TESTIMONIALS_QUERY });
  return (
    <Testimonials data={data as any} />
  );
}

