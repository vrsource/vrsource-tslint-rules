"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var IMPORT_FAIL = "Found duplicate import";
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoDuplicateImportRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoDuplicateImportRuleWalker = (function (_super) {
    __extends(NoDuplicateImportRuleWalker, _super);
    function NoDuplicateImportRuleWalker() {
        var _this = _super.apply(this, arguments) || this;
        _this.knownImports = [];
        return _this;
    }
    NoDuplicateImportRuleWalker.prototype.visitImportDeclaration = function (node) {
        var specifier = node.moduleSpecifier;
        var module_name = specifier.text;
        if (this.knownImports.indexOf(module_name) !== -1) {
            this.addFailure(this.createFailure(specifier.getStart(), specifier.getWidth(), IMPORT_FAIL));
        }
        this.knownImports.push(module_name);
        this.walkChildren(node);
    };
    return NoDuplicateImportRuleWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9EdXBsaWNhdGVJbXBvcnRzUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vRHVwbGljYXRlSW1wb3J0c1J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBZUEsNkJBQStCO0FBRy9CLElBQU0sV0FBVyxHQUFHLHdCQUF3QixDQUFDO0FBRTdDO0lBQTBCLHdCQUF1QjtJQUFqRDs7SUFJQSxDQUFDO0lBSFUsb0JBQUssR0FBWixVQUFhLFVBQXlCO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksMkJBQTJCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBMEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBSWhEO0FBSlksb0JBQUk7QUFNakI7SUFBMEMsK0NBQWU7SUFBekQ7UUFBQSxrREFjQztRQWJVLGtCQUFZLEdBQWEsRUFBRSxDQUFDOztJQWF2QyxDQUFDO0lBWGEsNERBQXNCLEdBQWhDLFVBQWlDLElBQTBCO1FBQ3ZELElBQUksU0FBUyxHQUFJLElBQUksQ0FBQyxlQUFvQyxDQUFDO1FBQzNELElBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFFakMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDakcsQ0FBQztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXBDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNMLGtDQUFDO0FBQUQsQ0FBQyxBQWRELENBQTBDLElBQUksQ0FBQyxVQUFVLEdBY3hEIn0=