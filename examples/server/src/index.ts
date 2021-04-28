import express from "express";
import cors from "cors";

import handlers from "./handlers";
import { expressDataProvider } from "../../../src/expressDataProvider";

const dataProviderMiddleware = expressDataProvider(handlers);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/admin", dataProviderMiddleware);
app.use((req, res) => {
    res.json({ foo: "bar" });
});

app.listen(3001);
