import IUI from "../../base/IUI";
import UIBase from "../../base/UIBase";
import Factory from "../Factory";
import TreeNode, { ITreeNode } from "./TreeNode";
import TreeNodeView from "./TreeNodeView";

export default class Tree extends UIBase implements IUI{
    /**当前选中的节点 */
    selectView:TreeNode;
    constructor(public itemRender:new() => ITreeNode = TreeNodeView){
        super();
    }
    
    init(): void {
        this.DOM = document.createElement("div");
    }
    onRelease(): void {
        this.selectView = null;
    }

    set data(v:any[]){
        for(let i of v){
            let treeNode = Factory.get(TreeNode);
            treeNode.itemRender = this.itemRender || TreeNodeView;
            treeNode.init();
            treeNode.belong = this;
            treeNode.data = i;
            this.addChild(treeNode);
        }
    }

}