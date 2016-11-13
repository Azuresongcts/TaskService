var emojiimage = {
    npc_0: "walk01_png",
    npc_1: "walk02_png",
    npc_2: "walk03_png",
    npc_3: "walk04_png"
};
var NPC = (function () {
    function NPC(npcId, npcName, taskService) {
        this.tileSize = 64;
        this.emojiX = 0;
        this.emojiY = 64;
        this.npcStageWidth = 64;
        this.npcStageHeight = 128;
        this.npcStage = new egret.DisplayObjectContainer();
        this.npcStageShape = new egret.Shape();
        this.emoji = new egret.Bitmap();
        this.npcId = npcId;
        this.npcName = npcName;
        this.taskService = taskService;
        this.taskService.Attach(this, "NPC");
        this.taskNoneState = new TaskNoneState(this);
        this.taskAvilableState = new TaskAvilableState(this);
        this.taskDuringState = new TaskDuringState(this);
        this.taskSubmitState = new TaskSubmitState(this);
        this.taskStateMachine = new StateMachine(this.taskNoneState);
    }
    var d = __define,c=NPC,p=c.prototype;
    p.getTask = function () {
        this.task = this.taskService.getTaskByCustomRole(this.rule, this.npcId);
        console.log("This Task State: " + this.task.status);
        this.checkState();
    };
    p.setemoji = function () {
        this.emoji.texture = RES.getRes(emojiimage.npc_0);
        this.emoji.x = this.emojiX;
        this.emoji.y = this.emojiY;
        this.emoji.width = this.tileSize;
        this.emoji.height = this.tileSize;
    };
    p.setNpc = function (npcX, npcY, npcColor) {
        this.npcStageX = npcX;
        this.npcStageY = npcY;
        this.setemoji();
    };
    p.drawNpcShape = function () {
        this.npcStageShape.graphics.drawRect(0, 0, this.npcStageWidth, this.npcStageHeight);
        this.npcStageShape.graphics.endFill();
    };
    p.drawNpc = function () {
        this.drawNpcShape();
        this.npcStage.x = this.npcStageX;
        this.npcStage.y = this.npcStageY;
        this.npcStage.width = this.npcStageWidth;
        this.npcStage.height = this.npcStageHeight;
        this.npcStage.addChild(this.npcStageShape);
        this.npcStage.addChild(this.emoji);
        this.emoji.touchEnabled = true;
        //this.npcStage.touchEnabled = true;
        this.emoji.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNpcClick, this);
    };
    p.checkState = function () {
        switch (this.task.status) {
            case TaskStatus.UNACCEPTABLE:
            case TaskStatus.SUBMITTED:
                this.taskStateMachine.changeState(this.taskNoneState);
                break;
            case TaskStatus.ACCEPTABLE:
                if (this.task.fromNpcId == this.npcId) {
                    this.taskStateMachine.changeState(this.taskAvilableState);
                }
                else {
                    this.taskStateMachine.changeState(this.taskNoneState);
                }
                break;
            case TaskStatus.DURING:
                if (this.task.fromNpcId == this.npcId) {
                    this.taskStateMachine.changeState(this.taskDuringState);
                }
                else {
                    this.taskStateMachine.changeState(this.taskNoneState);
                }
                break;
            case TaskStatus.CAN_SUBMIT:
                if (this.task.toNpcId == this.npcId) {
                    this.taskStateMachine.changeState(this.taskSubmitState);
                }
                else {
                    this.taskStateMachine.changeState(this.taskNoneState);
                }
                break;
        }
    };
    p.onNpcClick = function (e) {
        if (this.task.status == TaskStatus.ACCEPTABLE && this.task.fromNpcId == this.npcId) {
            this.taskService.Notify(this.task);
        }
        else if (this.task.status == TaskStatus.DURING && this.task.toNpcId == this.npcId) {
            this.task.status = TaskStatus.CAN_SUBMIT;
            this.taskService.Notify(this.task);
        }
        else if (this.task.status == TaskStatus.CAN_SUBMIT && this.task.toNpcId == this.npcId) {
            //this.task.status = TaskStatus.SUBMITTED
            this.taskService.Notify(this.task);
        }
        else if (this.task.status == TaskStatus.SUBMITTED && this.task.toNpcId == this.npcId) {
            this.taskService.Notify(this.task);
        }
    };
    p.onChange = function (task) {
        this.task = task;
        this.checkState();
    };
    p.rule = function (taskList, npcId) {
        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].fromNpcId == npcId || taskList[i].toNpcId == npcId) {
                console.log("Find");
                return taskList[i];
            }
        }
    };
    return NPC;
}());
egret.registerClass(NPC,'NPC');
//# sourceMappingURL=NPC.js.map