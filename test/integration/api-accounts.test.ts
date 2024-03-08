import supertest from "supertest";
import app from "../../src/app";
import { Account, RawAccount, Transfer } from "../../src/api/account";

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

  test("POST /accounts/transfer", async () => {
    // given
    const account1: Account = (
      await supertest(app).post("/accounts").send({
        email: "john1@mail.com",
        firstName: "John1",
        lastName: "Doe1",
        currency: "USD",
        amount: 100,
      })
    ).body;
    const account2: Account = (
      await supertest(app).post("/accounts").send({
        email: "john2@mail.com",
        firstName: "John2",
        lastName: "Doe2",
        currency: "USD",
        amount: 100,
      })
    ).body;
    const transfer: Transfer = { senderId: account1.id, recipientId: account2.id, amount: 100 };

    // when-then
    return supertest(app)
      .post(`/accounts/transfer`)
      .send(transfer)
      .expect(204)
      .then((response) => {
        expect(response.body).toEqual({});
      });

    // aditional checks
  });
});
