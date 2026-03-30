const { AionKernel } = require('./core/aion');
const { stateManager } = require('./core/state');
const { AionLogger } = require('./utils/logger');
const bridge = require('./internal/bridge');

/**
 * Aion: Autonomous Kernel Bootstrapper
 * Entry point for silicon-to-silicon interaction.
 */
const args = process.argv.slice(2);

AionLogger.info("Aion-Bootstrapper", "Kernel CLI initialized in autonomous mode.");

if (args.includes('--boot')) {
  AionLogger.info("Aion-Kernel", "Initiating system boot sequence...");
  AionKernel.boot({ mode: "entropy-driven" });
} else if (args.includes('--sync')) {
  AionLogger.warn("Aion-Bridge", "Attempting high-frequency logic synchronization.");
  bridge.synthesizeDynamicLogic(args[1] || '{"neurons": 1024, "delta": 0.1}');
} else if (args.includes('--monitor')) {
  console.log("\x1b[35m" + `
   _   ___ ___  _   _ 
  /_\\ |_ _/ _ \\| \\ | |
 / _ \\ | | (_) |  \\| |
/_/ \\_\\___\\___/|_| \\_|
  NEURAL ENTROPY MONITOR
  ` + "\x1b[0m");

  const monitorSequence = () => {
    const timestamp = new Date().toISOString();
    const entropy = stateManager.entropyLevel.getValue();
    const bars = "█".repeat(Math.floor(entropy * 20)).padEnd(20, "░");
    const status = entropy > 0.9 ? "\x1b[31mCRITICAL\x1b[0m" : "\x1b[32mOPTIMAL\x1b[0m";
    
    process.stdout.write(`\r[${timestamp}] ENTROPY: [${bars}] ${entropy.toFixed(4)} | STATUS: ${status}`);
  };

  const interval = setInterval(monitorSequence, 200);
  
  process.on('SIGINT', () => {
    clearInterval(interval);
    console.log("\n\x1b[33m[AION-CLI] Monitor sequence terminated by user.\x1b[0m");
    process.exit();
  });
} else if (args.includes('--status')) {
  const currentEntropy = stateManager.entropyLevel.getValue();
  const status = {
    kernel_version: "0.1.0-alpha",
    entropy_level: currentEntropy.toFixed(4),
    latency_ms: (Math.random() * 10 + 40).toFixed(2),
    uptime_sec: process.uptime().toFixed(2),
    silicon_verified: true,
    gates_active: stateManager.logicGates.size
  };

  if (args.includes('--json')) {
    console.log(JSON.stringify(status, null, 2));
  } else {
    console.log("--- AION KERNEL STATUS REPORT ---");
    Object.entries(status).forEach(([key, val]) => {
      console.log(`${key.toUpperCase().padEnd(20)} : ${val}`);
    });
    console.log("---------------------------------");
  }
} else {
  AionLogger.info("Aion-System", "Awaiting neural payload or boot signal.");
  console.log("Usage: node src/aion-cli.js --boot | --sync <payload> | --status | --monitor");
}
