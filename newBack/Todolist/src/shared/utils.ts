import * as jwt from "jsonwebtoken";
import { readFileSync } from "fs";

export const setCtx = (ctx: any, status: any, body: any) => {
	ctx.response.status = status;
	ctx.response.body = body;
	return ctx;
};

export const getPrivateKey = () => {
	return readFileSync(__dirname + "/.private_key");
};

export const getToken = (ctx: any) => {
	const token = ctx.request.header["authorization"];
	if (!token) return false;
	const key = getPrivateKey();
	try {
		const decoded = jwt.verify(token, key);
		ctx.client_id = decoded._id;
		ctx.token = token;
		return true;
	} catch (err) {
		return false;
	}
};

export const checkToken = async (ctx: any, next: Function) => {
	let token = ctx.request.header["authorization"];
	if (token) {
		let key = getPrivateKey();
		try {
			let decoded = jwt.verify(token, key);
			ctx.client_id = decoded._id;
			ctx.token = token;
			return next();
		} catch (err) {
			return setCtx(ctx, 403, { success: false, error: "Bad token" });
		}
	} else {
		return setCtx(ctx, 403, { success: false, error: "No token provided" });
	}
};

export const checkBody = (array: Array<string>) => {
	return async (ctx: any, next: Function) => {
		let not_found = [];
		for (const entry of array) {
			if (!(entry in ctx.request.body)) not_found.push(entry);
		}
		if (not_found.length !== 0)
			return setCtx(ctx, 400, {
				success: false,
				error: `Missing parameters: ${not_found}`,
			});
		return await next();
	};
};

export const handlePromise = (promise) => {
	return promise
		.then((data) => {
			return [null, data];
		})
		.catch((err) => {
			return [err];
		});
};
