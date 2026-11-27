import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Blogs & News — Modtech Machine" },
      {
        name: "description",
        content: "Engineering blogs, news, case studies and company updates from Modtech Machine.",
      },
    ],
  }),
  component: Outlet,
});
