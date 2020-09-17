const fs = require("fs");

const bufferData = fs.readFileSync("json-example.json");
const jsonData = bufferData.toString();
const jsData = JSON.parse(jsonData);
jsData.name = "Veronika";
const newJsonData = JSON.stringify(jsData);
fs.writeFileSync("json-example.json", newJsonData);
