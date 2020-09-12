import * as bcrypt from "bcryptjs";
import { getPrivateKey } from "../../../shared";
import { UserModel } from "../../../models/schemas";

const jwt = require("jsonwebtoken");

class AuthController {
	register = async (p: any, callback: Function) => {
		const user = await UserModel.findOne({ email: p.email }).lean();
		if (user) {
			return callback("Error: Email already used");
		}
		const newUser = new UserModel({
			name: p.name || "",
			email: p.email,
			password: bcrypt.hashSync(p.password, 10),
		});
		await newUser.save();
		return callback(null, { message: "Successfully registered !" });
	};

	login = async (p: any, callback: Function) => {
		const user = await UserModel.findOne({ email: p.email });
		if (!user || !bcrypt.compareSync(p.password, user.password)) {
			return callback("Error: Unknown user");
		}
		const key = getPrivateKey();
		const access_token = jwt.sign({ _id: user._id }, key);
		return callback(null, {
			access_token: access_token,
		});
	};
}

export default AuthController;
