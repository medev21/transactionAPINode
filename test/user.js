//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const User = require('../models/userSchema');

//require testing dev dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
let should = chai.should();

chai.use(chaiHttp);

describe('Users',() => {
    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        });
    });

    describe('/GET users',() => {
        it('it should GET all the users', (done) => {
            chai.request(server)
            .get('/api/users')
            .end((err,res) => {
                res.should.have.status(404);
                res.body.should.be.an('Object');
                res.body.should.have.property('message').eql('No entries found');
                // res.body.message.eql('No entries found');
                // res.body.length.should.be.eql(0);
                done();
            });
        });
    });
});