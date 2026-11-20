import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

const deploymentPreset = process.env.NITRO_PRESET || "node-server";

export default defineConfig({
  builder: {},
  server: {
    host: "::",
    port: 8080,
  },
  resolve: {
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  plugins: [
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    nitro({
      preset: deploymentPreset,
      // Registered explicitly rather than by directory scan: TanStack Start owns
      // the route tree, so a file dropped in server/routes is never mounted.
      handlers: [
        {
          route: "/api/keep-alive",
          handler: "./server/keep-alive.ts",
        },
      ],
      // Applied by the server for every route, so the headers follow the app to Node,
      // Docker, Vercel, Netlify, Cloudflare and Render instead of living in one
      // provider's config file. No CSP here: the app loads YouTube embeds and an inline
      // theme script, so a policy needs its own testing pass before it is turned on.
      routeRules: {
        "/**": {
          headers: {
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "SAMEORIGIN",
            "Referrer-Policy": "strict-origin-when-cross-origin",
            "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
            "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
          },
        },
        // The admin is private and must never be indexed or framed.
        "/admin/**": {
          headers: { "X-Robots-Tag": "noindex, nofollow", "X-Frame-Options": "DENY" },
        },
      },
    }),
    react(),
  ],
});
