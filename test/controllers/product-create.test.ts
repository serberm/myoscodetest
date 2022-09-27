import request from "supertest";
import HttpStatus from "http-status-codes";
import app from "../../src/app";

describe("POST /products", () => {
  it("should create a new product", async () => {
    const req = {
      title: "test322",
      price: 5,
      description: "this is test6 result",
      picture: "https://test.com/picture6",
      quantity: 1,
    };

    const response = await request(app).post("/api/products").send(req);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body.product.title).toBe(req.title);
  });
  it("should throw 400 error if there is no title", async () => {
    const req = {
      price: 5,
      description: "this is test6 result",
      picture: "https://test.com/picture6",
      quantity: 1,
    };

    const response = await request(app).post("/api/products").send(req);

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });
  it("should throw 400 error if there is no price", async () => {
    const req = {
      title: "test322",
      description: "this is test6 result",
      picture: "https://test.com/picture6",
      quantity: 1,
    };

    const response = await request(app).post("/api/products").send(req);

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });
  it("should throw 400 error if there is no picture", async () => {
    const req = {
      title: "test322",
      price: 5,
      description: "this is test6 result",
      quantity: 1,
    };

    const response = await request(app).post("/api/products").send(req);

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });
  it("should throw 400 error if there is no quantity", async () => {
    const req = {
      title: "test322",
      price: 5,
      description: "this is test6 result",
      picture: "https://test.com/picture6",
    };

    const response = await request(app).post("/api/products").send(req);

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });
  it("should throw 400 error if price is string", async () => {
    const req = {
      title: "test322",
      price: "ts",
      description: "this is test6 result",
      picture: "https://test.com/picture6",
      quantity: 1,
    };

    const response = await request(app).post("/api/products").send(req);

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });
  it("should throw 400 error if price is bigger than max", async () => {
    const req = {
      title: "test322",
      price: Number.MAX_SAFE_INTEGER + 1,
      description: "this is test6 result",
      picture: "https://test.com/picture6",
      quantity: 1,
    };

    const response = await request(app).post("/api/products").send(req);

    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });
});

describe("GET /products search", () => {
  it("search all product", async () => {
    const req = {
      title: "test331",
      price: 1,
      description: "this is test6 result",
      picture: "https://test.com/picture6",
      quantity: 1,
    };

    let response = await request(app).post("/api/products").send(req);
    req.title = "test332";
    req.price = 2;
    response = await request(app).post("/api/products").send(req);
    req.title = "test432";
    req.price = 3;
    response = await request(app).post("/api/products").send(req);

    response = await request(app)
      .get("/api/products")
      .send();

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body.total).toBe(3);
    expect(response.body.products[0].title).toBe("test331");
  });
  it("search product sort desc", async () => {
    const req = {
      title: "test331",
      price: 1,
      description: "this is test6 result",
      picture: "https://test.com/picture6",
      quantity: 1,
    };

    let response = await request(app).post("/api/products").send(req);
    req.title = "test332";
    req.price = 2;
    response = await request(app).post("/api/products").send(req);
    req.title = "test432";
    req.price = 3;
    response = await request(app).post("/api/products").send(req);

    response = await request(app)
      .get("/api/products?search=33&sort=desc")
      .send();

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body.total).toBe(2);
    expect(response.body.products[0].title).toBe("test332");
  });

  it("search product sort asc", async () => {
    const req = {
      title: "test331",
      price: 1,
      description: "this is test6 result",
      picture: "https://test.com/picture6",
      quantity: 1,
    };

    let response = await request(app).post("/api/products").send(req);
    req.title = "test332";
    req.price = 2;
    response = await request(app).post("/api/products").send(req);
    req.title = "test432";
    req.price = 3;
    response = await request(app).post("/api/products").send(req);

    response = await request(app)
      .get("/api/products?search=33&sort=asc")
      .send();

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body.total).toBe(2);
    expect(response.body.products[0].title).toBe("test331");
  });
});
