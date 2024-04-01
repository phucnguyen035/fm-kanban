"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { useId } from "react";
import { tv } from "@/utils/tv";

const subtaskCheckboxClass = tv({
	base: "flex cursor-pointer items-center gap-x-4 rounded bg-gray-light p-3 transition-colors hover:bg-primary/25 dark:bg-gray-darker",
	slots: {
		container:
			"peer flex size-4 appearance-none items-center justify-center rounded border border-gray-medium/25 bg-white outline-none dark:border-lines-dark dark:bg-gray-dark",
		indicator: "rounded border border-primary bg-primary text-white",
		label:
			"text-bodyM text-black peer-aria-checked:text-opacity-25 peer-aria-checked:line-through dark:text-white",
	},
});

export default function SubtaskCheckbox({ label }: { label: string }) {
	const id = useId();
	const { base, container, indicator, label: labelClass } = subtaskCheckboxClass();

	return (
		<label htmlFor={id} className={base()}>
			<Checkbox.Root className={container()} id={id}>
				<Checkbox.Indicator className={indicator()}>
					<CheckIcon />
				</Checkbox.Indicator>
			</Checkbox.Root>
			<span className={labelClass()}>{label}</span>
		</label>
	);
}
