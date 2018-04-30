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
var OBJECT_OPTION = "object";
var FUNCTION_OPTION = "function";
var ARRAY_OPTION = "array";
var OBJECT_FAIL = "Prefer literal object creation";
var FUNCTION_FAIL = "Prefer literal function creation";
var ARRAY_FAIL = "Prefer literal array creation";
var PreferLiteralWalker = (function (_super) {
    __extends(PreferLiteralWalker, _super);
    function PreferLiteralWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.checkObject = false;
        _this.checkFunction = false;
        _this.checkArray = false;
        _this.checkObject = contains(options.ruleArguments, OBJECT_OPTION);
        _this.checkFunction = contains(options.ruleArguments, FUNCTION_OPTION);
        _this.checkArray = contains(options.ruleArguments, ARRAY_OPTION);
        return _this;
    }
    PreferLiteralWalker.prototype.visitNewExpression = function (node) {
        var functionName = getFunctionName(node);
        if (this.checkObject && functionName === "Object") {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), OBJECT_FAIL));
        }
        if (this.checkFunction && functionName === "Function") {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FUNCTION_FAIL));
        }
        if (this.checkArray && functionName === "Array") {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), ARRAY_FAIL));
        }
        _super.prototype.visitNewExpression.call(this, node);
    };
    return PreferLiteralWalker;
}(Lint.RuleWalker));
function getFunctionName(node) {
    var expression = node.expression;
    var functionName = expression.text;
    if (functionName === undefined && expression.name) {
        functionName = expression.name.text;
    }
    return functionName;
}
function contains(arr, value) {
    return arr.indexOf(value) !== -1;
}
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new PreferLiteralWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZmVyTGl0ZXJhbFJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcmVmZXJMaXRlcmFsUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFrQkEsNkJBQStCO0FBRy9CLElBQU0sYUFBYSxHQUFLLFFBQVEsQ0FBQztBQUNqQyxJQUFNLGVBQWUsR0FBRyxVQUFVLENBQUM7QUFDbkMsSUFBTSxZQUFZLEdBQU0sT0FBTyxDQUFDO0FBRWhDLElBQU0sV0FBVyxHQUFLLGdDQUFnQyxDQUFDO0FBQ3ZELElBQU0sYUFBYSxHQUFHLGtDQUFrQyxDQUFDO0FBQ3pELElBQU0sVUFBVSxHQUFNLCtCQUErQixDQUFDO0FBRXREO0lBQWtDLHVDQUFlO0lBSzdDLDZCQUFZLFVBQXlCLEVBQUUsT0FBc0I7UUFBN0QsWUFDSSxrQkFBTSxVQUFVLEVBQUUsT0FBTyxDQUFDLFNBSzdCO1FBVk0saUJBQVcsR0FBSyxLQUFLLENBQUM7UUFDdEIsbUJBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsZ0JBQVUsR0FBTSxLQUFLLENBQUM7UUFLekIsS0FBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBSSxhQUFhLENBQUMsQ0FBQztRQUNwRSxLQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3RFLEtBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUssWUFBWSxDQUFDLENBQUM7O0lBQ3ZFLENBQUM7SUFFUyxnREFBa0IsR0FBNUIsVUFBNkIsSUFBc0I7UUFDL0MsSUFBSSxZQUFZLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksWUFBWSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN2RixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxZQUFZLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLFlBQVksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDdEYsQ0FBQztRQUNELGlCQUFNLGtCQUFrQixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDTCwwQkFBQztBQUFELENBQUMsQUEzQkQsQ0FBa0MsSUFBSSxDQUFDLFVBQVUsR0EyQmhEO0FBRUQseUJBQXlCLElBQXNCO0lBQzVDLElBQUksVUFBVSxHQUFrQixJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ2hELElBQUksWUFBWSxHQUFzQixVQUFXLENBQUMsSUFBSSxDQUFDO0lBQ3ZELEVBQUUsQ0FBQyxDQUFDLFlBQVksS0FBSyxTQUFTLElBQVUsVUFBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDeEQsWUFBWSxHQUFTLFVBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzlDLENBQUM7SUFDRCxNQUFNLENBQUMsWUFBWSxDQUFDO0FBQ3ZCLENBQUM7QUFFRCxrQkFBa0IsR0FBVSxFQUFFLEtBQVU7SUFDckMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQUVEO0lBQTBCLHdCQUF1QjtJQUFqRDs7SUFJQSxDQUFDO0lBSFUsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksbUJBQW1CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBMEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBSWhEO0FBSlksb0JBQUkifQ==