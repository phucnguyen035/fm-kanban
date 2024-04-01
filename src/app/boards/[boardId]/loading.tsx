import { Button } from "@/components/Button";
import Container from "@/components/Container";
import Skeleton from "@/components/Skeleton";

export default function Loading() {
	return (
		<Container
			header={
				<header className="flex h-full items-center justify-between px-6">
					<Skeleton className="h-8 w-64" />
					<Button disabled size="large">
						+ <span className="hidden md:inline-block">add new task</span>
					</Button>
				</header>
			}
		>
			<ul className="flex h-full gap-6">
				{Array.from({ length: 3 }).map((_, index) => (
					<li key={index} className="h-full">
						<Skeleton className="h-full w-[280px]" />
					</li>
				))}
			</ul>
		</Container>
	);
}
