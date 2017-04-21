/*  KEEP IN SYNC with README.md

## no-jasmine-focus

Flags any place developers left fit or fdescribe calls in their code.

```javascript
"no-jasmine-focus": true
```

*/

import * as Lint from "tslint";
import * as ts from "typescript";

const JASMINE_FOCUS_FAIL = "Don't keep jasmine focus methods";
const BAD_CALL_NAMES     = ["fdescribe", "fit"];

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoJasmineFocusRuleWalker(sourceFile, this.getOptions()));
    }
}

class NoJasmineFocusRuleWalker extends Lint.RuleWalker {

    protected visitCallExpression(node: ts.CallExpression) {
        let func_id   = (node.expression as ts.Identifier);
        let func_name = func_id.getText();

        if (BAD_CALL_NAMES.indexOf(func_name) !== -1) {
            this.addFailure(this.createFailure(func_id.getStart(), func_id.getWidth(), JASMINE_FOCUS_FAIL));
        }

        this.walkChildren(node);
    }
}
