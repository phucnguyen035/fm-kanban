"use client";

import { Button } from "@/components/Button";
import Container from "@/components/Container";
import { ArrowLeftIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	const router = useRouter();

	return (
		<Container>
			<div className="grid h-full place-items-center">
				<div className="grid space-y-4">
					<p className="text-headingXL">{error.message}</p>
					<Button startIcon={<ReloadIcon />} onClick={reset}>
						Retry
					</Button>
					<Button startIcon={<ArrowLeftIcon />} color="secondary" onClick={router.back}>
						Go back
					</Button>
				</div>
			</div>
		</Container>
	);
}
