/**
 * 
 *            a
 *          /   \
 *         b     c
 *        /       \
 *       d         e
 * 
 * 
 */

function traverseLevelOrder(tree) {
  if (tree == null) return [];

  const queue = [{tree, level: 0}];
  const visited = [];

  while (queue.length > 0) {
    const {tree, level} = queue.shift();
    visited[level] = visited[level] != undefined ? [...visited[level], tree.value] : [tree.value]
    if (tree.left) queue.push({tree: tree.left, level: level + 1});
    if (tree.right) queue.push({tree: tree.right, level: level + 1});
  }

  return visited;

}

class Tree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const a = new Tree("a");
const b = new Tree("b");
const c = new Tree("c");
const d = new Tree("d");
const e = new Tree("e");

a.left = b;
a.right = c;
b.left = d;
c.right = e;

console.log(traverseLevelOrder(a))
// expected output: 