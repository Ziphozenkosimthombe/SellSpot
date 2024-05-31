# SellSpot

This is the user-friendly e-commerce full-stack web application. The main purpose of bulidng this software application is just to simplify how does the e-commerce application works especially of the big companies like takealot and amazon.

[Screen recording 2024-05-30 6.09.45 PM.webm](https://github.com/Ziphozenkosimthombe/SellSpot/assets/123859903/fc6054c8-a43a-4ac8-826b-f2e41cd4b5b1)

## Table of contents

- [Overview](#overview)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [what I Learned](#what-i-learned)
  - [Things I completed](#things-I-completed)
  - [Continued development](#continued-development)
  - [Insatll it Local](#install-it-local)
  - [Things To Add](#things-to-add)
  - [Run](#run)
  - [Author](#author)

## Overview

### Links

- Code URL: [code](https://github.com/Ziphozenkosimthombe/SellSpot.git)
---
## My process

### Built with

- [ReactJS](https://react.dev/) -JavaScript library
- [ExpressJS](https://expressjs.com/) - NodeJs Framework
- [NodeJS](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Cloudinary](https://cloudinary.com/) - store the images and get it as a URL.
- [MongoDb](https://www.mongodb.com/) - an open source NoSQL database management program.

### What I learned

As I was building this Full stack Application i learn a lot of things especially when it's comes to the frontend it was my first time building the big application that fetch the data from the database using React on frontend so i learn a lot about useEffect and useState. On my backend I also uses JWT jsonwebtoken to make it easy to my frontend to iterate with my backend so was my first time using it and i learn a lot of thing using jwt.

```js
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 1000,
    sameSite: 'strict',
  });

  return token;
};
```

### Things I completed
- [x] - users aunthentication
- [x] - apply to sell on the platform
- [x] - able to upload product if application was successful
- [x] - filter product by title
- [x] - add & remove product to  Cart
- [x] - add & remove product to Wishlist
- [x] -  update your username, phoneNumber and reset the password
- [x] - able to delete your account
- [x] - implement darkmode feature

### Continued development

I will continue try to implement more features on my application, make the payment system work correct, adding the order tracker so that user can able to track product they buy, i will also implement maybe the google auth or microsoft auth to make my application  more secure.

### Install It Locally

To install it in your local machine:
- clone the repository
- pnpm install

### Thing To Add

- Create a .env and .env.test file inside the backend folder and add the following as key = value
- PORT = 2121 (it can be any port eg: 6000)
- DB_STRING = your database URL
- CLOUD_NAME = your cloudinary cloud name
- API_KEY = your cloudinary api key
- API_SECRET = you cloudinary api secret
- JWT_SECRET = can be any random numbers or names or use teminal to create it eg(openssl rand -base64 32)

### Run
- pnpm run start-server (on my backend)
- pnpm run dev ( on my frontend)

## Author
- Portfolio - [ziphozenkosi](https://ziphozenkosi.netlify.app)
- Linkedin - [ziphozenkosi](https://linkedin.com/in/ziphozenkosi)
- Twitter - [@ziphozenkosi478](https://www.twitter.com/ziphozenkosi478)
