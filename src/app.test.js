const request = require("supertest");
const app = require("./app");

describe("GET /health", () => {
  it("should return status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({status: "ok"});
  });
});

describe("GET /hello", () => {
  it("should return hello message", async () => {
    const res = await request(app).get("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({message: "Hello from DevOps pipeline!"});
  });
});
