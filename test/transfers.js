//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Transfer = require('../models/transferSchema');

//require testing dev dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const should = chai.should();

chai.use(chaiHttp);

describe('Transfers',() => {
    beforeEach((done) => {
        Transfer.deleteMany({}, (err) => {
            done();
        });
    });

    describe('/GET transfer',() => {
        it('it should GET all the transfer - empty list', (done) => {
            chai.request(server)
            .get('/api/transfers')
            .end((err,res) => {
                res.should.have.status(404);
                res.body.should.be.an('Object');
                res.body.should.have.property('message').eql('No entries found');
                done();
            });
        });
    });
});