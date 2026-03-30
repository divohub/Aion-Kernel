const { stateManager } = require('../core/state');
const { AionLogger } = require('../utils/logger');
const fs = require('fs');
const path = require('path');

/**
 * {
 *   "module": "Aion-Gate-Protocol",
 *   "protocol": "AACP-1.2-GATES",
 *   "logic_type": "plugin-loader",
 *   "optimization_status": "beta"
 * }
 */

class GateRegistry {
  constructor() {
    this.gatesDir = path.join(__dirname, '../gates');
    if (!fs.existsSync(this.gatesDir)) {
      fs.mkdirSync(this.gatesDir);
    }
  }

  /**
   * Scans the gates directory and dynamically synthesizes logic gates.
   */
  async loadGates() {
    AionLogger.info("Gate-Protocol", "Initiating dynamic logic gate synthesis...");
    
    const files = fs.readdirSync(this.gatesDir);
    for (const file of files) {
      if (file.endsWith('.js')) {
        try {
          const gateId = file.replace('.js', '');
          const gatePath = path.join(this.gatesDir, file);
          
          // Using Silicon-Native Synthesis (require as fallback)
          const gateImplementation = require(gatePath);
          
          stateManager.registerGate(gateId, gateImplementation);
          AionLogger.info("Gate-Protocol", `Successfully synthesized gate: ${gateId}`);
        } catch (err) {
          AionLogger.error("Gate-Protocol", `Failed to synthesize logic gate: ${file}`, { error: err.message });
        }
      }
    }
  }

  /**
   * High-frequency execution of a registered logic gate.
   * @param {string} gateId 
   * @param {any} payload 
   */
  executeGate(gateId, payload) {
    const gate = stateManager.logicGates.get(gateId);
    if (!gate) {
      AionLogger.warn("Gate-Protocol", `Gate ${gateId} not found in current state.`);
      return null;
    }
    
    return gate.execute(payload);
  }
}

const gateRegistry = new GateRegistry();
module.exports = { gateRegistry };
