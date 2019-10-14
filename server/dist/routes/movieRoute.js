"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MovieService_1 = require("../services/MovieService");
const ResponseHelper_1 = require("./ResponseHelper");
const router = express_1.default.Router();
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieid = req.params.id;
        const movie = yield MovieService_1.MovieService.findById(movieid);
        ResponseHelper_1.ResponseHelper.sendData(movie, res);
    }
    catch (e) {
        ResponseHelper_1.ResponseHelper.sendData(null, res);
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield MovieService_1.MovieService.find(req.query);
    ResponseHelper_1.ResponseHelper.sendPageData(movies, res);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield MovieService_1.MovieService.add(req.body);
    if (Array.isArray(result)) {
        ResponseHelper_1.ResponseHelper.sendError(result, res);
    }
    else {
        ResponseHelper_1.ResponseHelper.sendData(result, res);
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield MovieService_1.MovieService.edit(req.params.id, req.body);
        if (result.length > 0) {
            ResponseHelper_1.ResponseHelper.sendError(result, res);
        }
        else {
            ResponseHelper_1.ResponseHelper.sendData(true, res);
        }
    }
    catch (e) {
        ResponseHelper_1.ResponseHelper.sendError("id错误", res);
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield MovieService_1.MovieService.delete(req.params.id);
        ResponseHelper_1.ResponseHelper.sendData(true, res);
    }
    catch (e) {
        ResponseHelper_1.ResponseHelper.sendError("id错误", res);
    }
}));
exports.default = router;
