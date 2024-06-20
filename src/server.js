"use strict";
/**
 * Module dependencies.
 */
const { Server } = require("socket.io");

/**
 * Load environment variables from .env file.
 */
const clientURLLocalhost = "http://localhost:3000";
const clientUrlDeploy = "https://la-nina-y-su-sombra.vercel.app";

/**
 * Define the port.
 */
const port = 8080;

/**
 * Create a WebSocket server using Socket.IO.
 * Configured with CORS policy to allow connections from specified origins.
 */
const io = new Server({
  cors: {
    origin: [clientUrlDeploy, clientURLLocalhost],
    methods: ["GET", "POST"],
    credentials: true
  },
});

/**
 * Start listening on the specified port.
 */
io.listen(port);

/**
 * Listen for incoming connections.
 */
io.on("connection", (socket) => {
  /**
   * Log the ID of the player connected.
   */
  console.log(
    "Player joined with ID",
    socket.id,
    ". There are " + io.engine.clientsCount + " players connected."
  );

  // Enviar el estado inicial de los tentáculos al cliente recién conectado
  

  /**
   * Handle a player's movement.
   * Broadcast the transforms to other players.
   */
  socket.on("player-moving", (transforms) => {
    socket.broadcast.emit("player-moving", transforms);
  });

  socket.on("player-attack", (attack) => {
    socket.broadcast.emit("player-attack", attack);
  });

  socket.on("player-pequeno", (pequenho) => {
    socket.broadcast.emit("player-pequeno", pequenho);
  });

  socket.on("player-action", (action) => {
    socket.broadcast.emit("player-action", action);
  });

  // Manejar la actualización de la vida del tentáculo
  socket.on("player-box", (transforms) => {
    socket.broadcast.emit("player-box", transforms);
  });
  /**
   * Handle player disconnection.
   */
  socket.on("disconnect", () => {
    console.log(
      "Player disconnected with ID",
      socket.id,
      ". There are " + io.engine.clientsCount + " players connected."
    );
  });
});
