import { createTV, cn as libCn, type CnOptions } from "tailwind-variants";

const twMergeConfig = {
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
};

export const tv = createTV({
	twMergeConfig,
});

export const cn = <T extends CnOptions>(...classes: T) => libCn(classes)({ twMergeConfig });
