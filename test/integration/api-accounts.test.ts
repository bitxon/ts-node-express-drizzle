import supertest from "supertest";
import app from "../../src/app";
import { Account, RawAccount } from "../../src/api/account";

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
    const accountIn: RawAccount = {
      email: "some@mail.com",
      firstName: "Some",
      lastName: "Doe",
      currency: "USD",
      balance: 100,
    };
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

  test("GET /accounts/:id", async () => {
    const rawAccount: RawAccount = {
      email: "john1@mail.com",
      firstName: "John",
      lastName: "Doe",
      currency: "USD",
      balance: 100,
    };
    const account: Account = (await supertest(app).post("/accounts").send(rawAccount)).body;

    return supertest(app)
      .get(`/accounts/${account.id}`)
      .send()
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(account);
      });
  });
});
