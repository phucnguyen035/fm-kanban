import { redirect } from "@vercel/remix";
import { boardRepo } from "~/.server/data-access/board";

export async function loader() {
  const boardId = await boardRepo.getMostRecentBoardId();
  return boardId ? redirect(`/boards/${boardId}`) : null;
}

export default function BoardListPage() {
  return <div>If you reach here, there are no boards currently</div>;
}
