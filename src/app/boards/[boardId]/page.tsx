import { Button } from "@/components/Button";
import Container from "@/components/Container";
import IconEllipsis from "@/components/IconEllipsis";
import IconPlus from "@/components/IconPlus";
import Select from "@/components/Select";
import SubtaskCheckbox from "@/components/SubtaskCheckbox";
import TextField from "@/components/TextField";
import { db } from "@/db";

type Props = {
	params: {
		boardId: string;
	};
};

async function getBoardDetail(boardId: string) {
	const board = await db.query.boards.findFirst({
		where: ({ id }, { eq }) => eq(id, boardId),
		with: {
			columns: {
				columns: {
					name: true,
				},
				with: {
					tasks: {
						columns: {
							name: true,
						},
					},
				},
			},
		},
	});

	if (!board) {
		throw new Error("Board not found");
	}

	return board;
}

export default async function Page({ params }: Props) {
	const board = await getBoardDetail(params.boardId);

	return (
		<Container
			header={
				<header className="flex h-full items-center justify-between border-b border-b-lines-light px-6 dark:border-b-lines-dark">
					<h1 className="text-headingXL">{board.name}</h1>
					<section className="flex items-center gap-x-4">
						<Button className="md:hidden" size="icon">
							<IconPlus />
						</Button>
						<Button className="md:flex" size="large" startIcon={<IconPlus />}>
							Add new task
						</Button>
						<button aria-label="More options" tabIndex={0}>
							<IconEllipsis />
						</button>
					</section>
				</header>
			}
		>
			<div className="space-y-4 bg-white p-4 dark:bg-gray-dark">
				<Select
					placeholder="Select a status"
					options={[
						{ label: "Doing", value: "doing" },
						{ label: "Done", value: "done" },
						{ label: "To do", value: "to-do" },
					]}
				/>
			</div>
		</Container>
	);
}
