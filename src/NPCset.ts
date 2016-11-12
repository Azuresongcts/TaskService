class NPC1 implements NPC {
	npcId: String;
	onChange(task: Task) {
				if (task.status == 1) {
					emoji.texture = RES.getRes(emojiimage[0].image);
				} else if (task.status == 2) {
					emoji.texture = RES.getRes(emojiimage[1].image);
				} else if (task.status == 3) {
					emoji.texture = RES.getRes(emojiimage[2].image);
				} else if (task.status == 4) {
					emoji.texture = RES.getRes(emojiimage[3].image);
				} else {

				}
    }
    onNPCClick(task: Task, evt: egret.TouchEvent) {
		switch (task.id) {
			case "001":
				if (task.status == 1) {
					task.status = 2;
					
				}
		}
    }

}
class NPC2 implements NPC {
	npcId: String;
	onChange(task: Task) {
				if (task.status == 1) {
					emoji.texture = RES.getRes(emojiimage[0].image);
				} else if (task.status == 2) {
					emoji.texture = RES.getRes(emojiimage[1].image);
				} else if (task.status == 3) {
					emoji.texture = RES.getRes(emojiimage[2].image);
				} else if (task.status == 4) {
					emoji.texture = RES.getRes(emojiimage[3].image);
				} else {

				}
    }
    onNPCClick(task: Task, evt: egret.TouchEvent) {
		switch (task.id) {
			case "001":
				if (task.status == 3) {
					task.status = 4;
					
				}
		}
    }

}