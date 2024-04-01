import { Button } from "@/components/Button";
import { db } from "@/db";

type Props = {
	params: {
		boardId: string;
	};
};

async function getBoardDetail(boardId: string) {
	const board = await db.query.boards.findFirst({
		where: ({ id }, { eq }) => eq(id, boardId),
	});

	if (!board) {
		throw new Error("Board not found");
	}

	return board;
}

export default async function Page({ params }: Props) {
	const board = await getBoardDetail(params.boardId);

	return (
		<div className="row-span-2 grid grid-rows-subgrid">
			<header className="flex items-center justify-between border-b border-b-lines-light px-6 dark:border-b-lines-dark">
				<h1 className="text-headingXL">{board.name}</h1>
				<section>
					<Button size="large">+ Add New Task</Button>
				</section>
			</header>
			<main className="bg-gray-light dark:bg-gray-darker">Hello world</main>
		</div>
	);
}
