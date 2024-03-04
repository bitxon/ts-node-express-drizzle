import { Request, Response } from "express";
import * as sinon from "sinon";
import * as sinonTs from "ts-sinon";
import { Account, RawAccount } from "../../../src/api/account";
import * as AccountController from "../../../src/controller/account-controller";
import * as AccountService from "../../../src/service/account-service";

// use followign line to prevent jest from loading the actual db.js
// jest.mock("../../../src/db/db", () => () => false);

describe("AccountController", () => {
  let reqStub: sinon.SinonStubbedInstance<Request>;
  let resStub: sinon.SinonStubbedInstance<Response>;
  let findAllStub: sinon.SinonStub;
  let findByIdStub: sinon.SinonStub;
  let createStub: sinon.SinonStub;

  beforeEach(() => {
    reqStub = sinonTs.stubInterface<Request>();
    resStub = sinonTs.stubInterface<Response>();
    resStub.status.returnsThis();
    resStub.json.returnsThis();

    findAllStub = sinon.stub(AccountService, "findAll");
    findByIdStub = sinon.stub(AccountService, "findById");
    createStub = sinon.stub(AccountService, "create");
  });

  afterEach(() => {
    sinon.restore();
  });

  test("findAll", async () => {
    // given
    const accounts: Account[] = [{ id: 1, email: "some@mail.com", firstName: "Joe", lastName: "Doe" }];
    findAllStub.resolves(accounts);

    // when
    await AccountController.findAllAccounts(reqStub as any, resStub as any);

    // then
    sinon.assert.calledWith(resStub.status, 200);
    sinon.assert.calledWith(resStub.json, accounts);
  });

  test("findById -> 200", async () => {
    // given
    const account: Account = { id: 1, email: "some@mail.com", firstName: "Joe", lastName: "Doe" };

    reqStub.params = { id: "1" };
    findByIdStub.resolves(account);

    // when
    await AccountController.getOneAccountById(reqStub as any, resStub as any);

    // then
    sinon.assert.calledWith(resStub.status, 200);
    sinon.assert.calledWith(resStub.json, account);
    sinon.assert.calledWith(findByIdStub, 1);
  });

  test("findById -> 404", async () => {
    // given
    reqStub.params = { id: "-1" };
    findByIdStub.resolves(undefined);

    // when
    await AccountController.getOneAccountById(reqStub as any, resStub as any);

    // then
    sinon.assert.calledWith(resStub.status, 404);
    sinon.assert.notCalled(resStub.json);
    sinon.assert.calledWith(findByIdStub, -1);
  });

  test("createAccount", async () => {
    // given
    const accountIn: RawAccount = { email: "some@mail.com", firstName: "Joe", lastName: "Doe" };
    const accountOut: Account = { id: 1, email: "some@mail.com", firstName: "Joe", lastName: "Doe" };

    reqStub.body = accountIn;
    createStub.resolves(accountOut);

    // when
    await AccountController.createAccount(reqStub as any, resStub as any);

    // then
    sinon.assert.calledWith(resStub.status, 201);
    sinon.assert.calledWith(resStub.json, accountOut);
    sinon.assert.calledWith(createStub, accountIn);
  });
});
