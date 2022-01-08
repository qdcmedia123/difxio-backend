// @ts-nocheck
// import { app } from "../app";
// import request from "supertest";
import jwt from "jsonwebtoken";
import pool from "../config/pool";
import { randomBytes } from "crypto";
import {default as  migrate} from 'node-pg-migrate';
import formate from "pg-format";


declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

// declare module global {
//   function signin(): string[];
// }

beforeAll(async () => {
  // Randomly generating a role name to connect to PG 

  // Cinnect to PG as usual
  // Create a new role 
  // Create a schema with the same name 
  // Disconnect entirely from PG 
  // Run our migration in the new schema 
  // Connect to pg as the newly created rold 
  // 
  process.env.NODE_ENV = "test";
  process.env.JWT_KEY = "asdf";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  return pool.connect({
    host: "localhost",
    port: 5432,
    database: "difxio-test",
    user: "limitless",
    password: "",
  });
});

beforeEach(async () => {
 console.log('runnin before each')
});

afterAll(async () => {
  return await pool.close();
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
