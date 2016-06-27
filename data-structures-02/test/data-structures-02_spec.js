var chai = require('chai');
var expect = require('chai').expect;
var assert = require('chai').assert;
chai.should();
var Node = require("../data-structures-02").Node;
var BinarySearchTree = require("../data-structures-02").BinarySearchTree;

describe("Node", function () {

  var node = new Node(5);

  it("has a numeric value", function () {
    expect(node.value).to.equal(5);
  });

  it("initializes with a public 'leftChild' property equal to null", function () {
    expect(node.leftChild).to.equal(null);
  });

  it("initializes with a public 'rightChild' property equal to null", function () {
    expect(node.leftChild).to.equal(null);
  });

});

describe("BinarySearchTree", function () {

  var binarySearchTree = new BinarySearchTree();

  it("initializes with public 'root' property equal to null", function () {
    expect(binarySearchTree.root).to.equal(null);
  });

  it("initializes with public 'size' property equal to null", function () {
    expect(binarySearchTree.size).to.equal(0);
  });

});

describe("BinarySearchTree insert function", function() {
  var binarySearchTree;

  beforeEach(function() {
    binarySearchTree = new BinarySearchTree();
    binarySearchTree.insert(5);
  });

  it("creates a root node with value equal to the first inserted value", function () {
    expect(binarySearchTree.root.value).to.equal(5);
  });

  it("has a size equal to the amount of inserted values", function () {
    binarySearchTree.insert(3);
    expect(binarySearchTree.size).to.equal(2);
  });

  it("returns an error for non-unique values", function () {
    binarySearchTree.insert(3);
    expect(binarySearchTree.insert(3)).to.throw(new Error(String));
  });

  it("if inserted value is larger than current node, make or descend to rightChild", function () {
    binarySearchTree.insert(3);
    binarySearchTree.insert(10);
    binarySearchTree.insert(7);
    expect(binarySearchTree.root.rightChild.value).to.equal(10);
    expect(binarySearchTree.size).to.equal(4);
  });

  it("if inserted value is smaller than current node, make or descend to leftChild", function () {
    binarySearchTree.insert(3);
    binarySearchTree.insert(10);
    binarySearchTree.insert(7);
    binarySearchTree.insert(1);
    expect(binarySearchTree.root.leftChild.leftChild.value).to.equal(1);
    expect(binarySearchTree.root.rightChild.leftChild.value).to.equal(7);
    expect(binarySearchTree.size).to.equal(5);
  });

});

describe("BinarySearchTree search function", function() {
  var binarySearchTree;

  beforeEach(function() {
    binarySearchTree = new BinarySearchTree();
    binarySearchTree.insert(5);
    binarySearchTree.insert(3);
    binarySearchTree.insert(10);
    binarySearchTree.insert(7);
    binarySearchTree.insert(1);
  });

  it("returns a boolean", function () {
    assert.isBoolean(binarySearchTree.search(7));
  });

  it("returns true if 'target' is equal to the value of an existing node", function () {
    expect(binarySearchTree.search(7)).to.equal(true);
  });

  it("returns false if 'target' is not equal to the value of an existing node", function () {
    expect(binarySearchTree.search(8)).to.equal(false);
  });
});

describe("BinarySearchTree delete function", function() {
  var binarySearchTree;

  beforeEach(function() {
    binarySearchTree = new BinarySearchTree();
    binarySearchTree.insert(5);
    binarySearchTree.insert(3);
    binarySearchTree.insert(10);
    binarySearchTree.insert(7);
    binarySearchTree.insert(1);
  });

  it("logs an error if the 'deleteValue' does not match any nodes", function () {
    expect(binarySearchTree.delete(8)).to.throw(new Error(String));
  });

  it("recreates binary search tree after deletion", function () {
    binarySearchTree.delete(7);
    expect(binarySearchTree.root.value).to.equal(5);
    expect(binarySearchTree.size).to.equal(4);
    expect(binarySearchTree.search(7)).to.equal(false);
    expect(binarySearchTree.search(1)).to.equal(true);
  });
});