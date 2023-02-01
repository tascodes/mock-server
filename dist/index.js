"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
const httpServer = new http_1.default.Server(app);
const io = new socket_io_1.Server(httpServer);
app.get("/", (req, res) => {
    res.send("<div>Socket.IO server is running</div>");
});
const setRandomInterval = (intervalFunction, minDelay, maxDelay) => {
    let timeout;
    const runInterval = () => {
        const timeoutFunction = () => {
            intervalFunction();
            runInterval();
        };
        const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
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
            id: faker_1.faker.datatype.uuid(),
            name: faker_1.faker.internet.userName(),
            color: faker_1.faker.internet.color(),
        },
        message: randomTwitchChat(),
    };
    return message;
};
io.on("connection", (socket) => {
    setRandomInterval(() => {
        io.emit("chat message", getMessage());
    }, 700, 2000);
});
httpServer.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});
