import colors from 'colors';

const logger = (req, res, next) => {
  const methodeColor = {
    GET: 'green',
    POST: 'blue',
    PUT: 'yellow',
    DELETE: 'red',
  };
  const color = methodeColor[req.method] || 'white';

  const message = `${req.method} ${req.protocol}://${req.get('host')}${
    req.originalUrl
  }`;
  console.log(colors[color](message)); // Apply the color correctly

  next();
};

export default logger;
