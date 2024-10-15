import type { App } from "@/plugins";
import { t } from "elysia";

const route = (app: App) => app.get('/token/:id', async ({ jwt, params }) => {
    if (Bun.env.NODE_ENV !== 'development') {
        return {
            message: 'Unauthorized'
        }
    }
    const { id } = params;
    const token = await jwt.sign({
        id,
        createdAt: new Date(),
    })
    return {
        token
    }
}, {
    params: t.Object({
        id: t.String(),
    }),
})

export default route;
