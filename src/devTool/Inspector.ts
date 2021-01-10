import Factory from "../compoment/Factory";
import Tree from "../compoment/tree/Tree";
import { treeData, treeNodeState } from "../compoment/tree/TreeNode";
/**显示列表 */
export default class Inspector{
    private tree:Tree;
    testData = [
        {
            label:"parent",
            state:2,
            T5ID:1,
            children:[
                {
                    label:"child",
                    state:2,
                    T5ID:2,
                    children:[
                        {label:"child",state:0,T5ID:4},
                        {label:"child",state:0,T5ID:6}
                    ]
                },
                {
                    label:"child",
                    state:2,
                    T5ID:3,
                    children:[
                        {label:"child",state:0,T5ID:5},
                        {label:"child",state:0,T5ID:7}
                    ]
                }
            ]
        }
    ]
    constructor(public container:HTMLElement){ this.init(); }

    init():void{
        this.tree = Factory.get(Tree);
        this.tree.init();
        this.tree.data = this.testData;
        this.container.appendChild(this.tree.DOM)
    }

    reflesh(data:any):void{
        this.tree.data = data;
    }

    /**选中某个节点，处理标志数据 */
    selectTo(id:number):void{
        this.tree.selectTo(id);
    }

    

}