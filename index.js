const express = require("express");
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");
const PORT = process.env.PORT || 4000;
const app = express();
const jsonParser = express.json();

app.use(jsonParser);

app.use("/users", userRouter);
app.use("/images", imageRouter);

app.listen(PORT, () => console.log("Listening from port 4000"));
