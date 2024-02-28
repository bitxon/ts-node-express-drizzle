import { Request, Response } from "express";
import * as sinon from "sinon";
import * as sinonTs from "ts-sinon";
import * as HealthController from "../../../src/controller/health-controller";

describe("HealthController", () => {
  let reqStub: sinon.SinonStubbedInstance<Request>;
  let resStub: sinon.SinonStubbedInstance<Response>;

  beforeEach(() => {
    reqStub = sinonTs.stubInterface<Request>();
    resStub = sinonTs.stubInterface<Response>();
    resStub.status.returnsThis();
    resStub.json.returnsThis();
  });

  afterEach(() => {
    sinon.restore();
  });

  test("health", async () => {
    // when
    HealthController.health(reqStub as any, resStub as any);

    // then
    sinon.assert.calledWith(resStub.status, 200);
    sinon.assert.calledWith(resStub.json, { status: "UP" });
  });
});
