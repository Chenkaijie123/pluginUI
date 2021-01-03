
import UIBase from "../base/UIBase";

export default class Factory{
    private static readonly empty:any[] = []
    private static _pool:Map<any,UIBase[]> = new Map;


    static push(type:any,item:UIBase):void{
        let map = Factory._pool.get(type);
        if(!map){
            Factory._pool.set(type,map = []);
        }
        map.push(item);
    }

    static get<T>(type:new()=>T):T{
        let map = Factory._pool.get(type) || Factory.empty;
        return map.pop() || new (type as any);
    }
}