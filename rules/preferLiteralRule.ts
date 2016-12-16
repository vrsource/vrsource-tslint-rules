/*  KEEP IN SYNC with README.md

## prefer-literal

Prefer use of literals instead of calling new on Object, Array, and Function.

Flags locations where code calls "new Object()", "new Array()", "new Function()""

```javascript
"prefer-literal": [
    true,
    "object",
    "function",
    "array"
]
```
*/

import * as Lint from "tslint";
import * as ts from "typescript";

const OBJECT_OPTION   = "object";
const FUNCTION_OPTION = "function";
const ARRAY_OPTION    = "array";

const OBJECT_FAIL   = "Prefer literal object creation";
const FUNCTION_FAIL = "Prefer literal function creation";
const ARRAY_FAIL    = "Prefer literal array creation";

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new PreferLiteralWalker(sourceFile, this.getOptions()));
    }
}

class PreferLiteralWalker extends Lint.RuleWalker {
    public checkObject   = false;
    public checkFunction = false;
    public checkArray    = false;

    constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
        super(sourceFile, options);

        this.checkObject = contains(options.ruleArguments,   OBJECT_OPTION);
        this.checkFunction = contains(options.ruleArguments, FUNCTION_OPTION);
        this.checkArray = contains(options.ruleArguments,    ARRAY_OPTION);
    }

    protected visitNewExpression(node: ts.NewExpression): void {
        let functionName = getFunctionName(node);

        if (this.checkObject && functionName === "Object") {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), OBJECT_FAIL));
        }
        if (this.checkFunction && functionName === "Function") {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FUNCTION_FAIL));
        }
        if (this.checkArray && functionName === "Array") {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), ARRAY_FAIL));
        }
        super.visitNewExpression(node);
    }
}

function getFunctionName(node: ts.NewExpression): string {
   let expression: ts.Expression = node.expression;
   let functionName: string      = (<any>expression).text;
   if (functionName === undefined && (<any>expression).name) {
      functionName = (<any>expression).name.text;
   }
   return functionName;
}

function contains(arr: any[], value: any): boolean {
   return arr.indexOf(value) !== -1;
}
