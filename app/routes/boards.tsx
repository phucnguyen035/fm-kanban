import { Await, Outlet, defer, useLoaderData } from "@remix-run/react";
import { Suspense, useState } from "react";
import { css, cx } from "styled-system/css";
import { stack } from "styled-system/patterns";
import { boardRepo } from "~/.server/data-access/board";

export async function loader() {
  return defer({
    boards: boardRepo.getBoardList(),
  });
}

export default function BoardsLayout() {
  const { boards } = useLoaderData<typeof loader>();
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  return (
    <div
      aria-expanded={isNavCollapsed ? "false" : "true"}
      className={cx(
        "group",
        css({
          position: "relative",
          display: "grid",
          minH: "100dvh",
          gridTemplateAreas: `
        "nav header"
        "nav app"
    `,
          gridTemplateRows: [
            "token(spacing.16) 1fr",
            "token(spacing.20) 1fr",
            "token(spacing.24) 1fr",
          ],
          gridTemplateColumns: {
            base: ["0 auto"],
            _expanded: ["0 auto", "260px 1fr", "300px 1fr"],
          },
          transition: "grid-template-columns 250ms ease-in-out",
        })
      )}
    >
      <nav
        className={stack({
          justifyContent: "space-between",
          pb: 12,
          gridArea: "nav",
          overflow: "hidden",
          transition: "opacity 100ms linear",
          transitionDelay: {
            _groupExpanded: "125ms",
          },
          opacity: {
            base: 0,
            _groupExpanded: 1,
          },
        })}
      >
        <div>
          <Suspense fallback="Loading...">
            <Await resolve={boards}>
              {(boards) => (
                <>
                  <h1 className={css({ textTransform: "uppercase" })}>
                    All boards {boards.length}
                  </h1>

                  <ul>
                    {boards.map((board) => (
                      <li key={board.id}>
                        <a href={`/boards/${board.id}`}>{board.name}</a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Await>
          </Suspense>
        </div>

        <div className={css({ px: 6 })}>
          <button onClick={() => setIsNavCollapsed(true)}>Hide sidebar</button>
        </div>
      </nav>

      {isNavCollapsed && (
        <button
          aria-label="Show sidebar"
          className={css({
            position: "absolute",
            bottom: 8,
            opacity: 1,
            width: 14,
            height: 12,
            borderEndRadius: "100%",
            bgColor: {
              base: "purple.base",
              _hover: "purple.light",
            },
          })}
          onClick={() => setIsNavCollapsed(false)}
        >
          👁️
        </button>
      )}

      <Outlet />
    </div>
  );
}
