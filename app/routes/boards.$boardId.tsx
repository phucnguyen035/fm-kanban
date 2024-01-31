import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { css } from "styled-system/css";
import { hstack } from "styled-system/patterns";
import invariant from "tiny-invariant";
import { boardRepo } from "~/.server/data-access/board";

export function loader({ params }: LoaderFunctionArgs) {
  const boardId = parseInt(params.boardId ?? "");
  invariant(!isNaN(boardId), "Invalid board ID");

  return boardRepo.getBoardDetailById(boardId);
}

export default function BoardDetailPage() {
  const board = useLoaderData<typeof loader>();

  return (
    <>
      <header className={css({ gridArea: "header" })}>
        <h1 className={css({ textTransform: "uppercase" })}>{board.name}</h1>
      </header>

      <main
        className={css({
          gridArea: "app",
          pl: 6,
          pt: 6,
          pb: 12,
          bgColor: {
            base: "grey.light",
            _dark: "grey.vDark",
          },
        })}
      >
        <ul className={hstack({ gap: 6, alignItems: "flex-start" })}>
          {board.columns.map((column) => (
            <li key={column.id}>
              <div>
                <h2>
                  {column.name} ({column.tasks.length})
                </h2>
                <ul>
                  {column.tasks.map((task) => (
                    <li key={task.id}>{task.title}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
