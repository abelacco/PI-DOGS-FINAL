/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  height_min: 50,
  height_max: 100,
  weight_min: 50,
  weight_max: 100,
  life_span: "15 years",
  temperaments: ["Gay"]
};

describe('Dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});


describe('POST /dogs', () => {
  it('POST agrega un nueva raza', (done) => {
    agent.post('/dogs')
    .send({
    name : "jhandir",
    height_min: 50,
    height_max: 100,
    weight_min: 50,
    weight_max: 100,
    life_span: "15 years",
    temperaments: ["Gay"]
    })
    .expect(200);
    done();
  }).timeout(3000);
})