import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '24h', // Set to 24 hours
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    sameSite: 'strict',
  });

  return token;
};

export default generateTokenAndSetCookie;

