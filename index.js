const express = require("express");
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");
const authRouter = require("./routers/auth");
const authMiddleware = require("./auth/middleware");
const PORT = process.env.PORT || 4000;
const app = express();
const jsonParser = express.json();

app.use(jsonParser);

app.use("/users", userRouter);
app.use("/images", authMiddleware, imageRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => console.log("Listening from port 4000"));
