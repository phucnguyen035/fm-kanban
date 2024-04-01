"use client";

import IconBoard from "@/components/IconBoard";
import { cn } from "@/utils/tv";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BoardItem({ id, name }: { id: string; name: string }) {
	const pathname = usePathname();
	const active = pathname === `/boards/${id}`;

	return (
		<li
			className={cn(
				"rounded-r-full",
				active ? "bg-primary text-white" : (
					"text-gray-medium transition-colors hover:bg-primary-light hover:text-white"
				),
			)}
		>
			<Link
				href={`/boards/${id}`}
				className={cn("flex items-center gap-x-4 px-8 py-3.5 text-headingM font-bold")}
			>
				<IconBoard className="flex-shrink-0" />
				<span className="line-clamp-1">{name}</span>
			</Link>
		</li>
	);
}
