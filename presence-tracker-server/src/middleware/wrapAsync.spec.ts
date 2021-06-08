import * as chai from 'chai';
chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));
const expect = chai.expect;
import * as sinon from 'sinon';

const {wrapAsync} = require('./wrapAsync');

describe('wrapAsync', () => {
    it('should call next on success', async () => {
        const response = sinon.fake();

        const next = sinon.fake();
        const fn = sinon.fake.resolves(response);

        const req = sinon.fake();

        const res = sinon.fake();

        await wrapAsync(fn)(req, res, next);

        expect(fn).to.have.been.calledWith(req, res);
        expect(next).to.have.been.calledWith(response);
    });

    it('should call next on error', async () => {
        const error = new Error();

        const next = sinon.fake();
        const fn = sinon.fake.rejects(error);

        const req = sinon.fake();

        const res = sinon.fake();


        await wrapAsync(fn)(req, res, next);

        expect(fn).to.have.been.calledWith(req, res);
        expect(next).to.have.been.calledWith(error);
    });
});