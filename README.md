# Purpose

This project includes a variety of tslint rules we have found useful for our projects.

# Usage

# Changelog

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

# Backlog - Not Enforced (yet)

High Priority
-------------

"prefer-const"  - MS Rule: https://github.com/palantir/tslint/issues/491
"one-var"       - accepting: https://github.com/palantir/tslint/issues/525
                - https://github.com/Microsoft/tslint-microsoft-contrib/blob/master/src/noMultipleVarDeclRule.ts
"no-param-reassign" - direct and properties
"no-duplicate-imports"
arrow function: allow no parens, no block if single line (ex: in a forEach), else require parens and block
arrow-body-style: p5 single line style

Medium Priority
---------------
class documentation enforcement  (required things documented, including params and props)
   - request: https://github.com/palantir/tslint/issues/623
"space-in-parens" - don't allow it (request: https://github.com/palantir/tslint/issues/235)
"space-in-brackets" - don't allow it
ternary parens
"max-params"
"quote-props" - as needed
"prefer-rest-params"    - don't use arguments
"prefer-arrow-callback" - use them where you should
"no-iterators"
"dot-notation" - no obj["blah"]
"no-case-declarations" - use blocks in case

"no-array-constructor" - https://github.com/Microsoft/tslint-microsoft-contrib/blob/master/src/preferArrayLiteralRule.ts
"no-new-object"
"no-new-func"


Low Priority
------------
"padded-blocks" - no extra padding
"no-loop-func"
reserved-words as keys
                - Maybe: https://github.com/Microsoft/tslint-microsoft-contrib/blob/master/src/noReservedKeywordsRule.ts

no default modules
no shortcuts   - may come in through typescript undefined / nullable
               - blocked on: https://github.com/palantir/tslint/issues/253
"object-shorthand"
"no-useless-constructor"
"sort-imports"
"no-nested-ternary"

Unsure
------
"space-before-blocks" -- pretty much handled