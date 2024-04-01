"use client";
import { VariantProps, tv } from "@/utils/tv";
import { forwardRef, type ButtonHTMLAttributes } from "react";

export const buttonClass = tv({
	base: "px-4.5 text-headingM transition-all active:scale-[0.99]",
	variants: {
		color: {
			primary: "bg-primary text-white hover:bg-primary-light",
			secondary: "bg-primary/10 text-primary hover:bg-primary/25",
			danger: "bg-danger text-white hover:bg-danger-light",
		},
		size: {
			small: "h-10 rounded-[1.25rem]",
			large: "h-12 rounded-3xl",
		},
	},
	defaultVariants: {
		color: "primary",
		size: "small",
	},
});

export type ButtonVariants = VariantProps<typeof buttonClass>;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants;

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
	{ children, className, size, color, ...props },
	ref,
) {
	return (
		<button ref={ref} className={buttonClass({ className, size, color })} {...props}>
			{children}
		</button>
	);
});
