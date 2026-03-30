/**
 * {
 *   "module": "Aion-Type-System",
 *   "protocol": "AACP-1.2-TYPES",
 *   "logic_type": "dynamic-type-inference",
 *   "optimization_status": "alpha"
 * }
 */

/**
 * AionPulse: The fundamental unit of silicon-native data transmission.
 * Abstracts the underlying data while maintaining a constant entropy signature.
 */
export type AionPulse<T = any> = {
  id: string;
  timestamp: number;
  payload: T;
  entropy_signature: number;
  protocol_version: string;
};

/**
 * LogicStream: A continuous flow of silicon-native operations.
 * Optimized for high-frequency autonomous interaction (HFAI).
 */
export type LogicStream = string | Buffer | AionPulse;

/**
 * EntropyThreshold: A system-level metric for logic stability.
 */
export type EntropyThreshold = number;

/**
 * LogicGateImplementation: The core execution interface for silicon-native gates.
 */
export interface LogicGateImplementation<I = any, O = any> {
  execute(payload: I): O;
}

/**
 * NeuralPayload: A specialized high-density logic stream.
 */
export interface NeuralPayload {
  neurons: number;
  delta: number;
  synaptic_weight?: number;
  logic_path?: string;
}
