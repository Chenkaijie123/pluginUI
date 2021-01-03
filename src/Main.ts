
import Factory from "./compoment/Factory";
import TreeNode from "./compoment/tree/TreeNode";

//test
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