import { defineLive } from "next-sanity";
import { client } from './client'
import { token } from "./token";
import { apiVersion } from "../env";

const { sanityFetch: originalSanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion
  }),
  browserToken: token,
  serverToken: token,
});

export const sanityFetch = async (args: Parameters<typeof originalSanityFetch>[0]) => {
  try {
    return await originalSanityFetch(args);
  } catch (error) {
    console.error("Error fetching Sanity data:", error);
    return { data: null };
  }
};

export { SanityLive };
