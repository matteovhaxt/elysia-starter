import { Elysia, t } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { jwt } from '@elysiajs/jwt'
import { bearer } from '@elysiajs/bearer'

const swaggerPlugin = () => new Elysia().use(swagger({
    path: '/docs',
}))

const jwtPlugin = new Elysia().use(jwt({
    name: 'jwt',
    secret: Bun.env.JWT_SECRET ?? 'secret',
    schema: t.Object({
        id: t.String(),
        createdAt: t.Date(),
    }),
}))

const plugins = new Elysia().use(swaggerPlugin).use(jwtPlugin).use(bearer());

export type App = typeof plugins;

export default () => plugins;