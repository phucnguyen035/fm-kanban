import { css } from "styled-system/css";
import { vstack } from "styled-system/patterns";
import type { TaskStatus } from "~/.server/data-access/task/schema";

type Props = {
  title: string;
  subTasks: Array<{ status: TaskStatus }>;
};

export default function TaskCard({ title, subTasks }: Props) {
  const doneSubTasks = subTasks.filter((subTask) => subTask.status === "done");

  return (
    <article
      className={css({
        width: 280,
        paddingBlock: 6,
        paddingInline: 4,
        bgColor: { base: "white", _dark: "grey.dark" },
        borderRadius: "lg",
        boxShadow: "0px 4px 6px 0px rgba(54, 78, 12y, 0.10)",
        cursor: "pointer !important",
        "&:has(h3)": {
          color: {
            base: "black",
            _hover: "purple.base",
            _dark: {
              base: "white",
              _hover: "purple.base",
            },
          },
        },
      })}
    >
      <button
        className={vstack({
          cursor: "pointer",
          alignItems: "flex-start",
          gap: 2,
          textAlign: "left",
        })}
      >
        <h3 className={css({ textStyle: "headingM" })}>{title}</h3>
        {subTasks.length > 0 && (
          <p className={css({ textStyle: "bodyM", color: "grey.medium" })}>
            {doneSubTasks.length} of {subTasks.length} subtasks
          </p>
        )}
      </button>
    </article>
  );
}
