/*  KEEP IN SYNC with README.md

## no-duplicate-imports

This rule validates that all imports from a
single module exist in a single import statement;

See: http://eslint.org/docs/rules/no-duplicate-imports

```javascript
"no-duplicate-imports": true
```

*/

import * as Lint from "tslint";
import * as ts from "typescript";

const IMPORT_FAIL = "Found duplicate import";

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoDuplicateImportRuleWalker(sourceFile, this.getOptions()));
    }
}

class NoDuplicateImportRuleWalker extends Lint.RuleWalker {
    public knownImports: string[] = [];

    protected visitImportDeclaration(node: ts.ImportDeclaration) {
        let specifier = (node.moduleSpecifier as ts.StringLiteral);
        let module_name = specifier.text;

        if (this.knownImports.indexOf(module_name) !== -1) {
            this.addFailure(this.createFailure(specifier.getStart(), specifier.getWidth(), IMPORT_FAIL));
        }
        this.knownImports.push(module_name);

        this.walkChildren(node);
    }
}
