import { MongoClient, Db } from 'mongodb';

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | null = null;

function getClientPromise(): Promise<MongoClient> {
  if (clientPromise) return clientPromise;

  const url = process.env.MONGO_URL;
  if (!url) {
    throw new Error('MONGO_URL environment variable is not set');
  }

  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(url).connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    clientPromise = new MongoClient(url).connect();
  }

  return clientPromise;
}

export default getClientPromise;

export async function getDb(dbName = '3dmm'): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}
