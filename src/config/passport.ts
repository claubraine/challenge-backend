import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import User from '../models/postgresql/user';
import { connection } from '../server/database_postgresql_conf';

export default (pass: passport.PassportStatic) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: process.env.SECRET,
  };

  pass.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const userRepository = connection?.getRepository(User);
        const user = await userRepository?.findOne(jwtPayload._doc._id);

        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    }),
  );
};
