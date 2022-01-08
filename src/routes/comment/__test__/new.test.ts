import request from "supertest";
import { app } from "../../../app";

let film: any = {
  name: "test",
  description: "This is description",
  realease_date: "1999-01-08",
  rating: 1,
  ticket_price: 500,
  country: "UAE",
  genre: ["test"],
  photo:
    "https://gravatar.com/avatar/b5004e1e3270319c1b4e9fc61c3ab58a?s=400&d=robohash&r=x",
};

it("Creating new comments", async () => {
  // Create user first
  const cookie = await global.signin();
  // Create film
  const res = await request(app)
    .post("/api/films")
    .set("Cookie", cookie)
    .send(film)
    .expect(200);

  const resJson: any = JSON.parse(res.text);

  // Create comment
  await request(app)
    .post("/api/comments")
    .set("Cookie", cookie)
    .send({
      film_id: resJson.id,
      comment: "I am testing my comments",
    })
    .expect(200);
});
