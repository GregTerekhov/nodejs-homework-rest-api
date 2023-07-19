const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const { User } = require("../../models");
require("dotenv").config();

const { DB_TEST_HOST } = process.env;

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
    console.log("Server has started");

    await User.deleteMany();
  });

  it("should register new user and get and object 'user' with two properties: 'email' and 'subscription'", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "example@mail.com",
      password: "password",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.data.user).toHaveProperty("email", expect.any(String));
    expect(response.body.data.user).toHaveProperty(
      "subscription",
      expect.any(String)
    );
  });

  it("should get a token and a statusCode = 200", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "example@mail.com",
      password: "password",
    });

    const token = response.body.data.token;

    expect(response.statusCode).toBe(200);
    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_HOST);
    console.log("Server has stopped");
  });
});
