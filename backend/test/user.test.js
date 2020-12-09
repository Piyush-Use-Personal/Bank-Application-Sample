const supertest = require('supertest')
const app = require('../server');
const data = require('./data');
describe("user get all test", () => {
  it("check for empty database", async () => {
    const response = await supertest(app).get('/v1/getAllUser');
		expect(response.body.code).toBe(500);
  }); 
  // it("check for one entry database", async () => {
  //   const postresponse = await supertest(app).post('/v1/registerUser').send(data.user);
  //   const response = await supertest(app).get('/v1/getAllUser');
  //   console.log(postresponse.body)
  //   console.log(response.body)
	// 	expect(response.body.code).toBe(200);
  // });
  it('register new user into the system', async () => {
    const postresponse = await supertest(app).post('/v1/registerUser').send({
      "name" : "testUsr",
       "address" : "testAddress",
       "balance" : 100,
       "emailId" : "test@test.com",
       "mobileNumber" : "+918989898989",
       "password" : "090909",
       "createdBy" : "testUser"
   });
   console.log = jest.fn();
		expect(postresponse.body.code).toBe(200);

  })
});
