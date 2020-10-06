const http = require("http");
const url = require("url");
const fs = require("fs");

/////////////////////////////////
// SERVER
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8",
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/card.html`,
  "utf-8",
);

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8",
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const replaceTemplate = (temp, product) => {
  ///{%PRODUCTNAME%}/g => g means global to replace all match REGEX
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  //If Product is NOT Organic
  //Replacing the placeholder /{%NOT_ORGANIC%}/ with Class Name: "not-organic"
  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
};

const server = http.createServer((req, res) => {
  //const { query, pathname } = url.parse(req.url, true);
  const pathname = req.url;
  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    //Replace the Place Holders in Card HTML with data in dataObj
    const cardsHTML = dataObj.map((el) => replaceTemplate(tempCard, el)).join(
      "",
    );
    //Replace "{PRODUCT_CARDS}" with cardsHTML template
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHTML);

    res.end(output);
  } else if (pathname === "/product") {
    res.end("This is the PRODUCT");
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else {
    // Not found
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "localhost", () => {
  console.log("Listening to requests on port 8000");
});
