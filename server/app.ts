import express from "express";
import cors from "cors";

import indexRouter from "./routers/indexRouter";
const PORT = 3000;

const app = express();
app.use(cors());

app.use(indexRouter);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));