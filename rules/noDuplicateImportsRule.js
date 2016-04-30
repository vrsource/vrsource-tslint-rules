"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint/lib/lint");
var IMPORT_FAIL = "Found duplicate import";
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
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
        _super.apply(this, arguments);
        this.knownImports = [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9EdXBsaWNhdGVJbXBvcnRzUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vRHVwbGljYXRlSW1wb3J0c1J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBZUEsSUFBWSxJQUFJLFdBQU0saUJBQWlCLENBQUMsQ0FBQTtBQUd4QyxJQUFNLFdBQVcsR0FBRyx3QkFBd0IsQ0FBQztBQUU3QztJQUEwQix3QkFBdUI7SUFBakQ7UUFBMEIsOEJBQXVCO0lBSWpELENBQUM7SUFIVSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSwyQkFBMkIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQUFKRCxDQUEwQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FJaEQ7QUFKWSxZQUFJLE9BSWhCLENBQUE7QUFFRDtJQUEwQywrQ0FBZTtJQUF6RDtRQUEwQyw4QkFBZTtRQUM5QyxpQkFBWSxHQUFhLEVBQUUsQ0FBQztJQWF2QyxDQUFDO0lBWGEsNERBQXNCLEdBQWhDLFVBQWlDLElBQTBCO1FBQ3ZELElBQUksU0FBUyxHQUFJLElBQUksQ0FBQyxlQUFvQyxDQUFDO1FBQzNELElBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFFakMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDakcsQ0FBQztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXBDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNMLGtDQUFDO0FBQUQsQ0FBQyxBQWRELENBQTBDLElBQUksQ0FBQyxVQUFVLEdBY3hEIn0=