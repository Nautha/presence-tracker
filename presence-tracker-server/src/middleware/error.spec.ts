const express = require('express');

import * as chai from 'chai';
import chaiHttp = require('chai-http');

chai.use(require('chai-as-promised'));
chai.use(chaiHttp);
const expect = chai.expect;

import {errorHandler} from "./error";

describe('Errors Middleware', () => {
   let app;
   beforeEach(() => {
       app = express();
   });

   it('should not react on no errors', async () => {
       app.get('/', (req, res) => {
           res.json({
               success: true
           })
       });
       app.use(errorHandler);

       const res = await chai.request(app).get('/');

       expect(res).to.have.status(200);
       expect(res).to.be.json;
       expect(res.body.success).to.be.true;
   });

    it('should report an error on error thrown', async () => {
        app.get('/', () => {
            throw new Error('Testerror ');
        });

        app.use(errorHandler);

        const res = await chai.request(app)
            .get('/');

        expect(res).to.have.status(500);
        expect(res).to.be.json;
        expect(res.body.message).to.equal('Internal Server Error');
    });
});