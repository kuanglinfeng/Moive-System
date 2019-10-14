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
Object.defineProperty(exports, "__esModule", { value: true });
const Movie_1 = require("../entities/Movie");
const index_1 = require("../db/index");
const SearchCondition_1 = require("../entities/SearchCondition");
class MovieService {
    static add(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            movie = Movie_1.Movie.transform(movie);
            const errors = yield movie.validateThis();
            if (errors.length > 0) {
                return errors;
            }
            const res = yield index_1.MovieModel.create(movie);
            return res;
        });
    }
    static edit(id, movie) {
        return __awaiter(this, void 0, void 0, function* () {
            const movieObj = Movie_1.Movie.transform(movie);
            const errors = yield movieObj.validateThis(true);
            if (errors.length > 0) {
                return errors;
            }
            yield index_1.MovieModel.updateOne({ _id: id }, movie);
            return errors;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield index_1.MovieModel.deleteOne({ _id: id });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield index_1.MovieModel.findOne({ _id: id });
            return res;
        });
    }
    static find(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const conObj = SearchCondition_1.SearchCondition.transform(condition);
            const errors = yield conObj.validateThis(true);
            if (errors.length > 0) {
                return {
                    count: 0,
                    data: [],
                    errors
                };
            }
            const movies = yield index_1.MovieModel.find({
                name: { $regex: new RegExp(condition.key) }
            }).skip((conObj.page - 1) * conObj.limit).limit(conObj.limit);
            const count = yield index_1.MovieModel.find({
                name: { $regex: new RegExp(condition.key) }
            }).countDocuments();
            return {
                count,
                data: movies,
                errors: []
            };
        });
    }
}
exports.MovieService = MovieService;
