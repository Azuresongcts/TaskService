class TaskService {
	npc1 = new NPC1();
	npc2 = new NPC2();
	public constructor() {
		this.npc1.npcId = "npc_0";
		this.npc2.npcId = "npc_0";

	}
	observerList: Observer[];
	private taskList: Task[] = [];
	task: Task;
	public Attach(observer: Observer): void {
		this.observerList.push(observer);
	}
	public Notify(task: Task): void {
		this.observerList.forEach(element => {
			element.onChange(task);
		});
	}
	public getTask(task: Task) {
		return task;
	}
	public finish(id: string): ErrorCode {
		var task: Task;
		task = taskSearch(this.taskList, id);
		switch (id) {
			case "001":
				this.npc1.onChange(task);
				this.npc2.onChange(task);
				task.status = 4;
				this.Notify(task);
			default:
				return 1;
		}
	}
	public accept(id: string): void {
		var task: Task;
		task = taskSearch(this.taskList, id);
		switch (id) {
			case "001":
				this.npc1.onChange(task);
				this.npc2.onChange(task);
				this.Notify(task);
				break;
			default:
				console.log("Task cannot be found");
		}
	}
	public returnTaskByCustomRule(rule: Function): Task {
		//   var clone = Object({}, this.taskList);
        return rule(this.taskList);
    }

    public addTask(id: string) {
		var task: Task;
		task = taskSearch(this.taskList, id);
        switch (id) {
            case "001":
				this.npc1.onChange(task);
				this.npc2.onChange(task);
                var task = new Task("001", "Task 1", "First Task", 0, "npc_0", "npc_1");
				task.status = 1;
                this.taskList.push(task);
				this.Notify(task);
                break;
        }
	}
	public removeTask(id: string) {
		if (taskSearch(this.taskList, id).status = 4) {

		}
	}

}
function taskSearch(taskList: Task[], id: string): Task {
	for (var i = 0; i <= taskList.length - 1; i++) {
		if (taskList[i].id == id) {
			return taskList[i];
		}
		else {
			console.log("task named" + id + "can not be found");
		}
	}

}

enum ErrorCode {

    TASK_ERROR_NULL,
    TASK_ERROR_UNFIND

}