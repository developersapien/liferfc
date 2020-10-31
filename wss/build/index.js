"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http = __importStar(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var api_service_1 = __importDefault(require("./api.service"));
var port = 8081;
var server = http.createServer(express_1.default);
var io = socket_io_1.default(server);
var apiService = new api_service_1.default();
io.on("connection", function (socket) {
    socket.on("login", function (_a) {
        var username = _a.username;
        apiService
            .createUser(socket.id, username)
            .then(function () {
            socket.emit("message", {
                user: username,
                message: "Welcome " + username,
                socketId: socket.id,
            });
        })
            .catch(function (err) {
            socket.emit("error", { message: err });
        });
    });
    /* Join to the room */
    socket.on("joinRoom", function (_a) {
        var username = _a.username, room = _a.room;
        apiService
            .assignRoom(room, socket.id)
            .then(function () {
            socket.emit("message", {
                user: username,
                message: "welcome to room " + room,
                room: room,
            });
            socket.broadcast.to(room).emit("message", {
                user: username,
                message: "has joined " + room,
                room: room,
            });
            /* Check the room with how many socket is connected */
            socket.join(room, function () {
                if (io.nsps["/"].adapter.rooms[room] &&
                    io.nsps["/"].adapter.rooms[room].length === 2) {
                    io.to(room).emit("onReady", { state: true });
                }
            });
        })
            .catch(function (err) {
            socket.emit("error", { message: err });
        });
    });
    /* Start the game and send the first random number with turn control */
    socket.on("letsPlay", function () {
        apiService
            .getUserDetail(socket.id)
            .then(function (result) {
            io.to(result === null || result === void 0 ? void 0 : result.data.room).emit("randomNumber", {
                number: "" + apiService.createRandomNumber(1999, 9999),
                isFirst: true,
            });
            socket.broadcast.emit("activateYourTurn", {
                user: io.nsps["/"].adapter.rooms[result === null || result === void 0 ? void 0 : result.data.room]
                    ? Object.keys(io.nsps["/"].adapter.rooms[result === null || result === void 0 ? void 0 : result.data.room].sockets)[0]
                    : null,
                state: "play",
            });
        })
            .catch(function (err) {
            socket.emit("error", { message: err });
        });
    });
    /* Send Calculatied number back with Divisible contorl */
    socket.on("sendNumber", function (_a) {
        var number = _a.number, selectedNumber = _a.selectedNumber;
        apiService.getUserDetail(socket.id).then(function (result) {
            var numbers = [selectedNumber, number];
            var sumValues = function (num) {
                return num.reduce(function (a, b) {
                    return a + b;
                });
            };
            var calculationResult = function (number, numberB) {
                var res = sumValues(number);
                if (res % 3 == 0) {
                    return res / 3;
                }
                else {
                    return numberB;
                }
            };
            io.to(result === null || result === void 0 ? void 0 : result.data.room).emit("randomNumber", {
                number: calculationResult(numbers, number),
                isFirst: false,
                user: result === null || result === void 0 ? void 0 : result.data.name,
                selectedNumber: selectedNumber,
                isCorrectResult: calculationResult(numbers, number) == number ? false : true,
            });
            /* if 1 is reached than emit the GameOver Listener */
            if (calculationResult(numbers, number) == 1) {
                io.to(result === null || result === void 0 ? void 0 : result.data.room).emit("gameOver", {
                    user: result === null || result === void 0 ? void 0 : result.data.name,
                    isOver: true,
                });
            }
            io.to(result === null || result === void 0 ? void 0 : result.data.room).emit("activateYourTurn", {
                user: socket.id,
                state: "wait",
            });
        });
    });
    /* Clear all data and states when the user leave the room */
    socket.on("leaveRoom", function () {
        apiService.getUserDetail(socket.id).then(function (result) {
            io.to(result === null || result === void 0 ? void 0 : result.data.room).emit("onReady", { state: false });
            apiService.removeUserFromRoom(socket.id).then(function () {
                socket.leave(result === null || result === void 0 ? void 0 : result.data.room);
            });
        });
    });
    /* OnDisconnet clear all login and room data from the connected socket */
    socket.on("disconnect", function () {
        apiService.getUserDetail(socket.id).then(function (result) {
            socket.broadcast.to(result === null || result === void 0 ? void 0 : result.data.room).emit("onReady", { state: false });
            apiService.removeUserFromRoom(socket.id).then(function () {
                socket.leave(result === null || result === void 0 ? void 0 : result.data.room);
            });
        });
        apiService.clearUser(socket.id).then(function () {
            socket.broadcast.emit("listTrigger", "" + true);
        });
    });
});
server.listen(port, function () {
    console.log("Socket Connection Established");
});
