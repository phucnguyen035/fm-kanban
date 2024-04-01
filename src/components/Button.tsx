"use client";
import { VariantProps, tv } from "@/utils/tv";
import { forwardRef, type ButtonHTMLAttributes } from "react";

export const buttonClass = tv({
	base: "flex items-center gap-x-2 px-4.5 text-headingM capitalize transition-all active:scale-[0.99] disabled:cursor-not-allowed disabled:active:scale-100",
	variants: {
		color: {
			primary: "bg-primary text-white hover:bg-primary-light disabled:bg-primary-light",
			secondary: "bg-primary/10 text-primary hover:bg-primary/25 disabled:bg-primary/25",
			danger: "bg-danger text-white hover:bg-danger-light disabled:bg-danger-light",
		},
		size: {
			small: "h-10 rounded-[1.25rem]",
			large: "h-12 rounded-3xl",
			icon: "h-8 w-12 rounded-3xl",
		},
	},
	defaultVariants: {
		color: "primary",
		size: "small",
	},
});

export type ButtonVariants = VariantProps<typeof buttonClass>;

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
	ButtonVariants & {
		startIcon?: React.ReactNode;
		endIcon?: React.ReactNode;
	};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
	{ children, className, size, color, startIcon, endIcon, ...props },
	ref,
) {
	return (
		<button ref={ref} className={buttonClass({ className, size, color })} {...props}>
			{startIcon}
			<span className="flex-grow">{children}</span>
			{endIcon}
		</button>
	);
});
