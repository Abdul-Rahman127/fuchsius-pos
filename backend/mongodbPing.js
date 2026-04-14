require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// Step 1: Read the connection URI from the environment variables.
// If the environment variable is not found, fallback to a hardcoded string
// (Make sure to NEVER commit a real password if using the fallback!)
const uri = process.env.MONGO_URI || "mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority";

// Step 2: Initialize the MongoDB client with stable API configurations
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function runPing() {
  try {
    console.log("Attempting to connect to MongoDB Atlas...");
    // Step 3: Connect the client to the server
    await client.connect();

    // Step 4: Verify the connection with a lightweight ping command
    // We send a ping to the 'admin' database, which is available in all clusters
    await client.db("admin").command({ ping: 1 });

    // Step 5: Print a clear success message
    console.log("✅ Success! Successfully connected to MongoDB Atlas.");

  } catch (error) {
    // Step 6: Print a clear error message if anything fails
    console.error("❌ Connection failed! Please check following errors:");
    console.error(error.message);
  } finally {
    // Step 7: Ensure the connection is closed regardless of success or failure
    await client.close();
    console.log("Connection closed.");
  }
}

// Run the function
runPing();
