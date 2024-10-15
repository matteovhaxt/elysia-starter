import { Elysia, t } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { jwt } from '@elysiajs/jwt'
import { bearer } from '@elysiajs/bearer'
import { cors } from '@elysiajs/cors'
import logger from "@/lib/logger";

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

const corsPlugin = new Elysia().use(cors({
    origin: '*',
}))

const loggerPlugin = new Elysia().decorate('logger', logger)

const plugins = new Elysia().use(swaggerPlugin).use(jwtPlugin).use(bearer()).use(corsPlugin).use(loggerPlugin);

export type App = typeof plugins;

export default () => plugins;