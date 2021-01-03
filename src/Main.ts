
import Factory from "./compoment/Factory";
import TreeNode from "./compoment/tree/TreeNode";

//try again
class Main{
    constructor(){
        let t = Factory.get(TreeNode)
        console.log(t)
        t.release()
        new TreeNode
        t = Factory.get(TreeNode)
        console.log(t)
    }
}



new Main;