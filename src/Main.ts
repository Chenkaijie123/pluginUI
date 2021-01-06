
import Factory from "./compoment/Factory";
import Tree from "./compoment/tree/Tree";
import TreeNode from "./compoment/tree/TreeNode";

//try again
class Main{
    constructor(){
        let tree = new Tree;
        tree.init()
        let data = [
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
        tree.data = data;
        document.body.appendChild(tree.DOM)
    }
}



new Main;