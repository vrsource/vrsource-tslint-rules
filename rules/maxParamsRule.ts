/*  KEEP IN SYNC with README.md

## max-params

Rule to enforce a maximum number of parameters for functions and methods.

```javascript
"max-params": [
    true,
    3
]
```
*/

import * as Lint from "tslint";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new MaxParamsRuleWalker(sourceFile, this.getOptions()));
    }
}

class MaxParamsRuleWalker extends Lint.RuleWalker {
    public maxCount   = 3;
    public failureStr = "";

    constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
        super(sourceFile, options);

        if (options.ruleArguments.length > 0) {
            this.maxCount = options.ruleArguments[0];
        }
        this.failureStr = `More than max-params: ${this.maxCount}`;
    }

    protected visitMethodDeclaration(node: ts.MethodDeclaration) {
        this.checkParams(node.parameters);
        super.visitMethodDeclaration(node);
    }

    protected visitFunctionDeclaration(node: ts.FunctionDeclaration) {
        this.checkParams(node.parameters);
        super.visitFunctionDeclaration(node);
    }

    protected visitFunctionExpression(node: ts.FunctionExpression) {
        this.checkParams(node.parameters);
        super.visitFunctionExpression(node);
    }

    protected visitArrowFunction(node: ts.ArrowFunction) {
        this.checkParams(node.parameters);
        super.visitArrowFunction(node);
    }

    protected checkParams(params: ts.NodeArray<ts.ParameterDeclaration>) {
        if (params.length > this.maxCount) {
            let first_param = params[0];
            let last_param  = params[params.length - 1];
            let width = last_param.getEnd() - first_param.getStart();

            this.addFailure(this.createFailure(first_param.getStart(), width, this.failureStr));
        }
    }
}

