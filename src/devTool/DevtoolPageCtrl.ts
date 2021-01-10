import { command } from "../base/Command";
import { StringUtil, string_type } from "../utils/StringUtil";
import Inspector from "./Inspector";

export default class DevtoolPageCtrl {
    private _widthProportion: [number, number, number] = [1, 1, 1];//宽占比
    private container: HTMLDivElement
    private left: HTMLDivElement
    private middle: HTMLDivElement
    private right: HTMLDivElement
    private timer:NodeJS.Timeout = null;
    private onLoadHandle = this.init.bind(this);
    private onResizeHandle = this.onResize.bind(this);
    initComplete: boolean = false;
    inspector:Inspector;
    constructor() {
        window.addEventListener("load",this.onLoadHandle);
        window.addEventListener("resize",this.onResizeHandle);
        document.body.addEventListener("keydown",(e:KeyboardEvent) =>{
            let id = 0
            switch(e.key){
               case "a":
                    id = 1;
                   break
                   case "s":
                    id = 2;
                   break
                   case "d":
                    id = 3;
                   break
                   case "f":
                    id = 4;
                   break
                   case "g":
                    id = 5;
                   break
            }
            this.runCommand(command.SM_SELECT_INSPECTOR,id)
        })
    }

    private onResize():void{
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.viewReflesh();
            this.timer = null;
        }, 200);
    }

    destory():void{
        window.removeEventListener("load",this.onLoadHandle);
        window.removeEventListener("resize",this.onResizeHandle);
    }

    init() {
        let container: HTMLDivElement = document.getElementsByClassName("container")[0] as HTMLDivElement;
        container.style.width = window.innerWidth + "px";
        container.style.height = window.innerHeight + "px";
        this.container = container;
        this.left = document.getElementsByClassName("left")[0] as HTMLDivElement;
        this.middle = document.getElementsByClassName("middle")[0] as HTMLDivElement;
        this.right = document.getElementsByClassName("right")[0] as HTMLDivElement;
        this.inspector = new Inspector(this.left);
        this.initComplete = true;
        this.viewReflesh();
    }

    get widthProportion() { return this._widthProportion; }

    set widthProportion(v: [number, number, number]) {
        this._widthProportion = v;
        this.viewReflesh()
    }

    viewReflesh(): void {
        if (!this.initComplete) return;
        let width = window.innerWidth;
        this.container.style.width = width + "px";
        this.container.style.height = window.innerHeight + "px";
        let [a, b, c] = this._widthProportion;
        let aWid = width * a / (a + b + c) >> 0;
        let bWid = width * b / (a + b + c) >> 0;
        let cWid = width - aWid - bWid;
        this.left.style.right = bWid + cWid + "px";
        this.middle.style.left = aWid + "px";
        this.middle.style.right = cWid + "px";
        this.right.style.left = aWid + bWid + "px";
    }

    /**通信接口 */
    runCommand(cmd:command,data:any):void{
        switch(cmd){
            case command.SM_REFLESH_INSPCTOR:
                this.inspector.reflesh(data);
                break;
            case command.SM_SELECT_INSPECTOR:
                this.inspector.selectTo(data as number);
                break;
        }
    }

    
}