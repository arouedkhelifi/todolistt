import express from "express";

const app = express();
const PORT = 5001;

app.get("/", (req, res) => {
  res.send("Server is working fine");
});

app.get("/api/notes", (req, res) => {
  res.json([{ id: 1, title: "Test note" }]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
