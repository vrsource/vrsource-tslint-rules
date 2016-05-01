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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG90Tm90YXRpb25SdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG90Tm90YXRpb25SdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQXdCQSxJQUFZLElBQUksV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLElBQVksRUFBRSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBRWpDLElBQU0sUUFBUSxHQUFHLDRCQUE0QixDQUFDO0FBRTlDO0lBQTBCLHdCQUF1QjtJQUFqRDtRQUEwQiw4QkFBdUI7SUFJakQsQ0FBQztJQUhVLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FBQyxBQUpELENBQTBCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUloRDtBQUpZLFlBQUksT0FJaEIsQ0FBQTtBQUVEO0lBQWtDLHVDQUFlO0lBRzdDLDZCQUFZLFVBQXlCLEVBQUUsT0FBc0I7UUFDekQsa0JBQU0sVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBSHhCLG1CQUFjLEdBQVcsSUFBSSxDQUFDO1FBS2pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxRQUFRLEdBQVcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVTLDBEQUE0QixHQUF0QyxVQUF1QyxJQUFnQztRQUNuRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFFckMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxJQUFJLEdBQUksTUFBMkIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNsRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3hGLENBQUM7UUFDTCxDQUFDO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQUFDLEFBMUJELENBQWtDLElBQUksQ0FBQyxVQUFVLEdBMEJoRCJ9