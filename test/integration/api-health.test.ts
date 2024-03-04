import supertest from "supertest";
import app from "../../src/app";

describe("API: Health", () => {
  test("GET /health", async () => {
    return supertest(app)
      .get("/health")
      .send()
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({ status: "UP" });
      });
  });
});
