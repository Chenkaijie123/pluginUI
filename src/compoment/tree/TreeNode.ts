import IUI from "../../base/IUI";
import UIBase from "../../base/UIBase";
import Factory from "../Factory";

export default class TreeNode extends UIBase implements IUI{
    private headSpan:HTMLSpanElement = document.createElement("span");
    private textSpan:HTMLSpanElement = document.createElement("span");
    private _data:treeNodeData
    public state:treeNodeState = treeNodeState.none;
    private container:HTMLDivElement;
    private aches:UIBase[] = [];
    constructor(){
        super();
    }

    onRelease(): void {
        this._data = null;
    }
    
    init(): void {
        this.DOM = document.createElement("div");
        this.DOM.style.paddingLeft = "20px"
        this.container = document.createElement("div");
        this.container.appendChild(this.headSpan);
        this.container.appendChild(this.textSpan);
        this.DOM.appendChild(this.container);
        this.register((()=>{
            const fn = (e)=>{
                if(this.state == treeNodeState.none) return;
                else if(this.state == treeNodeState.open){
                    this._data.state = treeNodeState.close;
                }else{
                    this._data.state = treeNodeState.open;
                }
                this.data = this._data;
            }
            this.container.addEventListener("click",fn)
            return {despose:()=>{
                this.container.removeEventListener("click",fn)
            }}
        })())
    }

    set data(v:treeNodeData){
        this._data = v;
        this.textSpan.innerText = v.label;
        if(v.state == treeNodeState.open && v.children){
            if(this.state != treeNodeState.open){
                for(let i of v.children){
                    let child:TreeNode = this.aches.shift() as TreeNode;
                    if(!child){
                        child = Factory.get(TreeNode)
                        child.init();
                    }
                    child.data = i;
                    this.addChild(child);
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
}

export enum treeNodeState{
    none,open,close
}

type treeNodeData = {
    label:string,
    state:number,
    children?:treeNodeData[]
}