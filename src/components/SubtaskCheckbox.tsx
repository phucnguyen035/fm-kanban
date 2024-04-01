"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { useId } from "react";
export default function SubtaskCheckbox({ label }: { label: string }) {
	const id = useId();

	return (
		<label
			htmlFor={id}
			className="group flex cursor-pointer items-center gap-x-4 rounded bg-gray-light p-3 transition-colors hover:bg-primary/25 dark:bg-gray-darker"
		>
			<Checkbox.Root
				className="peer flex size-4 appearance-none items-center justify-center rounded border border-gray-medium/25 bg-white outline-none dark:border-lines-dark dark:bg-gray-dark"
				id={id}
			>
				<Checkbox.Indicator className="rounded border border-primary bg-primary text-white">
					<CheckIcon />
				</Checkbox.Indicator>
			</Checkbox.Root>
			<span className="text-bodyM text-black peer-aria-checked:text-opacity-25 peer-aria-checked:line-through dark:text-white">
				{label}
			</span>
		</label>
	);
}
