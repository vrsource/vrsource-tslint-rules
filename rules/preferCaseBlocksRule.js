"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint/lib/lint");
var ts = require("typescript");
var FAIL_STR = "Prefer blocks for case body";
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
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
        _super.apply(this, arguments);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZmVyQ2FzZUJsb2Nrc1J1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcmVmZXJDYXNlQmxvY2tzUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFnQkEsSUFBWSxJQUFJLFdBQU0saUJBQWlCLENBQUMsQ0FBQTtBQUN4QyxJQUFZLEVBQUUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUVqQyxJQUFNLFFBQVEsR0FBRyw2QkFBNkIsQ0FBQztBQUUvQztJQUEwQix3QkFBdUI7SUFBakQ7UUFBMEIsOEJBQXVCO0lBSWpELENBQUM7SUFIVSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxlQUFlLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBMEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBSWhEO0FBSlksWUFBSSxPQUloQixDQUFBO0FBRUQ7SUFBOEIsbUNBQWU7SUFBN0M7UUFBOEIsOEJBQWU7SUF1QjdDLENBQUM7SUFyQmEsNENBQWtCLEdBQTVCLFVBQTZCLElBQXNCO1FBQy9DLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsZ0JBQUssQ0FBQyxrQkFBa0IsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRVMseUNBQWUsR0FBekIsVUFBMEIsSUFBbUI7UUFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixnQkFBSyxDQUFDLGVBQWUsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRVMseUNBQWUsR0FBekIsVUFBMEIsSUFBc0M7UUFJNUQsRUFBRSxDQUFDLENBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUNsRCxDQUFDLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDcEYsQ0FBQztJQUNMLENBQUM7SUFDTCxzQkFBQztBQUFELENBQUMsQUF2QkQsQ0FBOEIsSUFBSSxDQUFDLFVBQVUsR0F1QjVDIn0=