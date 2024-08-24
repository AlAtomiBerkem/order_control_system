const express = require("express");
const db = require("./sequelize/models/index.js");
const path = require("path");
const publicPath = path.join(__dirname, 'ejs');
const serverRoutes = require("./routes.js");
const app = express();

const PORT = process.env.PORT ?? 3000;

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'ejs'));
console.log(app.get('views'));

(async () => {
  await db.sequelize.sync();
})();

app.use(express.json());
app.use(serverRoutes);
app.use(express.static(publicPath));


app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}...`);
  await db.sequelize.authenticate();
  console.log("Database successfully connected.");
});
