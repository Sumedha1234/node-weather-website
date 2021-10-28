const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const path = require("path");
const request = require("request");
const handlebars = require("express-handlebars");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;


const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates");

const aboutHtmlFilePath = publicDirectoryPath + "\\about.html";

// app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
// app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(express.static(publicDirectoryPath));

// app.engine('hbs', handlebars({
//   layoutsDir: __dirname + '/views',
//   //new configuration parameter
//   extname: 'hbs'
//   }));

app.get("hh", (req, res) => {
  res.render("index", {
    abc: "dsfsd",
    xyz: "df",
  });
});

app.get("/help", (req, res) => {
  // res.send("<h1>About</h1>");
  res.render("help");
});

// app.get("", (req, res) => {
//   res.send("Hello express!");
// });

// app.get("/help", (req, res) => {
//   res.send([{ name: "Sara" }, { name: "Ali" }]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About</h1>");
// });

// app.get("/about", (req, res) => {
//   // res.send("<h1>About</h1>");
//   console.log("9999999");
//   const aboutHtmlFilePath = publicDirectoryPath + "\\about.html"
//   console.log("aboutHtmlFilePath is ///////////");
//   console.log(aboutHtmlFilePath);
// res.sendFile(aboutHtmlFilePath, {root: './public'});
// });

app.use("/about", express.static(aboutHtmlFilePath));

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  }

  geocode(req.query.address, (error, { latitude, longitude } = {}) => {
    if (error) {
      console.log("jhkjhjk");
      console.log(error);
     return res.send({ error });
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        // return console.log(error);
        return res.send({err});
      } else {
        res.send({
          forecast: forecastData,
          address: req.query.address,
        });
      }
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide the search term" });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.send("No help page found");
});

app.get("*", (req, res) => {
  res.send("No page found");
});

app.listen(port, () => {
  console.log(" Server started on port 3000");
});
