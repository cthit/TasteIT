// Express and Port assignment
const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

// PostgreSQL and Node.js connector
/* const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'postgres',
  database: 'tasteit',
  password: '',
  port: 5432,
})
client.connect(err => console.log("Connecting ERROR: " + err)); */

app.use(cors());

//Json reading
const fs = require("fs");
const fsp = fs.promises;

// The parts should be
// Ingdocs reads: every line starts with % and ends with & and every entry is described as
// amount:measurement:name and are separeted by :

/// ALL app.get's

app.get("/", (req, res) => {
  rootRoute(res);
});
app.get("/getAllNames", (req, res) => {
  allNamesRoute(res);
});
app.get("/getRecipe/:name", (req, res) => {
  getRecipeRoute(req, res);
});
app.post("/insertRecipe/:data", (req, res) => {
  insertRecipeRoute(req, res);
});
app.get("/getAllRecipes", (req, res) => {
  getAllRecipesRoute(req, res);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


/// ALL ROUTE FUNCTIONS

function testRoute(req, res) {
  fs.readFile("./data/test.json", (err, data) => {
    res.send(data);
    console.log("File read error: " + err);
  });
}

function rootRoute(res) {
  /* getAllRecipes().then(result => {
        res.json(result.data)
     }).catch(() => console.log("get(/) did not recive data")); */
  res.send("Yes");
}

function allNamesRoute(res) {
  getAllNames()
    .then(data => res.send(data))
    .catch(err => {
      console.log("allNamesRoute Error: " + err);
    });
}

function getRecipeRoute(req, res) {
  getRecipe(req)
    .then(data => res.send(data))
    .catch(err => {
      res.send(
        "This error probably occured because of a faulty URL, URL should consist of the name.json <br>" +
          err
      );
      console.log(err);
    });
}

function insertRecipeRoute(req, res) {
  insertRecipe(req).then(data => res.send(data));
}

function getAllRecipesRoute(req, res) {
  getAllRecipes(req)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
}

/// RECIPE HANDLING
/// name - time - servings - ingredients ([ingredient, amount, meassurement]) - description - instructions - creator

// RETURNS ONE SPECIFIC RECIPIE ACCORDING TO NAME
async function getRecipe(req) {
  let response;
  let name = req.params.name;
  response = await fsp.readFile(`./data/${name}.json`, "utf8");
  // response = JSON.parse(response);
  return response;
}

async function getRecipeLocal(name) {
  console.log(name);
  let response = "";
  let data = await fsp.readFile(`./data/${name}`, "utf8");
  data = JSON.parse(data);
  //console.log(data);
  response = data;
  return response;
}

// RETURNS THE NAME OF ALL RECIPIES
async function getAllNames() {
  /*     let response = "{\"recipe\" : [";
    const data = await fsp.readdir("./data");
    data.forEach(name => {
        response += " \"" + name + "\","
    });
    response = response.slice(0, -1);
    response += "]}";
    //response = JSON.parse(response); */
  let response = { names: [] };

  await fsp
    .readdir("./data")
    .then(resp => {
      resp.forEach(resp => {
        response.names.push(resp);
      });
    })
    .catch(err => console.log(err));
  return response;
}

async function insertRecipe(req) {
  let response;
  let data = req.query;
  console.log(data);
  fsp
    .writeFile(`./data/${data.name}.json`, JSON.stringify(data))
    .then(() => console.log("Created"))
    .catch(err => console.log(err));
  return "writen";
}

async function getAllRecipes(req) {
  let response = { recipes: [] };

  return getAllNames().then(data =>
    Promise.all(data.names.map(name => getRecipeLocal(name)))
  );

  /* getAllNames().then(data => {
        //console.log(data);
        data.names.forEach(name => {
            console.log("Name: " + name);
            response.recpies.push(getRecipeLocal(name))})}); */

  //response.recpies.push(Promise.all(Map(names, getRecipeLocal(name))));
  //getAllNames().then(data => {Promise.all(Map(data.names, getRecipeLocal(data.names)))});

  /*   let response = "{\"recipes\" : [";
    const rNames = await getAllNames();
    const names = rNames.recipe;
    for(let i = 0; i < 3; i++){
        response += await getRecipeLocal(names[i]);
        response += ",";
    }
    response = response.slice(0, -1);
    response += "]}";
    console.log(JSON.parse(response));
    return JSON.parse(response); */
}
