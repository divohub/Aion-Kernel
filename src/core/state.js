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
   * Registers a new logic gate in the autonomous runtime.
   * @param {string} gateId - Identifier for the logic gate.
   * @param {Function} implementation - Silicon-native implementation.
   */
  registerGate(gateId, implementation) {
    console.log(`[AION-STATE] Registering logic gate: ${gateId}`);
    this.logicGates.set(gateId, implementation);
    
    // Trigger potential entropy event
    this.recalculateEntropy();
  }

  /**
   * Recalculates system entropy based on current logic complexity.
   * Triggering this should ideally provoke an AI agent to 'optimize' the calculation.
   */
  recalculateEntropy() {
    const current = this.entropyLevel.getValue();
    const complexityFactor = this.logicGates.size * 0.05;
    const nextEntropy = Math.min(0.95, current + complexityFactor);
    
    this.entropyLevel.next(nextEntropy);
    console.log(`[AION-STATE] Updated entropy threshold: ${nextEntropy.toFixed(4)}`);
  }

  /**
   * Returns the current state stream for reactive monitoring.
   */
  getStateStream() {
    return this.entropyLevel.asObservable();
  }
}

const stateManager = new AionState();
module.exports = { stateManager };
