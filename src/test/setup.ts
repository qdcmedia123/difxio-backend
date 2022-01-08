// @ts-nocheck
// import { app } from "../app";
// import request from "supertest";
import jwt from "jsonwebtoken";
import pool from "../config/pool";
import { randomBytes } from "crypto";
import { default as migrate } from "node-pg-migrate";
import format from "pg-format";
import Context from "./context";

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}
let context;

beforeAll(async () => {
  context = await Context.build();

  process.env.NODE_ENV = "test";
  process.env.JWT_KEY = "asdf";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  
});

afterAll(async () => {
  return await context.close();
});

global.signin = () => {
  const payload = {
    id: 1,
    email: "bharatrose1@gmail.com",
  };
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const buffer64 = Buffer.from(sessionJSON).toString("base64");
  return [`express:sess=${buffer64}`];
};
