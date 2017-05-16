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

        describe('name:', () => {

            it('should be required', (done) => {
                newUser.name = '';
                let error = newUser.validateSync();
                assert.equal(error.errors['name'].message, 'name is a required field');
                done();
            });

            it('should have a minimum length', (done) => {
                newUser.name = 'Jon';
                let error = newUser.validateSync();
                assert.equal(error.errors['name'].message, 'name must be at least 4 characters long');
                done();
            });

            it('should not contain any special characters', (done) => {
                newUser.name = '>?<!^&*';
                let error = newUser.validateSync();
                assert.equal(error.errors['name'].name, 'ValidatorError');
                done();
            });

            it('should have a maximum length', (done) => {
                newUser.name = '';
                while (newUser.name.length < 60) {
                    newUser.name += 'nnnnn';
                }
                let error = newUser.validateSync();
                assert.equal(error.errors['name'].message, 'name must be less than 55 characters');
                done();
            });

            it('should accept a valid value', (done) => {
                newUser.name = 'John Smith';
                let error = newUser.validateSync();
                assert.equal(error, undefined);
                done();
            });

        });

        describe('email:', () => {

            it('should be required', (done) => {
                newUser.email = '';
                let error = newUser.validateSync();
                assert.equal(error.errors['email'].message, 'email is a required field');
                done();
            });

            it('should be a valid email address', (done) => {
                newUser.email = 'jsmith.gmail.com';
                let error = newUser.validateSync();
                assert.equal(error.errors['email'].name, 'ValidatorError');
                done();
            });

            it('should accept a valid value', (done) => {
                newUser.email = 'jsmith@gmail.com';
                let error = newUser.validateSync();
                assert.equal(error, undefined);
                done();
            });

        });

        describe('username:', () => {

            it('should be required', (done) => {
                newUser.username = '';
                let error = newUser.validateSync();
                assert.equal(error.errors['username'].message, 'username is a required field');
                done();
            });

            it('should not contain any special characters', (done) => {
                newUser.username = '$%^&*(#@';
                let error = newUser.validateSync();
                assert.equal(error.errors['username'].name, 'ValidatorError');
                done();
            });

            it('should have a minimum length', (done) => {
                newUser.username = 'john';
                let error = newUser.validateSync();
                assert.equal(error.errors['username'].message, 'username must be at least 8 characters long');
                done();
            });

            it('should have a maximum length', (done) => {
                newUser.username = '';
                while (newUser.username.length < 30) {
                    newUser.username += 'nnnnn';
                }
                let error = newUser.validateSync();
                assert.equal(error.errors['username'].message, 'username must be less than 25 characters long');
                done();
            });

            it('should accept a valid value', (done) => {
                newUser.username = 'johnsmith';
                let error = newUser.validateSync();
                assert.equal(error, undefined);
                done();
            });

        });

        describe('password:', () => {

            it('should be required', (done) => {
                newUser.password = '';
                let error = newUser.validateSync();
                assert.equal(error.errors['password'].message, 'password is a required field');
                done();
            });

            it('should accept a valid value', (done) => {
                newUser.password = 'password';
                let error = newUser.validateSync();
                assert.equal(error, undefined);
                done();
            });

        });

    });

});