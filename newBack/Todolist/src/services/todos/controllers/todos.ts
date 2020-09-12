import { handlePromise } from "../../../shared";
import { TodoModel } from "../../../models/schemas";

export const PUBLIC_KEYS = ["_id", "name", "checked"];

class TodoController {
	get = async (p: any, callback: Function) => {
		let tasks = (await TodoModel.find({ user: p.user }, PUBLIC_KEYS)) || [];
		return callback(null, tasks);
	};

	create = async (p: any, callback: Function) => {
		const newTask = new TodoModel({
			name: p.name,
			user: p.user,
			checked: false,
		});
		await newTask.save();
		return callback(null, { message: "Task successfully created" });
	};

	toggle = async (p: any, callback: Function) => {
		const task = await TodoModel.findOne({ user: p.user, _id: p.task_id });
		if (!task) {
			return callback("Task does not exist");
		}
		task.checked = !task.checked;
		task.save();
		return callback(null, task);
	};

	delete = async (p: any, callback: Function) => {
		let [err, obj] = await handlePromise(
			TodoModel.deleteOne({ user: p.user, _id: p.task_id })
		);
		if (err || !obj) {
			return callback("Failed to delete the task");
		}
		if (obj.ok !== 1 || obj.n === 0) {
			return callback("Task does not exist");
		}
		return callback(null, "Task deleted");
	};
}

export default TodoController;
