process.env.NODE_ENV = 'test';

import User from '../models/User.models';


beforeEach(async () => {
  await User.deleteMany({});
  
});

// afterEach(async () => {
//    await User.deleteMany({})
// })
