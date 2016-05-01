/*  KEEP IN SYNC with README.md

## dot-notation-rule

In JavaScript, one can access properties using the dot notation (foo.bar)
or square-bracket notation (foo["bar"]). However, the dot notation is
often preferred because it is easier to read, less verbose, and works
better with aggressive JavaScript minimizers.

This rule is aimed at maintaining code consistency and improving code
readability by encouraging use of the dot notation style whenever possible.
As such, it will warn when it encounters an unnecessary use
of square-bracket notation.

See: http://eslint.org/docs/rules/dot-notation

```javascript
"dot-notation": [
    true,
    { "allow-pattern": "^[a-z]+(_[a-z]+)+$" }
]
```
*/

import * as Lint from "tslint/lib/lint";
import * as ts from "typescript";

const FAIL_STR = "Prefer dot notation access";

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new PreferLiteralWalker(sourceFile, this.getOptions()));
    }
}

class PreferLiteralWalker extends Lint.RuleWalker {
    public allowedPattern: RegExp = null;

    constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
        super(sourceFile, options);

        if (options.ruleArguments.length > 0) {
            let opts_obj: Object = options.ruleArguments[0];
            if (opts_obj["allow-pattern"]) {
                this.allowedPattern = new RegExp(opts_obj["allow-pattern"]);
            }
        }
    }

    protected visitElementAccessExpression(node: ts.ElementAccessExpression) {
        let argExp = node.argumentExpression;

        if (argExp.kind === ts.SyntaxKind.StringLiteral) {
            let text = (argExp as ts.StringLiteral).getText();
            if ((!this.allowedPattern) || !text.match(this.allowedPattern)) {
                this.addFailure(this.createFailure(argExp.getStart(), argExp.getWidth(), FAIL_STR));
            }
        }

        this.walkChildren(node);
    }
}

