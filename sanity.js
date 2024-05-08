import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "xi2zimpb",
  dataset: "production",
  apiVersion: "2024-03-19",
  // unless you have caching for your front end, `useCdn` should be `true` for most production environments
  useCdn: false,
});

export default client;
