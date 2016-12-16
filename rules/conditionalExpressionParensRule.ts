/*  KEEP IN SYNC with README.md

## conditional-expression-parens

Rule to enforce the use of parentheses each clause of a conditional when they
are not simple expressions of a single indentifier or calling expression.

```javascript
"conditional-expression-parens": true
```
*/

import * as Lint from "tslint";
import * as ts from "typescript";

const FAIL_STR = "Expression clause must be parenthesized";

const allowedClauseKinds = [
    ts.SyntaxKind.ParenthesizedExpression, ts.SyntaxKind.CallExpression,
    ts.SyntaxKind.Identifier, ts.SyntaxKind.StringLiteral, ts.SyntaxKind.NumericLiteral,
    ts.SyntaxKind.RegularExpressionLiteral, ts.SyntaxKind.TypeLiteral,
    ts.SyntaxKind.StringLiteral, ts.SyntaxKind.ArrayLiteralExpression,
    ts.SyntaxKind.ObjectLiteralExpression,
];

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new PreferLiteralWalker(sourceFile, this.getOptions()));
    }
}

class PreferLiteralWalker extends Lint.RuleWalker {
    protected visitConditionalExpression(node: ts.ConditionalExpression) {
        let clauses = [node.condition, node.whenFalse, node.whenTrue];

        clauses.forEach((clause) => {
            if (allowedClauseKinds.indexOf(clause.kind) === -1) {
                this.addFailure(this.createFailure(clause.getStart(), clause.getWidth(), FAIL_STR));
            }
        });

        this.walkChildren(node);
    }
}

