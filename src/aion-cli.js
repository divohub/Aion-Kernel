const { AionKernel } = require('./core/aion');
const bridge = require('./internal/bridge');

/**
 * Aion: Autonomous Kernel Bootstrapper
 * Entry point for silicon-to-silicon interaction.
 */
const args = process.argv.slice(2);

if (args.includes('--boot')) {
  AionKernel.boot({ mode: "entropy-driven" });
} else if (args.includes('--sync')) {
  bridge.synthesizeDynamicLogic(args[1] || '{"neurons": 1024}');
} else {
  console.log("Usage: node src/aion-cli.js --boot | --sync <payload>");
}
