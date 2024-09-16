import express from "express";
import { userRoutes } from "./presentation/routes/UserRoutes";
import { pgCliet } from "./infrastructure/database/PgDbConnection";
import { runMigrations } from "./utils/migrationRunner";
import { errorHandler } from "./presentation/middleware/ErrorHandler";

const app = express();

app.use(express.json());
app.use("/user", userRoutes);
app.use(errorHandler)

const PORT = 3000;
app.listen(PORT, () => {
    runMigrations(pgCliet()).then().catch()
    console.log(`Server is running on port ${PORT}`);
})