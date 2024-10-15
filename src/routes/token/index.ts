import type { App } from '@/plugins'
import { t } from 'elysia'

const route = (app: App) =>
    app.get(
        '/token/:id',
        async ({ jwt, params, logger }) => {
            if (Bun.env.NODE_ENV !== 'development') {
                return {
                    message: 'Unauthorized',
                }
            }
            const { id } = params
            logger.debug(id)
            const token = await jwt.sign({
                id,
                createdAt: new Date(),
            })
            logger.debug(token)
            return {
                token,
            }
        },
        {
            params: t.Object({
                id: t.String(),
            }),
        }
    )

export default route
