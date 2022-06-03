// passportJS는 NodeJS에서 REST API 구현에 있어 로그인을 쉽게 해주는 모듈인데요. 일단 코드를 봅시다.
import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import { findUserById, findUserByEmail } from "@/db/index";

passport.serializeUser((user, done) => {
  done(null, user._id);
});

// passport#160
passport.deserializeUser((req, id, done) => {
  findUserById(req.db, id).then(
    (user) => done(null, user),
    (err) => done(err)
  );
});

passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      const user = await findUserByEmail(req.db, email);
      if (user && (await bcrypt.compare(password, user.password)))
        done(null, user);
      else done(null, false, { message: "Email or password is incorrect" });
    }
  )
);

export default passport;
