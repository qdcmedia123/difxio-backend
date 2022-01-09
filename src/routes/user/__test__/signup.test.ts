import UserRapo from "../../../../src/repos/user-rapo";
import request from "supertest";
import { app } from "../../../app";

it("If email address is not provided, throw 400 bad request error", async () => {
  const startingCount = await UserRapo.count();
  expect(startingCount).toEqual(0);
  await request(app)
    .post("/api/users/signup")
    .send({
      password: "password",
    })
    .expect(400);
});

it("If email password is not provided, throw 400 bad request error", async () => {
  const startingCount = await UserRapo.count();
  expect(startingCount).toEqual(0);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "bharat@gmail.com",
    })
    .expect(400);
});

it("If not valid email is provided, throw 400 bad request error", async () => {
  const startingCount = await UserRapo.count();
  expect(startingCount).toEqual(0);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "bharat",
      password: "password",
    })
    .expect(400);
});

it("Return a 201 on sucessfull signup", async () => {
  const startingCount = await UserRapo.count();
  expect(startingCount).toEqual(0);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "bharatrose1@gmail.com",
      password: "password",
    })
    .expect(201);
  const finishCount = await UserRapo.count();
  expect(finishCount).toEqual(1);
});

it("return with 400 with invalid passwod length 4", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "bharatrose1@",
      password: "pa",
    })
    .expect(400);
});

it("return a 400 with missing email and password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "",
      password: "",
    })
    .expect(400);
});

it("Disallowed duplicate emails ", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "bharatrose1@gmail.com",
      password: "password",
    })
    .expect(400);
});

// it("sets a cooki after succefull signup", async () => {
//   const response = await request(app)
//     .post("/api/users/signup")
//     .send({
//       email: "bharatrose2@gmail.com",
//       password: "password",
//     })
//     .expect(201);
//   expect(response.get("Set-Cookie")).toBeDefined();
// });
