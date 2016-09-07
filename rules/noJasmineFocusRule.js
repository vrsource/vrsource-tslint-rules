"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint/lib/lint");
var JASMINE_FOCUS_FAIL = "Don't keep jasmine focus methods";
var BAD_CALL_NAMES = ['fdescribe', 'fit'];
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
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
        _super.apply(this, arguments);
    }
    NoJasmineFocusRuleWalker.prototype.visitCallExpression = function (node) {
        var func_id = node.expression;
        var func_name = func_id.getText();
        if (BAD_CALL_NAMES.indexOf(func_name) != -1) {
            this.addFailure(this.createFailure(func_id.getStart(), func_id.getWidth(), JASMINE_FOCUS_FAIL));
        }
        this.walkChildren(node);
    };
    return NoJasmineFocusRuleWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9KYXNtaW5lRm9jdXNSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibm9KYXNtaW5lRm9jdXNSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQVlBLElBQVksSUFBSSxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFHeEMsSUFBTSxrQkFBa0IsR0FBRyxrQ0FBa0MsQ0FBQztBQUM5RCxJQUFNLGNBQWMsR0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUVoRDtJQUEwQix3QkFBdUI7SUFBakQ7UUFBMEIsOEJBQXVCO0lBSWpELENBQUM7SUFIVSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSx3QkFBd0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQUFKRCxDQUEwQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FJaEQ7QUFKWSxZQUFJLE9BSWhCLENBQUE7QUFFRDtJQUF1Qyw0Q0FBZTtJQUF0RDtRQUF1Qyw4QkFBZTtJQVl0RCxDQUFDO0lBVmEsc0RBQW1CLEdBQTdCLFVBQThCLElBQXVCO1FBQ2pELElBQUksT0FBTyxHQUFNLElBQUksQ0FBQyxVQUE0QixDQUFDO1FBQ25ELElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVsQyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7UUFDcEcsQ0FBQztRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNMLCtCQUFDO0FBQUQsQ0FBQyxBQVpELENBQXVDLElBQUksQ0FBQyxVQUFVLEdBWXJEIn0=