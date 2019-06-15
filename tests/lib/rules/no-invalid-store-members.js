/**
 * @fileoverview Tests for no-invalid-store-members rule.
 * @author Sebastian Weyrauch
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-invalid-store-members');
const RuleTester = require('eslint').RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const validCode = `@Module
export default class StoreModule extends VuexModule {
  	public a: string = 'a';
  	public b: number = 1;
  	public c: boolean = true;
  	public d: any = { a: 1, b: 2 };
  	public e: string[] = ['a', 'b'];
  	public f: string | null = null;
}`;

const invalidCode = `@Module
export default class StoreModule extends VuexModule {
  	public a = () => true;
}`;

const ruleTester = new RuleTester();
ruleTester.run('no-invalid-store-members', rule, {
	valid: [{
		code: validCode
	}],
	invalid: [
		{
			code: invalidCode,
			errors: [
				{
					messageId: 'onlyLiterals'
				}
			]
		}
	]
});
