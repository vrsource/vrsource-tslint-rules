"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var ts = require("typescript");
var FAIL_STR = "Prefer dot notation access";
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
    function PreferLiteralWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.allowedPattern = null;
        _this.validIdPattern = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
        if (options.ruleArguments.length > 0) {
            var opts_obj = options.ruleArguments[0];
            if (opts_obj["allow-pattern"]) {
                _this.allowedPattern = new RegExp(opts_obj["allow-pattern"]);
            }
        }
        return _this;
    }
    PreferLiteralWalker.prototype.visitElementAccessExpression = function (node) {
        var argExp = node.argumentExpression;
        if (argExp.kind === ts.SyntaxKind.StringLiteral) {
            var text = argExp.text;
            var is_valid_id = this.validIdPattern.test(text);
            if (is_valid_id) {
                var allow_anyway = (this.allowedPattern != null) && this.allowedPattern.test(text);
                if (!allow_anyway) {
                    this.addFailure(this.createFailure(argExp.getStart(), argExp.getWidth(), FAIL_STR));
                }
            }
        }
        this.walkChildren(node);
    };
    PreferLiteralWalker.prototype.stripQuotes = function (text) {
        var res = text;
        var is_quote = function (v) { return (v[0] === '"' || v[0] === "'"); };
        if (is_quote(res[0])) {
            res = res.slice(1);
        }
        if (is_quote(res[res.length - 1])) {
            res = res.slice(0, -1);
        }
        return res;
    };
    return PreferLiteralWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG90Tm90YXRpb25SdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG90Tm90YXRpb25SdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQXdCQSw2QkFBK0I7QUFDL0IsK0JBQWlDO0FBRWpDLElBQU0sUUFBUSxHQUFHLDRCQUE0QixDQUFDO0FBRTlDO0lBQTBCLHdCQUF1QjtJQUFqRDs7SUFJQSxDQUFDO0lBSFUsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksbUJBQW1CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBMEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBSWhEO0FBSlksb0JBQUk7QUFNakI7SUFBa0MsdUNBQWU7SUFJN0MsNkJBQVksVUFBeUIsRUFBRSxPQUFzQjtRQUE3RCxZQUNJLGtCQUFNLFVBQVUsRUFBRSxPQUFPLENBQUMsU0FRN0I7UUFaTSxvQkFBYyxHQUFXLElBQUksQ0FBQztRQUMzQixvQkFBYyxHQUFHLDRCQUE0QixDQUFDO1FBS3BELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxRQUFRLEdBQVcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLENBQUM7UUFDTCxDQUFDOztJQUNMLENBQUM7SUFFUywwREFBNEIsR0FBdEMsVUFBdUMsSUFBZ0M7UUFDbkUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBRXJDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQUksSUFBSSxHQUFJLE1BQTJCLENBQUMsSUFBSSxDQUFDO1lBQzdDLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRW5ELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsSUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyRixFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hGLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVTLHlDQUFXLEdBQXJCLFVBQXNCLElBQVk7UUFDOUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2YsSUFBSSxRQUFRLEdBQUcsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUE5QixDQUE4QixDQUFDO1FBRXJELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFDTCwwQkFBQztBQUFELENBQUMsQUE3Q0QsQ0FBa0MsSUFBSSxDQUFDLFVBQVUsR0E2Q2hEIn0=