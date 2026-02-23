class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class BinarySearchTree {
    constructor(array) {
        const sortedArray = [...new Set(array)].sort((a, b) => a - b);
        this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
        prettyPrint(this.root);
    }

    buildTree(array, start, end) {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        const newNode = new Node(array[mid]);
        newNode.left = this.buildTree(array, start, mid - 1);
        newNode.right = this.buildTree(array, mid + 1, end);
        return newNode;
    }

    insertValue(value) {
        this.root = this.#insertValueRecursive(this.root, value);
        prettyPrint(this.root);
    }

    #insertValueRecursive(node, value) {
        if (node === null) return new Node(value);

        if (value === node.data) return node;

        if (value < node.data) {
            node.left = this.#insertValueRecursive(node.left, value);
        } else {
            node.right = this.#insertValueRecursive(node.right, value);
        }
        return node;
    }

    getSuccessor(curr) {
        curr = curr.right;
        while (curr !== null && curr.left !== null)
            curr = curr.left;
        return curr;
    }
    delNode(value) {
        this.root = this.#delNodeRecursive(this.root, value);
        prettyPrint(this.root);
    }

    #delNodeRecursive(root, x) {
        if (root === null)
            return root;

        if (root.data > x)
            root.left = this.#delNodeRecursive(root.left, x);
        else if (root.data < x)
            root.right = this.#delNodeRecursive(root.right, x);
        else {
            if (root.left === null)
                return root.right;
            if (root.right === null)
                return root.left;
            const succ = this.getSuccessor(root);
            root.data = succ.data;
            root.right = this.#delNodeRecursive(root.right, succ.data);
        }
        return root;
    }

    levelOrderForEach(callback) {
        if (callback == null) throw new Error("No callback provided");
        if (this.root === null) return;
        const queue = [this.root];
        while (queue.length > 0) {
            const node = queue.shift();
            callback(node);
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
        prettyPrint(this.root);
    }

    addOne(node) {
        node.data += 1;
    }

    preOrderForEach(callback) {
        if (callback == null) throw new Error("No callback provided");
        if (this.root === null) return;
        console.log("Pre-order traversal:");
        this.#preOrderForEachRecursive(this.root, callback);
    }

    #preOrderForEachRecursive(node, callback) {
        if (node === null) return;
        callback(node);
        this.#preOrderForEachRecursive(node.left, callback);
        this.#preOrderForEachRecursive(node.right, callback);
    }

    inOrderForEach(callback) {
        if (callback == null) throw new Error("No callback provided");
        if (this.root === null) return;
        console.log("In-order traversal:");
        this.#inOrderForEachRecursive(this.root, callback);
    }

    #inOrderForEachRecursive(node, callback) {
        if (node === null) return;
        this.#inOrderForEachRecursive(node.left, callback);
        callback(node);
        this.#inOrderForEachRecursive(node.right, callback);
    }

    postOrderForEach(callback) {
        if (callback == null) throw new Error("No callback provided");
        if (this.root === null) return;
        console.log("Post-order traversal:");
        this.#postOrderForEachRecursive(this.root, callback);
    }

    #postOrderForEachRecursive(node, callback) {
        if (node === null) return;
        this.#postOrderForEachRecursive(node.left, callback);
        this.#postOrderForEachRecursive(node.right, callback);
        callback(node);
    }

    height(value) {
        const node = this.#findNode(this.root, value);
        if (node === null) return undefined;
        return this.#heightRecursive(node);
    }

    #heightRecursive(node) {
        if (node === null) return -1;
        const leftHeight = this.#heightRecursive(node.left);
        const rightHeight = this.#heightRecursive(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(value) {
        const node = this.#findNode(this.root, value);
        if (node === null) return undefined;
        return this.#depthRecursive(this.root, value, 0);
    }

    #depthRecursive(node, value, depth) {
        if (node === null) return -1;
        if (node.data === value) return depth;
        const leftDepth = this.#depthRecursive(node.left, value, depth + 1);
        if (leftDepth !== -1) return leftDepth;
        return this.#depthRecursive(node.right, value, depth + 1);
    }

    #findNode(node, value) {
        if (node === null) return null;
        if (node.data === value) return node;
        if (value < node.data) return this.#findNode(node.left, value);
        return this.#findNode(node.right, value);
    }

    isBalanced() {
        if (this.#isBalancedRecursive(this.root) !== -1) {
            console.log("The tree is balanced.");
            return true;
        } else {
            console.log("The tree is not balanced.");
            return false;
        }
    }

    #isBalancedRecursive(node) {
        if (node === null) return 0;
        const leftHeight = this.#isBalancedRecursive(node.left);
        if (leftHeight === -1) return -1;
        const rightHeight = this.#isBalancedRecursive(node.right);
        if (rightHeight === -1) return -1;
        if (Math.abs(leftHeight - rightHeight) > 1) return -1;
        return Math.max(leftHeight, rightHeight) + 1;
    }

    rebalance() {
        const values = [];
        this.inOrderForEach(node => values.push(node.data));
        this.root = this.buildTree(values, 0, values.length - 1);
        prettyPrint(this.root);
    }

    printNode(node) {
        console.log(node.data);
    }
}

function prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}
