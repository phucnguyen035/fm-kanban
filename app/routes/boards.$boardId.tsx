import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { css } from "styled-system/css";
import { hstack, stack } from "styled-system/patterns";
import invariant from "tiny-invariant";
import { boardRepo } from "~/.server/data-access/board";
import Button from "~/components/Button";
import IconEllipsisVertical from "~/components/IconEllipsisVertical";
import TaskCard from "~/components/TaskCard";

export function loader({ params }: LoaderFunctionArgs) {
  const boardId = parseInt(params.boardId ?? "");
  invariant(!isNaN(boardId), "Invalid board ID");

  return boardRepo.getBoardDetailById(boardId);
}

export default function BoardDetailPage() {
  const board = useLoaderData<typeof loader>();
  const [dialog, setDialog] = useState<
    "add-column" | "add-task" | "delete-board" | "edit-board" | ""
  >("");

  return (
    <>
      <header
        className={hstack({
          gridArea: "header",
          justifyContent: "space-between",
          px: 6,
          borderBottom: "1px solid",
          borderBottomColor: { base: "lines.light", _dark: "lines.dark" },
          bgColor: { base: "white", _dark: "grey.vDark" },
          color: { base: "grey.dark", _dark: "white" },
        })}
      >
        <h1 className={css({ textStyle: "headingXL" })}>{board.name}</h1>
        <div className={hstack({ gap: 0 })}>
          <Button
            disabled={board.columns.length === 0}
            onClick={() => setDialog("add-task")}
          >
            + Add new task
          </Button>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger
              className={css({
                color: "grey.medium",
                px: 6,
                py: 4,
                cursor: "pointer",
              })}
            >
              <IconEllipsisVertical />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={16}
                className={css({
                  p: 4,
                  bgColor: { base: "white", _dark: "grey.vDark" },
                  boxShadow: "lg",
                  borderRadius: "sm",
                  transformOrigin:
                    "var(--radix-dropdown-menu-content-transform-origin)",
                  animation: {
                    _open: "scaleIn 200ms cubic-bezier(0.22, 1, 0.36, 1)",
                    _closed: "scaleOut 200ms cubic-bezier(0.22, 1, 0.36, 1)",
                  },
                })}
              >
                <DropdownMenu.Group
                  className={stack({ gap: 4, textStyle: "bodyL", width: 40 })}
                >
                  <DropdownMenu.Item
                    className={css({ color: "grey.medium", cursor: "pointer" })}
                    onSelect={() => setDialog("edit-board")}
                  >
                    Edit board
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    className={css({ color: "red.base", cursor: "pointer" })}
                    onSelect={() => setDialog("delete-board")}
                  >
                    Delete board
                  </DropdownMenu.Item>
                </DropdownMenu.Group>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
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
          className={stack({
            direction: "row",
            height: "100%",
            gap: 6,
            alignItems: "stretch",
          })}
        >
          {board.columns.map((column) => (
            <li
              key={column.id}
              className={stack({
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
                bg: {
                  base: "linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.50) 100%)",
                  _dark:
                    "linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.13) 100%)",
                },
                cursor: "pointer",
                textStyle: "headingXL",
                textTransform: "capitalize",
                color: "grey.medium",
              })}
              onClick={() => {
                setDialog("add-column");
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
