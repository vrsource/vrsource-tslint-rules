"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint/lib/lint");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
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
        _super.call(this, sourceFile, options);
        this.maxCount = 3;
        this.failureStr = "";
        if (options.ruleArguments.length > 0) {
            this.maxCount = options.ruleArguments[0];
        }
        this.failureStr = "More than max-params: " + this.maxCount;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF4UGFyYW1zUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1heFBhcmFtc1J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBY0EsSUFBWSxJQUFJLFdBQU0saUJBQWlCLENBQUMsQ0FBQTtBQUd4QztJQUEwQix3QkFBdUI7SUFBakQ7UUFBMEIsOEJBQXVCO0lBSWpELENBQUM7SUFIVSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQUFKRCxDQUEwQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FJaEQ7QUFKWSxZQUFJLE9BSWhCLENBQUE7QUFFRDtJQUFrQyx1Q0FBZTtJQUk3Qyw2QkFBWSxVQUF5QixFQUFFLE9BQXNCO1FBQ3pELGtCQUFNLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUp4QixhQUFRLEdBQUssQ0FBQyxDQUFDO1FBQ2YsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUtuQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRywyQkFBeUIsSUFBSSxDQUFDLFFBQVUsQ0FBQztJQUMvRCxDQUFDO0lBRVMsb0RBQXNCLEdBQWhDLFVBQWlDLElBQTBCO1FBQ3ZELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xDLGdCQUFLLENBQUMsc0JBQXNCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVTLHNEQUF3QixHQUFsQyxVQUFtQyxJQUE0QjtRQUMzRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsQyxnQkFBSyxDQUFDLHdCQUF3QixZQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFUyxxREFBdUIsR0FBakMsVUFBa0MsSUFBMkI7UUFDekQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEMsZ0JBQUssQ0FBQyx1QkFBdUIsWUFBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRVMsZ0RBQWtCLEdBQTVCLFVBQTZCLElBQWdDO1FBQ3pELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xDLGdCQUFLLENBQUMsa0JBQWtCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVTLHlDQUFXLEdBQXJCLFVBQXNCLE1BQTZDO1FBQy9ELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksVUFBVSxHQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFekQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDeEYsQ0FBQztJQUNMLENBQUM7SUFDTCwwQkFBQztBQUFELENBQUMsQUExQ0QsQ0FBa0MsSUFBSSxDQUFDLFVBQVUsR0EwQ2hEIn0=