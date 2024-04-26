import { use, expect } from 'chai';
import chaiHttp from 'chai-http';
const chai = use(chaiHttp);
import server from '../index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import user from '../db/users.js';
dotenv.config({ path: '.env' });

describe('Routes', () => {
    before(async () => {
        // Connect to the test database
        await mongoose.connect(process.env.MONGODB_URI);
        const Userdata = await user.findOne({userId : process.env.UUID});
        Userdata.students = [];
        await Userdata.save();
    });

    after(async () => {
        // Disconnect from the test database
        await mongoose.disconnect();
    });

    describe('POST /home', () => {
        it('should create a new student for a user', async () => {
            const student = {
                name: 'Test_student',
                roll: 123,
                above_18: true,
                uuid: process.env.UUID
            };
            const res = await chai.request(server)
                .post('/home')
                .send(student);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'Successfully inserted the data');
            expect(res.body.data).to.have.property('name', student.name);
            expect(res.body.data).to.have.property('roll', student.roll);
            expect(res.body.data).to.have.property('above_18', student.above_18);
        });
    });

    describe('GET /home', () => {
        it('should get all students for a user', async () => {
            const res = await chai.request(server)
                .get(`/home/?uuid=${process.env.UUID}`)
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(1);
        });
    });

    describe('PUT /home/update', () => {
        it('should update a student for a user', async () => {
            const newStudent = {
                name: 'Jane Smith',
                roll: '456',
                above_18: false
            };
            const User = await user.findOne({ userId: process.env.UUID });
            const studentId = User.students[0]._id.toString();
            const res = await chai.request(server)
                .put(`/home/update?uuid=${process.env.UUID}`)
                .send({ id: studentId, formData: newStudent });
            expect(res).to.have.status(200);
            const updatedStudent = res.body.find(student => student._id.toString() === studentId);
            expect(updatedStudent).to.have.property('name', newStudent.name);
            expect(updatedStudent).to.have.property('roll', newStudent.roll);
            expect(updatedStudent).to.have.property('above_18', newStudent.above_18);
        });
    });

    describe('DELETE /home/delete', () => {
        it('should delete selected students for a user', async () => {
            try {
                const User = await user.findOne({ userId: process.env.UUID });
                const studentIds = User.students.map(student => student._id.toString());
                const res = await chai.request(server)
                    .delete(`/home/delete?uuid=${process.env.UUID}`)
                    .send({ ids: studentIds });
                expect(res).to.have.status(200);
                expect(res.body.message).to.equal('Students deleted successfully');
                expect(res.body.data).to.be.an('array').that.is.empty;

            } catch (error) {
                console.log(error);
            }
        });
    });



});