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
var MaxParamsRuleWalker = (function (_super) {
    __extends(MaxParamsRuleWalker, _super);
    function MaxParamsRuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.maxCount = 3;
        _this.failureStr = "";
        if (options.ruleArguments.length > 0) {
            _this.maxCount = options.ruleArguments[0];
        }
        _this.failureStr = "More than max-params: " + _this.maxCount;
        return _this;
    }
    MaxParamsRuleWalker.prototype.visitMethodDeclaration = function (node) {
        this.checkParams(node.parameters);
        _super.prototype.visitMethodDeclaration.call(this, node);
    };
    MaxParamsRuleWalker.prototype.visitFunctionDeclaration = function (node) {
        this.checkParams(node.parameters);
        _super.prototype.visitFunctionDeclaration.call(this, node);
    };
    MaxParamsRuleWalker.prototype.visitFunctionExpression = function (node) {
        this.checkParams(node.parameters);
        _super.prototype.visitFunctionExpression.call(this, node);
    };
    MaxParamsRuleWalker.prototype.visitArrowFunction = function (node) {
        this.checkParams(node.parameters);
        _super.prototype.visitArrowFunction.call(this, node);
    };
    MaxParamsRuleWalker.prototype.checkParams = function (params) {
        if (params.length > this.maxCount) {
            var first_param = params[0];
            var last_param = params[params.length - 1];
            var width = last_param.getEnd() - first_param.getStart();
            this.addFailure(this.createFailure(first_param.getStart(), width, this.failureStr));
        }
    };
    return MaxParamsRuleWalker;
}(Lint.RuleWalker));
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new MaxParamsRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF4UGFyYW1zUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1heFBhcmFtc1J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBY0EsNkJBQStCO0FBSS9CO0lBQWtDLHVDQUFlO0lBSTdDLDZCQUFZLFVBQXlCLEVBQUUsT0FBc0I7UUFBN0QsWUFDSSxrQkFBTSxVQUFVLEVBQUUsT0FBTyxDQUFDLFNBTTdCO1FBVk0sY0FBUSxHQUFLLENBQUMsQ0FBQztRQUNmLGdCQUFVLEdBQUcsRUFBRSxDQUFDO1FBS25CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsS0FBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFDRCxLQUFJLENBQUMsVUFBVSxHQUFHLDJCQUF5QixLQUFJLENBQUMsUUFBVSxDQUFDOztJQUMvRCxDQUFDO0lBRVMsb0RBQXNCLEdBQWhDLFVBQWlDLElBQTBCO1FBQ3ZELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xDLGlCQUFNLHNCQUFzQixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFUyxzREFBd0IsR0FBbEMsVUFBbUMsSUFBNEI7UUFDM0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEMsaUJBQU0sd0JBQXdCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVTLHFEQUF1QixHQUFqQyxVQUFrQyxJQUEyQjtRQUN6RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsQyxpQkFBTSx1QkFBdUIsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRVMsZ0RBQWtCLEdBQTVCLFVBQTZCLElBQXNCO1FBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xDLGlCQUFNLGtCQUFrQixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFUyx5Q0FBVyxHQUFyQixVQUFzQixNQUE2QztRQUMvRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLFVBQVUsR0FBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRXpELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLENBQUM7SUFDTCxDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQUFDLEFBMUNELENBQWtDLElBQUksQ0FBQyxVQUFVLEdBMENoRDtBQUVEO0lBQTBCLHdCQUF1QjtJQUFqRDs7SUFJQSxDQUFDO0lBSFUsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksbUJBQW1CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBMEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBSWhEO0FBSlksb0JBQUkifQ==