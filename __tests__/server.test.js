// __tests__/server.test.js
const http = require("http");
const request = require("supertest");
const handler = require("../server");

function createTestServer() {
  return http.createServer(handler);
}

describe("Node HTTP app", () => {
  test("GET / returns hello message", async () => {
    const server = createTestServer();
    await request(server)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        if (!res.body.message) {
          throw new Error("Missing message in response");
        }
      });
  });

  test("GET /health returns status ok", async () => {
    const server = createTestServer();
    await request(server)
      .get("/health")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        if (res.body.status !== "Ok") {
          throw new Error("Health check status is not ok");
        }
      });
  });

  test("Unknown route returns 404", async () => {
    const server = createTestServer();
    await request(server)
      .get("/unknown")
      .expect("Content-Type", /json/)
      .expect(404);
  });
});
