import type { App } from '@/plugins'

const whitelist = ['/api/token']

const auth = (app: App) =>
    app.onBeforeHandle(async ({ path, jwt, bearer, logger }) => {
        logger.debug(path)
        if (whitelist.some((route) => path.startsWith(route))) {
            return
        }
        if (!bearer) {
            return {
                message: 'No token provided',
            }
        }
        logger.debug(bearer)
        const isValid = await jwt.verify(bearer)
        if (!isValid) {
            return {
                message: 'Invalid token',
            }
        }
    })

export default auth
