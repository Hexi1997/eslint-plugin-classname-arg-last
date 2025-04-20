module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure that the className parameter is the last argument in cn or twMerge calls",
      category: "Best Practices",
      recommended: false,
      url: "https://github.com/Hexi1997/eslint-plugin-classname-arg-last",
    },
    schema: [],
    messages: {
      classNameNotLast:
        "'className' must be the last argument of {{ functionName }}",
    },
    fixable: "code",
  },

  create(context) {
    return {
      CallExpression(node) {
        const callee = node.callee;
        const functionName = callee.name;
        if (!["cn", "twMerge"].includes(functionName)) {
          return;
        }

        const args = node.arguments;
        if (args.length < 2) return;

        let classNameIndex = -1;
        for (let i = 0; i < args.length; i++) {
          const arg = args[i];

          if (
            (arg.type === "Identifier" && arg.name === "className") ||
            (arg.type === "MemberExpression" &&
              arg.object.type === "Identifier" &&
              arg.object.name === "props" &&
              arg.property.type === "Identifier" &&
              arg.property.name === "className")
          ) {
            classNameIndex = i;
            break;
          }
        }

        if (classNameIndex !== -1 && classNameIndex !== args.length - 1) {
          context.report({
            node: args[classNameIndex],
            messageId: "classNameNotLast",
            data: { functionName },
            fix(fixer) {
              const sourceCode = context.getSourceCode();

              const classNameArg = args[classNameIndex];
              const classNameText = sourceCode.getText(classNameArg);

              // 删除原始位置的 className 参数
              const removeRange = [
                args[classNameIndex].range[0],
                // 如果后面还有逗号，要一并删掉
                args[classNameIndex + 1]
                  ? args[classNameIndex + 1].range[0]
                  : args[classNameIndex].range[1],
              ];

              const lastArg = args[args.length - 1];
              const insertAfter = lastArg.range[1];

              return [
                fixer.removeRange(removeRange),
                fixer.insertTextAfterRange(
                  [lastArg.range[1], lastArg.range[1]],
                  `, ${classNameText}`
                ),
              ];
            },
          });
        }
      },
    };
  },
};
