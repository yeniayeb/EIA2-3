"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var L07_Haushaltshilfe;
(function (L07_Haushaltshilfe) {
    let orders;
    let totalOrder = [];
    let port = process.env.PORT;
    if (port == undefined) {
        port = 5001;
    }
    //(let databaseUrl: string = "mongodb://localhost:27017";
    let databaseUrl = "mongodb+srv://test:test@eia2-73zcc.mongodb.net/test?retryWrites=true&w=majority";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server starting on port:" + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        orders = mongoClient.db("Haushaltshilfe").collection("Orders");
        console.log("Database connection ", orders != undefined);
    }
    async function handleRequest(_request, _response) {
        console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        console.log(_request.url);
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            /* for (let key in url.query) {
                _response.write(key + ":" + url.query[key] + "<br/>");
            } */
            console.log(url.query);
            if (_request.url == "/?getOrder=yes") {
                console.log("it works until here");
                let options = { useNewUrlParser: true, useUnifiedTopology: true };
                let mongoClient = new Mongo.MongoClient(databaseUrl, options);
                await mongoClient.connect();
                let orders = mongoClient.db("Haushaltshilfe").collection("Orders");
                let cursor = await orders.find();
                await cursor.forEach(retrieveOrders);
                let jsonString = JSON.stringify(totalOrder);
                let answer = jsonString.toString();
                _response.write(answer);
                totalOrder = [];
            }
            else {
                let jsonString = JSON.stringify((url.query), null, 2);
                _response.write(jsonString);
                storeOrder(url.query);
            }
        }
        _response.end();
    }
    function storeOrder(_order) {
        orders.insert(_order);
    }
    function retrieveOrders(_item) {
        let jsonString = JSON.stringify(_item);
        totalOrder.push(jsonString);
    }
})(L07_Haushaltshilfe = exports.L07_Haushaltshilfe || (exports.L07_Haushaltshilfe = {}));
//# sourceMappingURL=server.js.map