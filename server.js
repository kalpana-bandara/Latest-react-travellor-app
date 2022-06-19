const express = require("express");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");
const path = require("path");
const port = process.env.PORT || 5000;

const app = express();

const publicPath = path.join(__dirname, "build");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(publicPath));

const countries = [];

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.post("/violentrate", (req, res) => {
  async function start() {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("https://en.wikipedia.org/wiki/List_of_countries_by_intentional_homicide_rate");

    await page.waitForTimeout(1000);
    const countryNames = await page.$$eval("#mw-content-text > div.mw-parser-output > table.wikitable.sortable.static-row-numbers.plainrowheaders.srn-white-background.jquery-tablesorter tbody tr td:nth-child(1) a", (elements) => {
      return elements.map((element) => {
        const elementText = element.textContent;
        return elementText;
      });
    });
    countryNames.forEach((countryName) => {
      if (countryName.charAt(countryName.length - 1) == "*") {
        countries.push({ country: countryName.slice(0, -2) });
      } else {
        countries.push({ country: countryName });
      }
    });
    const violentCounts = await page.$$eval("#mw-content-text > div.mw-parser-output > table.wikitable.sortable.static-row-numbers.plainrowheaders.srn-white-background.jquery-tablesorter tbody tr td:nth-child(5)", (elements) => {
      return elements.map((element) => element.textContent);
    });
    for (i = 0; i <= violentCounts.length - 1; i++) {
      countries[i].violentCount = violentCounts[i];
    }
    let matchingPair = countries.find((country) => country.country === `${req.body.country != "" ? req.body.country : ""}`);
    await browser.close();
    return matchingPair;
  }

  start().then((results) => {
    res.json({ data: results });
  });
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
