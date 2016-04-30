# Purpose

This project includes a variety of tslint rules we have found useful for our projects.

# Usage

Install from npm to your devDependencies  (https://www.npmjs.com/package/vrsource-tslint-rules)

```
npm install --save-dev vrsource-tslint-rules
```

Configure tslint to use the vrsource-tslint-rules folder:

Add the following path to the `rulesDirectory` setting in your `tslint.json` file:

```
{
   "rulesDirectory": ["node_modules/vrsource-tslint-rules/rules"]
   "rules": {
     ...
   }
}
```

Now configure some of the new rules.

# Rules

## ext-variable-name

This rule provides extensive support for customizing allowable variable names
for a wide variety of variable tags.  The rule is configured by setting up a
list of sub-rules that specify the tags of variables to check and the checks
to perform on the variable's name.  The sub-rules are checked in order
and the first one that matches the tags of variable being checked is the
only one that is used.

An example set of sub-rules for an example coding standard is shown below.

```json
ext-variable-name: [
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

## prefer-const

Prefer the use of const keyword instead of let for values that are never assigned to

```json
"prefer-const": true
```

note: this rule is copied from the typescript project.

## multiline-arrow

Rule to enforce various checks arrow functions that span multiple lines.

```javascript
"multiline-arrow": [
    true,
    "require-parens",
    "require-block"
]
```


# Changelog

# 0.4.0

  * Add multiline-arrow rule

# 0.3.0

  * Add prefer-const rule

# 0.2.0

  * Remove demonstration rule

# 0.1.0

  * First version

# Contributing

Contributions are greatly appreciated.  Please fork the repository and submit a pull request.

# Development

## Development steps

The run_tests.sh script will run the tests locally.

To add a new rule:
  - Add the rule's .ts file to the /rules directory
  - Add one or more tests in the test/rules directory
  - Use run_tests.sh to build and run the tests
  - (optional) The .vscode directory includes settings to run and debug rules in vscode.

Notes for how to build new rules and tests:

  - http://palantir.github.io/tslint/develop/custom-rules/
  - http://palantir.github.io/tslint/develop/testing-rules/

## Resources

  * AST explorer: https://astexplorer.net/
  * Typescript Compiler API: https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API
  * AST Dive:  https://basarat.gitbooks.io/typescript/content/docs/compiler/ast.html

## Example Rules

  * Typescript project rules: https://github.com/Microsoft/TypeScript/pull/4458
  * https://github.com/mgechev/codelyzer
  * https://github.com/Microsoft/tslint-microsoft-contrib
  * https://github.com/buzinas/tslint-eslint-rules

