"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Lint = require("tslint");
var ts = require("typescript");
var FAIL_STR = "Expression clause must be parenthesized";
var allowedClauseKinds = [
    ts.SyntaxKind.ParenthesizedExpression, ts.SyntaxKind.CallExpression,
    ts.SyntaxKind.Identifier, ts.SyntaxKind.StringLiteral, ts.SyntaxKind.NumericLiteral,
    ts.SyntaxKind.RegularExpressionLiteral, ts.SyntaxKind.TypeLiteral,
    ts.SyntaxKind.StringLiteral, ts.SyntaxKind.ArrayLiteralExpression,
    ts.SyntaxKind.ObjectLiteralExpression,
];
var PreferLiteralWalker = (function (_super) {
    __extends(PreferLiteralWalker, _super);
    function PreferLiteralWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
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
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new PreferLiteralWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWxFeHByZXNzaW9uUGFyZW5zUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbmRpdGlvbmFsRXhwcmVzc2lvblBhcmVuc1J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBWUEsNkJBQStCO0FBQy9CLCtCQUFpQztBQUVqQyxJQUFNLFFBQVEsR0FBRyx5Q0FBeUMsQ0FBQztBQUUzRCxJQUFNLGtCQUFrQixHQUFHO0lBQ3ZCLEVBQUUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjO0lBQ25FLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYztJQUNuRixFQUFFLENBQUMsVUFBVSxDQUFDLHdCQUF3QixFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVztJQUNqRSxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLHNCQUFzQjtJQUNqRSxFQUFFLENBQUMsVUFBVSxDQUFDLHVCQUF1QjtDQUN4QyxDQUFDO0FBRUY7SUFBa0MsdUNBQWU7SUFBakQ7O0lBWUEsQ0FBQztJQVhhLHdEQUEwQixHQUFwQyxVQUFxQyxJQUE4QjtRQUFuRSxpQkFVQztRQVRHLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU5RCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTTtZQUNuQixFQUFFLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakQsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN4RixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDTCwwQkFBQztBQUFELENBQUMsQUFaRCxDQUFrQyxJQUFJLENBQUMsVUFBVSxHQVloRDtBQUVEO0lBQTBCLHdCQUF1QjtJQUFqRDs7SUFJQSxDQUFDO0lBSFUsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksbUJBQW1CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBMEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBSWhEO0FBSlksb0JBQUkifQ==