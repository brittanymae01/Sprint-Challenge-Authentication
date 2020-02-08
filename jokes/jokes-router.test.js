const request = require("supertest");
const db = require("../database/dbConfig");
const server = require("../api/server");

describe("jokes-router", function() {
  it("runs the tests", function() {
    expect(true).toBe(true);
  });

  describe("get jokes endpoint", function() {
    it("responds with 401", function() {
      return (
        request(server)
          .get("/api/jokes")
          // .set("Authorization", "token") ?? couldn't figure this out
          .expect("Content-Type", /json/)
          .then(res => {
            expect(res.status).toBe(401);
          })
      );
    });

    it("responds with string", function() {
      return request(server)
        .get("/api/jokes")
        .expect("Content-Type", /json/)
        .expect(401)
        .then(res => {
          expect(res.body.you).toBe("invalid credentials");
        });
    });
  });
});
