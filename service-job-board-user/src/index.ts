import express, { Request, Response } from 'express';

const app = express();
const port = 4002;

app.get('/', (req: Request, res: Response) => {
    res.send('Job Board User Service');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
