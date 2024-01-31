import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { css } from "styled-system/css";
import { hstack, vstack } from "styled-system/patterns";
import invariant from "tiny-invariant";
import { boardRepo } from "~/.server/data-access/board";
import TaskCard from "~/components/TaskCard";

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
          px: 6,
          pt: 6,
          pb: 12,
          overflow: "hidden",
          bgColor: {
            base: "grey.light",
            _dark: "grey.vDark",
          },
        })}
      >
        <ul
          className={hstack({
            height: "100%",
            gap: 6,
            alignItems: "stretch",
          })}
        >
          {board.columns.map((column) => (
            <li
              key={column.id}
              className={vstack({
                alignItems: "start",
                gap: 6,
                minWidth: 280,
              })}
            >
              <h2
                className={css({
                  textStyle: "headingS",
                  textTransform: "uppercase",
                  color: "grey.medium",
                })}
              >
                {column.name} ({column.tasks.length})
              </h2>
              <ul
                className={css({
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                  alignItems: "flex-start",
                  overflow: "auto",
                })}
              >
                {column.tasks.map((task) => (
                  <li key={task.id}>
                    <TaskCard title={task.title} subTasks={task.subTasks} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li className={css({ width: 280, alignSelf: "stretch" })}>
            <button
              className={css({
                width: "100%",
                height: "100%",
                bg: "linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.50) 100%)",
                cursor: "pointer",
                textStyle: "headingXL",
                textTransform: "capitalize",
                color: "grey.medium",
              })}
              onClick={() => {
                // TODO: Implement
              }}
            >
              + New column
            </button>
          </li>
        </ul>
      </main>
    </>
  );
}
