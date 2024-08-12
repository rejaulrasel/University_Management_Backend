import { Server } from "http";
import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

let server: Server


async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();


//unhandledRejection 
process.on('unhandledRejection', () => {
  console.log("unhandledrejection is detected, shutting down.....")
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }

  process.exit(1);
})


//uncaughtException
process.on('uncaughtException', () => {
  console.log("uncaughtException is detected, shutting down.....")
  process.exit(1);
})

