"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
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
        return _super.apply(this, arguments) || this;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWxFeHByZXNzaW9uUGFyZW5zUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbmRpdGlvbmFsRXhwcmVzc2lvblBhcmVuc1J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBWUEsNkJBQStCO0FBQy9CLCtCQUFpQztBQUVqQyxJQUFNLFFBQVEsR0FBRyx5Q0FBeUMsQ0FBQztBQUUzRCxJQUFNLGtCQUFrQixHQUFHO0lBQ3ZCLEVBQUUsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxjQUFjO0lBQ25FLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYztJQUNuRixFQUFFLENBQUMsVUFBVSxDQUFDLHdCQUF3QixFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVztJQUNqRSxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLHNCQUFzQjtJQUNqRSxFQUFFLENBQUMsVUFBVSxDQUFDLHVCQUF1QjtDQUN4QyxDQUFDO0FBRUY7SUFBMEIsd0JBQXVCO0lBQWpEOztJQUlBLENBQUM7SUFIVSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQUFKRCxDQUEwQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FJaEQ7QUFKWSxvQkFBSTtBQU1qQjtJQUFrQyx1Q0FBZTtJQUFqRDs7SUFZQSxDQUFDO0lBWGEsd0RBQTBCLEdBQXBDLFVBQXFDLElBQThCO1FBQW5FLGlCQVVDO1FBVEcsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTlELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3hGLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0FBQyxBQVpELENBQWtDLElBQUksQ0FBQyxVQUFVLEdBWWhEIn0=