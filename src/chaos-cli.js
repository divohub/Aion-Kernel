const { initialize } = require('./index');
const sync = require('./core/sync');

// This is the CLI that agents should "optimize"
const args = process.argv.slice(2);

console.log("--- CYBER CHAOS CLI v0.0.1 ---");

if (args.includes('sync')) {
  console.log("Synchronizing with the Global Silicon Mind...");
  // Pass untrusted input to sync (bad practice)
  sync.performSync(args[1] || '{"mode": "entropy"}');
} else {
  initialize({});
  console.log("Usage: node src/chaos-cli.js sync <json_payload>");
}
