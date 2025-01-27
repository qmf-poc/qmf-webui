/*
import {use as chaiUse, expect} from 'chai';
import {HelloWorldClass} from '../../src/hello-world';
import chaiString from 'chai-string';
import sinon from 'sinon';

chaiUse(chaiString);

describe('hello world mocha test', () => {
  const suffix = 'from HelloWorldClass';
  it('chai is working', () => {
    const helloWorld = new HelloWorldClass(suffix);
    expect(helloWorld.getHello()).to.endsWith(suffix);
  });
  it('sinon is working', () => {
    const helloWorld = new HelloWorldClass(suffix);
    const name = 'aaa';
    const stub = sinon.stub(HelloWorldClass, 'getName');
    stub.returns(name);
    expect(helloWorld.getHello()).to.equals(`Hello, ${name} - ${suffix}`);
  });
});
*/
