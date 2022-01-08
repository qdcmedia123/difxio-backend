import UserRapo from "../../../../src/repos/user-rapo";
import request from "supertest";
import { app } from "../../../app";

it("Return a 201 on sucessfull signup", async () => {

  const startingCount = await UserRapo.count();
  expect(startingCount).toEqual(1);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "bharatrose1@gmail.com",
      password: "password",
    })
    .expect(400);
    const finishCount = await UserRapo.count();
    expect(finishCount - startingCount).toEqual(0);

    console.log(global.signin());
    
});

// it("Invalid email", async () => {
//   return request(app)
//     .post("/api/users/signup")
//     .send({
//       email: "bharatrose1@",
//       password: "password",
//     })
//     .expect(400);
// });

// it("return with 400 with invalid passwod", async () => {
//   return request(app)
//     .post("/api/users/signup")
//     .send({
//       email: "bharatrose1@",
//       password: "pas",
//     })
//     .expect(400);
// });

// it("return a 400 with missing email and password", async () => {
//   return request(app)
//     .post("/api/users/signup")
//     .send({
//       email: "",
//       password: "",
//     })
//     .expect(400);
// });

// it("Disallowed duplicate emails ", async () => {
//     await request(app)
//       .post("/api/users/signup")
//       .send({
//         email: "bharatrose1@gmail.com",
//         password: "password",
//       })
//       .expect(201);

//       await request(app)
//       .post("/api/users/signup")
//       .send({
//         email: "bharatrose1@gmail.com",
//         password: "password",
//       })
//       .expect(400);
//   });

// it('sets a cooki after succefull signup', async() => {
//     const response = await request(app)
//     .post("/api/users/signup")
//     .send({
//       email: "bharatrose1@gmail.com",
//       password: "password",
//     })
//     .expect(201);
//     expect(response.get('Set-Cookie')).toBeDefined();
//   })