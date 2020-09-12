const username = "root";
const passwd = "mtBUTqQMl1MugTSR";
const dbname = "todolist";
const defaultURI = `mongodb+srv://${username}:${passwd}@cluster0.sazg3.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const environments = {
	prod: {
		mongo: defaultURI,
		logger: false,
		mail: true,
	},
	dev: {
		mongo: defaultURI,
		logger: true,
		mail: true,
	},
	test: {
		mongo: defaultURI,
		logger: false,
		mail: false,
	},
};

const mode = process.env.NODE_ENV || "dev";
const env = environments[mode];

export const defaultAppPort = 8080;

export const servicesURLS = {
	user: `http://users:${defaultAppPort}`,
	todos: `http://todos:${defaultAppPort}`,
};

export default env;
