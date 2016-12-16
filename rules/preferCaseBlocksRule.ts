/*  KEEP IN SYNC with README.md

## prefer-case-blocks

This rule checks to make sure that all case clauses use a block
around the statements of the case.  This helps to protect against
issues with lexcical declarations that would become visible to the
entire switch statement.

To maintain consistency, the rule requires a block in all cases.

```javascript
"prefer-case-blocks": true
```
*/

import * as Lint from "tslint";
import * as ts from "typescript";

const FAIL_STR = "Prefer blocks for case body";

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new CaseBlockWalker(sourceFile, this.getOptions()));
    }
}

class CaseBlockWalker extends Lint.RuleWalker {

    protected visitDefaultClause(node: ts.DefaultClause) {
        this.checkCaseClause(node);
        super.visitDefaultClause(node);
    }

    protected visitCaseClause(node: ts.CaseClause) {
        this.checkCaseClause(node);
        super.visitCaseClause(node);
    }

    protected checkCaseClause(node: ts.CaseClause | ts.DefaultClause) {
        // Fail if:
        // - statements > 1 OR
        // - 1 statement that is not a block
        if ( (node.statements.length > 1) ||
             ((node.statements.length === 1) &&
              (node.statements[0].kind !== ts.SyntaxKind.Block))
             ) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAIL_STR));
        }
    }
}

