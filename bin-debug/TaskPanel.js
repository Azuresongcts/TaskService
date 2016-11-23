var TaskPanel = (function () {
    function TaskPanel(stage, taskService) {
        this.backColor = 0xE3CF57;
        this.panelX = 300;
        this.panelY = 100;
        this.panelWidth = 200;
        this.panelHeight = 300;
        this.taskNameTextFieldText = "任务面板";
        this.taskNameTextFieldX = 40;
        this.taskNameTextFieldY = 10;
        this.taskNameTextFieldWidth = 200;
        this.taskNameTextFieldHeight = 30;
        this.taskNameBackX = 0;
        this.taskNameBackY = 10;
        this.taskNameTextFieldColor = 0xFFFFFF;
        this.taskNameColor = 0x000000;
        this.taskInformationTextFieldText = "";
        this.taskInformationTextFieldX = 10;
        this.taskInformationTextFieldY = 100;
        this.taskInformationFieldWidth = 400;
        this.taskInformationTextFieldColor = 0x000000;
        this.buttonColor = 0x802A2A;
        this.buttonX = 30;
        this.buttonY = 200;
        this.buttonWidth = 130;
        this.buttonHeight = 70;
        this.buttonTextFieldText = "无任务";
        this.buttonTextFieldX = this.buttonX + 5;
        this.buttonTextFieldY = this.buttonY + 10;
        this.buttonTextFieldWidth = 120;
        this.buttonTextFieldColor = 0xFFFAFA;
        this.stage = stage;
        this.taskService = taskService;
        this.taskService.Attach(this, "TaskPanel");
        this.panel = new egret.DisplayObjectContainer();
        this.taskNameTextField = new egret.TextField();
        this.taskInformaTextField = new egret.TextField();
        this.backGround = new egret.Shape();
        this.button = new egret.DisplayObjectContainer();
        this.buttonBack = new egret.Shape();
        this.taskNameBack = new egret.Shape();
        this.buttonTextField = new egret.TextField();
        this.stage.addChild(this.panel);
        this.drawPanel();
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.setText = function () {
        this.taskNameTextField.fontFamily = "KaiTi";
        this.taskNameTextField.text = this.taskNameTextFieldText;
        this.taskNameTextField.x = this.taskNameTextFieldX;
        this.taskNameTextField.y = this.taskNameTextFieldY;
        this.taskNameTextField.width = this.taskNameTextFieldWidth;
        this.taskNameTextField.bold = true;
        this.taskNameTextField.textColor = this.taskNameTextFieldColor;
        this.taskInformaTextField.fontFamily = "KaiTi";
        this.taskInformaTextField.text = this.taskInformationTextFieldText;
        this.taskInformaTextField.x = this.taskInformationTextFieldX;
        this.taskInformaTextField.y = this.taskInformationTextFieldY;
        this.taskInformaTextField.width = this.taskInformationFieldWidth;
        this.taskInformaTextField.bold = false;
        this.taskInformaTextField.textColor = this.taskInformationTextFieldColor;
        this.taskInformaTextField.textAlign = egret.HorizontalAlign.LEFT;
    };
    p.drawBackGround = function () {
        this.backGround.graphics.beginFill(this.backColor, 1);
        this.backGround.graphics.drawRect(0, 0, this.panelWidth, this.panelHeight);
        this.backGround.graphics.endFill();
    };
    p.drawButtonBack = function () {
        this.buttonBack.graphics.beginFill(this.buttonColor, 1);
        this.buttonBack.graphics.drawRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
        this.buttonBack.graphics.endFill();
    };
    p.drawTaskNameBack = function () {
        this.taskNameBack.graphics.beginFill(this.taskNameColor, 1);
        this.taskNameBack.graphics.drawRect(this.taskNameBackX, this.taskNameBackY, this.taskNameTextFieldWidth, this.taskNameTextFieldHeight);
        this.taskNameBack.graphics.endFill();
    };
    p.setButtonText = function () {
        this.buttonTextField.fontFamily = "KaiTi";
        this.buttonTextField.text = this.buttonTextFieldText;
        this.buttonTextField.x = this.buttonTextFieldX;
        this.buttonTextField.y = this.buttonTextFieldY;
        this.buttonTextField.width = this.buttonTextFieldWidth;
        this.buttonTextField.bold = false;
        this.buttonTextField.textColor = this.buttonTextFieldColor;
    };
    p.drawButton = function () {
        this.drawButtonBack();
        this.setButtonText();
        this.button.addChild(this.buttonBack);
        this.button.addChild(this.buttonTextField);
    };
    p.drawPanel = function () {
        this.panel.x = this.panelX;
        this.panel.y = this.panelY;
        this.panel.width = this.panelWidth;
        this.panel.height = this.panelHeight;
        this.drawTaskNameBack();
        this.drawButton();
        this.drawBackGround();
        this.setText();
        this.panel.addChild(this.backGround);
        this.panel.addChild(this.taskNameBack);
        this.panel.addChild(this.taskNameTextField);
        this.panel.addChild(this.taskInformaTextField);
        this.panel.addChild(this.button);
        this.button.touchEnabled = true;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    p.onButtonClick = function (e) {
        switch (this.currentTaskStatus) {
            case TaskStatus.ACCEPTABLE:
                break;
            case TaskStatus.DURING:
                break;
            case TaskStatus.CAN_SUBMIT:
                break;
            default:
        }
    };
    p.onStageClick = function (e) {
    };
    p.onChange = function (task) {
        this.currentTaskId = task.id;
        this.changeTaskText(task.name, task.desc, task);
        this.changeButton(task.status);
        this.currentTaskStatus = task.status;
    };
    p.changeTaskText = function (name, desc, task) {
        if (task.status > 1) {
            this.taskNameTextField.text = name;
            this.taskInformaTextField.text = desc;
        }
    };
    p.changeButton = function (taskStatus) {
        switch (taskStatus) {
            case TaskStatus.ACCEPTABLE:
                this.buttonTextField.text = "可接受";
                break;
            case TaskStatus.DURING:
                this.buttonTextField.text = "未完成";
                break;
            case TaskStatus.CAN_SUBMIT:
                this.buttonTextField.text = "可提交";
                break;
            case TaskStatus.SUBMITTED:
                this.taskNameTextField.text = "任务面板";
                this.taskInformaTextField.text = "";
                this.buttonTextField.text = "无任务";
                break;
            default:
                this.buttonTextField.text = "None";
                break;
        }
    };
    return TaskPanel;
}());
egret.registerClass(TaskPanel,'TaskPanel');
//# sourceMappingURL=TaskPanel.js.map