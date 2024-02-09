import { Await, NavLink, Outlet, defer, useLoaderData } from "@remix-run/react";
import { Suspense, useState } from "react";
import { css, cx } from "styled-system/css";
import { hstack, stack, vstack } from "styled-system/patterns";
import { boardRepo } from "~/.server/data-access/board";
import IconBoard from "~/components/IconBoard";
import IconShowSidebar from "~/components/IconShowSidebar";
import Logo from "~/components/Logo";

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
          height: "100dvh",
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
          pt: 8,
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
        <div className={vstack({ alignItems: "flex-start", gap: 14 })}>
          <div className={css({ px: 8 })}>
            <Logo />
          </div>

          <Suspense
            fallback={
              <div className={vstack({ px: 8, gap: 4, width: "100%" })}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={css({
                      height: 8,
                      width: "100%",
                      bgColor: "grey.light",
                      borderRadius: "full",
                      animation: "pulse",
                    })}
                  />
                ))}
              </div>
            }
          >
            <Await resolve={boards}>
              {(boards) => (
                <div>
                  <h1
                    className={css({
                      textTransform: "uppercase",
                      px: 8,
                      color: "grey.medium",
                      textStyle: "headingS",
                      mb: 5,
                    })}
                  >
                    All boards ({boards.length})
                  </h1>

                  <ul
                    className={vstack({
                      alignItems: "flex-start",
                      pr: 6,
                      gap: 0,
                    })}
                  >
                    {boards.map((board) => (
                      <li key={board.id} className={css({ width: "100%" })}>
                        <NavLink
                          to={`/boards/${board.id}`}
                          className={({ isActive }) => {
                            return hstack({
                              color: isActive
                                ? "white"
                                : {
                                    base: "grey.medium",
                                    _hover: "purple.light",
                                  },
                              textStyle: "headingM",
                              gap: 4,
                              height: 12,
                              bgColor: isActive ? "purple.base" : undefined,
                              px: 8,
                              py: 4,
                              width: "100%",
                              borderRightRadius: "full",
                            });
                          }}
                        >
                          <IconBoard />
                          {board.name}
                        </NavLink>
                      </li>
                    ))}
                    <li className={css({ width: "100%" })}>
                      <button
                        className={hstack({
                          color: "purple.base",
                          cursor: "pointer",
                          gap: 4,
                          px: 8,
                          py: 4,
                          textStyle: "headingM",
                          textTransform: "capitalize",
                          width: "100%",
                        })}
                      >
                        <IconBoard />+ Create new board
                      </button>
                    </li>
                  </ul>
                </div>
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
            bgColor: {
              base: "purple.base",
              _hover: "purple.light",
            },
            position: "absolute",
            bottom: 8,
            opacity: 1,
            width: 14,
            height: 12,
            borderEndRadius: "100%",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            transition: "background",
          })}
          onClick={() => setIsNavCollapsed(false)}
        >
          <IconShowSidebar />
        </button>
      )}

      <Outlet />
    </div>
  );
}
