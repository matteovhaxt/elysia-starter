import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'

const swaggerPlugin = () => new Elysia().use(swagger({
    path: '/docs',
}))

const plugins = new Elysia().use(swaggerPlugin);

export type App = typeof plugins;

export default () => plugins;