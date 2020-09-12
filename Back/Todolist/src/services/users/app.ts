import { defaultAppPort } from "../../shared/env";
import koa = require("koa");
const app = new koa();

app.use(async (ctx, next) => {
	ctx.set("Access-Control-Allow-Origin", "null");
	ctx.set("Access-Control-Allow-Credentials", "true");
	await next();
});

import * as bodyParser from "koa-bodyparser";
app.use(bodyParser({}));

import * as cors from "@koa/cors";
app.use(cors());

import logger = require("koa-logger");
app.use(logger());

const koarouter = require("koa-router");
const router = new koarouter();

app.use(router.routes()).use(router.allowedMethods());

router.get("/", async (ctx: any) => {
	ctx.status = 200;
	return (ctx.body = "You are on Todo's API");
});

const server = app.listen(defaultAppPort, async () => {
	console.log("Server is now running on " + defaultAppPort);
});

import authRouter from "./routes/auth";
app.use(authRouter.routes());

export default server;
