exports.Node = Node;

/*****
*   Node(value)
*
*   @param value                    a numeric value
*
*   @public property: leftChild     initialized as null
*
*   @public property: rightChild     initialized as null
*
*****/


function Node(value) {
  this.value = value;
  this.leftChild = null;
  this.rightChild = null;
}

exports.BinarySearchTree = BinarySearchTree;

/*****
*   BinarySearchTree()
*
*   @public property: root           initialized as null
*
*   @public property: size           initialized as zero
*
*   @public method: insert(value)    value is a number
*
*       (1) if there is no root, inserted value becomes root.
*       (2) in all cases, inserted value increases tree size.
*       (3) inserted values must be unique.
*       (4) if inserted value is greater than current node, insert or descend to right child.
*       (5) if inserted value is less than current node, insert or descend to left child.
*
*
*   @public method: search(target)    target is the queried node's value
*
*       (1) returns a boolean.
*       (2) returns true if 'target' is equal to the value of an existing node.
*       (3) returns false if 'target' is not equal to the value of an existing node.
*
*
*   @public method: delete(deleteValue)   deleteValue is value of node to be deleted
*
*       (1) logs an error if the 'deleteValue' does not match any nodes.
        (2) recreates binary search tree after deletion
*****/

function BinarySearchTree() {
  this.root = null;
  this.size = 0;
}

BinarySearchTree.prototype.insert = function(value) {
  // 1) when root node is already instantiated
  if (this.root === null) {
    // tree is empty
    this.root = new Node(value);
    this.size++;
  } else {
  // 2) nodes are already inserted
    var findAndInsert = function (currentNode) {
      if (value === currentNode.value) {
        throw new Error('must be a unique value');
      }
      // base case
      if (value > currentNode.value) {
        // belongs in rightChild
        if (currentNode.rightChild === null) {
          currentNode.rightChild = new Node(value);
        } else {
          findAndInsert(currentNode.rightChild);
        }
      } else if (value < currentNode.value) {
        // belongs in leftChild
        if (currentNode.leftChild === null) {
          currentNode.leftChild = new Node(value);
        } else {
          findAndInsert(currentNode.leftChild);
        }
      }
    };
    findAndInsert(this.root);
    this.size++;
  }
};

BinarySearchTree.prototype.search = function(target) {
  var check = false;

  var traverse = function(currentNode) {
    // base case
    if (currentNode === null) {
      return;
    } else if (currentNode.value === target) {
      check = true;
      return;
    }

    if (target > currentNode.value) {
      traverse(currentNode.rightChild);
    } else if (target < currentNode.value) { // just being explicit, bro
      traverse(currentNode.leftChild);
    }
  };

  traverse(this.root);

  return check;
};

BinarySearchTree.prototype.delete = function(deleteValue) {
  var temp = [];

  var roundUp = function(currentNode) {
    // find all the nodes and place them in temp array, except node-to-be-deleted
    if (currentNode === null) {
      return;
    }
    if (currentNode.value !== deleteValue) {
      temp.push(currentNode.value);
    }
    roundUp(currentNode.rightChild);
    roundUp(currentNode.leftChild);
  };

  roundUp(this.root);

  // error handling
  if (temp.length === this.size) {
    console.log('deleteValue does not exist inside of our tree');
    return;
  }

  this.root = null;
  this.size = 0;

  // recreate BST
  for (var i = 0; i < temp.length; i++) {
    toInsert = temp[i];
    this.insert(toInsert);
  }
  console.log("the deleteValue has been removed");
  return;
};