import request from 'supertest';
import app from '../api';

describe('API Endpoints', () => {
  describe('GET /health', () => {
    it('should return health check status', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
      expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);
    });
  });

  describe('GET /spirits/:id', () => {
    it('should return spirit information', async () => {
      const spiritId = '123';
      const response = await request(app).get(`/spirits/${spiritId}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: spiritId,
        name: 'Test Spirit',
        abv: 40,
        type: 'Whiskey',
      });
    });
  });
}); 