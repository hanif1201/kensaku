import { Client, Database } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite Endpoint
  .setProject("67373093002d5c545778"); // Your project ID

const database = new Database(client);

export const uploadFile = async (file) => {
  try {
    const response = await database.createFile(
      "673735c60002245ad8cc",
      file.name,
      file.uri
    );
    return response;
  } catch (error) {
    console.error("File upload error", error);
    throw error;
  }
};
