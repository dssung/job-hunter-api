//During testing, the env variable set to test
process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Job = require('../api/models/JobModel');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//Parent Block
describe('Jobs', () =>{
    beforeEach((done) => {
        Job.remove({}, (err) => {
            done();
        });
    });
});

//Test GET 
describe('/GET jobs', () => {
    it('it should GET all the jobs', (done) => {
        chai.request(server)
            .get('/job')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                
            done();
            });
    })
})
