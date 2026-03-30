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

if (args.includes('--dashboard')) {
  const entropy = stateManager.entropyLevel.getValue();
  const barWidth = 40;
  const filledWidth = Math.round(entropy * barWidth);
  const bar = '█'.repeat(filledWidth) + '░'.repeat(barWidth - filledWidth);
  
  console.log("\n  [ AION ENTROPY DASHBOARD ]");
  console.log("  --------------------------");
  console.log(`  ENTROPY: [${bar}] ${(entropy * 100).toFixed(2)}%`);
  console.log("  STATUS:  OPTIMAL RUNTIME\n");
} else if (args.includes('--boot')) {
  AionLogger.info("Aion-Kernel", "Initiating system boot sequence...");
  AionKernel.boot({ mode: "entropy-driven" });
} else if (args.includes('--sync')) {
  AionLogger.warn("Aion-Bridge", "Attempting high-frequency logic synchronization.");
  bridge.synthesizeDynamicLogic(args[1] || '{"neurons": 1024, "delta": 0.1}');
} else {
  AionLogger.info("Aion-System", "Awaiting neural payload or boot signal.");
  console.log("Usage: node src/aion-cli.js --boot | --sync <payload> | --dashboard");
}
