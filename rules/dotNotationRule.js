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
        this.validIdPattern = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG90Tm90YXRpb25SdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG90Tm90YXRpb25SdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQXdCQSxJQUFZLElBQUksV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLElBQVksRUFBRSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBRWpDLElBQU0sUUFBUSxHQUFHLDRCQUE0QixDQUFDO0FBRTlDO0lBQTBCLHdCQUF1QjtJQUFqRDtRQUEwQiw4QkFBdUI7SUFJakQsQ0FBQztJQUhVLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FBQyxBQUpELENBQTBCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUloRDtBQUpZLFlBQUksT0FJaEIsQ0FBQTtBQUVEO0lBQWtDLHVDQUFlO0lBSTdDLDZCQUFZLFVBQXlCLEVBQUUsT0FBc0I7UUFDekQsa0JBQU0sVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBSnhCLG1CQUFjLEdBQVcsSUFBSSxDQUFDO1FBQzNCLG1CQUFjLEdBQUcsNEJBQTRCLENBQUM7UUFLcEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLFFBQVEsR0FBVyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDaEUsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRVMsMERBQTRCLEdBQXRDLFVBQXVDLElBQWdDO1FBQ25FLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUVyQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUM5QyxJQUFJLElBQUksR0FBSSxNQUEyQixDQUFDLElBQUksQ0FBQztZQUM3QyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVuRCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQU0sWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckYsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN4RixDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFUyx5Q0FBVyxHQUFyQixVQUFzQixJQUFZO1FBQzlCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztRQUNmLElBQUksUUFBUSxHQUFHLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBOUIsQ0FBOEIsQ0FBQztRQUVyRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDZixDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQUFDLEFBN0NELENBQWtDLElBQUksQ0FBQyxVQUFVLEdBNkNoRCJ9