module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure that the className parameter is the last argument in cn or tw-merge calls",
      category: "Best Practices",
      recommended: false,
      url: "https://github.com/Hexi1997/eslint-plugin-classname-arg-last",
    },
    schema: [],
    messages: {
      classNameNotLast:
        "'className' must be the last argument of {{ functionName }}",
    },
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
        if (args.length < 2) {
          return;
        }

        let classNameIndex = -1;
        for (let i = 0; i < args.length; i++) {
          const arg = args[i];
          if (arg.type === "Identifier" && arg.name === "className") {
            classNameIndex = i;
            break;
          }
          // Check for MemberExpression: props.className
          if (
            arg.type === "MemberExpression" &&
            arg.object.type === "Identifier" &&
            arg.object.name === "props" &&
            arg.property.type === "Identifier" &&
            arg.property.name === "className"
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
          });
        }
      },
    };
  },
};
