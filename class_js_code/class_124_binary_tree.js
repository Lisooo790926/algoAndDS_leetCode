class Node {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
}


// my trial for building the binary tree
class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        // create one const instead of too much memory (like newNode)
        const newNode = value !== null ? new Node(value) : null;
        if (!newNode) {
            return;
        } else if (!this.root) {
            this.root = newNode;
        } else {
            let currentNode = this.root;
            while (currentNode !== null) {
                if (value === currentNode.value) {
                    return "already exist";
                } else if (value > currentNode.value) {
                    currentNode.right === null ?
                        currentNode.right = newNode :
                        currentNode = currentNode.right;
                } else if (value < currentNode.value) {
                    currentNode.left === null ?
                        currentNode.left = newNode :
                        currentNode = currentNode.left;
                }
            }
        }
    }

    lookup(value, showLastNode) {
        let currentNode = this.root;
        let currentValue;
        let lastNode;

        while (currentNode !== null && currentNode !== undefined) {

            currentValue = currentNode.value;

            if (value === currentValue) {
                return showLastNode ? { "last": lastNode, "current": currentNode } : currentNode;
            }

            lastNode = currentNode;

            if (value > currentValue) {
                currentNode = currentNode.right;
            } else if (value < currentValue) {
                currentNode = currentNode.left;
            }
        }
        return false;
    }

    /**
     * search for the most left side for given right node
     * 
     * @param {*} rightNode for given node
     * @returns the most left side node in right node
     */
    lookupMostLeft(rightNode) {
        if (!rightNode) {
            return null;
        }

        let lastNode = rightNode;
        while (lastNode) {
            if(lastNode.left === null){
                return lastNode;
            } 
            lastNode = lastNode.left;
        }
    }

    // my trial, search for the closest one and replace it
    remove(value) {
        // initial condition
        let replacedNode = null;
        const searchNodes = this.lookup(value, true);

        if (searchNodes.current) {
            const deletedNode = searchNodes.current;

            // get the replacedNode
            if (deletedNode.right !== null && deletedNode.left !== null) {
                // if two children, keep searching rightChild's left
                // we only need to search the nearest element, no matter left side or right side
                replacedNode = this.lookupMostLeft(deletedNode.right);
                console.log(replacedNode)
                if (replacedNode && replacedNode !== deletedNode.right) {
                    replacedNode.right = deletedNode.right;
                }

                // if the replacedNode is not the same left, point to the left
                if (replacedNode) {
                    replacedNode.left = deletedNode.left;
                }
            } else if (deletedNode.right !== null || deletedNode.left !== null) {
                // if leaf child, then replace it
                let isRight = deletedNode.right !== null;
                replacedNode = isRight ? deletedNode.right : deletedNode.left;
            }

            // replace the replacedNode 
            if (replacedNode && searchNodes.last) {
                // change last node pointer
                value > searchNodes.last.value ? searchNodes.last.right = replacedNode : searchNodes.last.left = replacedNode;
            } else if (replacedNode && searchNodes.last === undefined && deletedNode === this.root) {
                // it's root node
                this.root = replacedNode;
            }
        }
        return replacedNode !== null;
    }

    // not quite good solution
    // class solution didn't reuse the lookup method 
    remove_class(value) {
        if(!this.root){
            return false;
        }

        let currentNode = this.root;
        let parentNode = null;
        while (currentNode) {
            if (value < currentNode.value) {
                parentNode = currentNode;
                currentNode = currentNode.left;
            } else if (value > currentNode) {
                parentNode = currentNode;
                currentNode = currentNode.right;
            } else if (value === currentNode.value) {
                // Option 1 : no right node
                if (currentNode.right === null) {
                    // identify is root node
                    if (parentNode === null) {
                        this.root = currentNode.left;
                    } else {

                        if (currentNode.value < parentNode.value) {
                            parentNode.left = currentNode.left;
                        } else if (currentNode.value > parentNode.value) {
                            parentNode.right = currentNode.left;
                        }
                    }
                } else if (currentNode.right.left === null) {
                    // .....
                } else {
                    // .....
                }
            }
        }
    }


    depthFirstSearch(){
        let currentNode = this.root;
        let result = []; // record result list
        let queue = []; // record parent node

        while(currentNode) {
            result.push(currentNode.value);

            if(currentNode.right){
                queue.push(currentNode.right);
            }
            if(currentNode.left) {
                queue.push(currentNode.left);
            }

            // get the final one 
            currentNode = queue.pop();
        }
        return result;
    }

    breadthFirstSearch(){
        let currentNode = this.root;
        let result = []; // record result list
        let queue = []; // record parent node

        while(currentNode) {
            result.push(currentNode.value);

            if(currentNode.left) {
                queue.push(currentNode.left);
            }

            if(currentNode.right){
                queue.push(currentNode.right);
            }

            // get the first one (queue popup)
            currentNode = queue.splice(0, 1)[0]
            
        }
        return result;
    }

}

const tree = new BinarySearchTree();
tree.insert(9)
tree.insert(4)
tree.insert(6)
tree.insert(20)
tree.insert(21);
tree.insert(null)
tree.insert(15);
tree.insert(1);

console.log(JSON.stringify(traverse(tree.root)))

console.log(tree.lookup(21))
console.log(tree.lookup(20))

//     9
//  4     20
// 1 6  15 170 
//       18 
//      1619
tree.insert(18);
tree.insert(16);
tree.insert(19);

console.log("BFS", tree.breadthFirstSearch())
console.log("DFS", tree.depthFirstSearch())

console.log(tree.remove(20));
console.log(JSON.stringify(traverse(tree.root)))

// recursive method to get whole tree for checking
function traverse(node) {
    const tree = { value: node.value };
    tree.left = node.left === null ? null : traverse(node.left)
    tree.right = node.right === null ? null : traverse(node.right)
    return tree;
}
