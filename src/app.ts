import express from "express";
import cors from "cors";

import itemsRoutes from "./api/routes/itemsRoutes";

const app = express();
app.use(cors());

app.use(express.json());
app.use(itemsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
