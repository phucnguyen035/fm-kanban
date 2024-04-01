import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/tv";
import { db } from "@/db";
import BoardItem from "./BoardItem";

const font = Plus_Jakarta_Sans({ subsets: ["latin"], weight: "variable" });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const boards = await db.query.boards.findMany();

	return (
		<html lang="en">
			<body>
				<div
					className={cn(
						font.className,
						" grid h-dvh w-dvw grid-rows-[var(--header-height),1fr] overflow-hidden overflow-y-hidden text-bodyL text-black [--header-height:theme(spacing.16)] md:grid-cols-[260px,1fr] md:[--header-height:theme(spacing.20)] xl:grid-cols-[300px,1fr] xl:[--header-height:theme(spacing.24)] dark:bg-gray-dark dark:text-white",
					)}
				>
					<aside className="row-span-2 hidden border-r border-r-lines-light md:block dark:border-r-lines-dark">
						<h2 className="px-8 text-headingS uppercase text-gray-medium">
							All boards ({boards.length})
						</h2>

						<ul className="pr-6">
							{boards.map((board) => (
								<BoardItem key={board.id} id={board.id} name={board.name} />
							))}
						</ul>
					</aside>
					{children}
				</div>
			</body>
		</html>
	);
}
