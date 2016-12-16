"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var OBJECT_OPTION = "object";
var FUNCTION_OPTION = "function";
var ARRAY_OPTION = "array";
var OBJECT_FAIL = "Prefer literal object creation";
var FUNCTION_FAIL = "Prefer literal function creation";
var ARRAY_FAIL = "Prefer literal array creation";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZmVyTGl0ZXJhbFJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcmVmZXJMaXRlcmFsUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFrQkEsNkJBQStCO0FBRy9CLElBQU0sYUFBYSxHQUFLLFFBQVEsQ0FBQztBQUNqQyxJQUFNLGVBQWUsR0FBRyxVQUFVLENBQUM7QUFDbkMsSUFBTSxZQUFZLEdBQU0sT0FBTyxDQUFDO0FBRWhDLElBQU0sV0FBVyxHQUFLLGdDQUFnQyxDQUFDO0FBQ3ZELElBQU0sYUFBYSxHQUFHLGtDQUFrQyxDQUFDO0FBQ3pELElBQU0sVUFBVSxHQUFNLCtCQUErQixDQUFDO0FBRXREO0lBQTBCLHdCQUF1QjtJQUFqRDs7SUFJQSxDQUFDO0lBSFUsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksbUJBQW1CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBMEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBSWhEO0FBSlksb0JBQUk7QUFNakI7SUFBa0MsdUNBQWU7SUFLN0MsNkJBQVksVUFBeUIsRUFBRSxPQUFzQjtRQUE3RCxZQUNJLGtCQUFNLFVBQVUsRUFBRSxPQUFPLENBQUMsU0FLN0I7UUFWTSxpQkFBVyxHQUFLLEtBQUssQ0FBQztRQUN0QixtQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixnQkFBVSxHQUFNLEtBQUssQ0FBQztRQUt6QixLQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFJLGFBQWEsQ0FBQyxDQUFDO1FBQ3BFLEtBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDdEUsS0FBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBSyxZQUFZLENBQUMsQ0FBQzs7SUFDdkUsQ0FBQztJQUVTLGdEQUFrQixHQUE1QixVQUE2QixJQUFzQjtRQUMvQyxJQUFJLFlBQVksR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxZQUFZLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLFlBQVksS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDekYsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksWUFBWSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN0RixDQUFDO1FBQ0QsaUJBQU0sa0JBQWtCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0FBQyxBQTNCRCxDQUFrQyxJQUFJLENBQUMsVUFBVSxHQTJCaEQ7QUFFRCx5QkFBeUIsSUFBc0I7SUFDNUMsSUFBSSxVQUFVLEdBQWtCLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDaEQsSUFBSSxZQUFZLEdBQXNCLFVBQVcsQ0FBQyxJQUFJLENBQUM7SUFDdkQsRUFBRSxDQUFDLENBQUMsWUFBWSxLQUFLLFNBQVMsSUFBVSxVQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN4RCxZQUFZLEdBQVMsVUFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDOUMsQ0FBQztJQUNELE1BQU0sQ0FBQyxZQUFZLENBQUM7QUFDdkIsQ0FBQztBQUVELGtCQUFrQixHQUFVLEVBQUUsS0FBVTtJQUNyQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNwQyxDQUFDIn0=