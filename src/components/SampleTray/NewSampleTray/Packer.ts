// export interface Block {
//   [x: string]: any;
//   w: number;
//   h: number;
//   fit?: PackNode;
//   // id: string;
// }

import SampleData from "@classes/SampleData";

export interface PackNode {
  x: number;
  y: number;
  w: number;
  h: number;
  // id: string;
  used?: boolean;
  down?: PackNode;
  right?: PackNode;
}

export interface Piece {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Fit {
  x: number;
  y: number;
}

export class Packer {
  readonly w: number;
  readonly h: number;
  readonly root: PackNode;
  readonly gutter: number;

  constructor(w: number, h: number, gutter?: number) {
    const margin = 40;
    this.w = w;
    this.h = h;
    this.gutter = gutter ?? 5;
    this.root = { x: margin, y: 0, w: w, h: h, used: false };
  }
  fit(blocks: SampleData[]): void {
    let n, node, block;
    for (n = 0; n < blocks.length; n++) {
      block = blocks[n];
      // block.w += this.gutter;
      // block.h += this.gutter;
      if ((node = this.findNode(this.root, block.w, block.h))) {
        const fit = this.splitNode(node, block.w, block.h, block.id);
        block.fit = this.splitNode(node, block.w, block.h, block.id);
        // console.log(fit);
      }

      // console.log(this.splitNode(node, block.w, block.h, block.id));
    }
  }
  findNode(root: PackNode, w: number, h: number): PackNode | null {
    if (root.used && root.right && root.down)
      return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
    else if (w <= root.w && h <= root.h) return root;
    else return null;
  }
  splitNode(node: PackNode, w: number, h: number, id: string): PackNode {
    node.used = true;
    node.down = {
      x: node.x,
      y: node.y + h,
      w: node.w,
      h: node.h - h,
    };
    node.right = {
      x: node.x + w,
      y: node.y,
      w: node.w - w,
      h: h,
    };
    return node;
  }
}

export default Packer;
