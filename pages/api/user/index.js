// next-connect 모듈은 NextJS에서 api 라우팅을 쉽게 해주는 모듈
import nc from "next-connect";
import { all } from "@/middlewares/index";

const handler = nc();

// req,res를 middlewares에서 받아오게함
handler.use(all);

// handler 객체를 이용해 REST API를 구현 주소창에서 받아오는 get method필요
handler.get(async (req, res) => {
  // Filter out password
  if (!req.user) return res.json({ user: null });
  //   (req, res)를 받아와서 req.user 부분에서 password 부분만 빼고 나머지 부분을 u 에 저장해서 다시 json 형식으로 그 부분을 리턴하는 형식입니다.
  const { password, ...u } = req.user;
  res.json({ user: u });
});

export default handler;
