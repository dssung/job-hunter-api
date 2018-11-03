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
describe('Jobs', () => {
    beforeEach((done) => {
        Job.remove({}, (err) => { 
           done();           
        });        
    });
  
describe('/GET jobs', () => {
      it('it should GET all the jobs', (done) => {
        chai.request(server)
            .get('/jobs')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  
  /*
  * Test the /POST route
  */
  describe('/POST job', () => {
      it('it should not POST a job without company field', (done) => {
          let job = {
              position: 'Software Engineer',
              location: 'Los Angeles'
          }
        
        chai.request(server)
            .post('/jobs')
            .send(job)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.should.have.property('company');
                  res.body.errors.company.should.have.property('kind').eql('required');
              done();
            });
      });

      it('it should POST a job ', (done) => {
        let job = {
            company: 'Google',
            position: 'Software Engineer',
            location: 'Los Angeles'
        }
        chai.request(server)
            .post('/jobs')
            .send(job)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('company');
                    res.body.should.have.property('position');
                    res.body.should.have.property('location');
                    res.body.should.have.property('status');
                    res.body.should.have.property('created_date');
                done();
            });
    });
  });
});


