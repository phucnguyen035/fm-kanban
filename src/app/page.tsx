import Container from "@/components/Container";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export default async function Home() {
	return (
		<Container>
			<div className="grid h-full place-items-center">
				<h1 className="flex items-center gap-x-2 text-headingXL text-gray-medium">
					<ArrowLeftIcon className="size-6" />
					Select a board to get started
				</h1>
			</div>
		</Container>
	);
}
