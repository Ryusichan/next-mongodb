import nc from "next-connect";
import isEmail from "validator/lib/isEmail";
import normalizeEmail from "validator/lib/normalizeEmail";
import bcrypt from "bcryptjs";
import { all } from "@/middlewares/index";
import { extractUser } from "@/lib/api-helpers";
import { insertUser, findUserByEmail } from "@/db/index";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const { name, password } = req.body;
  const email = normalizeEmail(req.body.email);
  if (!isEmail(email)) {
    res.status(400).send("The email you entered is invalid.");
    return;
  }
  if (!password || !name) {
    res.status(400).send("Missing field(s)");
    return;
  }
  if (await findUserByEmail(req.db, email)) {
    res.status(403).send("The email has already been used.");
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = await insertUser(req.db, {
    email,
    password: hashedPassword,
    name,
  });
  // req.logIn 함수는 passportJS 모듈에서 제공하는 logIn 함수입니다.
  const user = await findUserById(req.db, userId);
  req.logIn(user, (err) => {
    if (err) throw err;
    res.status(201).json({
      //extractUser Hook을 이용해서 불필요한 정보는 빼고 리턴
      user: extractUser(req.user),
    });
  });
});

export default handler;
