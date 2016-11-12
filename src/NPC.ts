var emojiimage = [
    {image:"walk01_png"},
    {image:"walk02_png"},
    {image:"walk03_png"}
];
var emoji:egret.Bitmap;
class NPC {
    npcId: String;   
    onChange(task) {
        emoji.texture= RES.getRes(emojiimage[0].image);
    }
    onNPCClick( evt:egret.TouchEvent){
        
    }

}