require("./setup");
const request = require("supertest");
const app = require("../app");

describe("Auth API – Characterization", () => {
  it("registers a user successfully", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@test.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });
});
