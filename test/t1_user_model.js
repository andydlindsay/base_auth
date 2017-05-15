// set the env variable to test
process.env.NODE_ENV = 'test';

// imports
const assert = require('assert'),
      User = require('../models/user');

let newUser;

describe('User Schema', () => {
    
    describe('Fields', () => {

        beforeEach((done) => {
            // create a valid user to use in each test
            newUser = new User({
                name: 'John Smith',
                email: 'john@jsmith.com',
                username: 'johnsmith',
                password: 'password'
            });
            done();
        });

        describe('name:', () => {});

        describe('email:', () => {});

        describe('username:', () => {});

        describe('password:', () => {});

    });

});