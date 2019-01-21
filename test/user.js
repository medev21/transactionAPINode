//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const User = require('../models/userSchema');

//require testing dev dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const should = chai.should();

chai.use(chaiHttp);

describe('Users',() => {
    beforeEach((done) => {
        User.deleteMany({}, (err) => {
            done();
        });
    });

    describe('/GET users',() => {
        it('it should GET all the users - empty list', (done) => {
            chai.request(server)
            .get('/api/users')
            .end((err,res) => {
                res.should.have.status(404);
                res.body.should.be.an('Object');
                res.body.should.have.property('message').eql('No entries found');
                done();
            });
        });
    });

    describe('/POST user',() => {
        it('it should be an error when required param is not entered', (done) => {
            const user = {
                firstName: "martin",
                lastName: '',
                email: "test@test.com"
            }

            chai.request(server)
            .post('/api/users')
            .send(user)
            .end((err,res) => {
                res.should.have.status(500);
                res.body.should.be.an('Object');
                res.body.should.have.property('error');
                res.body.error.errors.should.have.property('lastName');
                res.body.error.errors.lastName.should.have.property('kind').eql('required');
                done();
            });
        });

        it('it should POST an user',(done) => {
            const user = {
                firstName: "martin",
                lastName: "ben",
                email: "test@test.com"
            }

            chai.request(server)
            .post('/api/users')
            .send(user)
            .end((err,res) => {
                res.should.have.status(201);
                res.body.should.be.an('Object');
                res.body.should.have.property('firstName');
                res.body.should.have.property('lastName');
                res.body.should.have.property('email');
                res.body.should.have.property('points');
                done();
            });
        });
    });

    describe('/GET/:userId user', () => {
        it('It should GET w/ user id',(done) => {
            const user = new User({
                firstName: 'eric',
                lastName: 'forman',
                email: 'eric@that70show.com'
            })

            user.save((err,user) => {
                chai.request(server)
                .get('/api/users/' + user._id)
                .send(user)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('Object');
                    res.body.should.have.property('firstName');
                    res.body.should.have.property('lastName');
                    res.body.should.have.property('email');
                    res.body.should.have.property('points');
                    done();
                });
            });
        });

        it('It should fail GET w/ user id (object type)',(done) => {
            chai.request(server)
            .get('/api/users/5c46144a6194b89bbd444abb')
            .end((err,res) => {
                res.should.have.status(404);
                res.body.should.be.an('Object');
                res.body.should.have.property('message');
                done();
            });
        });

        it('It should fail GET w/ user id non - object type',(done) => {
            chai.request(server)
            .get('/api/users/5c')
            .end((err,res) => {
                res.should.have.status(500);
                res.body.should.be.an('Object');
                res.body.should.have.property('error');
                res.body.error.should.have.property('kind').eql('ObjectId');
                done();
            });
        });
    });

    describe('/GET users',() => {
        it('it should GET all the users', (done) => {
            const user = new User({
                firstName: 'eric',
                lastName: 'foreman',
                email: 'eric@that70show.com'
            })

            user.save((err,user) => {
                chai.request(server)
                .get('/api/users/')
                .send(user)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('Array');
                    res.body.should.have.lengthOf(1);
                    done();
                });
            });
        });
    });
});