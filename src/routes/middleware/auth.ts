import type { App } from "@/plugins";

const whitelist = ['/api/token'];

const auth = (app: App) => app.onBeforeHandle(async ({ path, jwt, bearer }) => {
    if (whitelist.some(route => path.startsWith(route))) {
        return;
    }
    if (!bearer) {
        return {
            message: 'No token provided'
        }
    }
    const isValid = await jwt.verify(bearer);
    if (!isValid) {
        return {
            message: 'Invalid token'
        }
    }
});

export default auth;
