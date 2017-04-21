import * as ts from "typescript";
import * as Lint from "tslint";

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
   * "require-leading-underscore": requires the variable to have a leading underscore
   * "require-trailing-underscore": requires the variable to have a trailing underscore
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
const ALLOW_LEADING_UNDERSCORE_OPTION    = "allow-leading-underscore";
const ALLOW_TRAILING_UNDERSCORE_OPTION   = "allow-trailing-underscore";
const REQUIRE_LEADING_UNDERSCORE_OPTION  = "require-leading-underscore";
const REQUIRE_TRAILING_UNDERSCORE_OPTION = "require-trailing-underscore";
const BAN_KEYWORDS_OPTION                = "ban-keywords";

const CAMEL_FAIL    = "must be in camel case";
const PASCAL_FAIL   = "must be in pascal case";
const SNAKE_FAIL    = "must be in snake case";
const UPPER_FAIL    = "must be in uppercase";
const KEYWORD_FAIL  = "name clashes with keyword/type";
const LEADING_FAIL  = "name must not have leading underscore";
const TRAILING_FAIL = "name must not have trailing underscore";
const NO_LEADING_FAIL  = "name must have leading underscore";
const NO_TRAILING_FAIL = "name must have trailing underscore";
const REGEX_FAIL    = "name did not match required regex";

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

    public caseCheck:                 string  = "";
    public allowLeadingUnderscore:    boolean = false;
    public allowTrailingUnderscore:   boolean = false;
    public requireLeadingUnderscore:  boolean = false;
    public requireTrailingUnderscore: boolean = false;
    public banKeywords:        boolean = false;
    public regex:              RegExp | null  = null;

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

        this.allowLeadingUnderscore  = contains(opts, ALLOW_LEADING_UNDERSCORE_OPTION);
        this.allowTrailingUnderscore = contains(opts, ALLOW_TRAILING_UNDERSCORE_OPTION);
        this.requireLeadingUnderscore  = contains(opts, REQUIRE_LEADING_UNDERSCORE_OPTION);
        this.requireTrailingUnderscore = contains(opts, REQUIRE_TRAILING_UNDERSCORE_OPTION);
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

    protected failMessage(failMessage: string, tag: string) {
        return tag[0].toUpperCase() + tag.substr(1) + " " + failMessage;
    }

    public checkName(name: ts.Identifier, walker: Lint.RuleWalker, tag: string) {
        let variableName     = name.text;
        const firstCharacter = variableName[0];
        const lastCharacter  = variableName[variableName.length - 1];

        // start with regex test before we potentially strip off underscores
        if ((this.regex !== null) && !variableName.match(this.regex)) {
            walker.addFailure(walker.createFailure(name.getStart(), name.getWidth(),
                              this.failMessage(REGEX_FAIL, tag)));
        }

        // check banned words before we potentially strip off underscores
        if (this.banKeywords && contains(BANNED_KEYWORDS, variableName)) {
            walker.addFailure(walker.createFailure(name.getStart(), name.getWidth(),
                              this.failMessage(KEYWORD_FAIL, tag)));
        }

        // check leading and trailing underscore
        if ("_" === firstCharacter) {
            if (!this.allowLeadingUnderscore && !this.requireLeadingUnderscore) {
                walker.addFailure(walker.createFailure(name.getStart(), name.getWidth(),
                                  this.failMessage(LEADING_FAIL, tag)));
            }
            variableName = variableName.slice(1);
        } else if (this.requireLeadingUnderscore) {
            walker.addFailure(walker.createFailure(name.getStart(), name.getWidth(),
                              this.failMessage(NO_LEADING_FAIL, tag)));
        }

        if (("_" === lastCharacter) && (variableName.length > 0)) {
            if (!this.allowTrailingUnderscore && !this.requireTrailingUnderscore) {
                walker.addFailure(walker.createFailure(name.getStart(), name.getWidth(),
                                  this.failMessage(TRAILING_FAIL, tag)));
            }
            variableName = variableName.slice(0, -1);
        } else if (this.requireTrailingUnderscore) {
            walker.addFailure(walker.createFailure(name.getStart(), name.getWidth(),
                              this.failMessage(NO_TRAILING_FAIL, tag)));
        }

        // run case checks
        if ((PASCAL_OPTION === this.caseCheck) && !isPascalCased(variableName)) {
            walker.addFailure(walker.createFailure(name.getStart(), name.getWidth(),
                              this.failMessage(PASCAL_FAIL, tag)));
        } else if ((CAMEL_OPTION === this.caseCheck) && !isCamelCase(variableName)) {
            walker.addFailure(walker.createFailure(name.getStart(), name.getWidth(),
                              this.failMessage(CAMEL_FAIL, tag)));
        } else if ((SNAKE_OPTION === this.caseCheck) && !isSnakeCase(variableName)) {
            walker.addFailure(walker.createFailure(name.getStart(), name.getWidth(),
                              this.failMessage(SNAKE_FAIL, tag)));
        } else if ((UPPER_OPTION === this.caseCheck) && !isUpperCase(variableName)) {
            walker.addFailure(walker.createFailure(name.getStart(), name.getWidth(),
                              this.failMessage(UPPER_FAIL, tag)));
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
        this.checkName(node, CLASS_TAG);
        super.visitClassDeclaration(node);
    }

    public visitMethodDeclaration(node: ts.MethodDeclaration) {
        this.checkName(node, METHOD_TAG);
        super.visitMethodDeclaration(node);
    }

    public visitInterfaceDeclaration(node: ts.InterfaceDeclaration) {
        this.checkName(node, INTERFACE_TAG);
        super.visitInterfaceDeclaration(node);
    }

    // what is this?
    public visitBindingElement(node: ts.BindingElement) {
        this.checkName(node, VARIABLE_TAG);
        super.visitBindingElement(node);
    }

    public visitParameterDeclaration(node: ts.ParameterDeclaration) {
        const parameterProperty: boolean =
            Lint.hasModifier(node.modifiers, ts.SyntaxKind.PublicKeyword) ||
            Lint.hasModifier(node.modifiers, ts.SyntaxKind.ProtectedKeyword) ||
            Lint.hasModifier(node.modifiers, ts.SyntaxKind.PrivateKeyword);

        this.checkName(node, parameterProperty ? PROPERTY_TAG : PARAMETER_TAG);
        super.visitParameterDeclaration(node);
    }

    public visitPropertyDeclaration(node: ts.PropertyDeclaration) {
        this.checkName(node, PROPERTY_TAG);
        super.visitPropertyDeclaration(node);
    }

    public visitSetAccessor(node: ts.SetAccessorDeclaration) {
            this.checkName(node, PROPERTY_TAG);
        super.visitSetAccessor(node);
    }

    public visitGetAccessor(node: ts.GetAccessorDeclaration) {
        this.checkName(node, PROPERTY_TAG);
        super.visitGetAccessor(node);
    }

    public visitVariableDeclaration(node: ts.VariableDeclaration) {
        this.checkName(node, VARIABLE_TAG);
        super.visitVariableDeclaration(node);
    }

    public visitVariableStatement(node: ts.VariableStatement) {
        // skip 'declare' keywords
        if (!Lint.hasModifier(node.modifiers, ts.SyntaxKind.DeclareKeyword)) {
            super.visitVariableStatement(node);
        }
    }

    public visitFunctionDeclaration(node: ts.FunctionDeclaration) {
        this.checkName(node, FUNCTION_TAG);
        super.visitFunctionDeclaration(node);
    }

    protected checkName(node: ts.Declaration, tag: string) {
        if (node.name && node.name.kind === ts.SyntaxKind.Identifier) {
            const matching_checker = this.getMatchingChecker(this.getNodeTags(node, tag));
            if (matching_checker !== null) {
                matching_checker.checkName(<ts.Identifier> node.name, this, tag);
            }
        }
    }

    protected getMatchingChecker(varTags: string[]): VariableChecker | null {
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

        if (primaryTag === PROPERTY_TAG || primaryTag === METHOD_TAG) {
            if (Lint.hasModifier(node.modifiers, ts.SyntaxKind.PrivateKeyword)) {
                tags.push(PRIVATE_TAG);
            } else if (Lint.hasModifier(node.modifiers, ts.SyntaxKind.ProtectedKeyword)) {
                tags.push(PROTECTED_TAG);
            } else {
                // xxx: should fix so only get public when it is a property
                tags.push(PUBLIC_TAG);
            }
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


function nearestBody(node: ts.Node): {isSourceFile: boolean, containingBody: ts.Node | undefined} {
    const VALID_PARENT_TYPES = [
        ts.SyntaxKind.SourceFile,
        ts.SyntaxKind.FunctionDeclaration,
        ts.SyntaxKind.FunctionExpression,
        ts.SyntaxKind.ArrowFunction,
        ts.SyntaxKind.MethodDeclaration,
        ts.SyntaxKind.Constructor,
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

    return !parentNode || Lint.isNodeFlagSet(parentNode, ts.NodeFlags.Const);
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
