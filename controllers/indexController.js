const elasticClient = require("../elasticClient");
const indexServices = require("./services/indexSevices");

///   GET ALL INDICES AND THEIR STATUS
const getAllIndex = async (req, res) => {
    elasticClient.cat.indices({v:true})
    .then((results)=>{
        res.send(results.body);
    })
    .catch((err)=>{
        res.send(err);
    })
};
///  GET THE DETAILS OF ANY INDEX   /// INDEX/:INDEX
const getIndex = async (req, res) => {
    elasticClient.indices.exists({
        index:req.params.index
    })
    .then((exists)=>{
        if(exists.body){
            elasticClient.indices.get({
                index:req.params.index
            })
            .then((found)=>{
                res.send(found.body);
            })
            .catch((err)=>{
                res.send(err);
            })
        }else{
            res.send("Index you are trying to access didn't exist");
        }
    })
    .catch((err)=>{
        res.send(err);
    })
    
}
///  CREATE INDEX      /// INDEX/:INDEX
const createIndex = async (req, res) => {
    elasticClient.indices.exists({
        index: req.params.index
    })
    .then(function (exists) {
        if (!exists.body) {
            elasticClient.indices.create({
                index: req.params.index,
            }).then(function(created){
                res.send(created.body);
            })
        }
        else {
            res.send("Index already exist");
        }
    })
    .catch(function (err) {
        res.send(err);
    })
}

///  DELETE INDEX    ///  INDEX/DELETE/:INDEX
const deleteIndex = async (req, res) => {
    elasticClient.indices.exists({
        index: req.params.index
    })
    .then(function (exists) {
        if (exists.body) {
            elasticClient.indices.delete({
                index: req.params.index,
            }).then(function(deleted){
                res.send(deleted.body);
            })
        }
        else {
            res.send("Index didn't exist");
        }
    })
    .catch((err)=>{
        res.send(err);
    })
}

module.exports = { getAllIndex, getIndex, createIndex, deleteIndex };