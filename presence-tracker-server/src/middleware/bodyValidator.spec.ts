import * as chai from 'chai';
chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));
const expect = chai.expect;
const sinon = require('sinon');

const {validateBody} = require('./bodyValidator');

const testSchema = {
    type: 'object',
    properties: {
        param1: {
            type: 'string'
        },
        param2: {
            type: 'string'
        }
    },
    required: ['param1', 'param2'],
    additionalProperties: false
};

describe('bodyValidator', () => {
    it('should not throw error on correct number of fields', async () => {
        const testParams = {
            param1: 'test',
            param2: 'test'
        };

        const next = sinon.fake();

        const req = {
            body: testParams
        };

        const jsonFake = sinon.fake();
        const res = {
            app: {locals: {}},
            status: sinon.fake.returns({json: jsonFake}),
            json: jsonFake
        };

        await validateBody(testSchema)(req, res, next);

        expect(next).to.have.been.calledOnce;
    });

    it('should fail on missing fields', async () => {
        const testParams = {
            param1: 'test'
        };

        const next = sinon.fake();

        const req = {
            body: testParams
        };

        const jsonFake = sinon.fake();
        const res = {
            app: {locals: {}},
            status: sinon.fake.returns({json: jsonFake}),
            json: jsonFake
        };

        const testResponse = {
            message: 'Missing fields',
            reason: ["requires property \"param2\""]
        };

        await validateBody(testSchema)(req, res, next);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.have.been.calledWith(testResponse);
    });

    it('should fail on additional fields', async () => {
        const testParams = {
            param1: 'test',
            param2: 'test',
            additional: 'test'
        };

        const next = sinon.fake();

        const req = {
            body: testParams
        };

        const jsonFake = sinon.fake();
        const res = {
            app: {locals: {}},
            status: sinon.fake.returns({json: jsonFake}),
            json: jsonFake
        };

        const testResponse = {
            message: 'Missing fields',
            reason: ["is not allowed to have the additional property \"additional\""]
        };

        await validateBody(testSchema)(req, res, next);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.have.been.calledWith(testResponse);
    });
});