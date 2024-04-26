// test@gmail.com
// test123

import * as chai from 'chai';
import * as chaiHttp from 'chai-http';
import '../index';
const expect = chai.expect;

chai.use(chaiHttp);

describe('Routes', () => {
    // Test POST /home
    describe('POST /home', () => {
        it('should add a new student', (done) => {
            chai.request(app)
                .post('/home')
                .send({ name: 'Test Student', roll: '123', above_18: true, uuid: 'd1xY4xdvrtah6akhMo2J00IooXF3' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Successfully inserted the data');
                    // Add additional assertions if needed
                    done();
                });
        });
    });

    // Test GET /home
    describe('GET /home', () => {
        it('should get all students for a user', (done) => {
            chai.request(app)
                .get('/home?uuid=d1xY4xdvrtah6akhMo2J00IooXF3')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    // Add additional assertions if needed
                    done();
                });
        });
    });

    // Test DELETE /home/delete
    describe('DELETE /home/delete', () => {
        it('should delete students by their IDs', (done) => {
            chai.request(app)
                .delete('/home/delete?uuid=d1xY4xdvrtah6akhMo2J00IooXF3')
                .send({ ids: ['662955909c4dc535b000e7dd','662955979c4dc535b000e7e3'] })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Students deleted successfully');
                    // Add additional assertions if needed
                    done();
                });
        });
    });

    // Test PUT /home/update
    describe('PUT /home/update', () => {
        it('should update student data', (done) => {
            chai.request(app)
                .put('/home/update?uuid=d1xY4xdvrtah6akhMo2J00IooXF3')
                .send({ id: 'student_id', formData: { name: 'Updated Student', roll: '456', above_18: false } })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    // Add additional assertions if needed
                    done();
                });
        });
    });
});
