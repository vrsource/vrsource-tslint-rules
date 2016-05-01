import * as ts from "typescript";
import * as Lint from "tslint/lib/lint";

/**  KEEP IN SYNC WITH README.md

 ## ext-variable-name

 This rule provides extensive support for customizing allowable variable names
 for a wide variety of variable tags.  The rule is configured by setting up a
 list of sub-rules that specify the tags of variables to check and the checks
 to perform on the variable's name.  The sub-rules are checked in order
 and the first one that matches the tags of variable being checked is the
 only one that is used.

 An example set of sub-rules for an example coding standard is shown below.

 ```json
 "ext-variable-name": [
   true,
   ["class",                 "pascal"],
   ["interface",             "pascal", {"regex": "^I.*$"}],
   ["parameter",             "camel"],
   ["property", "static",    "camel", {"regex": "^s.*$"}],
   ["property", "private",   "camel", "allow-leading-underscore"],
   ["property", "protected", "camel", "allow-leading-underscore"],
   ["variable", "local",     "snake"],
   ["variable", "const",     "upper"],
   ["variable",              "camel", {"regex": "^g.*$"}],
   ["method", "private",     "camel", "allow-leading-underscore"],
   ["method", "protected",   "camel", "allow-leading-underscore"],
   ["function",              "camel"],
   ["default",               "camel"]
]
```

Allowed tags for variables:
   * primary (choose one):
      * class, interface, parameter, property,
        method, function, variable
   * modifiers (choose zero or more):
      * local, const, static, public, protected, private

note: If any tags is added to a sub-rule then **all** must match the variable.

Checks allowed:
   * One of:
      * "camel": Require variables to use camelCaseVariables
      * "snake": Require variables to use snake_case_variables
      * "pascal": Require variables to use PascalCaseVariables
      * "upper": Require variables to use UPPER_CASE_VARIABLES
   * "allow-leading-underscore": permits the variable to have a leading underscore
   * "allow-trailing-underscore": permits the variable to have a trailing underscore
   * "ban-keywords": bans a list of language keywords from being used
   * {"regex": "^.*$"}: checks the variable name against the given regex

*/

const CLASS_TAG     = "class";
const INTERFACE_TAG = "interface";
const PARAMETER_TAG = "parameter";
const PROPERTY_TAG  = "property";
const METHOD_TAG    = "method";
const FUNCTION_TAG  = "function";
const VARIABLE_TAG  = "variable";

const LOCAL_TAG     = "local";
const STATIC_TAG    = "static";
const CONST_TAG     = "const";
const PUBLIC_TAG    = "public";
const PROTECTED_TAG = "protected";
const PRIVATE_TAG   = "private";

const VALID_VAR_TAGS = [CLASS_TAG, INTERFACE_TAG, PARAMETER_TAG,
                        PROPERTY_TAG, METHOD_TAG, FUNCTION_TAG, VARIABLE_TAG,
                        LOCAL_TAG, STATIC_TAG, CONST_TAG,
                        PUBLIC_TAG, PROTECTED_TAG, PRIVATE_TAG];

const PASCAL_OPTION = "pascal";
const CAMEL_OPTION  = "camel";
const SNAKE_OPTION  = "snake";
const UPPER_OPTION  = "upper";
const LEADING_UNDERSCORE_OPTION  = "allow-leading-underscore";
const TRAILING_UNDERSCORE_OPTION = "allow-trailing-underscore";
const BAN_KEYWORDS_OPTION        = "ban-keywords";

const CAMEL_FAIL    = "Variable must be in camel case";
const PASCAL_FAIL   = "Variable must be in pascal case";
const SNAKE_FAIL    = "Variable must be in snake case";
const UPPER_FAIL    = "Variable must be in uppercase";
const KEYWORD_FAIL  = "Variable name clashes with keyword/type";
const LEADING_FAIL  = "Variable name must not have leading underscore";
const TRAILING_FAIL = "Variable name must not have trailing underscore";
const REGEX_FAIL    = "Variable name did not match required regex";

const BANNED_KEYWORDS = ["any", "Number", "number", "String", "string",
                         "Boolean", "boolean", "Undefined", "undefined"];


export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        const variableNameWalker = new VariableNameWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(variableNameWalker);
    }
}

/**
 * Configured with details needed to check a specific variable type.
 */
class VariableChecker {
    public varTags: string[];

    public caseCheck:          string  = "";
    public leadingUnderscore:  boolean = false;
    public trailingUnderscore: boolean = false;
    public banKeywords:        boolean = false;
    public regex:              RegExp  = null;

    constructor(opts: any[]) {
        this.varTags = opts.filter(v => contains(VALID_VAR_TAGS, v));

        if (contains(opts, PASCAL_OPTION)) {
            this.caseCheck = PASCAL_OPTION;
        } else if (contains(opts, CAMEL_OPTION)) {
            this.caseCheck = CAMEL_OPTION;
        } else if (contains(opts, SNAKE_OPTION)) {
            this.caseCheck = SNAKE_OPTION;
        } else if (contains(opts, UPPER_OPTION)) {
            this.caseCheck = UPPER_OPTION;
        }

        this.leadingUnderscore  = contains(opts, LEADING_UNDERSCORE_OPTION);
        this.trailingUnderscore = contains(opts, TRAILING_UNDERSCORE_OPTION);
        this.banKeywords        = contains(opts, BAN_KEYWORDS_OPTION);

        opts.forEach((opt) => {
            if (opt.regex !== undefined) {
                this.regex = new RegExp(opt.regex);
            }
        });
    }

    /**
     * return true if all of our tags are all in the input tags
     *  (ie. we match if we dont have a tag that prevents it)
     */
    public requiredTagsFound(proposedTags: string[]) {
        let matches = true;
        this.varTags.forEach((tag) => {
            if (!contains(proposedTags, tag)) {
                matches = false;
            }
        });
        return matches;
    }

    public checkName(name: ts.Identifier, walker: Lint.RuleWalker) {
        let variableName     = name.text;
        const firstCharacter = variableName.charAt(0);
        const lastCharacter  = variableName.charAt(variableName.length - 1);

        // start with regex test before we potentially strip off underscores
        if ((this.regex !== null) && !variableName.match(this.regex)) {
            walker.addFailure(walker.createFailure(name.getStart(), name.getWidth(), REGEX_FAIL));
        }

        // check leading and trailing underscore
        if ("_" === firstCharacter) {
            if (!this.leadingUnderscore) {
                walker.addFailure(walker.createFailure(name.getStart(), name.getWidth(), LEADING_FAIL));
            }
            variableName = variableName.slice(1);
        }

        if (("_" === lastCharacter) && (variableName.length > 0)) {
            if (!this.trailingUnderscore) {
                walker.addFailure(walker.createFailure(name.getStart(), name.getWidth(), TRAILING_FAIL));
            }
            variableName = variableName.slice(0,-1);
        }

        // check banned words
        if (this.banKeywords && contains(BANNED_KEYWORDS, variableName)) {
            walker.addFailure(walker.createFailure(name.getStart(), name.getWidth(), KEYWORD_FAIL));
        }

        // run case checks
        if ((PASCAL_OPTION === this.caseCheck) && !isPascalCased(variableName)) {
            walker.addFailure(walker.createFailure(name.getStart(), name.getWidth(), PASCAL_FAIL));
        } else if ((CAMEL_OPTION === this.caseCheck) && !isCamelCase(variableName)) {
            walker.addFailure(walker.createFailure(name.getStart(), name.getWidth(), CAMEL_FAIL));
        } else if ((SNAKE_OPTION === this.caseCheck) && !isSnakeCase(variableName)) {
            walker.addFailure(walker.createFailure(name.getStart(), name.getWidth(), SNAKE_FAIL));
        } else if ((UPPER_OPTION === this.caseCheck) && !isUpperCase(variableName)) {
            walker.addFailure(walker.createFailure(name.getStart(), name.getWidth(), UPPER_FAIL));
        }
    }
}


class VariableNameWalker extends Lint.RuleWalker {
    public checkers: VariableChecker[] = [];

    constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
        super(sourceFile, options);

        let sub_rules = options.ruleArguments;

        sub_rules.forEach((rule_opts: any[]) => {
            this.checkers.push(new VariableChecker(rule_opts));
        });
    }

    public visitClassDeclaration(node: ts.ClassDeclaration) {
        // classes declared as default exports will be unnamed
        if (node.name.kind === ts.SyntaxKind.Identifier) {
            const identifier = <ts.Identifier> node.name;
            this.checkName(identifier, this, this.getNodeTags(node, CLASS_TAG));
        }

        super.visitClassDeclaration(node);
    }

    public visitMethodDeclaration(node: ts.MethodDeclaration) {
        if (node.name.kind === ts.SyntaxKind.Identifier) {
            const identifier = <ts.Identifier> node.name;
            this.checkName(identifier, this, this.getNodeTags(node, METHOD_TAG));
        }

        super.visitMethodDeclaration(node);
    }

    public visitInterfaceDeclaration(node: ts.InterfaceDeclaration) {
        if (node.name.kind === ts.SyntaxKind.Identifier) {
            const identifier = <ts.Identifier> node.name;
            this.checkName(identifier, this, this.getNodeTags(node, INTERFACE_TAG));
        }

        super.visitInterfaceDeclaration(node);
    }

    // what is this?
    public visitBindingElement(node: ts.BindingElement) {
        if (node.name.kind === ts.SyntaxKind.Identifier) {
            const identifier = <ts.Identifier> node.name;
            this.checkName(identifier, this, this.getNodeTags(node, VARIABLE_TAG));
        }
        super.visitBindingElement(node);
    }

    public visitParameterDeclaration(node: ts.ParameterDeclaration) {
        if (node.name.kind === ts.SyntaxKind.Identifier) {
            const identifier = <ts.Identifier> node.name;
            this.checkName(identifier, this, this.getNodeTags(node, PARAMETER_TAG));
        }
        super.visitParameterDeclaration(node);
    }

    public visitPropertyDeclaration(node: ts.PropertyDeclaration) {
        if (node.name != null && node.name.kind === ts.SyntaxKind.Identifier) {
            const identifier = <ts.Identifier> node.name;
            this.checkName(identifier, this, this.getNodeTags(node, PROPERTY_TAG));
        }
        super.visitPropertyDeclaration(node);
    }

    public visitVariableDeclaration(node: ts.VariableDeclaration) {
        if (node.name.kind === ts.SyntaxKind.Identifier) {
            const identifier = <ts.Identifier> node.name;
            this.checkName(identifier, this, this.getNodeTags(node, VARIABLE_TAG));
        }
        super.visitVariableDeclaration(node);
    }

    public visitVariableStatement(node: ts.VariableStatement) {
        // skip 'declare' keywords
        if (!Lint.hasModifier(node.modifiers, ts.SyntaxKind.DeclareKeyword)) {
            super.visitVariableStatement(node);
        }
    }

    public visitFunctionDeclaration(node: ts.FunctionDeclaration) {
        if (node.name.kind === ts.SyntaxKind.Identifier) {
            const identifier = <ts.Identifier> node.name;
            this.checkName(identifier, this, this.getNodeTags(node, FUNCTION_TAG));
        }
        super.visitFunctionDeclaration(node);
    }

    protected checkName(name: ts.Identifier, walker: Lint.RuleWalker, varTags: string[]) {
        let matching_checker = this.getMatchingChecker(varTags);
        if (matching_checker !== null) {
            matching_checker.checkName(name, walker);
        }
    }

    protected getMatchingChecker(varTags: string[]): VariableChecker {
        let matching_checkers = this.checkers.filter(checker => checker.requiredTagsFound(varTags));
        if (matching_checkers.length > 0) {
            return matching_checkers[0];
        } else {
            return null;
        }
    }

    protected getNodeTags(node: ts.Node, primaryTag: string): string[] {
        let tags = [primaryTag];

        if (Lint.hasModifier(node.modifiers, ts.SyntaxKind.StaticKeyword)) {
            tags.push(STATIC_TAG);
        }
        if (Lint.hasModifier(node.modifiers, ts.SyntaxKind.ConstKeyword)) {
            tags.push(CONST_TAG);
        }

        if (Lint.hasModifier(node.modifiers, ts.SyntaxKind.PrivateKeyword)) {
            tags.push(PRIVATE_TAG);
        } else if (Lint.hasModifier(node.modifiers, ts.SyntaxKind.ProtectedKeyword)) {
            tags.push(PROTECTED_TAG);
        } else {
            tags.push(PUBLIC_TAG);
        }

        let nearest_body = nearestBody(node);
        if (!nearest_body.isSourceFile) {
            tags.push(LOCAL_TAG);
        }

        if (node.kind === ts.SyntaxKind.VariableDeclaration) {
            if (isConstVariable(<ts.VariableDeclaration>node)) {
                tags.push(CONST_TAG);
            }
        }
        return tags;
    }
}


function nearestBody(node: ts.Node): {isSourceFile: boolean, containingBody: ts.Node} {
    const VALID_PARENT_TYPES = [
        ts.SyntaxKind.SourceFile,
        ts.SyntaxKind.FunctionDeclaration,
        ts.SyntaxKind.FunctionExpression,
        ts.SyntaxKind.ArrowFunction,
        ts.SyntaxKind.MethodDeclaration,
    ];
    let ancestor = node.parent;

    while (ancestor && !contains(VALID_PARENT_TYPES, ancestor.kind)) {
        ancestor = ancestor.parent;
    }

    return {
        containingBody: ancestor,
        isSourceFile: (ancestor && ancestor.kind === ts.SyntaxKind.SourceFile) || !ancestor,
    };
}

function isConstVariable(node: ts.VariableDeclaration | ts.VariableStatement): boolean {
    const parentNode = (node.kind === ts.SyntaxKind.VariableDeclaration)
        ? (<ts.VariableDeclaration> node).parent
        : (<ts.VariableStatement> node).declarationList;

    return Lint.isNodeFlagSet(parentNode, ts.NodeFlags.Const);
}

function isPascalCased(name: string) {
    if (name.length <= 0) {
        return true;
    }

    const firstCharacter = name.charAt(0);
    return ((firstCharacter === firstCharacter.toUpperCase()) && name.indexOf("_") === -1);
}

function isCamelCase(name: string) {
    const firstCharacter = name.charAt(0);

    if (name.length <= 0) {
        return true;
    }

    if (!isLowerCase(firstCharacter)) {
        return false;
    }
    return name.indexOf("_") === -1;
}

function isSnakeCase(name: string) {
    return isLowerCase(name);
}

function isLowerCase(name: string) {
    return name === name.toLowerCase();
}

function isUpperCase(name: string) {
    return name === name.toUpperCase();
}

function contains(arr: any[], value: any): boolean {
   return arr.indexOf(value) !== -1;
}


/**
 * Original version based upon variable-name rule:
 *
 * @license
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */