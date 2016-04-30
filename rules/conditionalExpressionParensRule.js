"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint/lib/lint");
var ts = require("typescript");
var FAIL_STR = "Expression clause must be parenthesized";
var allowedClauseKinds = [
    ts.SyntaxKind.ParenthesizedExpression, ts.SyntaxKind.CallExpression,
    ts.SyntaxKind.Identifier, ts.SyntaxKind.StringLiteral, ts.SyntaxKind.NumericLiteral,
    ts.SyntaxKind.RegularExpressionLiteral, ts.SyntaxKind.TypeLiteral,
    ts.SyntaxKind.StringLiteralType, ts.SyntaxKind.ArrayLiteralExpression,
    ts.SyntaxKind.ObjectLiteralExpression
];
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new PreferLiteralWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var PreferLiteralWalker = (function (_super) {
    __extends(PreferLiteralWalker, _super);
    function PreferLiteralWalker() {
        _super.apply(this, arguments);
    }
    PreferLiteralWalker.prototype.visitConditionalExpression = function (node) {
        var _this = this;
        var clauses = [node.condition, node.whenFalse, node.whenTrue];
        clauses.forEach(function (clause) {
            if (allowedClauseKinds.indexOf(clause.kind) === -1) {
                _this.addFailure(_this.createFailure(clause.getStart(), clause.getWidth(), FAIL_STR));
            }
        });
        this.walkChildren(node);
    };
    return PreferLiteralWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWxFeHByZXNzaW9uUGFyZW5zUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbmRpdGlvbmFsRXhwcmVzc2lvblBhcmVuc1J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBaUJBLElBQVksSUFBSSxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFDeEMsSUFBWSxFQUFFLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFFakMsSUFBTSxRQUFRLEdBQUcseUNBQXlDLENBQUM7QUFFM0QsSUFBTSxrQkFBa0IsR0FBRztJQUN2QixFQUFFLENBQUMsVUFBVSxDQUFDLHVCQUF1QixFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYztJQUNuRSxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLGNBQWM7SUFDbkYsRUFBRSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVc7SUFDakUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLHNCQUFzQjtJQUNyRSxFQUFFLENBQUMsVUFBVSxDQUFDLHVCQUF1QjtDQUN4QyxDQUFDO0FBRUY7SUFBMEIsd0JBQXVCO0lBQWpEO1FBQTBCLDhCQUF1QjtJQUlqRCxDQUFDO0lBSFUsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksbUJBQW1CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBMEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBSWhEO0FBSlksWUFBSSxPQUloQixDQUFBO0FBRUQ7SUFBa0MsdUNBQWU7SUFBakQ7UUFBa0MsOEJBQWU7SUFZakQsQ0FBQztJQVhhLHdEQUEwQixHQUFwQyxVQUFxQyxJQUE4QjtRQUFuRSxpQkFVQztRQVRHLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU5RCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTTtZQUNuQixFQUFFLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakQsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN4RixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDTCwwQkFBQztBQUFELENBQUMsQUFaRCxDQUFrQyxJQUFJLENBQUMsVUFBVSxHQVloRCJ9