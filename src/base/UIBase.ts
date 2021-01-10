import Factory from "../compoment/Factory";
import Dispatch from "./Dispatch";
import IDespose from "./IDespose";
let hashCode = 0;
export default class UIBase extends Dispatch implements IDespose {
    hashCode: number;
    parent: UIBase;
    children: UIBase[] = [];
    DOM: HTMLElement;
    private registerMap: IDespose[] = [];
    constructor() {
        super();
        this.hashCode = ++hashCode;
    }
    addChild(child: UIBase): void {
        this.DOM.appendChild(child.DOM);
        this.children.push(child);
        child.parent = this;
    }

    removeChild(child: UIBase): void {
        let idx = this.children.indexOf(child)
        if (idx >= 0) {
            this.DOM.removeChild(child.DOM);
            this.children.splice(idx, 1);
            child.parent = null;
        } else {
            console.warn(`父节点${this.hashCode}上未找到要移除的节点${child.hashCode}`);
        }
    }

    register(item: IDespose): void {
        this.registerMap.push(item);
    }

    release(): void {
        if (this.parent) {
            this.parent.removeChild(this);
            this.parent = null;
        }

        while(this.children.length) {
            this.children[0].release();
        }
        this.children.length = 0;

        for (let i of this.registerMap) {
            i.despose();
        }
        this.registerMap.length = 0;
        this.DOM = null;
        Factory.push(this.constructor, this);
        this["onRelease"] && this["onRelease"]();
    }

    addDOMEvt<K extends keyof HTMLElementEventMap>(type: K, fn: (e?: Event) => any): void {
        this.DOM.addEventListener(type, fn);
        this.register({
            despose: () => {
                this.DOM.removeEventListener(type, fn);
                return true;
            }
        })
    }

    despose(): boolean {
        super.despose();
        this.release();
        return true;
    }

    reflesh(): void {
        for (let i of this.children) {
            i.reflesh();
        }
    }



}