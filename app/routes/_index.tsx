import { redirect } from "@remix-run/react";

export function meta() {
  return [
    { title: "Frontend Mentor - Kanban app" },
    { name: "description", content: "Welcome to Remix!" },
  ];
}

// export async function loader() {
//   return redirect("/boards");
// }

export default function Index() {
  return <p>Hello world</p>;
}
