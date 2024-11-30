import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const postCollection = defineCollection({
	loader: glob({ pattern: "example.md", base: "./src/content" }),
	schema: ({ image }) =>
		z.object({
			image: image(),
		}),
});

export const collections = {
	post: postCollection,
};
