const { RuleTester } = require("@typescript-eslint/rule-tester");
const rule = require("../../lib/rules/classname-arg-last");

// Map Mocha's after to RuleTester.afterAll
RuleTester.afterAll = require("mocha").after;

describe("classname-arg-last", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  });

  it("should handle valid and invalid cases correctly", () => {
    ruleTester.run("classname-arg-last", rule, {
      valid: [
        "cn('base', 'conditional', className);",
        "cn('base', 'conditional', props.className);",
        "twMerge('base', className);",
        "cn('base');",
        "twMerge();",
        "otherFunction('base', className);",
      ],
      invalid: [
        {
          code: "cn('base', className, 'conditional');",
          output: "cn('base', 'conditional', className);", // ✅ autofix result
          errors: [
            {
              message: "'className' must be the last argument of cn",
              type: "Identifier",
            },
          ],
        },
        {
          code: "twMerge(className, 'base');",
          output: "twMerge('base', className);", // ✅ autofix result
          errors: [
            {
              message: "'className' must be the last argument of twMerge",
              type: "Identifier",
            },
          ],
        },
        {
          code: "cn(props.className, 'base');",
          output: "cn('base', props.className);", // ✅ autofix result
          errors: [
            {
              message: "'className' must be the last argument of cn",
              type: "MemberExpression",
            },
          ],
        },
      ],
    });
  });
});
