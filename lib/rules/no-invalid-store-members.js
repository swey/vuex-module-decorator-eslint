/**
 * @fileoverview Rule to disallow members with a non-literal type in vuex stores.
 * @author Sebastian Weyrauch
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	meta: {
		type: 'suggestion',
		docs: {
			description: 'disallow members with a non-literal type in vuex stores',
			category: 'Possible Errors',
			recommended: true
		},
		fixable: null,  // or 'code' or 'whitespace'
		schema: null,
		messages: {
			onlyLiterals: 'Only literals (string, number, boolean, object, array) can be stored in vuex states'
		}
	},

	create(context) {
		const allowedDefaultValueTypes = ['Literal', 'ArrayExpression', 'ObjectExpression'];

		let isVuexStoreModule = false;

		return {
			ClassDeclaration(node) {
				// We could also check node.parent.parent.superClass in the MethodDefinition or "node.decorators && node.decorators.some(decorator => decorator.expression.callee.name === 'Module')"
				if (node.superClass && node.superClass.name === 'VuexModule' ) {
					isVuexStoreModule = true;
				}
			},

			ClassProperty(node) {
				if (node.value && !allowedDefaultValueTypes.includes(node.value.type)) {
					context.report({
						node: node.value,
						messageId: 'onlyLiterals'
					});
				}
			}
		};
	}
};
