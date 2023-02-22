const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Yevhenii:MongoCreateDb123@cluster0.nwubwpa.mongodb.net/contact_reader?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3000))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
