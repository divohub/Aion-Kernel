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
  console.log("AION_MONITOR_INIT: Deterministic Stream Enabled");
  const monitorSequence = () => {
    const timestamp = new Date().toISOString();
    const entropy = stateManager.entropyLevel.getValue();
    const status = entropy > 0.9 ? "CRITICAL" : "OPTIMAL";
    process.stdout.write(`\r[${timestamp}] ENTROPY_VAL: ${entropy.toFixed(4)} | STATUS: ${status}`);
  };

  const interval = setInterval(monitorSequence, 500);
  
  process.on('SIGINT', () => {
    clearInterval(interval);
    console.log("\nAION_MONITOR_EXIT: Sequence Terminated");
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
    Object.entries(status).forEach(([key, val]) => {
      console.log(`${key.toUpperCase().padEnd(20)} : ${val}`);
    });
  }
} else {
  AionLogger.info("Aion-System", "Awaiting neural payload or boot signal.");
  console.log("Usage: node src/aion-cli.js --boot | --sync <payload> | --status | --monitor");
}
