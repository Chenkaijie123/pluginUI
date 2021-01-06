import IUI from "../../base/IUI";
import UIBase from "../../base/UIBase";
import Factory from "../Factory";
import TreeNode from "./TreeNode";

export default class Tree extends UIBase implements IUI{
    init(): void {
        this.DOM = document.createElement("div");
    }
    onRelease(): void {
        throw new Error("Method not implemented.");
    }

    set data(v:any[]){
        for(let i of v){
            let treeNode = Factory.get(TreeNode);
            treeNode.init();
            treeNode.data = i;
            this.addChild(treeNode);
        }
    }

}