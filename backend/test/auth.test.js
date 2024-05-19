import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import User from '../models/User.models';
chai.use(chaiHttp);
chai.should();

describe('AuthController', () => {
  describe('POST api/users/signup', () => {
    it('it should create the user', async () => {
      const res = await chai.request(server).post('/api/users/signup').send({
        username: 'mthombe',
        email: 'mthombe@gmail.com',
        password: '12345678',
      });
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('_id');
      res.body.should.have.property('username');
      res.body.should.have.property('email');
    });

    it('it should not create the new user with the email already exist', async () => {
      await new User({
        username: 'mthombe',
        email: 'mthombe@gmail.com',
        password: '12345678',
      }).save();

      const res = await chai.request(server).post('/api/users/signup').send({
        username: 'mthombe',
        email: 'mthombe@gmail.com',
        password: '12345678',
      });
      res.should.have.status(400);
      res.should.be.a('object');
    });

    it('it should not create a user if the password length is less than 8', async () => {
      const res = await chai.request(server).post('/api/users/signup').send({
        username: 'mthombe',
        email: 'mthombe@gmail.com',
        password: '12345',
      });
      res.should.have.status(400);
    });
  });

  describe('POST api/user/login', () => {
    it('it should login the user if the user meet all requirement', async () => {
      const res = await chai.request(server).post('/api/users/login').send({
        email: 'mthombe@gmail.com',
        password: '12345678',
      });
      console.log(res.body);
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.should.body.have.property('_id');
      res.should.body.have.property('user');
      res.should.body.user.have.property('username');
      res.should.body.user.have.property('email');
    });
  });
});
