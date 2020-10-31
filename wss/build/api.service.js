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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearUser = exports.createUser = exports.assingRoomToPlayer = exports.addPlayerToRoom = exports.getUserRoom = void 0;
var axios_1 = __importDefault(require("axios"));
axios_1.default.defaults.baseURL = "http://localhost:3000";
var activeUsers = [];
var getUserRoom = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("/users/" + id)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data.room];
            case 2:
                error_1 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserRoom = getUserRoom;
var getUserDetail = function () { return __awaiter(void 0, void 0, void 0, function () {
    var userDetail, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get("/users")];
            case 1:
                userDetail = _a.sent();
                return [2 /*return*/, userDetail];
            case 2:
                error_2 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var addPlayerToRoom = function (id, username, room) { return __awaiter(void 0, void 0, void 0, function () {
    var getActivePlayers, activePlayer, response, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, axios_1.default.get("/rooms/" + id)];
            case 1:
                getActivePlayers = _b.sent();
                activePlayer = (_a = getActivePlayers === null || getActivePlayers === void 0 ? void 0 : getActivePlayers.data) === null || _a === void 0 ? void 0 : _a.players;
                return [4 /*yield*/, axios_1.default.patch("/rooms/" + id, {
                        players: __spreadArrays(activePlayer, [id]),
                    })];
            case 2:
                response = _b.sent();
                return [2 /*return*/, response];
            case 3:
                error_3 = _b.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addPlayerToRoom = addPlayerToRoom;
var assingRoomToPlayer = function (id, roomName) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.patch("/users/" + id, {
                        room: roomName,
                    })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
            case 2:
                error_4 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.assingRoomToPlayer = assingRoomToPlayer;
/* Check if user Exists */
var isUserExist = function (name) {
    var isExist;
    getUserDetail().then(function (result) {
        if (result === null || result === void 0 ? void 0 : result.data.find(function (user) { return user.name === name; })) {
            isExist = true;
        }
        else {
            isExist = false;
        }
    });
    console.log("isExost", isExist);
    return isExist;
};
var createUser = function (id, name, room) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("userStatis", isUserExist(name));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.post("/users", {
                        id: id,
                        name: name,
                        room: room,
                    })];
            case 2:
                response = _a.sent();
                return [2 /*return*/, response];
            case 3:
                error_5 = _a.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var clearUser = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.delete("/users/" + id)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
            case 2:
                error_6 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.clearUser = clearUser;
