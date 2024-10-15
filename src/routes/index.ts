import type { App } from "@/plugins";
import auth from "./middleware/auth";
import token from "./token";

const api = (app: App) => app.group("/api", (app) => app.use(auth).use(token));

export default api;