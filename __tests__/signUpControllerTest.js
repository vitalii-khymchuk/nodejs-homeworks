const { signup } = require("../src/controllers/auth");
const { User } = require("../src/models");
const bcrypt = require("bcrypt");
const { HttpError } = require("../src/utils");
require("dotenv").config();

describe("Sign Up controller test", () => {
  it("should crete new user, write to res token and status code ", async () => {
    let mUser = {};
    const mReq = { body: { email: "test", name: "test", password: "test" } };
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

    jest.spyOn(User, "find").mockImplementationOnce(() => Promise.resolve([]));

    jest.spyOn(User, "create").mockImplementationOnce((data) => {
      const newUser = { ...data, _id: "123" };
      mUser = newUser;
      return Promise.resolve(newUser);
    });

    jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce((id, data) => {
      mUser = { ...mUser, ...data };
      return Promise.resolve([mUser]);
    });

    jest
      .spyOn(bcrypt, "hash")
      .mockImplementationOnce(() => Promise.resolve("hashedPassword"));

    await signup(mReq, mRes);

    //check user fields
    expect(mUser.email).toEqual(mReq.body.email);
    expect(mUser.name).toEqual(mReq.body.name);
    expect(mUser.password).toBe("hashedPassword");
    expect(mUser._id).toBe("123");
    expect(typeof mUser.token).toBe("string");
    expect(typeof mUser.avatar.imageLink).toBe("string");
    expect(typeof mUser.avatar.name).toBe("string");
    //check res
    expect(mRes.code).toBe(201);
    expect(mRes.data.code).toBe(201);
    expect(typeof mRes.data.token).toBe("string");
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
      .spyOn(User, "find")
      .mockImplementationOnce(() => Promise.resolve([{}]));
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
      .spyOn(User, "find")
      .mockImplementationOnce(() => Promise.reject("test error"));
    await signup(mReq, mRes, mNext);
    expect(mNext).toHaveBeenCalledWith("test error");
  });
});
