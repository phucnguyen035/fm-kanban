"use client";

import { VariantProps, tv } from "@/utils/tv";
import { useId } from "react";

const textFieldClass = tv({
	base: "flex flex-col gap-2",
	slots: {
		label: "text-bodyM text-gray-medium dark:text-white",
		container: "flex gap-4 overflow-hidden rounded border transition-colors",
		input: "flex-1 bg-[transparent] py-2 pl-4 placeholder:text-gray-medium focus:outline-none",
		errorText: "flex-shrink-0 cursor-default py-2 pr-4 text-danger",
	},
	variants: {
		error: {
			true: {
				container: "border-danger",
				input: "caret-danger",
			},
			false: {
				container:
					"border-gray-medium/25 hover:border-primary focus:border-primary active:border-primary",
				input: "caret-primary",
			},
		},
	},
});

type TextFieldVariants = VariantProps<typeof textFieldClass>;

type Props = Readonly<
	TextFieldVariants & {
		name?: string;
		label?: string;
		type?: "text" | "number";
		placeholder?: string;
		errorText?: string;
	}
>;

export default function TextField({ label, name, type, placeholder, error, errorText }: Props) {
	const id = useId();
	const {
		base: baseClass,
		label: labelClass,
		container: containerClass,
		input: inputClass,
		errorText: errorTextClass,
	} = textFieldClass();

	return (
		<div className={baseClass()}>
			{label && (
				<label className={labelClass()} htmlFor={id}>
					{label}
				</label>
			)}
			<div className={containerClass({ error })}>
				<input
					type={type}
					id={id}
					name={name}
					placeholder={placeholder}
					className={inputClass({ error })}
				/>
				{error && <span className={errorTextClass()}>{errorText}</span>}
			</div>
		</div>
	);
}
