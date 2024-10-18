import type { App } from '@/plugins'

const whitelist = ['/api/token']

const auth = (app: App) =>
    app.onBeforeHandle(async ({ path, jwt, bearer, logger, store, set }) => {
        logger.debug(path)
        if (whitelist.some((route) => path.startsWith(route))) {
            return
        }
        if (!bearer) {
            set.status = 401
            return {
                message: 'No token provided',
            }
        }
        logger.debug(bearer)
        const isValid = await jwt.verify(bearer)
        if (!isValid) {
            set.status = 401
            return {
                message: 'Invalid token',
            }
        }
        store.token = isValid
    })

export default auth
