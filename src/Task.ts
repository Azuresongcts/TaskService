class Task{
    id:string;
    name:string;
    desc:string;
    status:TaskStatus;
    fromNpcId:string;
    toNpcId:string;
}
enum TaskStatus{
    UNACCEPTABLE,
    ACCEPTABLE,
    DURING,
    CAN_SUBMIT,
    SUBMITTED
}