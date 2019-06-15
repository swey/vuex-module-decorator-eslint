/**
 * @fileoverview Tests for no-invalid-store-methods rule.
 * @author Sebastian Weyrauch
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-invalid-store-methods');
const RuleTester = require('eslint').RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const validCode = `@Module
export default class StoreModule extends VuexModule {
  	public get age(): void {
    	return 50;
    }

	@Action
	public async loadUser() {
    	this.setName('Just a test');
	}	

	@Mutation
	private setName(name: string): void {
	}
}`;

const codeWithInvalidMethodType = `
@Module
export default class StoreModule extends VuexModule {
	public setName(name: string): void {
	}
}
`;

const codeWithTooManyParams = `
@Module
export default class StoreModule extends VuexModule {
	@Mutation
	private setMultiple(a: string, b: string): void {
	}
}
`;

const ruleTester = new RuleTester();
ruleTester.run('no-invalid-store-methods', rule, {
	valid: [{
		code: validCode
	}],
	invalid: [
		{
			code: codeWithInvalidMethodType,
			errors: [
				{
					messageId: 'invalidMethodType'
				}
			]
		},
		{
			code: codeWithTooManyParams,
			errors: [
				{
					messageId: 'onlyOneParamSupported'
				}
			]
		}
	]
});
