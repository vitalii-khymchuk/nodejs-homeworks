const { signup } = require("../src/controllers/auth");
const { User } = require("../src/models");
const bcrypt = require("bcrypt");
const { HttpError } = require("../src/utils");
const { sendGrid } = require("../src/services");
jest.mock("uuid", () => ({ v4: jest.fn(() => "testRandomId") }));
require("dotenv").config();

describe("Sign Up controller test", () => {
  const hashedPW = "hashedPassword";
  const mNext = jest.fn();

  it("should to crete new user in case if user doesnt exist, send verification link, write to res message and status code ", async () => {
    let mUser = {};
    const mReq = {
      body: { email: "test", name: "test", password: "test" },
      headers: { host: "test" },
    };
    const mRes = {
      code: null,
      data: null,
      status(code) {
        this.code = code;
        return { json: this.json.bind(this) };
      },
      json(data) {
        this.data = data;
      },
    };

    jest
      .spyOn(User, "findOne")
      .mockImplementationOnce(() => Promise.resolve(null));

    jest.spyOn(User, "create").mockImplementationOnce((data) => {
      const newUser = { ...data, _id: "123", verify: false };
      mUser = newUser;
      return Promise.resolve(newUser);
    });

    jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce((id, data) => {
      mUser = { ...mUser, ...data };
      return Promise.resolve(mUser);
    });

    jest
      .spyOn(bcrypt, "hash")
      .mockImplementationOnce(() => Promise.resolve(hashedPW));

    const mSendGrid = jest
      .spyOn(sendGrid, "sendVerificationEmail")
      .mockImplementationOnce(() => Promise.resolve());

    await signup(mReq, mRes, mNext);
    //check if verification email has been sent
    expect(mSendGrid).toHaveBeenCalledWith(
      mReq.body.email,
      `http://${mReq.headers.host}/api/users/verify/testRandomId`
    );
    //check user fields
    expect(mUser.email).toBe(mReq.body.email);
    expect(mUser.name).toBe(mReq.body.name);
    expect(mUser.password).toBe("hashedPassword");
    expect(mUser._id).toBe("123");
    expect(mUser.verify).toBe(false);
    expect(typeof mUser.avatar.imageLink).toBe("string");
    expect(typeof mUser.avatar.name).toBe("string");
    //check res
    expect(mRes.code).toBe(201);
    expect(mRes.data.code).toBe(201);
    expect(mRes.data.message).toBe(
      `Profile has been created, verification link were sent to ${mUser.email}`
    );
  });
  it("should to update user data in case if user already exist but not verified, send verification link, write to res message and status code ", async () => {
    let mUser = { verify: true, _id: "123" };
    const mReq = {
      body: { email: "test", name: "test", password: "test" },
      headers: { host: "test" },
    };
    const mRes = {
      code: null,
      data: null,
      status(code) {
        this.code = code;
        return { json: this.json.bind(this) };
      },
      json(data) {
        this.data = data;
      },
    };

    jest
      .spyOn(User, "findOne")
      .mockImplementationOnce(() => Promise.resolve(null));

    jest.spyOn(User, "create").mockImplementationOnce((data) => {
      const newUser = { ...data, _id: "123", verify: false };
      mUser = newUser;
      return Promise.resolve(newUser);
    });

    jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce((id, data) => {
      mUser = { ...mUser, ...data };
      return Promise.resolve(mUser);
    });

    jest
      .spyOn(bcrypt, "hash")
      .mockImplementationOnce(() => Promise.resolve(hashedPW));

    const mSendGrid = jest
      .spyOn(sendGrid, "sendVerificationEmail")
      .mockImplementationOnce(() => Promise.resolve());

    await signup(mReq, mRes, mNext);
    //check if verification email has been sent
    expect(mSendGrid).toHaveBeenCalledWith(
      mReq.body.email,
      `http://${mReq.headers.host}/api/users/verify/testRandomId`
    );
    //check user fields
    expect(mUser.email).toBe(mReq.body.email);
    expect(mUser.name).toBe(mReq.body.name);
    expect(mUser.password).toBe("hashedPassword");
    expect(mUser._id).toBe("123");
    expect(mUser.verify).toBe(false);
    expect(typeof mUser.avatar.imageLink).toBe("string");
    expect(typeof mUser.avatar.name).toBe("string");
    //check res
    expect(mRes.code).toBe(201);
    expect(mRes.data.code).toBe(201);
    expect(mRes.data.message).toBe(
      `Profile has been created, verification link were sent to ${mUser.email}`
    );
  });
  it("should call next() and pass error 400 is case of name field is empty or absent", async () => {
    const mReq = { body: { email: "test", name: "", password: "test" } };
    const mRes = {};
    const mNext = jest.fn();
    await signup(mReq, mRes, mNext);
    expect(mNext).toHaveBeenCalledWith(
      HttpError(400, "Please provide all necessary data")
    );
  });
  it("should call next() and pass error 400 is case of email field is empty or absent", async () => {
    const mReq = { body: { email: "", name: "test", password: "test" } };
    const mRes = {};
    const mNext = jest.fn();
    await signup(mReq, mRes, mNext);
    expect(mNext).toHaveBeenCalledWith(
      HttpError(400, "Please provide all necessary data")
    );
  });
  it("should call next() and pass error 400 is case of password field is empty or absent", async () => {
    const mReq = { body: { email: "test", name: "test", password: "" } };
    const mRes = {};
    const mNext = jest.fn();
    await signup(mReq, mRes, mNext);
    expect(mNext).toHaveBeenCalledWith(
      HttpError(400, "Please provide all necessary data")
    );
  });
  it("should call next() and pass error 400 is case of user already exist", async () => {
    const mReq = { body: { email: "test", name: "test", password: "test" } };
    const mRes = {};
    const mNext = jest.fn();
    jest
      .spyOn(User, "findOne")
      .mockImplementationOnce(() => Promise.resolve({ verify: true }));
    await signup(mReq, mRes, mNext);
    expect(mNext).toHaveBeenCalledWith(
      HttpError(400, `User with ${mReq.body.email} already exist`)
    );
  });
  it("should call next() and pass error is case of services error", async () => {
    const mReq = { body: { email: "test", name: "test", password: "test" } };
    const mRes = {};
    const mNext = jest.fn();
    jest
      .spyOn(User, "findOne")
      .mockImplementationOnce(() => Promise.reject("test error"));
    await signup(mReq, mRes, mNext);
    expect(mNext).toHaveBeenCalledWith("test error");
  });
});
