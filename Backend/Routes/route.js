const express = require("express")
const router = express.Router()
const user = require('../db/users');

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
        let User = new user(request.body);
        let result = await User.save();
        response.send(result);
    } catch (err) {
        response.status(500).json({ error: err.message });
    }
})

router.get('/home', async (request, response) => {
    try {
        const data = await user.find();
        response.json(data);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
})

router.delete('/home/delete', async (request, response) => {
    try {
        const { ids } = request.body;
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return response.status(400).json({ error: 'No ids are selected for deletion' });
        }
        const result = await user.deleteMany({ _id: { $in: ids } });
        response.status(200).json({ message: `${result.deletedCount} students deleted with the matching ids.` })
    } catch (error) {
        response.status(500).json({ error: 'Some Api delete backend issue' });
    }
})

router.put('/home/update', async (request, response) => {
    try {
        const { _id, formData } = request.body;
        const result = await user.findByIdAndUpdate(_id, formData, { new: true });
        response.status(200).json(result);

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
        response.status(500).json({error : 'Cannot get Student with the id'});
    }
})

module.exports = router; 