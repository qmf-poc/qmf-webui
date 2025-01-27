import {use as chaiUse, expect} from 'chai';
import chaiString from 'chai-string';
import qmfService from '../../src/qmf';

chaiUse(chaiString);

describe('qmf integration tests', () => {
  it('chai is working', async () => {
    const qmf = qmfService;
    const r = await qmf.search('db2inst');
    console.log(r);
  });
  /*
  it('sinon is working', () => {
    const helloWorld = new HelloWorldClass(suffix);
    const name = 'aaa';
    const stub = sinon.stub(HelloWorldClass, 'getName');
    stub.returns(name);
    expect(helloWorld.getHello()).to.equals(`Hello, ${name} - ${suffix}`);
  });
   */
});
