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
        return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = "import statement forbidden";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var NoImportsWalker = (function (_super) {
    __extends(NoImportsWalker, _super);
    function NoImportsWalker() {
        _super.apply(this, arguments);
    }
    NoImportsWalker.prototype.visitImportDeclaration = function (node) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        _super.prototype.visitImportDeclaration.call(this, node);
    };
    return NoImportsWalker;
}(Lint.RuleWalker));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9JbXBvcnRzUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vSW1wb3J0c1J1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBWSxJQUFJLFdBQU0saUJBQWlCLENBQUMsQ0FBQTtBQUV4QztJQUEwQix3QkFBdUI7SUFBakQ7UUFBMEIsOEJBQXVCO0lBTWpELENBQUM7SUFIVSxvQkFBSyxHQUFaLFVBQWEsVUFBeUI7UUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxlQUFlLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUphLG1CQUFjLEdBQUcsNEJBQTRCLENBQUM7SUFLaEUsV0FBQztBQUFELENBQUMsQUFORCxDQUEwQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FNaEQ7QUFOWSxZQUFJLE9BTWhCLENBQUE7QUFHRDtJQUE4QixtQ0FBZTtJQUE3QztRQUE4Qiw4QkFBZTtJQVE3QyxDQUFDO0lBUFUsZ0RBQXNCLEdBQTdCLFVBQThCLElBQTBCO1FBRXBELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBRzNGLGdCQUFLLENBQUMsc0JBQXNCLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQVJELENBQThCLElBQUksQ0FBQyxVQUFVLEdBUTVDIn0=