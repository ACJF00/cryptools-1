import { MongoClient } from "mongodb";

function createClient() {
  const client = new MongoClient(
    `${process.env.REACT_APP_MONGO_URI}}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) console.log(err);
      console.log("Database Connected");
    }
  );

  client.usersCollection = function () {
    return this.db("test").collection("users");
  };

  return client;
}

export { createClient };
