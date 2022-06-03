// express-session과 connect-mongo를 이용해서 세션을 구현하는 방식 세션 구현 시에
//mongoStore를 같이 넘겨주는 형식 mongoDB를 세션에서 사용할 수 있게 해주는 코드
import session from "express-session";
import MongoStore from "connect-mongo";

export default function sessionMiddleware(req, res, next) {
  const mongoStore = MongoStore.create({
    client: req.dbClient,
    stringify: false,
  });
  return session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
  })(req, res, next);
}
