import express from 'express';


const app = express();

app.use(express.json());
userRoutes(app);


export default app;