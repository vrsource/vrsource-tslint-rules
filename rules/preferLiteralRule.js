"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint/lib/lint");
var OBJECT_OPTION = "object";
var FUNCTION_OPTION = "function";
var ARRAY_OPTION = "array";
var OBJECT_FAIL = "Prefer literal object creation";
var FUNCTION_FAIL = "Prefer literal function creation";
var ARRAY_FAIL = "Prefer literal array creation";
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
        this.checkObject = false;
        this.checkFunction = false;
        this.checkArray = false;
        this.checkObject = contains(options.ruleArguments, OBJECT_OPTION);
        this.checkFunction = contains(options.ruleArguments, FUNCTION_OPTION);
        this.checkArray = contains(options.ruleArguments, ARRAY_OPTION);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZmVyTGl0ZXJhbFJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcmVmZXJMaXRlcmFsUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFrQkEsSUFBWSxJQUFJLFdBQU0saUJBQWlCLENBQUMsQ0FBQTtBQUd4QyxJQUFNLGFBQWEsR0FBSyxRQUFRLENBQUM7QUFDakMsSUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDO0FBQ25DLElBQU0sWUFBWSxHQUFNLE9BQU8sQ0FBQztBQUVoQyxJQUFNLFdBQVcsR0FBSyxnQ0FBZ0MsQ0FBQztBQUN2RCxJQUFNLGFBQWEsR0FBRyxrQ0FBa0MsQ0FBQztBQUN6RCxJQUFNLFVBQVUsR0FBTSwrQkFBK0IsQ0FBQztBQUV0RDtJQUEwQix3QkFBdUI7SUFBakQ7UUFBMEIsOEJBQXVCO0lBSWpELENBQUM7SUFIVSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQUFKRCxDQUEwQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FJaEQ7QUFKWSxZQUFJLE9BSWhCLENBQUE7QUFFRDtJQUFrQyx1Q0FBZTtJQUs3Qyw2QkFBWSxVQUF5QixFQUFFLE9BQXNCO1FBQ3pELGtCQUFNLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUx4QixnQkFBVyxHQUFLLEtBQUssQ0FBQztRQUN0QixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixlQUFVLEdBQU0sS0FBSyxDQUFDO1FBS3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUksYUFBYSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFLLFlBQVksQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFUyxnREFBa0IsR0FBNUIsVUFBNkIsSUFBc0I7UUFDL0MsSUFBSSxZQUFZLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksWUFBWSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN2RixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxZQUFZLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLFlBQVksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDdEYsQ0FBQztRQUNELGdCQUFLLENBQUMsa0JBQWtCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0FBQyxBQTNCRCxDQUFrQyxJQUFJLENBQUMsVUFBVSxHQTJCaEQ7QUFFRCx5QkFBeUIsSUFBdUI7SUFDN0MsSUFBSSxVQUFVLEdBQWtCLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDaEQsSUFBSSxZQUFZLEdBQXNCLFVBQVcsQ0FBQyxJQUFJLENBQUM7SUFDdkQsRUFBRSxDQUFDLENBQUMsWUFBWSxLQUFLLFNBQVMsSUFBVSxVQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN4RCxZQUFZLEdBQVMsVUFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDOUMsQ0FBQztJQUNELE1BQU0sQ0FBQyxZQUFZLENBQUM7QUFDdkIsQ0FBQztBQUVELGtCQUFrQixHQUFVLEVBQUUsS0FBVTtJQUNyQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNwQyxDQUFDIn0=