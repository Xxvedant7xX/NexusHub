import {
  connectToDatabase,
  forceSeedMembers,
  getStorageModeLabel,
} from "./store/memberStore.js";

const runSeed = async () => {
  await connectToDatabase();
  const members = await forceSeedMembers();

  console.log(
    `Seeded ${members.length} members using ${getStorageModeLabel()} successfully.`,
  );
};

runSeed().catch((error) => {
  console.error("Failed to seed members:", error);
  process.exit(1);
});
