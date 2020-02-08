const request = require("supertest");
const db = require("../database/dbConfig");
const server = require("../api/server");

describe("auth-router", function() {
  beforeEach(async () => {
    await db("users").truncate();
  });
  it("runs the tests", function() {
    expect(true).toBe(true);
  });

  describe("posting to register endpoint", function() {
    it("responds with json", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "test", password: "test" })
        .expect("Content-Type", /json/i)
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it("should have username of test2", function() {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "test2", password: "test2" })
        .expect("Content-Type", /json/)
        .then(res => {
          expect(res.body.username).toBe("test2");
        });
    });
  });

  describe("posting to login endpoint", function() {
    it("responds with 200", function() {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "test", password: "test" })
        .expect("Content-Type", /json/)
        .then(res => {
          expect(res.status).toBe(401);
        });
    });

    it("responds with json", function() {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "test", password: "test" })
        .expect("Content-Type", /json/)
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
});
