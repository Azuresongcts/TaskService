class TaskService {
	observerList: Observer[];
	private taskList: Task[] = [];
	task: Task;

	public constructor() {
		var npc1 = new NPC();
		var npc2 = new NPC();
		npc1.npcId = "npc_0";
		npc2.npcId = "npc_0";
	}
	public getTask(task: Task) {
		return task;
	}
	public finish(id: string): ErrorCode {
		switch (id) {
			case "001":
				taskSearch(this.taskList, id).status=4;
			default:
				return 1;
		}
	}
	public accept(id: string): void {
		switch (id) {
			case "001":
				taskSearch(this.taskList, id).status=2;
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
        switch (id) {
            case "001":
                var task = new Task("001", "Task 1", "First Task", 0, "npc_0", "npc_1");
				task.status=1;
                this.taskList.push(task);
                break;
        }
	}
	public removeTask(id:string){
		if(taskSearch(this.taskList, id).status=4){
			
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