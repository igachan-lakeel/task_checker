const express = require("express");
const app = express();

const cors = require("cors"); // cors をインポート

app.use(
  cors({
    // cors の設定を適用
    origin: "http://localhost:5173", // このオリジンからのリクエストを許可
    methods: ["GET", "POST", "PUT", "DELETE"], // 許可する HTTP メソッド
    credentials: true, // Cookie・認証情報の送受信を許可
  }),
);

app.use(express.json());

app.listen(3000, () => {
  console.log("listening on localhost 3000");
});

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 全タスクの取得処理
app.get("/tasks", async (req, res) => {
  try {
    const AllTasks = await prisma.task.findMany();
    res.json(AllTasks);
  } catch (error) {
    console.log(error);
  }
});

// 全ジャンルの取得処理
app.get("/genres", async (req, res) => {
  try {
    const AllGenres = await prisma.genre.findMany();
    res.json(AllGenres);
  } catch (error) {
    console.log(error);
  }
});
