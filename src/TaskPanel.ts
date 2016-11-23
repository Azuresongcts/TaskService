class TaskPanel implements Observer {

	panel: egret.DisplayObjectContainer;

	stage: egret.DisplayObjectContainer;

	private taskService: TaskService;
	private currentTaskId: string;
	private currentTaskStatus: number;

	private backColor = 0xE3CF57;
	private backGround: egret.Shape;
	private panelX = 300;
	private panelY = 100;
	private panelWidth = 200;
	private panelHeight = 300;


	private taskNameTextField: egret.TextField;
	private taskNameTextFieldText = "任务面板";
	private taskNameTextFieldX = 40;
	private taskNameTextFieldY = 10;
	private taskNameTextFieldWidth = 200;
	private taskNameTextFieldHeight = 30;
	private taskNameBackX = 0;
	private taskNameBackY = 10;
	private taskNameTextFieldColor = 0xFFFFFF;
	private taskNameBack: egret.Shape;
	private taskNameColor = 0x000000;

	private taskInformaTextField: egret.TextField;
	private taskInformationTextFieldText = "";
	private taskInformationTextFieldX = 10;
	private taskInformationTextFieldY = 100;
	private taskInformationFieldWidth = 400;
	private taskInformationTextFieldColor = 0x000000;

	private button: egret.DisplayObjectContainer;
	private buttonBack: egret.Shape;
	private buttonColor = 0x802A2A;
	private buttonX = 30;
	private buttonY = 200;
	private buttonWidth = 130;
	private buttonHeight = 70;

	private buttonTextField: egret.TextField;
	private buttonTextFieldText = "无任务";
	private buttonTextFieldX = this.buttonX + 5;
	private buttonTextFieldY = this.buttonY + 10;
	private buttonTextFieldWidth = 120;
	private buttonTextFieldColor = 0xFFFAFA;


	public constructor(stage: egret.DisplayObjectContainer, taskService: TaskService) {
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

	private setText() {
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


	}

	private drawBackGround() {
		this.backGround.graphics.beginFill(this.backColor, 1);
		this.backGround.graphics.drawRect(0, 0, this.panelWidth, this.panelHeight);
		this.backGround.graphics.endFill();

	}

	private drawButtonBack() {
		this.buttonBack.graphics.beginFill(this.buttonColor, 1);
		this.buttonBack.graphics.drawRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
		this.buttonBack.graphics.endFill();

	}

	private drawTaskNameBack() {
		this.taskNameBack.graphics.beginFill(this.taskNameColor, 1);
		this.taskNameBack.graphics.drawRect(this.taskNameBackX, this.taskNameBackY, this.taskNameTextFieldWidth, this.taskNameTextFieldHeight);
		this.taskNameBack.graphics.endFill();

	}

	private setButtonText() {
		this.buttonTextField.fontFamily = "KaiTi";
		this.buttonTextField.text = this.buttonTextFieldText;
		this.buttonTextField.x = this.buttonTextFieldX;
		this.buttonTextField.y = this.buttonTextFieldY;
		this.buttonTextField.width = this.buttonTextFieldWidth;
		this.buttonTextField.bold = false;
		this.buttonTextField.textColor = this.buttonTextFieldColor;

	}

	private drawButton() {
		this.drawButtonBack();
		this.setButtonText();
		this.button.addChild(this.buttonBack);
		this.button.addChild(this.buttonTextField);
	}

	public drawPanel() {
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

	}

	private onButtonClick(e: egret.TouchEvent) {
		switch (this.currentTaskStatus) {
			case TaskStatus.ACCEPTABLE:
				break;

			case TaskStatus.DURING:
				break;


			case TaskStatus.CAN_SUBMIT:
				break;

			default:

		}

	}

	private onStageClick(e: egret.TouchEvent) {
	}


	public onChange(task: Task) {
		this.currentTaskId = task.id;
		this.changeTaskText(task.name, task.desc, task);
		this.changeButton(task.status);
		this.currentTaskStatus = task.status;

	}

	private changeTaskText(name: string, desc: string, task: Task) {
		if (task.status > 1) {
			this.taskNameTextField.text = name;
			this.taskInformaTextField.text = desc;
		}
	}

	private changeButton(taskStatus: number) {
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

	}




}
