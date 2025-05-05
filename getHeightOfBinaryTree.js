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


function getHeightIterative(tree) {
  if (tree == null) return 0;

  const queue = [{ tree, level: 1 }];
  let height = 0;

  while (queue.length > 0) {
    const { tree, level } = queue.shift();
    height = Math.max(height, level);
    if (tree.left) queue.push({ tree: tree.left, level: level + 1 });
    if (tree.right) queue.push({ tree: tree.right, level: level + 1 });
  }

  return height;
}

function getHeightRecursive(tree) {
  if (!tree) return 0;

  let leftHeight = getHeight(tree.left);
  let rightHeight = getHeight(tree.right);

  return Math.max(leftHeight, rightHeight) + 1;
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

console.log(getHeightIterative(a)) // 3
console.log(getHeightRecursive(a)) // 3
