import "reflect-metadata";
import *as express from "express";
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as ejs from "ejs";
import * as expresLayout from "express-ejs-layouts";
import * as path from "path";
import { createConnection, getConnection } from "typeorm";
import { TypeormStore } from "typeorm-store";
import { Session } from "./entity/Session";
import userRouter from "./routes/auth_routers";
import { validationResult } from "express-validator";



createConnection()
    .then(async (connection) => {
        const app = express();
        const PORT = 3000;
        const repository = getConnection().getRepository(Session);

        //middlewares

        //template engine
        app.use(expresLayout);
        app.use(express.static("public"));
        app.set("view engine", "ejs");
        app.set("views", path.resolve(__dirname, "./views"));

        app.use(bodyParser.json());

        app.use(express.urlencoded({ extended: true }));
      
        
        //create session
        app.use(
            session({
                secret: process.env.SESSION_SECRET,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    maxAge: 60000,
                },
                store: new TypeormStore({ repository }),
            })
        );

        app.use("/", userRouter);

        app.listen(PORT, () => {
            console.log(`server listenin on port ${PORT}`);
        });
    })
    .catch((error) => console.log(error));
