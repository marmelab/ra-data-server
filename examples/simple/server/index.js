import express from "express";
import cors from "cors";

import handlers from "./handlers.js";
import { createDataProvider } from "../../../src/middleware.js";

const dataProviderMiddleware = createDataProvider(handlers);

const app = express();
app.use(cors());
app.use("/admin", dataProviderMiddleware);

app.listen(3001);
