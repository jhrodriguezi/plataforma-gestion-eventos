import express from "express";
import { userRoutes } from "./presentation/routes/UserRoutes";
import { pgCliet } from "./infrastructure/database/PgDbConnection";
import { runMigrations } from "./utils/migrationRunner";
import { errorHandler } from "./presentation/middleware/ErrorHandler";
import { DIContainer } from "./infrastructure/DIContainer";
import { setupSwagger } from "./presentation/swagger";
import { eventRoutes } from "./presentation/routes/EventRoutes";

const app = express();
const logger = DIContainer.getLogger(); 
app.use(express.json());
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use(errorHandler);
setupSwagger(app);

runMigrations(pgCliet())
.then(() => {
    const PORT = process.env.SERVER_PORT || 3000;
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    })
})
.catch(err => {
    logger.error(err)
})
