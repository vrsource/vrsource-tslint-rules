/*  KEEP IN SYNC with README.md

## multiline-arrow

Rule to enforce various checks arrow functions that span multiple lines.

```javascript
"multiline-arrow": [
    true,
    "require-parens",
    "require-block"
]
```
*/

import * as Lint from "tslint";
import * as ts from "typescript";

const PAREN_FAIL = "Multi-line arrow function must have parentheses around parameters.";
const BLOCK_FAIL = "Multi-line arrow function must have block around body.";

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new MultilineArrowRuleWalker(sourceFile, this.getOptions()));
    }
}


class MultilineArrowRuleWalker extends Lint.RuleWalker {
    public requireParens = false;
    public requireBlock  = false;

    constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
        super(sourceFile, options);

        this.requireParens = contains(options.ruleArguments, "require-parens");
        this.requireBlock  = contains(options.ruleArguments,  "require-block");
    }

    protected visitArrowFunction(node: ts.ArrowFunction) {
        const text = node.getText();
        const body = node.body;

        const isMultiline = text.indexOf("\n") !== -1;

        if (isMultiline) {
            if (this.requireParens) {
                // Use simple stupid check that arrow function starts with "("
                if (text.charAt(0) !== "(") {
                    const params = node.parameters;
                    const first_param = params[0];
                    const last_param = params[params.length - 1];

                    this.addFailure(this.createFailure(first_param.getStart(),
                                                       last_param.getEnd() - first_param.getStart(),
                                                       PAREN_FAIL));
                }
            }

            if (this.requireBlock) {
                if (body && body.kind !== ts.SyntaxKind.Block) {
                    this.addFailure(this.createFailure(body.getStart(), body.getWidth(), BLOCK_FAIL));
                }
            }
        }

        super.visitArrowFunction(node);
    }

}

function contains(arr: any[], value: any): boolean {
   return arr.indexOf(value) !== -1;
}
