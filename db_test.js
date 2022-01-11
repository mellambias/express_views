const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://*****:********@cluster0.zbjmh.mongodb.net/node-test?retryWrites=true&w=majority";

  const client = new MongoClient(url);

  // Database Name
  const dbName = "node-test";

  async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection("blogs");
    const findResult = await collection.find({}).toArray();
    console.log("Found documents =>", findResult);
    // the following code examples can be pasted here...
    try {
      await collection.insertOne({title:"blog 4", resume:"El cuarto blog", body:"Cuarto blog" });
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.log(`Error worth logging: ${error}`); // special case for some reason
      }
      throw error; // still want to crash
    }
    return "done.";
  }

  main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
