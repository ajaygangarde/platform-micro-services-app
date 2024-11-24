import express, { Request, Response } from 'express';

const app = express();
const port = 4002;

app.get('/', (req: Request, res: Response) => {
    res.send('Job Board User Service');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
});
