"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var ts = require("typescript");
var FAIL_STR = "Prefer blocks for case body";
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new CaseBlockWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var CaseBlockWalker = (function (_super) {
    __extends(CaseBlockWalker, _super);
    function CaseBlockWalker() {
        return _super.apply(this, arguments) || this;
    }
    CaseBlockWalker.prototype.visitDefaultClause = function (node) {
        this.checkCaseClause(node);
        _super.prototype.visitDefaultClause.call(this, node);
    };
    CaseBlockWalker.prototype.visitCaseClause = function (node) {
        this.checkCaseClause(node);
        _super.prototype.visitCaseClause.call(this, node);
    };
    CaseBlockWalker.prototype.checkCaseClause = function (node) {
        if ((node.statements.length > 1) ||
            ((node.statements.length === 1) &&
                (node.statements[0].kind !== ts.SyntaxKind.Block))) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAIL_STR));
        }
    };
    return CaseBlockWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZmVyQ2FzZUJsb2Nrc1J1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcmVmZXJDYXNlQmxvY2tzUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFnQkEsNkJBQStCO0FBQy9CLCtCQUFpQztBQUVqQyxJQUFNLFFBQVEsR0FBRyw2QkFBNkIsQ0FBQztBQUUvQztJQUEwQix3QkFBdUI7SUFBakQ7O0lBSUEsQ0FBQztJQUhVLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQUFKRCxDQUEwQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FJaEQ7QUFKWSxvQkFBSTtBQU1qQjtJQUE4QixtQ0FBZTtJQUE3Qzs7SUF1QkEsQ0FBQztJQXJCYSw0Q0FBa0IsR0FBNUIsVUFBNkIsSUFBc0I7UUFDL0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixpQkFBTSxrQkFBa0IsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRVMseUNBQWUsR0FBekIsVUFBMEIsSUFBbUI7UUFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixpQkFBTSxlQUFlLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVTLHlDQUFlLEdBQXpCLFVBQTBCLElBQXNDO1FBSTVELEVBQUUsQ0FBQyxDQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7Z0JBQzlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FDbEQsQ0FBQyxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLENBQUM7SUFDTCxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLEFBdkJELENBQThCLElBQUksQ0FBQyxVQUFVLEdBdUI1QyJ9