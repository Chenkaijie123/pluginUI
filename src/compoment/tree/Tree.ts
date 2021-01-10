import { node } from "webpack";
import IUI from "../../base/IUI";
import UIBase from "../../base/UIBase";
import Factory from "../Factory";
import TreeNode, { ITreeNode, treeData, treeNodeState } from "./TreeNode";
import TreeNodeView from "./TreeNodeView";

export default class Tree extends UIBase implements IUI {
    /**当前选中的节点 */
    selectView: TreeNode;
    private _data: treeData[]
    constructor(public itemRender: new () => ITreeNode = TreeNodeView) {
        super();
    }

    init(): void {
        this.DOM = document.createElement("div");
    }
    onRelease(): void {
        this.selectView = null;
        this._data = null;
    }

    set data(v: treeData[]) {
        this._data = v;
        this.reflesh();
    }

    get data() { return this._data; }

    reflesh(): void {
        if (!this._data) return;
        let idx:number = 0;
        for (let i of this._data) {
            let treeNode:TreeNode;
            treeNode = this.children[idx++] as TreeNode;
            if(!treeNode){
                treeNode = Factory.get(TreeNode);
                treeNode.itemRender = this.itemRender || TreeNodeView;
                treeNode.init();
                treeNode.belong = this;
            }
            treeNode.data = i;
            this.addChild(treeNode);
        }
    }

    /**
     * 关闭树某一节点，如果不传值，则关闭根节点
     * @param id 
     */
    closeTree(id?:number):void{
        this._closeTree(id);
        this.reflesh();
    }

    /**
     * 打开根节点到该id的所有节点
     * @param id 
     */
    openTree(id:number):void{
        this._openTree(id);
        this.reflesh();
    }

    private _openTree(id:number,nodes?:treeData[],target?:treeData[]):void{
        nodes = nodes || [];
        target = target || this.data
        for(let d of target){
            if(d.T5ID == id){
                nodes.forEach(e => {
                    e.state = treeNodeState.open;
                });
                break;
            }else {
                if(d.children && d.children.length){
                    nodes.push(d);
                    this._openTree(id,nodes,d.children)
                }
            }
            nodes.pop()
        }
    }

    private _closeTree(id?:number,target?:treeData[]){
        if(id == void 0){
            for(let i of this.data){
                if(i.state != treeNodeState.none){
                    i.state = treeNodeState.close;
                }
            }
        }else{
            target = target || this.data
            for(let i of target){
                if(i.T5ID == id){
                    if(i.state != treeNodeState.none){
                        i.state = treeNodeState.close
                    }
                    break;
                }
            }
        }
    }

    

}

