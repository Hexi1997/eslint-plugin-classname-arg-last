const { RuleTester } = require("@typescript-eslint/rule-tester");
const rule = require("../../lib/rules/classname-arg-last");

// Map Mocha's after to RuleTester.afterAll
RuleTester.afterAll = require("mocha").after;

describe("classname-last", () => {
  const ruleTester = new RuleTester({
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  });

  it("should handle valid and invalid cases correctly", () => {
    ruleTester.run("classname-last", rule, {
      valid: [
        "cn('base', 'conditional', className);",
        "twMerge('base', className);",
        "cn('base');",
        "twMerge();",
        "otherFunction('base', className);",
      ],
      invalid: [
        {
          code: "cn('base', className, 'conditional');",
          errors: [
            {
              message: "'className' must be the last argument of cn",
              type: "Identifier",
            },
          ],
        },
        {
          code: "twMerge(className, 'base');",
          errors: [
            {
              message: "'className' must be the last argument of twMerge",
              type: "Identifier",
            },
          ],
        },
      ],
    });
  });
});
