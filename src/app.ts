import express from "express";
import bodyParser from "body-parser";
import 'dotenv/config';
import router from "./routers/IndexRouters";

const app = express();
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());
const PORT : number = Number(process.env.PORT);


app.use(express.static('public'));


app.use('/' , router);


app.listen(PORT, () => {
  console.log(`Example app listening on port http://127.0.0.1:${PORT}`)
})