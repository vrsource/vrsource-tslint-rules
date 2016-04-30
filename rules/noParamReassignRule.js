"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint/lib/lint");
var ts = require("typescript");
var FAIL_STR = "Attempting to reassign to parameter";
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
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
        _super.apply(this, arguments);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9QYXJhbVJlYXNzaWduUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vUGFyYW1SZWFzc2lnblJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBZ0JBLElBQVksSUFBSSxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFDeEMsSUFBWSxFQUFFLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFFakMsSUFBTSxRQUFRLEdBQUcscUNBQXFDLENBQUM7QUFFdkQ7SUFBMEIsd0JBQXVCO0lBQWpEO1FBQTBCLDhCQUF1QjtJQUlqRCxDQUFDO0lBSFUsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUkscUJBQXFCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUYsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBMEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBSWhEO0FBSlksWUFBSSxPQUloQixDQUFBO0FBR0Q7SUFBQTtRQUNXLGFBQVEsR0FBYSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFFRDtJQUFvQyx5Q0FBb0M7SUFBeEU7UUFBb0MsOEJBQW9DO0lBa0Z4RSxDQUFDO0lBakZVLDJDQUFXLEdBQWxCO1FBQ0ksTUFBTSxDQUFDLElBQUksU0FBUyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVTLCtDQUFlLEdBQXpCLFVBQTBCLFVBQXlCO1FBQW5ELGlCQVNDO1FBUkcsSUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM3QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUs7WUFDcEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFP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