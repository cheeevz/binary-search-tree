import { BinarySearchTree } from "./bst.js"
function randomNumbersArray(length = 10) {
    return Array.from(Array(length), () => Math.floor(Math.random() * 100) + 1);
}

const bst = new BinarySearchTree(randomNumbersArray());

bst.isBalanced();
bst.preOrderForEach(bst.printNode.bind(bst));
bst.inOrderForEach(bst.printNode.bind(bst));
bst.postOrderForEach(bst.printNode.bind(bst));
bst.insertValue(156);
bst.insertValue(200);
bst.insertValue(988);
bst.insertValue(32781);
bst.isBalanced();
bst.rebalance();
bst.isBalanced();
bst.preOrderForEach(bst.printNode.bind(bst));
bst.inOrderForEach(bst.printNode.bind(bst));
bst.postOrderForEach(bst.printNode.bind(bst));