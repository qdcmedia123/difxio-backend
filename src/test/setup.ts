// @ts-nocheck
import jwt from "jsonwebtoken";
import Context from "./context";
import request from "supertest";
import { app } from "../app";
declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}
let context: any;

beforeAll(async () => {
  context = await Context.build();

  process.env.NODE_ENV = "development";
  process.env.JWT_KEY = "TEST";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
});

afterAll(async () => {
  return await context.close();
});

global.signin = async () => {
  const email = "bharatrose1@gmail.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
