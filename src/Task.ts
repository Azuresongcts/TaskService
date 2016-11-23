class Task implements TaskCondition{
    id: string;
    name: string;
    desc: string;
    status: TaskStatus;
    fromNpcId: string;
    toNpcId: string;
    total:number;
    private condition:TaskCondition;
    onAccept(task){

    }
    onSubmit(task){

    }
    private checkStatus(){
        
    }
    public constructor(id, name, desc, status, fromNpcID, toNpcId) {
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.status=status;
        this.fromNpcId=fromNpcID;
        this.toNpcId=toNpcId;
    }
}

enum TaskStatus {
    UNACCEPTABLE,
    ACCEPTABLE,
    DURING,
    CAN_SUBMIT,
    SUBMITTED,
}