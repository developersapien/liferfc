import express from "express";
import * as http from "http";
import SocketIO from "socket.io";
import CalculationService from "./calculation.service";
import {
  createUser,
  addPlayerToRoom,
  assingRoomToPlayer,
  getUserRoom,
  clearUser,
} from "./api.service";
import APIService from "./ap.service";

const port = 8081;
const server = http.createServer(express);
const io = SocketIO(server);
const apiService = new APIService();
const calculationService = new CalculationService();

io.on("connection", (socket) => {
  socket.on("login", ({ username }) => {
    apiService
      .createUser(socket.id, username)
      .then(() => {
        socket.emit("message", {
          user: username,
          message: `Welcome ${username}`,
          socketId: socket.id,
        });
      })
      .catch((err) => {
        socket.emit("error", { message: err });
      });
  });

  /* Join to the room */
  socket.on("joinRoom", ({ username, room }) => {
    apiService
      .assignRoom(room, socket.id)
      .then(() => {
        socket.emit("message", {
          user: username,
          message: `welcome to room ${room}`,
          room: room,
        });
        socket.broadcast.to(room).emit("message", {
          user: username,
          message: `has joined ${room}`,
          room: room,
        });
        /* Check the room with how many socket is connected */
        socket.join(room, () => {
          if (
            io.nsps["/"].adapter.rooms[room] &&
            io.nsps["/"].adapter.rooms[room].length === 2
          ) {
            io.to(room).emit("onReady", { state: true });
          }
        });
      })
      .catch((err) => {
        socket.emit("error", { message: err });
      });
  });

  /* Start the game and send the first random number with turn control */
  socket.on("letsPlay", () => {
    apiService
      .getUserDetail(socket.id)
      .then((result) => {
        io.to(result?.data.room).emit("randomNumber", {
          number: `${CalculationService.createRandomNumber(1999, 9999)}`,
          isFirst: true,
        });

        socket.broadcast.emit("activateYourTurn", {
          user: io.nsps["/"].adapter.rooms[result?.data.room]
            ? Object.keys(
                io.nsps["/"].adapter.rooms[result?.data.room].sockets
              )[0]
            : null,
          state: "play",
        });
      })
      .catch((err) => {
        socket.emit("error", { message: err });
      });
  });

  /* Send Calculatied number back with Divisible contorl */
  socket.on("sendNumber", ({ number, selectedNumber }) => {
    apiService.getUserDetail(socket.id).then((result) => {
      const numbers = [selectedNumber, number];
      const sumValues = (num) => {
        return num.reduce((a, b) => {
          return a + b;
        });
      };

      const calculationResult = (number, numberB) => {
        const res = sumValues(number);
        if (res % 3 == 0) {
          return res / 3;
        } else {
          return numberB;
        }
      };

      io.to(result?.data.room).emit("randomNumber", {
        number: calculationResult(numbers, number),
        isFirst: false,
        user: result?.data.name,
        selectedNumber: selectedNumber,
        isCorrectResult:
          calculationResult(numbers, number) == number ? false : true,
      });

      /* if 1 is reached than emit the GameOver Listener */
      if (calculationResult(numbers, number) == 1) {
        io.to(result?.data.room).emit("gameOver", {
          user: result?.data.name,
          isOver: true,
        });
      }
      io.to(result?.data.room).emit("activateYourTurn", {
        user: socket.id,
        state: "wait",
      });
    });
  });

  /* Clear all data and states when the user leave the room */
  socket.on("leaveRoom", () => {
    apiService.getUserDetail(socket.id).then((result) => {
      io.to(result?.data.room).emit("onReady", { state: false });
      apiService.removeUserFromRoom(socket.id).then(() => {
        socket.leave(result?.data.room);
      });
    });
  });

  /* OnDisconnet clear all login and room data from the connected socket */
  socket.on("disconnect", () => {
    apiService.getUserDetail(socket.id).then((result) => {
      socket.broadcast.to(result?.data.room).emit("onReady", { state: false });
      apiService.removeUserFromRoom(socket.id).then(() => {
        socket.leave(result?.data.room);
      });
    });
    clearUser(socket.id).then(() => {
      socket.broadcast.emit("listTrigger", `${true}`);
    });
  });
});

server.listen(port, () => {
  console.log("Socket Connection Established");
});
