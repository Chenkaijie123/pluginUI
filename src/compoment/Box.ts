import IUI from "../base/IUI";
import UIBase from "../base/UIBase";

export default class Box extends UIBase implements IUI{
    init(): void {
        this.DOM = document.createElement("div")
    }
    onRelease(): void {
        
    }

}