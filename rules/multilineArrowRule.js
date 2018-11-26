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
var PAREN_FAIL = "Multi-line arrow function must have parentheses around parameters.";
var BLOCK_FAIL = "Multi-line arrow function must have block around body.";
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
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new MultilineArrowRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlsaW5lQXJyb3dSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXVsdGlsaW5lQXJyb3dSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQWVBLDZCQUErQjtBQUMvQiwrQkFBaUM7QUFFakMsSUFBTSxVQUFVLEdBQUcsb0VBQW9FLENBQUM7QUFDeEYsSUFBTSxVQUFVLEdBQUcsd0RBQXdELENBQUM7QUFHNUU7SUFBdUMsNENBQWU7SUFJbEQsa0NBQVksVUFBeUIsRUFBRSxPQUFzQjtRQUE3RCxZQUNJLGtCQUFNLFVBQVUsRUFBRSxPQUFPLENBQUMsU0FJN0I7UUFSTSxtQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixrQkFBWSxHQUFJLEtBQUssQ0FBQztRQUt6QixLQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDdkUsS0FBSSxDQUFDLFlBQVksR0FBSSxRQUFRLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRyxlQUFlLENBQUMsQ0FBQzs7SUFDM0UsQ0FBQztJQUVTLHFEQUFrQixHQUE1QixVQUE2QixJQUFzQjtRQUMvQyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDNUIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUV2QixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRTlDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFFckIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN6QixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO29CQUMvQixJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUU3QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUN0QixVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUM1QyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDO1lBQ0wsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RGLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUVELGlCQUFNLGtCQUFrQixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTCwrQkFBQztBQUFELENBQUMsQUF6Q0QsQ0FBdUMsSUFBSSxDQUFDLFVBQVUsR0F5Q3JEO0FBRUQsa0JBQWtCLEdBQVUsRUFBRSxLQUFVO0lBQ3JDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFFRDtJQUEwQix3QkFBdUI7SUFBakQ7O0lBSUEsQ0FBQztJQUhVLG9CQUFLLEdBQVosVUFBYSxVQUF5QjtRQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLHdCQUF3QixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FBQyxBQUpELENBQTBCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUloRDtBQUpZLG9CQUFJIn0=