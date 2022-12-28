const elasticClient = require("../elasticClient");
const docServices = require("./services/docServices");

///************ GET DOCUMENT BY ID ***************** GET /doc/:index?id=x
const getDoc = async (req,res)=>{
    elasticClient.get({
        index: req.params.index,
        id: req.query.id
    })
    .then((result)=>{
        res.send(result.body);
    })
    .catch((err)=>{
        res.send(err);
    })
}

///************ CREATE DOCUMENT BY ID ***************** POST /doc/:index   
///************ BODY 
/* 
{
    id: x,
    body:{
        "field": "value"
    }
}
*/

const createDoc = async (req,res)=>{
    elasticClient.create({
        index: req.params.index,
        id: req.body.id,
        body: req.body.body
    })
    .then((created)=>{
        res.send(created.body);
    })
    .catch((err)=>{
        res.send(err);
    })

}

///************ DELETE DOCUMENT BY ID ***************** POST /doc/delete/:index   

const deleteDoc = async (req,res)=>{
    elasticClient.delete({
        index: req.params.index,
        id: req.body.id,
    })
    .then((deleted)=>{
        res.send(deleted.body);
    })
    .catch((err)=>{
        res.send(err);
    })
}

///************ GET ALL DOCUMENT OF AN INDEX ***************** GET /doc/:index/getAllDocs   

const getAllDocs = async (req,res)=>{
    elasticClient.search({
        index: req.params.index,
        q: "*"
    })
    .then((result)=>{
        res.send(result.body.hits.hits);
    })
    .catch((err)=>{
        res.send(err);
    })
}

///************ SEARCH BY QUERY  ***************** GET /doc/search/:index?q=yourquery   

const searchDoc = async (req,res)=>{
    elasticClient.search({
        index: req.params.index,
        q: req.query.q
    })
    .then((result)=>{
        res.send(result.body.hits.hits);
    })
    .catch((err)=>{
        res.send(err);
    })
}

///************ SEARCH BY BODY  ***************** POST /doc/search/:index
///************ BODY 
/* 
{
    "query": {
    "match": { "roll": "35" }
    }
}
*/

const searchByPost = async(req,res)=>{
    elasticClient.search({
        index: req.params.index,
        body: req.body
    })
    .then((result)=>{
        res.send(result.body.hits.hits);
    })
    .catch((err)=>{
        res.send(err);
    })
}

///************ UPDATE DOCUMENT  ***************** POST /doc/search/:index

const updateDoc = async(req,res)=>{
    elasticClient.update({
        index: req.params.index,
        id: req.body.id,
        body: req.body.body
    })
    .then((result)=>{
        res.send(result.body);
    })
    .catch((err)=>{
        res.send(err);
    })
}

module.exports = {getDoc,createDoc,deleteDoc,searchDoc,getAllDocs,searchByPost,updateDoc};


