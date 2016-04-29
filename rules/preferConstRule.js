"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint/lib/lint");
var ts = require("typescript");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new PreferConstWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING_FACTORY = function (identifier) { return ("Identifier '" + identifier + "' never appears on the LHS of an assignment - use const instead of let for its declaration."); };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
function isBindingPattern(node) {
    return !!node && (node.kind === ts.SyntaxKind.ArrayBindingPattern || node.kind === ts.SyntaxKind.ObjectBindingPattern);
}
function walkUpBindingElementsAndPatterns(node) {
    while (node && (node.kind === ts.SyntaxKind.BindingElement || isBindingPattern(node))) {
        node = node.parent;
    }
    return node;
}
function getCombinedNodeFlags(node) {
    node = walkUpBindingElementsAndPatterns(node);
    var flags = node.flags;
    if (node.kind === ts.SyntaxKind.VariableDeclaration) {
        node = node.parent;
    }
    if (node && node.kind === ts.SyntaxKind.VariableDeclarationList) {
        flags |= node.flags;
        node = node.parent;
    }
    if (node && node.kind === ts.SyntaxKind.VariableStatement) {
        flags |= node.flags;
    }
    return flags;
}
function isLet(node) {
    return !!(getCombinedNodeFlags(node) & ts.NodeFlags.Let);
}
function isExported(node) {
    return !!(getCombinedNodeFlags(node) & ts.NodeFlags.Export);
}
function isAssignmentOperator(token) {
    return token >= ts.SyntaxKind.FirstAssignment && token <= ts.SyntaxKind.LastAssignment;
}
function isBindingLiteralExpression(node) {
    return (!!node) && (node.kind === ts.SyntaxKind.ObjectLiteralExpression || node.kind === ts.SyntaxKind.ArrayLiteralExpression);
}
var PreferConstWalker = (function (_super) {
    __extends(PreferConstWalker, _super);
    function PreferConstWalker() {
        _super.apply(this, arguments);
        this.inScopeLetDeclarations = [];
        this.errors = [];
    }
    PreferConstWalker.prototype.markAssignment = function (identifier) {
        var name = identifier.text;
        for (var i = this.inScopeLetDeclarations.length - 1; i >= 0; i--) {
            var declarations = this.inScopeLetDeclarations[i];
            if (declarations[name]) {
                declarations[name].usages++;
                break;
            }
        }
    };
    PreferConstWalker.prototype.visitSourceFile = function (node) {
        var _this = this;
        _super.prototype.visitSourceFile.call(this, node);
        this.errors.sort(function (a, b) { return a.getStartPosition().getPosition() - b.getStartPosition().getPosition(); }).forEach(function (e) { return _this.addFailure(e); });
    };
    PreferConstWalker.prototype.visitBinaryExpression = function (node) {
        if (isAssignmentOperator(node.operatorToken.kind)) {
            this.visitLeftHandSideExpression(node.left);
        }
        _super.prototype.visitBinaryExpression.call(this, node);
    };
    PreferConstWalker.prototype.visitLeftHandSideExpression = function (node) {
        while (node.kind === ts.SyntaxKind.ParenthesizedExpression) {
            node = node.expression;
        }
        if (node.kind === ts.SyntaxKind.Identifier) {
            this.markAssignment(node);
        }
        else if (isBindingLiteralExpression(node)) {
            this.visitBindingLiteralExpression(node);
        }
    };
    PreferConstWalker.prototype.visitBindingLiteralExpression = function (node) {
        if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
            var pattern = node;
            for (var _i = 0, _a = pattern.properties; _i < _a.length; _i++) {
                var element = _a[_i];
                var kind = element.kind;
                if (kind === ts.SyntaxKind.ShorthandPropertyAssignment) {
                    this.markAssignment(element.name);
                }
                else if (kind === ts.SyntaxKind.PropertyAssignment) {
                    this.visitLeftHandSideExpression(element.initializer);
                }
            }
        }
        else if (node.kind === ts.SyntaxKind.ArrayLiteralExpression) {
            var pattern = node;
            for (var _b = 0, _c = pattern.elements; _b < _c.length; _b++) {
                var element = _c[_b];
                this.visitLeftHandSideExpression(element);
            }
        }
    };
    PreferConstWalker.prototype.visitBindingPatternIdentifiers = function (pattern) {
        for (var _i = 0, _a = pattern.elements; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element.name.kind === ts.SyntaxKind.Identifier) {
                this.markAssignment(element.name);
            }
            else {
                this.visitBindingPatternIdentifiers(element.name);
            }
        }
    };
    PreferConstWalker.prototype.visitPrefixUnaryExpression = function (node) {
        this.visitAnyUnaryExpression(node);
        _super.prototype.visitPrefixUnaryExpression.call(this, node);
    };
    PreferConstWalker.prototype.visitPostfixUnaryExpression = function (node) {
        this.visitAnyUnaryExpression(node);
        _super.prototype.visitPostfixUnaryExpression.call(this, node);
    };
    PreferConstWalker.prototype.visitAnyUnaryExpression = function (node) {
        if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) {
            this.visitLeftHandSideExpression(node.operand);
        }
    };
    PreferConstWalker.prototype.visitModuleDeclaration = function (node) {
        if (node.body.kind === ts.SyntaxKind.ModuleBlock) {
            this.visitBlock(node.body);
        }
        _super.prototype.visitModuleDeclaration.call(this, node);
    };
    PreferConstWalker.prototype.visitForOfStatement = function (node) {
        this.visitAnyForStatement(node);
        _super.prototype.visitForOfStatement.call(this, node);
        this.popDeclarations();
    };
    PreferConstWalker.prototype.visitForInStatement = function (node) {
        this.visitAnyForStatement(node);
        _super.prototype.visitForInStatement.call(this, node);
        this.popDeclarations();
    };
    PreferConstWalker.prototype.visitAnyForStatement = function (node) {
        var names = {};
        if (isLet(node.initializer)) {
            if (node.initializer.kind === ts.SyntaxKind.VariableDeclarationList) {
                this.collectLetIdentifiers(node.initializer, names);
            }
        }
        this.inScopeLetDeclarations.push(names);
    };
    PreferConstWalker.prototype.popDeclarations = function () {
        var completed = this.inScopeLetDeclarations.pop();
        for (var name_1 in completed) {
            if (Object.hasOwnProperty.call(completed, name_1)) {
                var element = completed[name_1];
                if (element.usages === 0) {
                    this.errors.push(this.createFailure(element.declaration.getStart(this.getSourceFile()), element.declaration.getWidth(this.getSourceFile()), Rule.FAILURE_STRING_FACTORY(name_1)));
                }
            }
        }
    };
    PreferConstWalker.prototype.visitBlock = function (node) {
        var names = {};
        for (var _i = 0, _a = node.statements; _i < _a.length; _i++) {
            var statement = _a[_i];
            if (statement.kind === ts.SyntaxKind.VariableStatement) {
                this.collectLetIdentifiers(statement.declarationList, names);
            }
        }
        this.inScopeLetDeclarations.push(names);
        _super.prototype.visitBlock.call(this, node);
        this.popDeclarations();
    };
    PreferConstWalker.prototype.collectLetIdentifiers = function (list, ret) {
        for (var _i = 0, _a = list.declarations; _i < _a.length; _i++) {
            var node = _a[_i];
            if (isLet(node) && !isExported(node)) {
                this.collectNameIdentifiers(node, node.name, ret);
            }
        }
    };
    PreferConstWalker.prototype.collectNameIdentifiers = function (declaration, node, table) {
        if (node.kind === ts.SyntaxKind.Identifier) {
            table[node.text] = { declaration: declaration, usages: 0 };
        }
        else {
            this.collectBindingPatternIdentifiers(declaration, node, table);
        }
    };
    PreferConstWalker.prototype.collectBindingPatternIdentifiers = function (value, pattern, table) {
        for (var _i = 0, _a = pattern.elements; _i < _a.length; _i++) {
            var element = _a[_i];
            this.collectNameIdentifiers(value, element.name, table);
        }
    };
    return PreferConstWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZmVyQ29uc3RSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJlZmVyQ29uc3RSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBLElBQVksSUFBSSxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFDeEMsSUFBWSxFQUFFLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFHakM7SUFBMEIsd0JBQXVCO0lBQWpEO1FBQTBCLDhCQUF1QjtJQU1qRCxDQUFDO0lBSFUsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksaUJBQWlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUphLDJCQUFzQixHQUFHLFVBQUMsVUFBa0IsSUFBSyxPQUFBLGtCQUFlLFVBQVUsaUdBQTZGLEVBQXRILENBQXNILENBQUM7SUFLMUwsV0FBQztBQUFELENBQUMsQUFORCxDQUEwQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FNaEQ7QUFOWSxZQUFJLE9BTWhCLENBQUE7QUFFRCwwQkFBMEIsSUFBYTtJQUNuQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUMzSCxDQUFDO0FBRUQsMENBQTBDLElBQWE7SUFDbkQsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNwRixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQsTUFBTSxD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