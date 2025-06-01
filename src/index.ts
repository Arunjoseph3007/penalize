import fs from "fs";
import acorn from "acorn";

const content = fs.readFileSync("input.js").toString();

const sample = (start: number, end: number) => content.slice(start, end);

function exploreNode(
  node: acorn.AnyNode,
  ctx: string[],
  pos: number,
  depth: number
): [string[], boolean] {
  let lctx: string[] = [];

  const isHit = pos > node.start && pos < node.end;

  const prefix = new Array(depth).fill("|-").join("");

  const logger = (...stuff: any[]) =>
    console.log(prefix, ...stuff, ctx.concat(lctx).join(" && "));

  switch (node.type) {
    case "FunctionDeclaration": {
      logger("func");

      const funcIdentifier = node.id ? node.id.name : "Anonymous";

      lctx.push(funcIdentifier);

      node.body.body.forEach((stmt) => {
        const [mctx, status] = exploreNode(stmt, lctx, pos, depth + 1);

        lctx = lctx.concat(mctx);
      });

      return [[], isHit];
    }
    case "IfStatement": {
      logger("if");

      const testText = sample(node.test.start, node.test.end);
      lctx.push(sample(node.test.start, node.test.end));
      exploreNode(node.consequent, lctx, pos, depth + 1);
      lctx.pop();

      if (node.alternate) {
        lctx.push(`!(${testText})`);
        exploreNode(node.alternate, lctx, pos, depth + 1);
        lctx.pop();
      }
      break;
    }
    case "ReturnStatement": {
      logger("return");

      return [lctx, false];
      break;
    }
    case "BlockStatement": {
      logger("block");

      node.body.forEach((stmt) => exploreNode(stmt, lctx, pos, depth + 1));
      break;
    }
    case "ThrowStatement": {
      logger("throw");

      return [lctx, false];
      break;
    }
    default: {
      logger("unknown", node.type);

      break;
    }
  }
  return [[], false];
}

export function getContext(content: string, pos: number): string[] | null {
  const ast = acorn.parse(content, { ecmaVersion: "latest" });
  const len = ast.end;
  console.log("len", len);

  let ctx: string[] = [];

  ast.body.forEach((node) => {
    const [mctx, hit] = exploreNode(node, [], pos, 0);
    if (hit) {
      return ctx;
    } else {
      ctx = ctx.concat(mctx);
    }
  });

  return null;
}

const ctx = getContext(content, content.indexOf("more"));

console.log(ctx);
