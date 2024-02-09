import { unstable_vitePlugin as remix } from "@vercel/remix-run-dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
});
