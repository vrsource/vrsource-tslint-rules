"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Lint = require("tslint");
var ts = require("typescript");
var NEVER_FAIL = "Found extra space";
var ALWAYS_FAIL = "Missing whitespace";
var NEVER_OPT = "never";
var ALWAYS_OPT = "always";
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
        var is_empty = second_child.getText() === "";
        var _a = [second_child.getFullStart(), second_child.getStart()], front_start = _a[0], front_end = _a[1];
        var _b = [last_child.getFullStart(), last_child.getStart()], back_start = _b[0], back_end = _b[1];
        var front_text = this.getSourceText(front_start, front_end);
        var back_text = this.getSourceText(back_start, back_end);
        function doCheck(edgeText, nodeEdgeChar, start, end) {
            if ((NEVER_OPT === checkType) &&
                ((edgeText.length > 0) || (nodeEdgeChar === " ")) &&
                (edgeText.indexOf("\n") === -1)) {
                var len = Math.max((end - start), 1);
                self.addFailure(self.createFailure(start, len, NEVER_FAIL));
            }
            if (ALWAYS_OPT === checkType) {
                if ((!is_empty) &&
                    (edgeText.length === 0) &&
                    (nodeEdgeChar !== " ")) {
                    self.addFailure(self.createFailure(start, 1, ALWAYS_FAIL));
                }
            }
        }
        doCheck(front_text, second_child.getText()[0], front_start, front_end);
        doCheck(back_text, last_child.getText()[-1], back_start, back_end);
    };
    LiteralSpacingRuleWalker.prototype.getSourceText = function (pos, end) {
        return this.getSourceFile().text.substring(pos, end);
    };
    return LiteralSpacingRuleWalker;
}(Lint.RuleWalker));
function contains(arr, value) {
    return arr && arr.indexOf(value) !== -1;
}
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new LiteralSpacingRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGl0ZXJhbFNwYWNpbmdSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGl0ZXJhbFNwYWNpbmdSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQW9CQSw2QkFBK0I7QUFDL0IsK0JBQWlDO0FBRWpDLElBQU0sVUFBVSxHQUFHLG1CQUFtQixDQUFDO0FBQ3ZDLElBQU0sV0FBVyxHQUFHLG9CQUFvQixDQUFDO0FBRXpDLElBQU0sU0FBUyxHQUFJLE9BQU8sQ0FBQztBQUMzQixJQUFNLFVBQVUsR0FBRyxRQUFRLENBQUM7QUFFNUI7SUFBdUMsNENBQWU7SUFLbEQsa0NBQVksVUFBeUIsRUFBRSxPQUFzQjtRQUE3RCxZQUNJLGtCQUFNLFVBQVUsRUFBRSxPQUFPLENBQUMsU0FTN0I7UUFkTSxnQkFBVSxHQUFZLFNBQVMsQ0FBQztRQUNoQyxjQUFRLEdBQWMsU0FBUyxDQUFDO1FBQ2hDLGlCQUFXLEdBQVcsU0FBUyxDQUFDO1FBS25DLElBQUksVUFBVSxHQUFJLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLElBQUksUUFBUSxHQUFNLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUksV0FBVyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRS9DLEtBQUksQ0FBQyxVQUFVLEdBQUksUUFBUSxDQUFDLFVBQVUsRUFBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDOUUsS0FBSSxDQUFDLFFBQVEsR0FBTSxRQUFRLENBQUMsUUFBUSxFQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUM5RSxLQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUs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