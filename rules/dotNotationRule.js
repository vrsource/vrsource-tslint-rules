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
        if (argExp && argExp.kind === ts.SyntaxKind.StringLiteral) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG90Tm90YXRpb25SdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG90Tm90YXRpb25SdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQXdCQSw2QkFBK0I7QUFDL0IsK0JBQWlDO0FBRWpDLElBQU0sUUFBUSxHQUFHLDRCQUE0QixDQUFDO0FBRTlDO0lBQTBCLHdCQUF1QjtJQUFqRDs7SUFJQSxDQUFDO0lBSFUsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksbUJBQW1CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBMEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBSWhEO0FBSlksb0JBQUk7QUFNakI7SUFBa0MsdUNBQWU7SUFJN0MsNkJBQVksVUFBeUIsRUFBRSxPQUFzQjtRQUE3RCxZQUNJLGtCQUFNLFVBQVUsRUFBRSxPQUFPLENBQUMsU0FRN0I7UUFaTSxvQkFBYyxHQUFrQixJQUFJLENBQUM7UUFDbEMsb0JBQWMsR0FBRyw0QkFBNEIsQ0FBQztRQUtwRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksUUFBUSxHQUFRLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUNoRSxDQUFDO1FBQ0wsQ0FBQzs7SUFDTCxDQUFDO0lBRVMsMERBQTRCLEdBQXRDLFVBQXVDLElBQWdDO1FBQ25FLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUVyQyxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBSSxJQUFJLEdBQUksTUFBMkIsQ0FBQyxJQUFJLENBQUM7WUFDN0MsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFbkQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFNLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JGLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDeEYsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRVMseUNBQVcsR0FBckIsVUFBc0IsSUFBWTtRQUM5QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDZixJQUFJLFFBQVEsR0FBRyxVQUFDLENBQVMsSUFBSyxPQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQTlCLENBQThCLENBQUM7UUFFN0QsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0FBQyxBQTdDRCxDQUFrQyxJQUFJLENBQUMsVUFBVSxHQTZDaEQifQ==