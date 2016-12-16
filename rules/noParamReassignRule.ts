/*
## no-param-reassign

Flag any place where a function parameter is assigned
a value in the body of a function.

See: eslint no-param-reassign

```javascript
"no-param-reassign": true
```

Note: for this rule to work correctly you also need to use `no-shadowed-variable`

*/

import * as Lint from "tslint";
import * as ts from "typescript";

const FAIL_STR = "Attempting to reassign to parameter";

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoParamReassignWalker(sourceFile, this.getOptions()));
    }
}


class ScopeInfo {
    public varNames: string[] = [];
}

class NoParamReassignWalker extends Lint.ScopeAwareRuleWalker<ScopeInfo> {
    public createScope() {
        return new ScopeInfo();
    }

    protected checkAssignment(identifier: ts.Identifier) {
        const name = identifier.text;
        let allScopes = this.getAllScopes();

        allScopes.forEach((scope) => {
            if (scope.varNames.indexOf(name) !== -1) {
                this.addFailure(this.createFailure(identifier.getStart(), identifier.getWidth(), FAIL_STR));
            }
        });
    }

    protected visitParameterDeclaration(node: ts.ParameterDeclaration) {
        const currentScope = this.getCurrentScope();
        const isSingleParameter = (node.name.kind === ts.SyntaxKind.Identifier);

        if (isSingleParameter) {
            currentScope.varNames.push((node.name as ts.Identifier).text);
        }

        super.visitParameterDeclaration(node);
    }

    protected visitBinaryExpression(node: ts.BinaryExpression) {
        if (isAssignmentOperator(node.operatorToken.kind)) {
            this.visitLeftHandSideExpression(node.left);
        }
        super.visitBinaryExpression(node);
    }

    protected visitPrefixUnaryExpression(node: ts.PrefixUnaryExpression) {
        this.visitAnyUnaryExpression(node);
        super.visitPrefixUnaryExpression(node);
    }

    protected visitPostfixUnaryExpression(node: ts.PostfixUnaryExpression) {
        this.visitAnyUnaryExpression(node);
        super.visitPostfixUnaryExpression(node);
    }

    // --- Extra Visitors --- //
    // non-standard visitors called from code above
    private visitLeftHandSideExpression(node: ts.Expression) {
        while (node.kind === ts.SyntaxKind.ParenthesizedExpression) {
            node = (node as ts.ParenthesizedExpression).expression;
        }
        if (node.kind === ts.SyntaxKind.Identifier) {
            this.checkAssignment(node as ts.Identifier);
        } else if (isBindingLiteralExpression(node)) {
            this.visitBindingLiteralExpression(node as (ts.ArrayLiteralExpression | ts.ObjectLiteralExpression));
        }
    }

    private visitBindingLiteralExpression(node: ts.ArrayLiteralExpression | ts.ObjectLiteralExpression) {
        if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
            const pattern = node as ts.ObjectLiteralExpression;
            for (const element of pattern.properties) {
                const kind = element.kind;

                if (kind === ts.SyntaxKind.ShorthandPropertyAssignment) {
                    this.checkAssignment((element as ts.ShorthandPropertyAssignment).name);
                } else if (kind === ts.SyntaxKind.PropertyAssignment) {
                    this.visitLeftHandSideExpression((element as ts.PropertyAssignment).initializer);
                }
            }
        } else if (node.kind === ts.SyntaxKind.ArrayLiteralExpression) {
            const pattern = node as ts.ArrayLiteralExpression;
            for (const element of pattern.elements) {
                this.visitLeftHandSideExpression(element);
            }
        }
    }

    private visitAnyUnaryExpression(node: ts.PrefixUnaryExpression | ts.PostfixUnaryExpression) {
        if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) {
            this.visitLeftHandSideExpression(node.operand);
        }
    }
}

function isAssignmentOperator(token: ts.SyntaxKind): boolean {
    return token >= ts.SyntaxKind.FirstAssignment && token <= ts.SyntaxKind.LastAssignment;
}

function isBindingLiteralExpression(node: ts.Node): node is (ts.ArrayLiteralExpression | ts.ObjectLiteralExpression) {
    return (!!node) && (node.kind === ts.SyntaxKind.ObjectLiteralExpression || node.kind === ts.SyntaxKind.ArrayLiteralExpression);
}

