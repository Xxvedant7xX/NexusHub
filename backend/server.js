import app from "./src/app.js";
import {
  connectToDatabase,
  getStorageModeLabel,
  seedSampleMembersIfNeeded,
} from "./src/store/memberStore.js";

const PORT = Number(process.env.PORT || 5000);
const HOST = process.env.HOST || (process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1");

const startServer = async () => {
  await connectToDatabase();
  await seedSampleMembersIfNeeded();

  app.listen(PORT, HOST, () => {
    console.log(
      `NexusHub API running on http://${HOST}:${PORT} (${getStorageModeLabel()})`,
    );
  });
};

startServer().catch((error) => {
  console.error("Failed to start backend:", error);
  process.exit(1);
});
