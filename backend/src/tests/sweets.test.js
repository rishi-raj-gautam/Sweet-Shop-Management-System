const request = require("supertest");
const app = require("../src/app");

let adminToken;
let sweetId;

beforeEach(async () => {
  // create admin
  const admin = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Admin",
      email: "admin@test.com",
      password: "admin123",
      role: "admin"
    });

  adminToken = admin.body.token;

  // create sweet
  const sweet = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Ladoo",
      category: "Indian",
      price: 10,
      quantity: 5
    });

  sweetId = sweet.body._id;
});

describe("Inventory – TDD", () => {
  it("should fail when restock amount is negative", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ amount: -5 });

    expect(res.statusCode).toBe(400);
  });
});
