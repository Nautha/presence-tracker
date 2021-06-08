const express = require('express');

import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(require('chai-as-promised'));
chai.use(chaiHttp);
const expect = chai.expect;

const {helloRouter} = require('./hello');

describe('Hello World Endpoint', () => {
    describe('GET /hello', async () => {
        it('should return hello world', async () => {
            const app = express();
            app.use(helloRouter);

            const res = await chai.request(app).get('/hello');
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body.hello).to.equal('World');
        })
    })
})