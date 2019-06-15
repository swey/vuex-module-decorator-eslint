/**
 * @fileoverview Rule to disallow invalid methods in vuex stores.
 * @author Sebastian Weyrauch
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'disallow invalid methods in vuex stores',
			category: 'Possible Errors',
			recommended: true
		},
		fixable: null,  // or 'code' or 'whitespace'
		schema: [{
			type: 'array',
			minItems: 1,
			items: {
				type: 'string'
			}
		}],
		messages: {
			onlyOneParamSupported: 'Only one parameter supported in methods of vuex stores',
			invalidMethodType: 'Only getter methods, actions and mutations are supported in vuex stores'
		}
	},

	create(context) {
		let isVuexStoreModule = false;

		return {
			ClassDeclaration(node) {
				// We could also check node.parent.parent.superClass in the MethodDefinition or "node.decorators && node.decorators.some(decorator => decorator.expression.callee.name === 'Module')"
				if (node.superClass && node.superClass.name === 'VuexModule' ) {
					isVuexStoreModule = true;
				}
			},

			MethodDefinition(node) {
				if (isVuexStoreModule && node.kind !== 'get' && (!node.decorators || !node.decorators.length)) {
					context.report({
						node,
						messageId: 'invalidMethodType',
						data: {
							name: node.key.name
						}
					});
				}

				if (isVuexStoreModule && node.value.params.length > 1) {
					context.report({
						node: node.value.params[1],
						messageId: 'onlyOneParamSupported',
						data: {
							name: node.key.name
						}
					});
				}
			}
		};
	}
};
