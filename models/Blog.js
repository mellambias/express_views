const { MongoTopologyClosedError, MongoServerClosedError } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Modelo de datos basado en el esquema anterios

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
