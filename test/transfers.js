//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Transfer = require('../models/transferSchema');
const User = require('../models/userSchema');

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

    describe('/POST transfer',() => {
        it('It should be POST ERROR - not user_id provided', (done) => {
            const transfer = {
                amount: null,
                transfer_type: 'add',
            }

            chai.request(server)
            .post('/api/transfers/')
            .send(transfer)
            .end((err,res) => {
                res.should.have.status(404);
                res.body.should.be.an('Object');
                res.body.error.should.have.property('message').eql('Not Found');
                done();
            });
        });

        it('It should be POST ERROR - user not found', (done) => {
            const transfer = {
                amount: null,
                transfer_type: 'add',
                user_id: '5c462bd28471f4aaf1ecadeb'
            }

            chai.request(server)
            .post('/api/transfers/' + transfer.user_id)
            .send(transfer)
            .end((err,res) => {
                res.should.have.status(404);
                res.body.should.be.an('Object');
                res.body.should.have.property('message').eql('User not found');
                done();
            });
        });

        it('It should be POST ERROR - insufficient funds', (done) => {
            //user has 0 points
            const user = new User({
                firstName: 'fez',
                lastName: 'fez',
                email: 'fez@that70show.com'
            })

            user.save((err,user) => {
                const transfer = {
                    amount: -50,
                    transfer_type: 'deduct',
                    user_id: user._id
                }
                chai.request(server)
                .post('/api/transfers/' + user._id)
                .send(transfer)
                .end((err,res) => {
                    res.should.have.status(404);
                    res.body.should.be.an('Object');
                    res.body.should.have.property('message').eql('Insufficient funds');
                    done();
                });
            });
        });

        it('It should be POST a transfer', (done) => {
            //user has 0 points
            const user = new User({
                firstName: 'fez',
                lastName: 'fez',
                email: 'fez@that70show.com'
            })

            user.save((err,user) => {
                const transfer = {
                    amount: 50,
                    transfer_type: 'add',
                    user_id: user._id
                }
                chai.request(server)
                .post('/api/transfers/' + user._id)
                .send(transfer)
                .end((err,res) => {
                    res.should.have.status(201);
                    res.body.should.be.an('Object');
                    done();
                });
            });
        });
    });

    describe('/GET/:userId transfer',() => {
        it('It should fail GET transfer -  not found w/ provided id', (done) => {
            //user has 0 points
            const user = new User({
                firstName: 'Red',
                lastName: 'Forman',
                email: 'red@that70show.com'
            })

            user.save((err,user) => {
                chai.request(server)
                .get('/api/transfers/' + user._id)
                .end((err,res) => {
                    res.should.have.status(404);
                    res.body.should.be.an('Object');
                    res.body.should.have.property('message').eql('no valid entry found for provided id');
                    done();
                });
            });
        });

        it('It should be POST a transfer', (done) => {
            //user has 0 points
            const user = new User({
                firstName: 'Red',
                lastName: 'Forman',
                email: 'red@that70show.com'
            })

            user.save((err,user) => {

                const transfer = new Transfer({
                    amount: 50,
                    transfer_type: 'add',
                    user_id: user._id
                });

                transfer.save((err,transfer) => {
                    chai.request(server)
                    .get('/api/transfers/' + transfer.user_id)
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
});