import sinon from "sinon"
import {
	describe, it, expect, beforeEach, afterEach
} from 'vitest';
import {getNumberParamMiddleware} from "./number-params.middleware"
import { Request, Response } from 'express';

describe("Number param middleware", () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it("should do nothing for a unknown param", () => {
    const nextFn = sandbox.stub()
    const middleware = getNumberParamMiddleware("paramName")

    const request = {
      params: {}
    } as unknown as Request

    const response = {
      status: sandbox.stub(),
      send: sandbox.stub()
    } as unknown as Response

    middleware(request, response, nextFn)

    expect(nextFn.called).to.be.true
  })

  it("should return 400 when a number param is NaN", () => {
    const nextFn = sandbox.stub()
    const middleware = getNumberParamMiddleware("paramName")

    const request = {
      params: {
        paramName: "abc"
      }
    } as unknown as Request

    const response = {
      status: sandbox.stub(),
      send: sandbox.stub()
    } as unknown as Response

    middleware(request, response, nextFn)

    expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true
    expect((response.send as sinon.SinonStub).calledWith("Invalid paramName")).to.be.true
    expect(nextFn.called).not.be.true
  })

  it("should return a number when param is valid", () => {
    const nextFn = sandbox.stub()
    const middleware = getNumberParamMiddleware("paramName")

    const request = {
      params: {
        paramName: "666"
      }
    } as unknown as Request

    const response = {
      locals: {},
      status: sandbox.stub(),
      send: sandbox.stub()
    } as unknown as Response

    middleware(request, response, nextFn)

    expect((response.status as sinon.SinonStub).calledWith(400)).not.to.be.true
    expect((response.send as sinon.SinonStub).calledWith("Invalid paramName")).not.to.be.true
    expect(nextFn.called).to.be.true
    expect(response.locals.paramName).to.be.equal(666)
  })
})