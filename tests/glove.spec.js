// glove.spec.js
const request = require('supertest');
const app = require('../index');
const { gloveModel } = require('../models/glove');

var idToBeDeletedObject = "";

describe("Glove API", () => {
    it("GET /api/gloves should list of more than 2 gloves", async () => {
        const response = await request(app).get('/api/gloves');
        expect(response.status).toBe(200);

        const length = response.body.length
        expect(length).toBeGreaterThan(2);
    });

    it("GET /api/gloves return correct glove 6650ac105c2a2875501e815a", async () => {
        const idObject = "6650ac105c2a2875501e815a"
        const expectedObject = {
            _id: idObject,
            name: "Sport Gloves | Superconductor",
            type: "Gloves",
            rarity: "Covert",
            skin: "Superconductor",
            float: 0.02,
            stat_trak: true,
            exterior: "Factory New",
            price: 2800
        };

        const response = await request(app).get(`/api/gloves/${idObject}`);
        expect(response.status).toBe(200); 
        expect(response.body).toMatchObject(expectedObject);
    });

    it('POST should create a new glove', async () => {
        // Mock glove data
        const gloveData = {
          name: 'Test Glove',
          type: 'Test Type',
          rarity: 'Test Rarity',
          skin: 'Test Skin',
          float: 0.01,
          stat_trak: false,
          exterior: 'Test Exterior',
          price: 100
        };
    
        // Send POST request
        const response = await request(app)
          .post('/api/gloves')
          .send(gloveData);
    
        // Check response status
        expect(response.status).toBe(201);
    
        // Check if response body contains the created glove
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(gloveData.name);
        expect(response.body.type).toBe(gloveData.type);
        expect(response.body.rarity).toBe(gloveData.rarity);
        expect(response.body.skin).toBe(gloveData.skin);
        expect(response.body.float).toBe(gloveData.float);
        expect(response.body.stat_trak).toBe(gloveData.stat_trak);
        expect(response.body.exterior).toBe(gloveData.exterior);
        expect(response.body.price).toBe(gloveData.price);
    
        // Check if glove is saved in the database
        const savedGlove = await gloveModel.findOne({ name: gloveData.name });
        expect(savedGlove).toBeDefined();
        expect(savedGlove.name).toBe(gloveData.name);
        expect(savedGlove.type).toBe(gloveData.type);
        expect(savedGlove.rarity).toBe(gloveData.rarity);
        expect(savedGlove.skin).toBe(gloveData.skin);
        expect(savedGlove.float).toBe(gloveData.float);
        expect(savedGlove.stat_trak).toBe(gloveData.stat_trak);
        expect(savedGlove.exterior).toBe(gloveData.exterior);
        expect(savedGlove.price).toBe(gloveData.price);

        idToBeDeletedObject = response.body._id
      });
    
      it('POST should return 400 if glove data is invalid', async () => {
        // Mock invalid glove data
        const invalidGloveData = {
          // Missing required fields
        };
    
        // Send POST request
        const response = await request(app)
          .post('/api/gloves')
          .send(invalidGloveData);
    
        // Check response status
        expect(response.status).toBe(400);
      });

      it('PATCH item', async () => {
        const updatedData = {
            name: 'Updated Glove',
            type: 'Updated Type',
            rarity: 'Updated Rarity',
            skin: 'Updated Skin',
            float: 0.02,
            stat_trak: true,
            exterior: 'Updated Exterior',
            price: 200
          };
      
          // Send PATCH request to update the glove
          const response = await request(app)
            .patch(`/api/gloves/${idToBeDeletedObject}`)
            .send(updatedData);
      
          // Check response status
          expect(response.status).toBe(201);
      
          // Check if glove is updated in the database
          const updatedGlove = await gloveModel.findById(idToBeDeletedObject);
          expect(updatedGlove.name).toBe(updatedData.name);
          expect(updatedGlove.type).toBe(updatedData.type);
          expect(updatedGlove.rarity).toBe(updatedData.rarity);
          expect(updatedGlove.skin).toBe(updatedData.skin);
          expect(updatedGlove.float).toBe(updatedData.float);
          expect(updatedGlove.stat_trak).toBe(updatedData.stat_trak);
          expect(updatedGlove.exterior).toBe(updatedData.exterior);
          expect(updatedGlove.price).toBe(updatedData.price);
      });

      it.skip('PATCH should return 400 if validation fails', async () => {
    
        // Invalid data for updating the glove
        const invalidData = {
          name: 0 // Float should be a number
        };
    
        // Send PATCH request with invalid data
        const response = await request(app)
          .patch(`/api/gloves/${idToBeDeletedObject}`)
          .send(invalidData);
    
        // Check response status
        expect(response.status).toBe(400);
      });

      it('DELETE prev item', async () => {
        const response = await request(app).delete(`/api/gloves/${idToBeDeletedObject}`);

        // Check response status
        expect(response.status).toBe(200);
    
        // Check if glove is deleted from the database
        const deletedGlove = await gloveModel.findById(idToBeDeletedObject);
        expect(deletedGlove).toBeNull();
      });
});
