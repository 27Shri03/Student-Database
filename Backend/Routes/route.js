import express from 'express';
const router = express.Router()
import user from '../db/users.js'

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - roll
 *         - above_18
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the student
 *         roll:
 *           type: string
 *           description: The roll number of the student
 *         above_18:
 *           type: boolean
 *           description: Indicates whether the student is above 18 years old
 *     DeleteRequest:
 *       type: object
 *       required:
 *         - ids
 *       properties:
 *         ids:
 *           type: array
 *           items:
 *             type: string
 *           description: List of student IDs to delete
 */

/**
 * @swagger
 * tags:
 *   name: Student Database
 *   description: CRUD operations on Student database
 */

/**
 * @swagger
 * /home:
 *   post:
 *     summary: Add a new student
 *     tags: [Student Database]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the student
 *               roll:
 *                 type: string
 *                 description: The roll number of the student
 *               above_18:
 *                 type: boolean
 *                 description: Indicates whether the student is above 18 years old
 *               uuid:
 *                 type: string
 *                 description: User UUID
 *             required:
 *               - name
 *               - roll
 *               - above_18
 *               - uuid
 *     responses:
 *       '200':
 *         description: Successfully added a new student
 *       '500':
 *         description: Internal Server Error
 *
 *   get:
 *     summary: Get all students for a user
 *     tags: [Student Database]
 *     parameters:
 *       - in: query
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: User UUID
 *     responses:
 *       '200':
 *         description: List of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       '500':
 *         description: Internal Server Error
 *
 * /home/delete:
 *   delete:
 *     summary: Delete students by their IDs
 *     tags: [Student Database]
 *     parameters:
 *       - in: query
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: User UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteRequest'
 *     responses:
 *       '200':
 *         description: Students deleted successfully
 *       '400':
 *         description: No IDs provided for deletion
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 *
 * /home/update:
 *   put:
 *     summary: Update student data
 *     tags: [Student Database]
 *     parameters:
 *       - in: query
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: User UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               formData:
 *                 $ref: '#/components/schemas/Student'
 *     responses:
 *       '200':
 *         description: Student data updated successfully
 *       '500':
 *         description: Internal Server Error
 *
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
        response.status(200).json({ message: "Successfully inserted the data" , data : newStudent });

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
        response.status(200).json({ message: "Students deleted successfully" , data : userData.students});
    } catch (error) {
        response.status(500).json({ message: error });
    }
});

router.put('/home/update', async (request, response) => {
    try {
        const { id, formData } = request.body;
        const { uuid } = request.query;
        const userData = await user.findOne({ userId: uuid });
        for (let index = 0; index < userData.students.length; index++) {
            if (userData.students[index]._id.toString() === id) {
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

export default router; 