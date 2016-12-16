"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var ts = require("typescript");
var FAIL_STR = "Attempting to reassign to parameter";
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoParamReassignWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var ScopeInfo = (function () {
    function ScopeInfo() {
        this.varNames = [];
    }
    return ScopeInfo;
}());
var NoParamReassignWalker = (function (_super) {
    __extends(NoParamReassignWalker, _super);
    function NoParamReassignWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoParamReassignWalker.prototype.createScope = function () {
        return new ScopeInfo();
    };
    NoParamReassignWalker.prototype.checkAssignment = function (identifier) {
        var _this = this;
        var name = identifier.text;
        var allScopes = this.getAllScopes();
        allScopes.forEach(function (scope) {
            if (scope.varNames.indexOf(name) !== -1) {
                _this.addFailure(_this.createFailure(identifier.getStart(), identifier.getWidth(), FAIL_STR));
            }
        });
    };
    NoParamReassignWalker.prototype.visitParameterDeclaration = function (node) {
        var currentScope = this.getCurrentScope();
        var isSingleParameter = (node.name.kind === ts.SyntaxKind.Identifier);
        if (isSingleParameter) {
            currentScope.varNames.push(node.name.text);
        }
        _super.prototype.visitParameterDeclaration.call(this, node);
    };
    NoParamReassignWalker.prototype.visitBinaryExpression = function (node) {
        if (isAssignmentOperator(node.operatorToken.kind)) {
            this.visitLeftHandSideExpression(node.left);
        }
        _super.prototype.visitBinaryExpression.call(this, node);
    };
    NoParamReassignWalker.prototype.visitPrefixUnaryExpression = function (node) {
        this.visitAnyUnaryExpression(node);
        _super.prototype.visitPrefixUnaryExpression.call(this, node);
    };
    NoParamReassignWalker.prototype.visitPostfixUnaryExpression = function (node) {
        this.visitAnyUnaryExpression(node);
        _super.prototype.visitPostfixUnaryExpression.call(this, node);
    };
    NoParamReassignWalker.prototype.visitLeftHandSideExpression = function (node) {
        while (node.kind === ts.SyntaxKind.ParenthesizedExpression) {
            node = node.expression;
        }
        if (node.kind === ts.SyntaxKind.Identifier) {
            this.checkAssignment(node);
        }
        else if (isBindingLiteralExpression(node)) {
            this.visitBindingLiteralExpression(node);
        }
    };
    NoParamReassignWalker.prototype.visitBindingLiteralExpression = function (node) {
        if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
            var pattern = node;
            for (var _i = 0, _a = pattern.properties; _i < _a.length; _i++) {
                var element = _a[_i];
                var kind = element.kind;
                if (kind === ts.SyntaxKind.ShorthandPropertyAssignment) {
                    this.checkAssignment(element.name);
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
    NoParamReassignWalker.prototype.visitAnyUnaryExpression = function (node) {
        if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) {
            this.visitLeftHandSideExpression(node.operand);
        }
    };
    return NoParamReassignWalker;
}(Lint.ScopeAwareRuleWalker));
function isAssignmentOperator(token) {
    return token >= ts.SyntaxKind.FirstAssignment && token <= ts.SyntaxKind.LastAssignment;
}
function isBindingLiteralExpression(node) {
    return (!!node) && (node.kind === ts.SyntaxKind.ObjectLiteralExpression || node.kind === ts.SyntaxKind.ArrayLiteralExpression);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9QYXJhbVJlYXNzaWduUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vUGFyYW1SZWFzc2lnblJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBZ0JBLDZCQUErQjtBQUMvQiwrQkFBaUM7QUFFakMsSUFBTSxRQUFRLEdBQUcscUNBQXFDLENBQUM7QUFFdkQ7SUFBMEIsd0JBQXVCO0lBQWpEOztJQUlBLENBQUM7SUFIVSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQUFKRCxDQUEwQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FJaEQ7QUFKWSxvQkFBSTtBQU9qQjtJQUFBO1FBQ1csYUFBUSxHQUFhLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUVEO0lBQW9DLHlDQUFvQztJQUF4RTs7SUFrRkEsQ0FBQztJQWpGVSwyQ0FBVyxHQUFsQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFUywrQ0FBZSxHQUF6QixVQUEwQixVQUF5QjtRQUFuRCxpQkFTQztRQVJHLElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDN0IsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMs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