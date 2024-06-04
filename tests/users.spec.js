// glove.spec.js
const request = require('supertest');
const app = require('../index');
const { UserModel } = require('../models/user');

//Deze test wordt geskipt omdat je geauthorized moet zijn
describe("User API", () => {
    it.skip("GET /api/users should list of more than 2 users", async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);

        const length = response.body.length
        expect(length).toBeGreaterThan(2);
    });

    it.skip("GET /api/users return correct user 6650d6df5c2a2875501e816c", async () => {
        const idObject = "6650d6df5c2a2875501e816c"
        const expectedObject = {
            "_id": "6650d6df5c2a2875501e816c",
            "admin": true,
            "betaald": true,
            "username": "thijs",
            "email": "thijs@gmail",
            "password": "thijs"
        }


        const response = await request(app).get(`/api/users/${idObject}`);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(expectedObject);
    });

    it.skip('should delete a user by ID', async () => {
        // Create a new user to be deleted
        const newUser = await UserModel.create({
            admin: false,
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        });

        // Send DELETE request to delete the user
        const response = await request(app)
            .delete(`/api/users/${newUser._id}`);

        // Check response status
        expect(response.status).toBe(200);

        // Check if user is deleted from the database
        const deletedUser = await UserModel.findById(newUser._id);
        expect(deletedUser).toBeNull();
    });

});


describe('Login API', () => {
    it('should login with valid credentials and return a token', async () => {

        // Send login request with valid credentials
        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: 'willemtje@gmail.com', password: 'thijs' });

        // Check response status and token existence
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should return 401 with invalid credentials', async () => {
        // Send login request with invalid credentials
        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: 'nonexistent@example.com', password: 'wrongpassword' });

        // Check response status and error message
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Authentication failed' });
    });
});

describe('Register API', () => {
    it.skip('should register a new user', async () => {
        // Send register request with valid user data
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                admin: false,
                username: 'newuser',
                email: 'newuser@example.com',
                password: 'newpassword123'
            });

        // Check response status and new user creation
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.username).toBe('newuser');
        expect(response.body.email).toBe('newuser@example.com');
    });

    it('should return 400 with invalid user data', async () => {
        // Send register request with invalid user data (missing required fields)
        const response = await request(app)
            .post('/api/auth/register')
            .send({});

        // Check response status
        expect(response.status).toBe(400);
    });
});
