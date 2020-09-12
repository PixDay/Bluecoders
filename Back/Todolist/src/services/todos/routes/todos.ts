import { setCtx, checkToken } from "../../../shared";
const Router = require("koa-router");

import TodoController from "../controllers/todos";

const defaultCallback = (ctx: any) => {
	return (error: String, result: Object) => {
		if (error) return setCtx(ctx, 400, { success: false, err: error });
		return setCtx(ctx, 200, result);
	};
};

const router = new Router({
	prefix: "/todo",
});

const Todo = new TodoController();

router.post("/:name", checkToken, async (ctx: any) => {
	await Todo.create(
		{ user: ctx.client_id, name: ctx.params.name },
		defaultCallback(ctx)
	);
});

router.get("/", checkToken, async (ctx: any) => {
	await Todo.get({ user: ctx.client_id }, defaultCallback(ctx));
});

router.put("/:id", checkToken, async (ctx: any) => {
	await Todo.toggle(
		{ user: ctx.client_id, task_id: ctx.params.id },
		defaultCallback(ctx)
	);
});

router.delete("/:id", checkToken, async (ctx: any) => {
	await Todo.delete(
		{ user: ctx.client_id, task_id: ctx.params.id },
		defaultCallback(ctx)
	);
});

export default router;
