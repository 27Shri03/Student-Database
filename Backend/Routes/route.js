const express = require("express")
const router = express.Router()
const user = require('../db/users');
const mongoose = require('mongoose');

/** 
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - name
 *         - roll
 *         - above_18
 *       properties:
 *         name:
 *           type: string
 *           description: The Name of the student
 *         roll:
 *           type: string
 *           description: The Roll no of the student
 *         above_18:
 *           type: boolean
 *           description: Student is above 18 or not
 *     responseStudent:
 *         type: object
 *         properties:
 *           _id:
 *              type: string
 *           name:
 *              type: string
 *           roll:
 *              type: string
 *           above_18: 
 *              type: boolean
 *           __v:
 *              type: number
*/

/**
 * @swagger
 * tags:
 *  name: Student Database
 *  description: Simple CRUD operations on Student database.
 */

/**
 * @swagger
 * /home:
 *   post:
 *     summary: Create a new student
 *     tags: [Student Database]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *     responses:
 *       '200':
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                %ref: '#/components/schemas/responseStudent'
 *       '500':
 *          description: Internal Server Error
 *          content:
 *              application/json:
 *                  schema:
 *                      %ref: '#/components/schemas/responseStudent'
 * 
 * @swagger
 * /home:
 *   get:
 *     summary: Gives the data of all the students
 *     tags: [Student Database]
 *     responses:
 *       '200':
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                %ref: '#/components/schemas/responseStudent'
 *       '500':
 *          description: Internal Server Error
 *          content:
 *            application/json:
 *              schema:
 *                %ref: '#/components/schemas/responseStudent'
 * 
 * @swagger
 * /home/delete:
 *      delete:
 *          summary: delete records in bulk 
 *          tags: [Student Database]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              ids:
 *                                  type: array
 *                                  items:
 *                                      type: string
 *                                  example: ["id1" , "id2" , "id3"]                                                    
 *          responses:
 *              '200':
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/responseStudent'
 *              '500':
 *                  description: Internal Server Error
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/responseStudent'
 * 
 * @swagger
 * /home/update:
 *      put:
 *          summary: Update the Selected student with Id
 *          tags: [Student Database]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  description: The id of the student need to be updated
 *                                  example: "6a810129fjf012"
 *                         
 *                              formData:
 *                                  type: object
 *                                  description: The data needs to be updated for the student
 *                                  example: 
 *                                      name : "Shriram"
 *                                      roll : "105"
 *                                      above_18 : true
 *          responses:
 *              '200':
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/responseStudent'
 *                              
 *              '500':
 *                  description: Internal Server Error
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/responseStudent'
 * 
 * @swagger
 * /home/{id}:
 *      get:
 *          summary: Get the student by the id.
 *          tags: [Student Database]
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                schema: 
 *                  type: string
 *          responses:
 *              '200':
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/responseStudent'
 *              '500':
 *                  description: Successfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#components/schemas/responseStudent'                     
 */

router.post('/home', async (request, response) => {
    try {
        const { name, roll, above_18, uuid } = request.body;
        const newStudent = { name, roll, above_18 };
        const User = await user.findOne({ userId: uuid });
        if (!User) {
            const newUser = new user({ userId: uuid, students: [newStudent] });
            await newUser.save();
        }
        else {
            User.students.push(newStudent);
            await User.save();
        }
        response.status(200).json({ message: "Successfully inserted the data" });

    } catch (err) {
        response.status(500).json({ error: err.message });
    }
})

router.get('/home', async (request, response) => {
    try {
        const { uuid } = request.query;
        const data = await user.findOne({ userId: uuid });
        if (!data) {
            return response.json([]);
        }
        response.json(data.students);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
})

router.delete('/home/delete', async (request, response) => {
    try {
        const { ids } = request.body;
        const { uuid } = request.query;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return response.status(400).json({ error: 'No ids are selected for deletion' });
        }
        const userData = await user.findOne({ userId: uuid });
        if (!userData) {
            return response.status(404).json({ error: 'User not found' });
        }
        const idsToRemove = new Set(ids);
        userData.students = userData.students.filter(student => {
            const studentIdStr = student._id.toString();
            return !idsToRemove.has(studentIdStr);
        });
        await userData.save();
        response.status(200).json({ message: "Students deleted succesfully" });
    } catch (error) {
        response.status(500).json({ message: error });
    }
});

router.put('/home/update', async (request, response) => {
    try {
        const { id, formData } = request.body;
        const {uuid}  = request.query;
        const userData = await user.findOne({userId : uuid});
        for (let index = 0; index < userData.students.length; index++) {
            if(userData.students[index]._id.toString() === id){
                userData.students[index].name = formData.name;
                userData.students[index].roll = formData.roll;
                userData.students[index].above_18 = formData.above_18;
            }
        }
        await userData.save();
        response.status(200).json(userData.students);

    } catch (error) {
        response.status(500).json({ error: 'Some API update backend issue' });
    }
})

router.get('/home/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await user.find({ _id: id })
        response.status(200).json(result);

    } catch (error) {
        response.status(500).json({ error: 'Cannot get Student with the id' });
    }
})

module.exports = router; 