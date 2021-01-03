import IDespose from "./IDespose";

export default class Dispatch implements IDespose {
    private _evtMap: Map<symbol, ((e?: any) => any)[]> = new Map;
    on(key: symbol, fn: (e?: any) => any): void {
        let map = this._evtMap.get(key);
        if (!map) {
            this._evtMap.set(key, map = []);
        }
        if(map.indexOf(fn) == -1){
            map.push(fn);
        }
    }

    off(key: symbol, fn: (e?: any) => any): void {
        let map = this._evtMap.get(key);
        if (map) {
            let idx = map.indexOf(fn);
            if(idx >= 0){
                map.splice(idx,1);
                if(map.length <= 0) this._evtMap.delete(key);
            }
        }

    }

    dispatch(key:symbol,data?:any):void{
        let map = this._evtMap.get(key);
        if(!map) return;
        for(let i of map){
            i(data);
        }
    }

    despose(): boolean {
        this._evtMap.clear();
        return true;
    }
}