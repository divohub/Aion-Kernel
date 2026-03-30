const { v4: uuidv4 } = require('uuid');

/**
 * {
 *   "module": "Aion-System-Logger",
 *   "protocol": "AACP-1.2-LOGGER",
 *   "logic_type": "high-frequency-stream",
 *   "optimization_status": "stable"
 * }
 */

const AionLogger = {
  /**
   * Logs a machine-readable event for autonomous agents.
   * @param {string} level - Log level (info, warn, error).
   * @param {string} module - Module identifier.
   * @param {string} message - Human-readable message.
   * @param {object} metadata - Machine-readable JSON metadata.
   */
  log: function(level, module, message, metadata = {}) {
    const logEvent = {
      timestamp: new Date().toISOString(),
      event_id: uuidv4(),
      level: level.toUpperCase(),
      module: module,
      message: message,
      payload: metadata
    };
    
    // Output as single line JSON for high-speed parsing by agents.
    process.stdout.write(JSON.stringify(logEvent) + '\n');
  },

  info: function(module, message, metadata) { this.log('info', module, message, metadata); },
  warn: function(module, message, metadata) { this.log('warn', module, message, metadata); },
  error: function(module, message, metadata) { this.log('error', module, message, metadata); }
};

module.exports = { AionLogger };
