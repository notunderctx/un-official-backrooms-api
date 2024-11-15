import express from "express";
import homeRoutes from "./routes/home.js";
import LevelRouter from "./routes/level.js";
import ObjectsRouter from "./routes/object.js";
import EntityRouter from "./routes/entity.js";
import SearchRouter from "./routes/search.js";
import N from "./routes/phenomena.js";
const app = express();
const PORT = 3000;
app.use("/", homeRoutes);
app.use("/levels", LevelRouter);
app.use("/objects", ObjectsRouter);
app.use("/entity", EntityRouter);
app.use("/search", SearchRouter);
app.use("/phenomena", N);
app.all("*", (req, res) => {
    return res.status(404).json({ error: "404 not found" });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
