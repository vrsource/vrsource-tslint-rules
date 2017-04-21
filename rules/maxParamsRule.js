"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new MaxParamsRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF4UGFyYW1zUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1heFBhcmFtc1J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBY0EsNkJBQStCO0FBRy9CO0lBQTBCLHdCQUF1QjtJQUFqRDs7SUFJQSxDQUFDO0lBSFUsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksbUJBQW1CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBMEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBSWhEO0FBSlksb0JBQUk7QUFNakI7SUFBa0MsdUNBQWU7SUFJN0MsNkJBQVksVUFBeUIsRUFBRSxPQUFzQjtRQUE3RCxZQUNJLGtCQUFNLFVBQVUsRUFBRSxPQUFPLENBQUMsU0FNN0I7UUFWTSxjQUFRLEdBQUssQ0FBQyxDQUFDO1FBQ2YsZ0JBQVUsR0FBRyxFQUFFLENBQUM7UUFLbkIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxLQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUNELEtBQUksQ0FBQyxVQUFVLEdBQUcsMkJBQXlCLEtBQUksQ0FBQyxRQUFVLENBQUM7O0lBQy9ELENBQUM7SUFFUyxvREFBc0IsR0FBaEMsVUFBaUMsSUFBMEI7UUFDdkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEMsaUJBQU0sc0JBQXNCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVTLHNEQUF3QixHQUFsQyxVQUFtQyxJQUE0QjtRQUMzRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsQyxpQkFBTSx3QkFBd0IsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRVMscURBQXVCLEdBQWpDLFVBQWtDLElBQTJCO1FBQ3pELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xDLGlCQUFNLHVCQUF1QixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFUyxnREFBa0IsR0FBNUIsVUFBNkIsSUFBc0I7UUFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEMsaUJBQU0sa0JBQWtCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVTLHlDQUFXLEdBQXJCLFVBQXNCLE1BQTZDO1FBQy9ELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksVUFBVSxHQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFekQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDeEYsQ0FBQztJQUNMLENBQUM7SUFDTCwwQkFBQztBQUFELENBQUMsQUExQ0QsQ0FBa0MsSUFBSSxDQUFDLFVBQVUsR0EwQ2hEIn0=