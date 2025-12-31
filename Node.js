const express = require("express");
const Pusher = require("pusher");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // อนุญาตให้หน้าเว็บส่งข้อมูลมาหา Server ได้

const pusher = new Pusher({
  appId: "2096948",
  key: "bf8915efb1ffc8daa753",
  secret: "ad0bce183258663712c6",
  cluster: "ap1",
  useTLS: true
});

// สร้าง API สำหรับรับข้อความจากหน้าเว็บ
app.post("/send-message", (req, res) => {
  const { message, sender } = req.body;

  // ส่งข้อมูลต่อให้ Pusher เพื่อกระจายไปยังทุกคนที่เปิดเว็บอยู่
  pusher.trigger("my-channel", "my-event", {
    message: message,
    sender: sender
  });

  res.status(200).send("Sent!");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
