import { Elysia } from "elysia";
import plugins from "./plugins";

const app = new Elysia().use(plugins).get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
