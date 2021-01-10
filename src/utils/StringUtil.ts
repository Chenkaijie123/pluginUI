export class StringUtil{
    static toNumber(str:string,type?:string_type):number{
        if(type == void 0){
            if(str.indexOf("px") != -1) type = string_type.px;
            else type = string_type.normal
        }
        switch(type){
            case string_type.px:
                return parseInt(str.substr(0,str.length - 2));
            case string_type.normal:
                return parseInt(str);
        }
    }
}

export enum string_type{
    px,
    normal,
}