import IUI from "../../base/IUI";
import UIBase from "../../base/UIBase";
import { ITreeNode } from "./TreeNode";
/**树节点的显示对象 */
export default class TreeNodeView extends UIBase implements ITreeNode{
    private _data:any;
    init(): void {
        this.DOM = document.createElement("div");

    }
    onRelease(): void {
        throw new Error("Method not implemented.");
    }

    onSelect():void{
        console.log(this);
    }

    onCancelSelect():void{
        
    }

    set data(v:any){
        this._data = v;
        this.DOM.innerText = v.label;
    }

    get data(){
        return this._data
    }
    
}