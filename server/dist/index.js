"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const movieRoute_1 = __importDefault(require("./routes/movieRoute"));
const UploadRoute_1 = __importDefault(require("./routes/UploadRoute"));
const app = express_1.default();
app.use("/upload", express_1.default.static("public/upload"));
app.use(express_1.default.json());
app.use("/api/movie", movieRoute_1.default);
app.use("/api/upload", UploadRoute_1.default);
app.listen(3000);
