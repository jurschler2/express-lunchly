// connect to right DB --- set before loading db.js
process.env.NODE_ENV = "test";

// npm packages
const request = require("supertest");

// app imports
const app = require("../app");
const db = require("../db");


let testCustomer_id;

beforeEach(async function() {
  // add a company to the test database
  let result = await db.query(
  `INSERT INTO customers (first_name, last_name, phone, notes)
  VALUES ('test','user', '5855655965', 'has some reservations')
  RETURNING id`);
  testCustomer_id = result.rows[0].id;
});


describe("GET /", function(){
  // testing the get list of all customers route
  test("Gets a list of customers in the database", async function(){
    const response = await request(app).get('/');
    expect(response.statusCode).toEqual(200);
    expect(response.text).toContain(`<a href="/${testCustomer_id}/">test user</a>`)
  });
});

afterEach(async function() {
  // delete any data created by test
  await db.query("DELETE FROM customers");
});

afterAll(async function() {
  // close db connection
  await db.end();
});