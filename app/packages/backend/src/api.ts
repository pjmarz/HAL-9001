import express from 'express';

const app = express();
app.use(express.json());

export const healthCheck = (req: express.Request, res: express.Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
};

export const getSpiritInfo = (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  // Mock data for testing
  res.json({
    id,
    name: 'Test Spirit',
    abv: 40,
    type: 'Whiskey',
  });
};

app.get('/health', healthCheck);
app.get('/spirits/:id', getSpiritInfo);

export default app; 