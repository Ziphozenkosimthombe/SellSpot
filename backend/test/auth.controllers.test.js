import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import User from '../models/User.models';
import bcrypt from 'bcryptjs';

chai.use(chaiHttp);
const should = chai.should();
describe('AuthController', () => {
  let user;

  beforeEach(async () => {
    await User.deleteMany({});

    const password = '12345678';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      username: 'testing',
      email: 'test@gmail.com',
      password: hashedPassword,
    });
  });

  describe('POST /api/users/signup', () => {
    it('should create a new user', async () => {
      const res = await chai.request(server).post('/api/users/signup').send({
        username: 'testing2',
        email: 'test2@gmail.com',
        password: '12345678',
      });

      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('_id');
      res.body.should.have.property('username').eql('testing2');
      res.body.should.have.property('email').eql('test2@gmail.com');
    });

    it('should not create a user with an existing email', async () => {
      const res = await chai.request(server).post('/api/users/signup').send({
        username: 'testing3',
        email: 'test@gmail.com',
        password: '12345678',
      });

      res.should.have.status(400);
      res.body.should.have.property('message').eql('User already exists');
    });

    it('it should not create the user if the username is less than 5 characters long', async () => {
      const res = await chai.request(server).post('/api/users/signup').send({
        username: 'tes',
        email: 'test3@gmail.com',
        password: '12345678',
      });

      res.should.have.status(400);
      res.body.should.have
        .property('message')
        .eql('Username must be at least 5 characters long');
    });

    it('should not create a user if the password length is less than 8', async () => {
      const res = await chai.request(server).post('/api/users/signup').send({
        username: 'testing4',
        email: 'test4@gmail.com',
        password: '1234',
      });

      res.should.have.status(400);
      res.body.should.have
        .property('message')
        .eql('Password must be at least 8 characters long');
    });
  });

  describe('POST /api/users/login', () => {
    it('should let the user login', async () => {
      const res = await chai
        .request(server)
        .post('/api/users/login')
        .send({ email: 'test@gmail.com', password: '12345678' });

      res.should.have.status(201);
      res.body.should.have.property('_id');
      res.body.should.have.property('username').eql('testing');
      res.body.should.have.property('email').eql('test@gmail.com');
    });

    it('should not let the user login with invalid credentials', async () => {
      const res = await chai
        .request(server)
        .post('/api/users/login')
        .send({ email: 'test@gmail.com', password: 'wrongpassword' });

      res.should.have.status(400);
    });
  });

  describe('POST /api/users/logout', () => {
    it('should let the user logout', async () => {
      const res = await chai.request(server).post('/api/users/logout');

      res.should.have.status(201);
      res.body.should.have.property('message').eql('Logged out successfully');
    });
  });
});
