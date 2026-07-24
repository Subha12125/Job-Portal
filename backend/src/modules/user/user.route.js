import { createUserController, getUserByIdController, getUserByEmailController, getAllUsersController } from './user.controller.js';

const userRoutes = (app) => {
    app.post("/api/users", createUserController);
    app.get("/api/users/:id", getUserByIdController);
    app.get("/api/users/email/:email", getUserByEmailController);
    app.get("/api/users", getAllUsersController);
}