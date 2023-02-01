import { faker } from "@faker-js/faker";
import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const port = process.env.PORT || 3000;

const app = express();
const httpServer = new http.Server(app);
const io = new Server(httpServer);

app.get("/", (req, res) => {
  res.send("<div>Socket.IO server is running</div>");
});

const setRandomInterval = (
  intervalFunction: () => void,
  minDelay: number,
  maxDelay: number
) => {
  let timeout: NodeJS.Timeout;

  const runInterval = () => {
    const timeoutFunction = () => {
      intervalFunction();
      runInterval();
    };

    const delay =
      Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    timeout = setTimeout(timeoutFunction, delay);
  };

  runInterval();

  return {
    clear() {
      clearTimeout(timeout);
    },
  };
};

const randomTwitchChat = () => {
  const messages = [
    "Hi this is my first time here",
    ":angry: This game looks awful",
    "That was poggers :smile:",
    "!sr Never Gonna Give You Up - Rick Astley",
    "No self promo! :angry:",
    "I was playing this on my channel yesterday :smile:",
    "Streamer you are so good at this game",
    "You have to check behind the waterfall",
    ":smile: The main character dies at the end",
    "That was poggers :smile:",
  ];

  return messages[Math.floor(Math.random() * messages.length)];
};

const getMessage = () => {
  const message = {
    user: {
      id: faker.datatype.uuid(),
      name: faker.internet.userName(),
      color: faker.internet.color(),
    },
    message: randomTwitchChat(),
  };

  return message;
};

io.on("connection", (socket: Socket) => {
  setRandomInterval(
    () => {
      io.emit("chat message", getMessage());
    },
    700,
    2000
  );
});

httpServer.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
