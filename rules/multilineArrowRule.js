"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var ts = require("typescript");
var PAREN_FAIL = "Multi-line arrow function must have parentheses around parameters.";
var BLOCK_FAIL = "Multi-line arrow function must have block around body.";
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
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
        var _this = _super.call(this, sourceFile, options) || this;
        _this.requireParens = false;
        _this.requireBlock = false;
        _this.requireParens = contains(options.ruleArguments, "require-parens");
        _this.requireBlock = contains(options.ruleArguments, "require-block");
        return _this;
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
                if (body && body.kind !== ts.SyntaxKind.Block) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlsaW5lQXJyb3dSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXVsdGlsaW5lQXJyb3dSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQWVBLDZCQUErQjtBQUMvQiwrQkFBaUM7QUFFakMsSUFBTSxVQUFVLEdBQUcsb0VBQW9FLENBQUM7QUFDeEYsSUFBTSxVQUFVLEdBQUcsd0RBQXdELENBQUM7QUFFNUU7SUFBMEIsd0JBQXVCO0lBQWpEOztJQUlBLENBQUM7SUFIVSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSx3QkFBd0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQUFKRCxDQUEwQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FJaEQ7QUFKWSxvQkFBSTtBQU9qQjtJQUF1Qyw0Q0FBZTtJQUlsRCxrQ0FBWSxVQUF5QixFQUFFLE9BQXNCO1FBQTdELFlBQ0ksa0JBQU0sVUFBVSxFQUFFLE9BQU8sQ0FBQyxTQUk3QjtRQVJNLG1CQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGtCQUFZLEdBQUksS0FBSyxDQUFDO1FBS3pCLEtBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUN2RSxLQUFJLENBQUMsWUFBWSxHQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFHLGVBQWUsQ0FBQyxDQUFDOztJQUMzRSxDQUFDO0lBRVMscURBQWtCLEdBQTVCLFVBQTZCLElBQXNCO1FBQy9DLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRXZCLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFOUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUVyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7b0JBQy9CLElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRTdDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQ3RCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQzVDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELENBQUM7WUFDTCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDdEYsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRUQsaUJBQU0sa0JBQWtCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVMLCtCQUFDO0FBQUQsQ0FBQyxBQXpDRCxDQUF1QyxJQUFJLENBQUMsVUFBVSxHQXlDckQ7QUFFRCxrQkFBa0IsR0FBVSxFQUFFLEtBQVU7SUFDckMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDcEMsQ0FBQyJ9