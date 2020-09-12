import { setCtx, checkBody } from "../../../shared";
const Router = require("koa-router");

import AuthController from "../controllers/auth";

const defaultCallback = (ctx: any) => {
	return (error: String, result: Object) => {
		if (error) return setCtx(ctx, 400, { err: error });
		return setCtx(ctx, 200, { ...result });
	};
};

const Auth = new AuthController();

const router = new Router({
	prefix: "/user",
});

router.post(
	"/register",
	checkBody(["name", "email", "password"]),
	async (ctx: any) => {
		await Auth.register(
			ctx.request.body,
			(error: String, result: Object) => {
				if (error) return setCtx(ctx, 400, { err: error });
				return setCtx(ctx, 201, { ...result });
			}
		);
	}
);

router.post("/login", checkBody(["email", "password"]), async (ctx: any) => {
	await Auth.login(ctx.request.body, defaultCallback(ctx));
});

export default router;
