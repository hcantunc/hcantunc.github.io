import { defineCollection, z } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

const post = defineCollection({
	schema: ({ image }) =>
		z.object({
			coverImage: z
				.object({
					alt: z.string(),
					src: image(),
				})
				.optional(),
			description: z.string().min(0).max(160),
			conference: z.string(),
			authors: z.array(z.string()),
			doi: z.string(),
			draft: z.boolean().default(false),
			ogImage: z.string().optional(),
			pdf: z.string().optional(),
			cite: z.string().optional(),
			artifact: z.string().optional(),
			code: z.string().optional(),
			slides: z.string().optional(),
			video: z.string().optional(),
			data: z.string().optional(),
			publishDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			title: z.string().max(300),
			bestpaper: z.boolean().optional(),
			updatedDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
			artifactAvailable: z.boolean().optional(),
			artifactFunctional: z.boolean().optional(),
			artifactReproduced: z.boolean().optional(),
			artifactReusable: z.boolean().optional(),
		}),
	type: "content",
});

export const collections = { post };
