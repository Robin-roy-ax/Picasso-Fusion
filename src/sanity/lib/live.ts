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
    console.warn("Error fetching Sanity data (returning null to prevent build failure):", error);
    return { data: null };
  }
};

export { SanityLive };
