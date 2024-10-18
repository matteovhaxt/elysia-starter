import { Elysia, Static, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { jwt } from '@elysiajs/jwt'
import { bearer } from '@elysiajs/bearer'
import { cors } from '@elysiajs/cors'
import logger from '@/lib/logger'

const swaggerPlugin = () =>
    new Elysia().use(
        swagger({
            path: '/docs',
            documentation: {
                info: {
                    title: 'API Documentation',
                    version: '1.0.0',
                    description: 'Documentation for the project',
                },
                servers: [
                    {
                        url: 'http://localhost:3000',
                        description: 'Local server',
                    },
                ],
                tags: [
                    {
                        name: 'utils',
                        description: 'Utility routes'
                    },
                ],
            },
        })
    )

const jwtPayload = t.Object({
    id: t.String(),
    createdAt: t.Date(),
})

const jwtPlugin = new Elysia().use(bearer()).use(
    jwt({
        name: 'jwt',
        secret: Bun.env.JWT_SECRET ?? 'secret',
        schema: jwtPayload,
    })
)

const corsPlugin = new Elysia().use(
    cors({
        origin: '*',
    })
)

const loggerPlugin = new Elysia().decorate('logger', logger)

type Store = {
    token: Static<typeof jwtPayload> | null
}

const storePlugin = new Elysia().state<Store>({ token: null })

const plugins = new Elysia()
    .use(swaggerPlugin)
    .use(jwtPlugin)
    .use(corsPlugin)
    .use(loggerPlugin)
    .use(storePlugin)

export type App = typeof plugins

export default () => plugins
