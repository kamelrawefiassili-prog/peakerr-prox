import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// صفحة افتراضية للتأكد أن السيرفر شغال
app.get("/", (req, res) => {
  res.send("✅ Peakerr Proxy API is running on Render!");
});

// جلب الخدمات من API
app.get("/services", async (req, res) => {
  try {
    const response = await fetch("https://peakerr.com/api/v2", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        key: process.env.PEAKERR_API_KEY, // نستخدم مفتاح API من Environment Variables
        action: "services"
      })
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
