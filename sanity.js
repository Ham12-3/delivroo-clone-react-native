import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "@sanity/client";
const client = createClient({
  projectId: "qwoxusny",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
// console.log(client);
export default client;
