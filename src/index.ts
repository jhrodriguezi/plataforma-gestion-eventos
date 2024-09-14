import express from "express";
import { userRoutes } from "./interface/routes/UserRoutes";

const app = express();

app.use(express.json());
app.use("/user", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})