const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1";
const client = new MongoClient(uri);

const data1 = {
  name: "Designer Handbag1",
  company: "64c23350e32f4a51b19b923a",
  price: 3466,
  colors: ["#000000", "#cc6600", "#663300"],
  image: "/images/product-handbag.png",
  category: "64c2342de32f4a51b19b9250",
  isFeatured: true,
};

const main = async () => {
  await client.connect();
  const db = client.db("shop");
  const collection = db.collection("products");

  await collection.insertOne(data1);

  const data = await collection.find({ price: { $eq: 3466 } }).toArray();

  console.log(data);
  return "done";
};

main()
  .then(console.log())
  .catch((e) => console.log(e))
  .finally(() => client.close());
