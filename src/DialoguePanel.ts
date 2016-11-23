class DialoguePanel {
	panel: egret.DisplayObjectContainer;

	stage: egret.DisplayObjectContainer;

	private taskService: TaskService;
	private npc: NPC;
	private currentTaskId: string;
	private currentTaskStatus: number;

	private backColor =  0xE3CF57;
	private backGround: egret.Shape;
	private panelX = 50;
	private panelY = 200;
	private panelWidth = 300;
	private panelHeight = 500;

	private taskNameTextField: egret.TextField;
	private taskNameTextFieldText = "";
	private taskNameTextFieldX = this.panelWidth / 2 - 50;
	private taskNameTextFieldY = 50;
	private taskNameTextFieldWidth = 200;
	private taskNameTextFieldColor = 0x000000;


	private taskInformationField: egret.TextField;
	private taskInformationTextFieldText = "";
	private taskInformationTextFieldX = 10;
	private taskInformationTextFieldY =100;
	private taskInformationTextFieldWidth = 220;
	private taskInformationTextFieldColor = 0x000000;

	private button: egret.DisplayObjectContainer;
	private buttonBack: egret.Shape;
	private buttonColor = 0x802A2A;
	private buttonX =  this.panelWidth / 2 -70;
	private buttonY = this.panelHeight-100;
	private buttonWidth = 160;
	private buttonHeight = 70;


	private buttonTextField: egret.TextField;
	private buttonTextFieldText = "确认";
	private buttonTextFieldX = this.buttonX + 15;
	private buttonTextFieldY = this.buttonY + 10;
	private buttonTextFieldWidth = 120;
	private buttonTextFieldColor = 0xFFFAFA;


	public constructor(stage: egret.DisplayObjectContainer, taskService: TaskService) {
		this.stage = stage;
		this.taskService = taskService;
		this.panel = new egret.DisplayObjectContainer();
		this.taskNameTextField = new egret.TextField();
		this.taskInformationField = new egret.TextField();
		this.backGround = new egret.Shape();
		this.button = new egret.DisplayObjectContainer();
		this.buttonBack = new egret.Shape();
		this.buttonTextField = new egret.TextField();
		this.drawPanel();
	}

	private setText() {
		this.taskNameTextField.text = this.taskNameTextFieldText;
		this.taskNameTextField.x = this.taskNameTextFieldX;
		this.taskNameTextField.y = this.taskNameTextFieldY;
		this.taskNameTextField.width = this.taskNameTextFieldWidth;
		this.taskNameTextField.bold = true;
		this.taskNameTextField.textColor = this.taskNameTextFieldColor;

		this.taskInformationField.text = this.taskInformationTextFieldText;
		this.taskInformationField.x = this.taskInformationTextFieldX;
		this.taskInformationField.y = this.taskInformationTextFieldY;
		this.taskInformationField.width = this.taskInformationTextFieldWidth;
		this.taskInformationField.bold = false;
		this.taskInformationField.textColor = this.taskInformationTextFieldColor;
		this.taskInformationField.textAlign = egret.HorizontalAlign.CENTER;

	}
	private drawButtonBack() {
		this.buttonBack.graphics.beginFill(this.buttonColor, 1);
		this.buttonBack.graphics.drawRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
		this.buttonBack.graphics.endFill();

	}
	private drawBackground() {
		this.backGround.graphics.beginFill(this.backColor, 1);
		this.backGround.graphics.drawRect(0, 0, this.panelWidth, this.panelHeight);
		this.backGround.graphics.endFill();

	}

	private setButtonText() {
		this.buttonTextField.text = this.buttonTextFieldText;
		this.buttonTextField.x = this.buttonTextFieldX;
		this.buttonTextField.y = this.buttonTextFieldY;
		this.buttonTextField.width = this.buttonTextFieldWidth;
		this.buttonTextField.bold = false;
		this.buttonTextField.textColor = this.buttonTextFieldColor;

	}
	public drawPanel() {
		this.panel.x = this.panelX;
		this.panel.y = this.panelY;
		this.panel.width = this.panelWidth;
		this.panel.height = this.panelHeight;
		this.drawButton();
		this.drawBackground();
		this.setText();
		this.panel.addChild(this.backGround);
		this.panel.addChild(this.taskNameTextField);
		this.panel.addChild(this.taskInformationField);
		this.panel.addChild(this.button);
		this.button.touchEnabled = true;
		this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

	}

	private drawButton() {
		this.drawButtonBack();
		this.setButtonText();
		this.button.addChild(this.buttonBack);
		this.button.addChild(this.buttonTextField);
	}


	private onButtonClick(e: egret.TouchEvent) {
		switch (this.currentTaskStatus) {
			case TaskStatus.ACCEPTABLE:
				this.taskService.accept(this.currentTaskId);
				break;

			case TaskStatus.DURING:
				break;

			case TaskStatus.CAN_SUBMIT:
				this.taskService.finish(this.currentTaskId);
				break;

			default:

		}

		this.stage.removeChild(this.panel);

	} 


	public showPanel() {
		this.stage.addChild(this.panel);
	}

	public removePanel() {
		this.stage.removeChild(this.panel);
	}

	public dialogueOpen(task: Task) {
		this.currentTaskId = task.id;
		this.changeTaskText(task.name, task.desc);
		this.changeButton(task.status);
		this.currentTaskStatus = task.status;
		this.showPanel();

	} 

	private changeTaskText(name: string, desc: string) {
		this.taskNameTextField.text = name;
		this.taskInformationField.text = desc;

	}

	private changeButton(taskStatus: number) {
		switch (taskStatus) {
			case TaskStatus.ACCEPTABLE:
				this.buttonTextField.text = "接受任务";
				break;

			case TaskStatus.CAN_SUBMIT:
				this.buttonTextField.text = "提交任务";
				break;

			default:
				this.buttonTextField.text = "";

		}

	}
}