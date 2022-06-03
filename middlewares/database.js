// MongoClinet를 이용해서 MongoDB를 초기화해서 req.db로 넘겨주는 겁니다.
// 넘겨주기 전에 DB의 Collection들이 createIndex가 됐는지 체크해서 안 됐으면 createIndex 하고 넘기는 로직입니다.
import { MongoClient } from "mongodb";

global.mongo = global.mongo || {};

let indexesCreated = false;
export async function createIndexes(db) {
  await Promise.all([
    // query 속도를 높이기 위해서 collection("users").createIndex처리 MongoDB 매뉴얼에서 추천하는 방식
    db.collection("users").createIndex({ email: 1 }, { unique: true }),
  ]);
  indexesCreated = true;
}

export default async function database(req, res, next) {
  if (!global.mongo.client) {
    // global.mongo를 설정한 거는 Hot Reloading 시에 에러 방지를 위해 사용되는 방식
    global.mongo.client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await global.mongo.client.connect();
  }
  req.dbClient = global.mongo.client;
  req.db = global.mongo.client.db(process.env.DB_NAME);
  if (!indexesCreated) await createIndexes(req.db);
  return next();
}
