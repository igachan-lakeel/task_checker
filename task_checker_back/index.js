const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const cors = require("cors");
const multer = require("multer");

// CORS設定
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Multer設定（画像保存先）
const upload = multer({ dest: "uploads/" });
app.use("/uploads", express.static("uploads"));

app.use(express.json());

// --- ルーティング ---

// 1. 全タスク取得
app.get("/tasks", async (req, res) => {
  try {
    const allTasks = await prisma.task.findMany();
    const updatedTasks = allTasks.map((task) => {
      if (task.image_url) {
        task.image_url = `http://localhost:3000/${task.image_url}`;
      }
      return task;
    });
    res.json(updatedTasks);
  } catch (error) {
    console.error(error);
    res.status(500).send("取得失敗");
  }
});

// 2. タスク保存 (ここが重要)
app.post("/tasks", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file ? req.file.path : null;
    const deadlineDate = new Date(req.body.deadlineDate);

    const savedData = await prisma.task.create({
      data: {
        name: req.body.name,
        explanation: req.body.explanation,
        deadlineDate: deadlineDate,
        status: Number(req.body.status),
        genreId: Number(req.body.genreId),
        image_url: imagePath,
      },
    });

    if (savedData.image_url) {
      savedData.image_url = `http://localhost:3000/${savedData.image_url}`;
    }
    res.json(savedData);
  } catch (error) {
    console.error(error);
    res.status(500).send("保存失敗");
  }
});

// 3. 全ジャンル取得
app.get("/genres", async (req, res) => {
  try {
    const allGenres = await prisma.genre.findMany();
    res.json(allGenres);
  } catch (error) {
    console.error(error);
    res.status(500).send("取得失敗");
  }
});

// 4. ジャンル保存 (これが必要でした)
app.post("/genres", async (req, res) => {
  try {
    const newGenre = await prisma.genre.create({
      data: {
        name: req.body.name,
      },
    });
    res.json(newGenre);
  } catch (error) {
    console.error(error);
    res.status(500).send("保存失敗");
  }
});

app.listen(3000, () => {
  console.log("listening on localhost 3000");
});

app.get("/search", async (req, res) => {
  const query = req.query.q || "";

  try {
    // タイトルにクエリを含む投稿を検索
    const tasks = await prisma.task.findMany({
      where: {
        name: {
          contains: query, // タイトルにクエリを含む
          mode: "insensitive", // 大文字小文字を区別しない
        },
      },
      orderBy: {
        deadlineDate: "desc", // 最新の投稿を上に表示
      },
    });

    const updatedTasks = tasks.map((task) => {
      if (task.image_url) {
        task.image_url = `http://localhost:3000/${task.image_url}`;
      } else {
        task.image_url = null;
      }
      return task;
    });

    res.json(updatedTasks); // 検索結果を返す
  } catch (error) {
    console.error("検索処理に失敗しました:", error);
    res.status(500).json({ message: "検索処理に失敗しました" });
  }
});
