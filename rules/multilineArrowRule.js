"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint/lib/lint");
var ts = require("typescript");
var PAREN_FAIL = "Multi-line arrow function must have parentheses around parameters.";
var BLOCK_FAIL = "Multi-line arrow function must have block around body.";
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new MultilineArrowRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var MultilineArrowRuleWalker = (function (_super) {
    __extends(MultilineArrowRuleWalker, _super);
    function MultilineArrowRuleWalker(sourceFile, options) {
        _super.call(this, sourceFile, options);
        this.requireParens = false;
        this.requireBlock = false;
        this.requireParens = contains(options.ruleArguments, "require-parens");
        this.requireBlock = contains(options.ruleArguments, "require-block");
    }
    MultilineArrowRuleWalker.prototype.visitArrowFunction = function (node) {
        var text = node.getText();
        var body = node.body;
        var isMultiline = text.indexOf("\n") !== -1;
        if (isMultiline) {
            if (this.requireParens) {
                if (text.charAt(0) !== "(") {
                    var params = node.parameters;
                    var first_param = params[0];
                    var last_param = params[params.length - 1];
                    this.addFailure(this.createFailure(first_param.getStart(), last_param.getEnd() - first_param.getStart(), PAREN_FAIL));
                }
            }
            if (this.requireBlock) {
                if (body.kind !== ts.SyntaxKind.Block) {
                    this.addFailure(this.createFailure(body.getStart(), body.getWidth(), BLOCK_FAIL));
                }
            }
        }
        _super.prototype.visitArrowFunction.call(this, node);
    };
    return MultilineArrowRuleWalker;
}(Lint.RuleWalker));
function contains(arr, value) {
    return arr.indexOf(value) !== -1;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlsaW5lQXJyb3dSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXVsdGlsaW5lQXJyb3dSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQWVBLElBQVksSUFBSSxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFDeEMsSUFBWSxFQUFFLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFFakMsSUFBTSxVQUFVLEdBQUcsb0VBQW9FLENBQUM7QUFDeEYsSUFBTSxVQUFVLEdBQUcsd0RBQXdELENBQUM7QUFFNUU7SUFBMEIsd0JBQXVCO0lBQWpEO1FBQTBCLDhCQUF1QjtJQUlqRCxDQUFDO0lBSFUsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksd0JBQXdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBMEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBSWhEO0FBSlksWUFBSSxPQUloQixDQUFBO0FBR0Q7SUFBdUMsNENBQWU7SUFJbEQsa0NBQVksVUFBeUIsRUFBRSxPQUFzQjtRQUN6RCxrQkFBTSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFKeEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsaUJBQVksR0FBSSxLQUFLLENBQUM7UUFLekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxZQUFZLEdBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUcsZUFBZSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVTLHFEQUFrQixHQUE1QixVQUE2QixJQUFnQztRQUN6RCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDNUIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUV2QixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRTlDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFFckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN6QixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO29CQUMvQixJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUU3QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUN0QixVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUM1QyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDO1lBQ0wsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDdEYsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRUQsZ0JBQUssQ0FBQyxrQkFBa0IsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUwsK0JBQUM7QUFBRCxDQUFDLEFBekNELENBQXVDLElBQUksQ0FBQyxVQUFVLEdBeUNyRDtBQUVELGtCQUFrQixHQUFVLEVBQUUsS0FBVTtJQUNyQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNwQyxDQUFDIn0=