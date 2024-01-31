import { db } from "~/.server/config/db";

export async function getBoardList() {
  return db.query.board.findMany({
    columns: {
      id: true,
      name: true,
    },
    orderBy: (board, { asc }) => asc(board.id),
  });
}

export async function getBoardDetailById(id: number) {
  return db.query.board.findFirst({
    where: (board, { eq }) => eq(board.id, id),
    columns: {
      name: true,
    },
    with: {
      columns: {
        columns: {
          id: true,
          name: true,
        },
        with: {
          tasks: {
            columns: {
              title: true,
            },
          },
        },
      },
    },
  });
}

export async function getMostRecentBoardId() {
  const board = await db.query.board.findFirst({
    columns: {
      id: true,
    },
    orderBy: (board, { asc }) => asc(board.id),
  });

  return board?.id;
}
