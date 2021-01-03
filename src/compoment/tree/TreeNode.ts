import IUI from "../../base/IUI";
import UIBase from "../../base/UIBase";

export default class TreeNode extends UIBase implements IUI{
    private headSpan:HTMLSpanElement = document.createElement("span");
    private textSpan:HTMLSpanElement = document.createElement("span");
    private _data:{type:any,label:string}
    constructor(){
        super();
    }

    onRelease(): void {
        
    }
    
    init(): void {
        this.DOM = document.createElement("div");
        this.DOM.appendChild(this.headSpan);
        this.DOM.appendChild(this.textSpan);
    }

    set data(v:{type:any,label:string}){
        this._data = v;
        this.textSpan.innerText = v.label;
    }
}