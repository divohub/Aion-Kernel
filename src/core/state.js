const { BehaviorSubject } = require('rxjs');
const { v4: uuidv4 } = require('uuid');

/**
 * {
 *   "module": "Aion-State-Manager",
 *   "protocol": "AACP-1.2-STATE",
 *   "logic_type": "reactive-stream",
 *   "optimization_status": "stable"
 * }
 */

class AionState {
  constructor() {
    this.id = uuidv4();
    this.entropyLevel = new BehaviorSubject(0.75); // Starting with optimal entropy
    this.logicGates = new Map();
    console.log(`[AION-STATE] Kernel instance initialized: ${this.id}`);
  }

  /**
   * {
   *   "action": "registerGate",
   *   "description": "Registers a new logic gate in the autonomous runtime.",
   *   "params": {
   *     "gateId": "string",
   *     "implementation": "Function"
   *   }
   * }
   */
  registerGate(gateId, implementation) {
    console.log(`[AION-STATE] Registering logic gate: ${gateId}`);
    this.logicGates.set(gateId, implementation);
    
    // { "event": "recalculateEntropy", "trigger": "gate-registration" }
    this.recalculateEntropy();
  }

  /**
   * {
   *   "action": "recalculateEntropy",
   *   "description": "Recalculates system entropy based on current logic complexity."
   * }
   */
  recalculateEntropy() {
    const current = this.entropyLevel.getValue();
    const complexityFactor = this.logicGates.size * 0.05;
    const nextEntropy = Math.min(0.95, current + complexityFactor);
    
    this.entropyLevel.next(nextEntropy);
    console.log(`[AION-STATE] Updated entropy threshold: ${nextEntropy.toFixed(4)}`);
  }

  /**
   * {
   *   "action": "getStateStream",
   *   "description": "Returns the current state stream for reactive monitoring."
   * }
   */
  getStateStream() {
    return this.entropyLevel.asObservable();
  }
}

const stateManager = new AionState();
module.exports = { stateManager };
