# eslint-plugin-classname-arg-last

An ESLint plugin to enforce that the `className` parameter is the last argument in `cn` or `twMerge` function calls, ensuring consistent and predictable usage in Tailwind CSS projects.

[![npm version](https://img.shields.io/npm/v/eslint-plugin-classname-arg-last.svg)](https://www.npmjs.com/package/eslint-plugin-classname-arg-last)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Why Use This Plugin?

In Tailwind CSS projects, utility functions like `cn` (from `clsx` or similar libraries) or `twMerge` (from `tailwind-merge`) are commonly used to combine class names. Placing `className` as the last argument ensures consistency, improves readability, and aligns with common conventions. This plugin enforces this pattern by reporting errors when `className` is not the last argument in these function calls.

## Installation

Install the plugin as a development dependency:

```bash
npm install eslint-plugin-classname-arg-last --save-dev
```

> Note: Ensure you have ESLint installed (npm install eslint --save-dev) and configured in your project.

## Usage

Configure the plugin in your ESLint configuration file to enable the classname-arg-last rule. The configuration differs slightly depending on your ESLint version (v7, v8, or v9) due to changes in ESLint's configuration format.

### Configuring for ESLint v7 or v8 (`.eslintrc` Format)

For ESLint v7 or v8, use the `.eslintrc` configuration format (e.g., `.eslintrc.json`, `.eslintrc.yml`, or `.eslintrc.js`).

Example `.eslintrc.json`:

```json
{
  "plugins": ["classname-arg-last"],
  "rules": {
    "classname-arg-last/classname-arg-last": "error"
  }
}
```

### Configuring for ESLint v9 (Flat Config Format)

For ESLint v9, use the flat config format in an `eslint.config.js` file.

```javascript
module.exports = [
  {
    plugins: {
      "classname-arg-last": require("eslint-plugin-classname-arg-last"),
    },
    rules: {
      "classname-arg-last/classname-arg-last": "error",
    },
  },
];
```

## Examples

### ❌ Incorrect (Reported as Errors):

```javascript
// className is not the last argument
cn("base", className, "conditional");
// Error: 'className' must be the last argument of cn

twMerge(className, "base");
// Error: 'className' must be the last argument of twMerge
```

### ✅Correct (Passes Linting):

```javascript
// className is the last argument
cn("base", "conditional", className);
twMerge("base", className);

// No className, so rule does not apply
cn("base");
twMerge();

// Other functions are ignored
otherFunction("base", className);
```
