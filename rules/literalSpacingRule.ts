/*  KEEP IN SYNC with README.md

## literal-spacing

Rule to enforce consistent spacing inside array and object literals.

See: eslint: object-curly-spacing and array-bracket-spacing

```javascript
"literal-spacing": [
    true,
    {
        "array": ["never"],
        "object": ["always"]
    }
]
```
*/

import * as Lint from "tslint/lib/lint";
import * as ts from "typescript";

const NEVER_FAIL = "Found extra space";
const ALWAYS_FAIL = "Missing whitespace";

const NEVER_OPT  = "never";
const ALWAYS_OPT = "always";

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new LiteralSpacingRuleWalker(sourceFile, this.getOptions()));
    }
}

class LiteralSpacingRuleWalker extends Lint.RuleWalker {
    public arrayCheck: string = NEVER_OPT;
    public objCheck: string   = NEVER_OPT;

    constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
        super(sourceFile, options);

        let array_opts = this.getOption("array", []);
        let obj_opts   = this.getOption("object", []);

        this.arrayCheck = contains(array_opts, ALWAYS_OPT) ? ALWAYS_OPT : NEVER_OPT;
        this.objCheck   = contains(obj_opts,   ALWAYS_OPT) ? ALWAYS_OPT : NEVER_OPT;
    }

    protected getOption(option: string, defVal: any) {
        const allOptions = this.getOptions();
        if (allOptions == null || allOptions.length === 0) {
            return defVal;
        }

        return allOptions[0][option];
    }

    protected visitArrayLiteralExpression(node: ts.ArrayLiteralExpression) {
        this.lintNode(node, this.arrayCheck);
        super.visitArrayLiteralExpression(node);
    }

    protected visitBindingPattern(node: ts.BindingPattern) {
        if (node.kind === ts.SyntaxKind.ArrayBindingPattern) {
            this.lintNode(node, this.arrayCheck);
        }
        if (node.kind === ts.SyntaxKind.ObjectBindingPattern) {
            this.lintNode(node, this.objCheck);
        }
        super.visitBindingPattern(node);
    }

    protected visitNamedImports(node: ts.NamedImports) {
        this.lintNode(node, this.objCheck);
        super.visitNamedImports(node);
    }

    protected visitObjectLiteralExpression(node: ts.ObjectLiteralExpression) {
        this.lintNode(node, this.objCheck);
        super.visitObjectLiteralExpression(node);
    }

    protected lintNode(node: ts.Node, checkType: string) {
        // Assume that we have list of children where first child is [ or { and last is } or ]
        const children = node.getChildren();
        const self = this;

        if (children.length < 3) {
            return;
        }
        // const first_child = children[0];                 // " ["
        const second_child = children[1];                   // " 1, 3, 5,"
        const last_child  = children[children.length - 1];  // " ]"

        let [front_start, front_end] = [second_child.getFullStart(), second_child.getStart()];
        let [back_start,  back_end]  = [last_child.getFullStart(), last_child.getStart()];

        let front_text = this.getSourceText(front_start, front_end);
        let back_text  = this.getSourceText(back_start, back_end);

        function doCheck(text: string, start: number, end: number) {
            if ((NEVER_OPT === checkType) &&
                (text.length > 0) &&
                (text.indexOf("\n") === -1)) {
                self.addFailure(self.createFailure(start, (end - start), NEVER_FAIL));
            }

            // if the space text is empty and second child has text (ie. there is a body)
            //   (this handles the case of {} and [])
            if ((ALWAYS_OPT === checkType) &&
                (text.length === 0) &&
                (second_child.getText() !== "")) {
                self.addFailure(self.createFailure(start, 1, ALWAYS_FAIL));
            }
        }

        doCheck(front_text, front_start, front_end);
        doCheck(back_text, back_start, back_end);
    }

    protected getSourceText(pos: number, end: number): string {
        return this.getSourceFile().text.substring(pos, end);
    }
}

function contains(arr: any[], value: any): boolean {
   return arr.indexOf(value) !== -1;
}
