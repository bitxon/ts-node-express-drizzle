import supertest from "supertest";
import app from "../../src/app";
import { RawAccount } from "../../src/api/account";

describe("API: Accounts", () => {
  test("GET /accounts", async () => {
    return supertest(app)
      .get("/accounts")
      .send()
      .expect(200)
      .then((response) => {
        expect(response.body).not.toBeNull();
      });
  });

  test("POST /accounts", async () => {
    const accountIn: RawAccount = { email: "some@mail.com", firstName: "Joe", lastName: "Doe" };
    return supertest(app)
      .post("/accounts")
      .send(accountIn)
      .expect(201)
      .then((response) => {
        expect(response.body.id).not.toBeNull();
        expect(response.body.email).toEqual(accountIn.email);
        expect(response.body.firstName).toEqual(accountIn.firstName);
        expect(response.body.lastName).toEqual(accountIn.lastName);
      });
  });
});
