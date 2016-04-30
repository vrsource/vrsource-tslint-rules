"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint/lib/lint");
var ts = require("typescript");
var FAIL_STR = "Prefer dot notation access";
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
    function PreferLiteralWalker(sourceFile, options) {
        _super.call(this, sourceFile, options);
        this.allowedPattern = null;
        if (options.ruleArguments.length > 0) {
            var opts_obj = options.ruleArguments[0];
            if (opts_obj["allow-pattern"]) {
                this.allowedPattern = new RegExp(opts_obj["allow-pattern"]);
            }
        }
    }
    PreferLiteralWalker.prototype.visitElementAccessExpression = function (node) {
        var argExp = node.argumentExpression;
        if (argExp.kind === ts.SyntaxKind.StringLiteral) {
            var text = argExp.getText();
            if ((!this.allowedPattern) || !text.match(this.allowedPattern)) {
                this.addFailure(this.createFailure(argExp.getStart(), argExp.getWidth(), FAIL_STR));
            }
        }
        this.walkChildren(node);
    };
    return PreferLiteralWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG90Tm90YXRpb25SdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG90Tm90YXRpb25SdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQVlBLElBQVksSUFBSSxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFDeEMsSUFBWSxFQUFFLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFFakMsSUFBTSxRQUFRLEdBQUcsNEJBQTRCLENBQUM7QUFFOUM7SUFBMEIsd0JBQXVCO0lBQWpEO1FBQTBCLDhCQUF1QjtJQUlqRCxDQUFDO0lBSFUsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksbUJBQW1CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBMEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBSWhEO0FBSlksWUFBSSxPQUloQixDQUFBO0FBRUQ7SUFBa0MsdUNBQWU7SUFHN0MsNkJBQVksVUFBeUIsRUFBRSxPQUFzQjtRQUN6RCxrQkFBTSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFIeEIsbUJBQWMsR0FBVyxJQUFJLENBQUM7UUFLakMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLFFBQVEsR0FBVyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDaEUsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRVMsMERBQTRCLEdBQXRDLFVBQXVDLElBQWdDO1FBQ25FLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUVyQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUM5QyxJQUFJLElBQUksR0FBSSxNQUEyQixDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2xELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDeEYsQ0FBQztRQUNMLENBQUM7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDTCwwQkFBQztBQUFELENBQUMsQUExQkQsQ0FBa0MsSUFBSSxDQUFDLFVBQVUsR0EwQmhEIn0=