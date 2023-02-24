// const express = require("express");
// const userRouter = require("./routers/user");
// require("./db/mongoose");

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(express.json());
// app.use(userRouter);

// app.listen(port, () => {
//   console.log("Server is up on port" + port);
// });

const bcrypt = require("bcryptjs");

myFunc = async () => {
  const password = "moslem";
  const hashPassword = await bcrypt.hash(password, 8);
  console.log(hashPassword);
  const isMatch = await bcrypt.compare(password, hashPassword);
  console.log(isMatch);
};
myFunc();
