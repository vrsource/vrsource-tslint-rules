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

## conditional-expression-parens

Rule to enforce the use of parentheses each clause of a conditional when they
are not simple expressions of a single indentifier or calling expression.

```javascript
"conditional-expression-parens": true
```

## dot-notation-rule

In JavaScript, one can access properties using the dot notation (foo.bar)
or square-bracket notation (foo["bar"]). However, the dot notation is
often preferred because it is easier to read, less verbose, and works
better with aggressive JavaScript minimizers.

This rule is aimed at maintaining code consistency and improving code
readability by encouraging use of the dot notation style whenever possible.
As such, it will warn when it encounters an unnecessary use
of square-bracket notation.

See: http://eslint.org/docs/rules/dot-notation

```javascript
"dot-notation": [
    true,
    { "allow-pattern": "^[a-z]+(_[a-z]+)+$" }
]
```

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
   ["property", "private",   "camel", "require-leading-underscore"],
   ["property", "protected", "camel", "allow-leading-underscore"],
   ["variable", "local",     "snake"],
   ["variable", "const",     "upper"],
   ["variable",              "camel", {"regex": "^g.*$"}],
   ["method", "private",     "camel", "require-leading-underscore"],
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

## literal-spacing

Rule to enforce consistent spacing inside array and object literals.

See: eslint: object-curly-spacing and array-bracket-spacing

```javascript
"literal-spacing": [
    true,
    {
        "array": ["always"],
        "object": ["never"],
        "import": ["always"]
    }
]
```

## max-params

Rule to enforce a maximum number of parameters for functions and methods.

```javascript
"max-params": [
    true,
    3
]
```

## multiline-arrow

Rule to enforce various checks arrow functions that span multiple lines.

```javascript
"multiline-arrow": [
    true,
    "require-parens",
    "require-block"
]
```

## no-duplicate-imports

This rule validates that all imports from a
single module exist in a single import statement;

See: http://eslint.org/docs/rules/no-duplicate-imports

```javascript
"no-duplicate-imports": true
```

## no-param-reassign

Flag any place where a function parameter is assigned
a value in the body of a function.

See: eslint no-param-reassign

```javascript
"no-param-reassign": true
```

Note: for this rule to work correctly you also need to use `no-shadowed-variable`

## no-jasmine-focus

Flags any place developers left fit or fdescribe calls in their code.

```javascript
"no-jasmine-focus": true
```

## prefer-case-blocks

This rule checks to make sure that all case clauses use a block
around the statements of the case.  This helps to protect against
issues with lexcical declarations that would become visible to the
entire switch statement.

To maintain consistency, the rule requires a block in all cases.

```javascript
"prefer-case-blocks": true
```

## prefer-literal

Flags locations where code calls "new Object()", "new Array()", "new Function()""

```javascript
"prefer-literal": [
    true,
    "object",
    "function",
    "array"
]
```

# Changelog

  * 5.1.1
    * Move chokidar-cli to devDependencies
  * 5.1.0
    * Updated to work with tslint 5.1.0
    * Update package.json to include build and test scripts
    * Cleaned up the tslint and tsconfig options used
  * 4.0.1
    * Add "main" entry to package.json to allow importing
  * 4.0.0
    * Update versioning to track major version of tslint
    * Update to tslint 4.x and TS 2.x
    * Remove `prefer-const` rule as tslint now supports it
  * 0.15.0
    * ajaff: Refactor and extend ext-variable-name options
      * simplify RuleWalker visitor methods
      * add support for validating property accessors
      * improve failure messages
      * add require-leading/training-underscore options
      * validate parameter properties as properties
  * 0.14.1
    * Add import options to literal-spacing rule
  * 0.13.1
    * Fix bugs in ext-variable-name rule.
       * variables in constructors didn't get the 'local' tag
       * variables could end up with 'public' tag that were not
         properties or methods
  * 0.13.0
    * Add no-jasmine-focus rule.
  * 0.12.1
    * Fix bug in dot-notation where invalid identifiers were not allowed.
  * 0.12.0
    * Added literal-spacing rule
  * 0.11.0
    * Added no-param-reassign rule
  * 0.10.0
    * Added prefer-case-blocks rule
  * 0.9.0
    * Add dot-notation rule
  * 0.8.0
    * Add conditional-expression-parens rule
  * 0.7.0
    * Add prefer-literal rule
  * 0.6.0
    * Add max-params rule
  * 0.5.0
    * Add no-duplicate-imports
  * 0.4.0
    * Add multiline-arrow rule
  * 0.3.0
    * Add prefer-const rule
  * 0.2.0
    * Remove demonstration rule
  * 0.1.0
    * First version

# Contributing

Contributions are greatly appreciated.  Please fork the repository and submit a pull request.

## Contributors

  * ajafff
  * abdulmoizeng
  * timocov

# Development

## Development steps

The command `npm run test` will run tests locally.

To add a new rule:
  - Add the rule's .ts file to the /rules directory
  - Add one or more tests in the test/rules directory
  - Use run_tests.sh to build and run the tests
  - (optional) The .vscode directory includes settings to run and debug rules in vscode.
     - Just modify the "args" entry to point to the rule test case to run

Notes for how to build new rules and tests:

  - http://palantir.github.io/tslint/develop/custom-rules/
     - https://github.com/palantir/tslint/blob/master/src/language/walker/syntaxWalker.ts
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

## Release Process

  * Update version in package.json
  * Update Changelog
  * git commit
  * git tag -a vX.Y.Z -m "Tag Release"
  * git push --tags
  * npm publish
