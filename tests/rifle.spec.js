const request = require('supertest');
const app = require('../index');
const { rifleModel } = require('../models/rifle');

describe("Rifle API", () => {
    it("GET /api/knives should list of more than 2 rifles", async () => {
        const response = await request(app).get('/api/rifles');
        expect(response.status).toBe(200);

        const length = response.body.length
        expect(length).toBeGreaterThan(2);
    });

    it('should update a rifle 665aece44edf42268e9fa7ac', async () => {
        const rifleId = "665aece44edf42268e9fa7ac"

        const newDetails = {
            name: 'M4A1-S',
            type: 'Assault Rifle',
            rarity: 'Epic',
            skin: 'Hyper Beast',
            float: 0.10,
            stat_trak: false,
            exterior: 'Minimal Wear',
            price: 150
        };

        const response = await request(app)
            .patch(`/api/rifles/${rifleId}`)
            .send(newDetails)
            .expect(201);

        expect(response.body.name).toBe(newDetails.name);
        expect(response.body.type).toBe(newDetails.type);
        expect(response.body.rarity).toBe(newDetails.rarity);
        expect(response.body.skin).toBe(newDetails.skin);
        expect(response.body.float).toBe(newDetails.float);
        expect(response.body.stat_trak).toBe(newDetails.stat_trak);
        expect(response.body.exterior).toBe(newDetails.exterior);
        expect(response.body.price).toBe(newDetails.price);
    });

    it('POST should create a new rifle and delete it', async () => {
        // Mock glove data
        const rifleData = {
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
          .post('/api/rifles')
          .send(rifleData);
    
        // Check response status
        expect(response.status).toBe(201);
    
        // Check if response body contains the created glove
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(rifleData.name);
        expect(response.body.type).toBe(rifleData.type);
        expect(response.body.rarity).toBe(rifleData.rarity);
        expect(response.body.skin).toBe(rifleData.skin);
        expect(response.body.float).toBe(rifleData.float);
        expect(response.body.stat_trak).toBe(rifleData.stat_trak);
        expect(response.body.exterior).toBe(rifleData.exterior);
        expect(response.body.price).toBe(rifleData.price);
    
        // Check if glove is saved in the database
        const savedRifle = await rifleModel.findOne({ name: rifleData.name });
        expect(savedRifle).toBeDefined();
        expect(savedRifle.name).toBe(rifleData.name);
        expect(savedRifle.type).toBe(rifleData.type);
        expect(savedRifle.rarity).toBe(rifleData.rarity);
        expect(savedRifle.skin).toBe(rifleData.skin);
        expect(savedRifle.float).toBe(rifleData.float);
        expect(savedRifle.stat_trak).toBe(rifleData.stat_trak);
        expect(savedRifle.exterior).toBe(rifleData.exterior);
        expect(savedRifle.price).toBe(rifleData.price);


        const deleteResponse = await request(app).delete(`/api/rifles/${savedRifle.id}`);

        expect(deleteResponse.status).toBe(200);

        const deletedRifle = await rifleModel.findById(savedRifle.id);
        expect(deletedRifle).toBeNull();

      });
})