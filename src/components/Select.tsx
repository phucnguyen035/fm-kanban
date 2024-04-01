"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as RSelect from "@radix-ui/react-select";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";

const selectClass = tv({
	slots: {
		trigger:
			"flex h-10 w-full items-center justify-between rounded border border-gray-medium/25 px-4 py-2 outline-none hover:border-primary data-[state='open']:border-primary data-[placeholder]:text-gray-medium",
		icon: "text-primary",
		content:
			"max-h-[--radix-select-content-available-height] w-[--radix-select-trigger-width] rounded border border-gray-medium/25 bg-white dark:bg-gray-darker",
		viewport: "rounded p-4",
		item: "cursor-pointer p-2 text-bodyL text-gray-medium outline-none hover:text-primary dark:text-white",
	},
});

type Props = {
	name?: string;
	open?: boolean;
	placeholder?: string;
	options: Array<{ label: string; value: string }>;
	"aria-label"?: string;
	onOpenChange?: (open: boolean) => void;
	onValueChange?: (value: string) => void;
};

export default forwardRef<HTMLButtonElement, Props>(function Select(props, ref) {
	const {
		trigger: triggerClass,
		icon: iconClass,
		content: contentClass,
		viewport: viewportClass,
		item: itemClass,
	} = selectClass();

	const {
		name,
		open,
		placeholder,
		options,
		"aria-label": ariaLabel,
		onOpenChange,
		onValueChange,
	} = props;

	return (
		<RSelect.Root name={name} open={open} onOpenChange={onOpenChange} onValueChange={onValueChange}>
			<RSelect.Trigger ref={ref} className={triggerClass()} aria-label={ariaLabel}>
				<RSelect.Value placeholder={placeholder} />
				<RSelect.Icon className={iconClass()}>
					<ChevronDownIcon />
				</RSelect.Icon>
			</RSelect.Trigger>

			<RSelect.Portal>
				<RSelect.Content position="popper" sideOffset={8} className={contentClass()}>
					<RSelect.Viewport className={viewportClass()}>
						<RSelect.Group>
							{options.map((option) => (
								<RSelect.Item key={option.value} value={option.value} className={itemClass()}>
									<RSelect.ItemText>{option.label}</RSelect.ItemText>
								</RSelect.Item>
							))}
						</RSelect.Group>
					</RSelect.Viewport>
				</RSelect.Content>
			</RSelect.Portal>
		</RSelect.Root>
	);
});
