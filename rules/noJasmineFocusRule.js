"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var JASMINE_FOCUS_FAIL = "Don't keep jasmine focus methods";
var BAD_CALL_NAMES = ["fdescribe", "fit"];
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoJasmineFocusRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoJasmineFocusRuleWalker = (function (_super) {
    __extends(NoJasmineFocusRuleWalker, _super);
    function NoJasmineFocusRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoJasmineFocusRuleWalker.prototype.visitCallExpression = function (node) {
        var func_id = node.expression;
        var func_name = func_id.getText();
        if (BAD_CALL_NAMES.indexOf(func_name) !== -1) {
            this.addFailure(this.createFailure(func_id.getStart(), func_id.getWidth(), JASMINE_FOCUS_FAIL));
        }
        this.walkChildren(node);
    };
    return NoJasmineFocusRuleWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9KYXNtaW5lRm9jdXNSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibm9KYXNtaW5lRm9jdXNSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQVlBLDZCQUErQjtBQUcvQixJQUFNLGtCQUFrQixHQUFHLGtDQUFrQyxDQUFDO0FBQzlELElBQU0sY0FBYyxHQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBRWhEO0lBQTBCLHdCQUF1QjtJQUFqRDs7SUFJQSxDQUFDO0lBSFUsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksd0JBQXdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBMEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBSWhEO0FBSlksb0JBQUk7QUFNakI7SUFBdUMsNENBQWU7SUFBdEQ7O0lBWUEsQ0FBQztJQVZhLHNEQUFtQixHQUE3QixVQUE4QixJQUF1QjtRQUNqRCxJQUFJLE9BQU8sR0FBTSxJQUFJLENBQUMsVUFBNEIsQ0FBQztRQUNuRCxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFbEMsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1FBQ3BHLENBQUM7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDTCwrQkFBQztBQUFELENBQUMsQUFaRCxDQUF1QyxJQUFJLENBQUMsVUFBVSxHQVlyRCJ9