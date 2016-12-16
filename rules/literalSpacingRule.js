"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var ts = require("typescript");
var NEVER_FAIL = "Found extra space";
var ALWAYS_FAIL = "Missing whitespace";
var NEVER_OPT = "never";
var ALWAYS_OPT = "always";
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
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
        var _this = _super.call(this, sourceFile, options) || this;
        _this.arrayCheck = NEVER_OPT;
        _this.objCheck = NEVER_OPT;
        _this.importCheck = NEVER_OPT;
        var array_opts = _this.getOption("array", []);
        var obj_opts = _this.getOption("object", []);
        var import_opts = _this.getOption("import", []);
        _this.arrayCheck = contains(array_opts, ALWAYS_OPT) ? ALWAYS_OPT : NEVER_OPT;
        _this.objCheck = contains(obj_opts, ALWAYS_OPT) ? ALWAYS_OPT : NEVER_OPT;
        _this.importCheck = contains(import_opts, ALWAYS_OPT) ? ALWAYS_OPT : NEVER_OPT;
        return _this;
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
        this.lintNode(node, this.importCheck);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl0ZXJhbFNwYWNpbmdSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGl0ZXJhbFNwYWNpbmdSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQW9CQSw2QkFBK0I7QUFDL0IsK0JBQWlDO0FBRWpDLElBQU0sVUFBVSxHQUFHLG1CQUFtQixDQUFDO0FBQ3ZDLElBQU0sV0FBVyxHQUFHLG9CQUFvQixDQUFDO0FBRXpDLElBQU0sU0FBUyxHQUFJLE9BQU8sQ0FBQztBQUMzQixJQUFNLFVBQVUsR0FBRyxRQUFRLENBQUM7QUFFNUI7SUFBMEIsd0JBQXVCO0lBQWpEOztJQUlBLENBQUM7SUFIVSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSx3QkFBd0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQUFKRCxDQUEwQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FJaEQ7QUFKWSxvQkFBSTtBQU1qQjtJQUF1Qyw0Q0FBZTtJQUtsRCxrQ0FBWSxVQUF5QixFQUFFLE9BQXNCO1FBQTdELFlBQ0ksa0JBQU0sVUFBVSxFQUFFLE9BQU8sQ0FBQyxTQVM3QjtRQWRNLGdCQUFVLEdBQVksU0FBUyxDQUFDO1FBQ2hDLGNBQVEsR0FBYyxTQUFTLENBQUM7UUFDaEMsaUJBQVcsR0FBVyxTQUFTLENBQUM7UUFLbkMsSUFBSSxVQUFVLEdBQUksS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUMsSUFBSSxRQUFRLEdBQU0sS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxXQUFXLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFL0MsS0FB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