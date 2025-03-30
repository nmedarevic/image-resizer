import sinon from "sinon"
import {
	describe, it, expect, beforeEach, afterEach
} from 'vitest';
import {getNumberParamMiddleware} from "./number-params.middleware"
import { Request, Response } from 'express';
import { getUrlDecodeMiddleware } from "./url-decode.middleware";

describe("Url decode middleware", () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it("should do nothing for a unknown param", () => {
    const nextFn = sandbox.stub()
    const middleware = getUrlDecodeMiddleware("paramName")

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

  it("should return a decoded url", () => {
    const nextFn = sandbox.stub()
    const middleware = getUrlDecodeMiddleware("paramName")

    const request = {
      params: {
        paramName: 'https%3A%2F%2Fimages.pexels.com%2Fphotos%2F1108099%2Fpexels-photo-1108099.jpeg'
      }
    } as unknown as Request

    const response = {
      locals: {},
      status: sandbox.stub(),
      send: sandbox.stub()
    } as unknown as Response

    middleware(request, response, nextFn)

    expect(nextFn.called).to.be.true
    expect(response.locals.paramName).to.be.equal("https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg")
  })
})