/// Connection to mongoose, depending on the environment
import { env } from "../shared";

import * as mongoose from "mongoose";

const uri = env.mongo;

mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.catch((error) => {
		console.log("Can't connect to mongoose: ", error);
		console.log("Is the current ip whitelisted ?");
	});

/// Default user model, stocked on mongoose
const userSchema = mongoose.Schema({
	name: String,
	email: String,
	password: String,
});

const todoSchema = mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	name: String,
	checked: Boolean,
});

const UserModel = mongoose.model("User", userSchema);
const TodoModel = mongoose.model("Todo", todoSchema);

export { UserModel, TodoModel };
