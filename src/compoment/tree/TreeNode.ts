import IUI from "../../base/IUI";
import UIBase from "../../base/UIBase";
import Factory from "../Factory";
import Tree from "./Tree";
import TreeNodeView from "./TreeNodeView";

export default class TreeNode extends UIBase implements IUI{
    private _data:treeData;
    private aches:UIBase[] = [];
    state:treeNodeState = treeNodeState.none;
    /**保存的所属树 */
    belong:Tree;
    /**显示对象实例 */
    renderView:ITreeNode;
    /**每级树节点间隔的距离 */
    paddingLeft:number = 15;
    constructor(public itemRender :new()=>ITreeNode = TreeNodeView){
        super();
    }

    onRelease(): void {
        this._data = null;
        this.renderView.release();
        this.itemRender = null;
        this.belong = null;
        while(this.children.length){
            this.children[0].release();
        }
        while(this.aches.length){
            this.aches.pop().release();
        }
    }
    
    init(): void {
        this.renderView = new this.itemRender;
        this.renderView.init();
        this.renderView.addDOMEvt("click",(e) => {
            this.changeState();
            if(this.belong.selectView == this) return;
            if(this.belong.selectView){
                this.belong.selectView.renderView.DOM.classList.remove("pv_tree_select");
                this.belong.selectView.renderView.onCancelSelect();
            }
            this.belong.selectView = this;
            this.renderView.DOM.classList.add("pv_tree_select");
            this.renderView.onSelect()
        })
        this.DOM = document.createElement("div");
        this.DOM.style.paddingLeft = this.paddingLeft + "px";
        this.DOM.appendChild(this.renderView.DOM);
    }

    set data(v:treeData){
        this._data = v;
        this.renderView.data = v;
        if(v.state == treeNodeState.open && v.children){
            let child:TreeNode;
            if(this.state != treeNodeState.open){
                for(let i of v.children){
                    child = this.aches.shift() as TreeNode;
                    if(!child){
                        child = Factory.get(TreeNode);
                        child.itemRender = this.itemRender;
                        child.init();
                    }
                    child.belong = this.belong;
                    child.data = i;
                    this.addChild(child);
                }
            }else{
                let idx = 0;
                for(let i of v.children){
                    child = this.children[idx++] as TreeNode;
                    child.data = i;
                }
            }
        }else{
            while(this.children.length){
                let node = this.children[0];
                this.removeChild(node);
                this.aches.push(node);
            }
        }
        this.state = v.state;
    }

    get data(){
        return this._data;
    }

    changeState():void{
        if(this.state == treeNodeState.none) return;
        else if(this.state == treeNodeState.open) this.data.state = treeNodeState.close;
        else this.data.state = treeNodeState.open;
        this.data = this._data;
    }
}

/***树节点 */
export interface ITreeNode extends UIBase,IUI{
    data:any;
    onSelect():void;
    onCancelSelect():void;
}

export enum treeNodeState{
    none,open,close
}



export type treeData = {
    children?:treeData[],
    label:string,
    state:treeNodeState,
    T5ID?:number
}