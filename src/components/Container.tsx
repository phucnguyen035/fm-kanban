import { cn } from "@/utils/tv";

export default function Container({
	children,
	header,
}: {
	children: React.ReactNode;
	header?: React.ReactNode;
}) {
	return (
		<div className={cn("row-span-2 grid overflow-auto", header && "grid-rows-subgrid")}>
			{header}
			<main className="bg-gray-light p-6 dark:bg-gray-darker">{children}</main>
		</div>
	);
}
