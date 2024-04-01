import { cn } from "@/utils/tv";

export default function Skeleton({ className }: { className?: string }) {
	return <div className={cn("animate-pulse rounded-3xl bg-gray-medium/25", className)} />;
}
