import { createTV } from "tailwind-variants";
export type { VariantProps } from "tailwind-variants";

export const tv = createTV({
	twMergeConfig: {
		extend: {
			classGroups: {
				"font-size": [
					"text-headingXL",
					"text-headingL",
					"text-headingM",
					"text-headingS",
					"text-bodyL",
					"text-bodyM",
				],
			},
		},
	},
});
