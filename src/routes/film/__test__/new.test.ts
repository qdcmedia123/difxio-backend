import request from "supertest";
import { app } from "../../../app";

let film: any = {
  description: "This is description",
  realease_date: "1999-01-08",
  rating: 1,
  ticket_price: 500,
  country: "UAE",
  genre: ["test"],
  photo:
    "https://gravatar.com/avatar/b5004e1e3270319c1b4e9fc61c3ab58a?s=400&d=robohash&r=x",
};
let cookie;

it("If user is not authenticated throw an error 401", async () => {
  await request(app).post("/api/films").send().expect(401);
});

it("If film name is missing return bad request error then sucessfully create a film", async () => {
  cookie = await global.signin('bharatrose50@gmail.com');
  await request(app)
    .post("/api/films")
    .set("Cookie", cookie)
    .send(film)
    .expect(400);

  film = { ...film, name: "test film" };

  await request(app)
    .post("/api/films")
    .set("Cookie", cookie)
    .send(film)
    .expect(200);
});

