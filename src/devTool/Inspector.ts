import Factory from "../compoment/Factory";
import Tree from "../compoment/tree/Tree";
/**显示列表 */
export default class Inspector{
    private tree:Tree;
    testData = [
        {
            label:"parent",
            state:2,
            children:[
                {
                    label:"child1",
                    state:2,
                    children:[
                        {label:"child2",state:0},
                        {label:"child3",state:0}
                    ]
                },
                {
                    label:"child1",
                    state:2,
                    children:[
                        {label:"child2",state:0},
                        {label:"child3",state:0}
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
}