"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint/lib/lint");
var ts = require("typescript");
var NEVER_FAIL = "Found extra space";
var ALWAYS_FAIL = "Missing whitespace";
var NEVER_OPT = "never";
var ALWAYS_OPT = "always";
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new LiteralSpacingRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var LiteralSpacingRuleWalker = (function (_super) {
    __extends(LiteralSpacingRuleWalker, _super);
    function LiteralSpacingRuleWalker(sourceFile, options) {
        _super.call(this, sourceFile, options);
        this.arrayCheck = NEVER_OPT;
        this.objCheck = NEVER_OPT;
        var array_opts = this.getOption("array", []);
        var obj_opts = this.getOption("object", []);
        this.arrayCheck = contains(array_opts, ALWAYS_OPT) ? ALWAYS_OPT : NEVER_OPT;
        this.objCheck = contains(obj_opts, ALWAYS_OPT) ? ALWAYS_OPT : NEVER_OPT;
    }
    LiteralSpacingRuleWalker.prototype.getOption = function (option, defVal) {
        var allOptions = this.getOptions();
        if (allOptions == null || allOptions.length === 0) {
            return defVal;
        }
        return allOptions[0][option];
    };
    LiteralSpacingRuleWalker.prototype.visitArrayLiteralExpression = function (node) {
        this.lintNode(node, this.arrayCheck);
        _super.prototype.visitArrayLiteralExpression.call(this, node);
    };
    LiteralSpacingRuleWalker.prototype.visitBindingPattern = function (node) {
        if (node.kind === ts.SyntaxKind.ArrayBindingPattern) {
            this.lintNode(node, this.arrayCheck);
        }
        if (node.kind === ts.SyntaxKind.ObjectBindingPattern) {
            this.lintNode(node, this.objCheck);
        }
        _super.prototype.visitBindingPattern.call(this, node);
    };
    LiteralSpacingRuleWalker.prototype.visitNamedImports = function (node) {
        this.lintNode(node, this.objCheck);
        _super.prototype.visitNamedImports.call(this, node);
    };
    LiteralSpacingRuleWalker.prototype.visitObjectLiteralExpression = function (node) {
        this.lintNode(node, this.objCheck);
        _super.prototype.visitObjectLiteralExpression.call(this, node);
    };
    LiteralSpacingRuleWalker.prototype.lintNode = function (node, checkType) {
        var children = node.getChildren();
        var self = this;
        if (children.length < 3) {
            return;
        }
        var second_child = children[1];
        var last_child = children[children.length - 1];
        var _a = [second_child.getFullStart(), second_child.getStart()], front_start = _a[0], front_end = _a[1];
        var _b = [last_child.getFullStart(), last_child.getStart()], back_start = _b[0], back_end = _b[1];
        var front_text = this.getSourceText(front_start, front_end);
        var back_text = this.getSourceText(back_start, back_end);
        function doCheck(text, start, end) {
            if ((NEVER_OPT === checkType) &&
                (text.length > 0) &&
                (text.indexOf("\n") === -1)) {
                self.addFailure(self.createFailure(start, (end - start), NEVER_FAIL));
            }
            if ((ALWAYS_OPT === checkType) &&
                (text.length === 0) &&
                (second_child.getText() !== "")) {
                self.addFailure(self.createFailure(start, 1, ALWAYS_FAIL));
            }
        }
        doCheck(front_text, front_start, front_end);
        doCheck(back_text, back_start, back_end);
    };
    LiteralSpacingRuleWalker.prototype.getSourceText = function (pos, end) {
        return this.getSourceFile().text.substring(pos, end);
    };
    return LiteralSpacingRuleWalker;
}(Lint.RuleWalker));
function contains(arr, value) {
    return arr.indexOf(value) !== -1;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl0ZXJhbFNwYWNpbmdSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGl0ZXJhbFNwYWNpbmdSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQWlCQSxJQUFZLElBQUksV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLElBQVksRUFBRSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBRWpDLElBQU0sVUFBVSxHQUFHLG1CQUFtQixDQUFDO0FBQ3ZDLElBQU0sV0FBVyxHQUFHLG9CQUFvQixDQUFDO0FBRXpDLElBQU0sU0FBUyxHQUFJLE9BQU8sQ0FBQztBQUMzQixJQUFNLFVBQVUsR0FBRyxRQUFRLENBQUM7QUFFNUI7SUFBMEIsd0JBQXVCO0lBQWpEO1FBQTBCLDhCQUF1QjtJQUlqRCxDQUFDO0lBSFUsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksd0JBQXdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBMEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBSWhEO0FBSlksWUFBSSxPQUloQixDQUFBO0FBRUQ7SUFBdUMsNENBQWU7SUFJbEQsa0NBQVksVUFBeUIsRUFBRSxPQUFzQjtRQUN6RCxrQkFBTSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFKeEIsZUFBVSxHQUFXLFNBQVMsQ0FBQztRQUMvQixhQUFRLEdBQWEsU0FBUyxDQUFDO1FBS2xDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLElBQUksUUFBUSxHQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRTlDLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFVB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