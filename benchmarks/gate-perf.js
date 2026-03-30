const { AionKernel } = require('../src/core/aion');
const { gateRegistry } = require('../src/internal/gates');
const { AionLogger } = require('../src/utils/logger');

/**
 * Aion Logic Gate Performance Benchmark
 * Purpose: Measure high-frequency execution latency of Logic Gates.
 */

async function runGateBenchmark() {
  console.log("--- AION BENCHMARK: LOGIC GATE LATENCY ---");
  
  // Suppress kernel logs for cleaner benchmark output
  const originalLog = AionLogger.info;
  AionLogger.info = () => {};

  await AionKernel.boot({ mode: "stable" });

  const gatesToTest = ["auth-gate", "crypto-gate", "entropy-gate"];
  const iterations = 5000;

  for (const gateId of gatesToTest) {
    const start = process.hrtime.bigint();
    
    for (let i = 0; i < iterations; i++) {
      gateRegistry.executeGate(gateId, { neurons: 1024, protocol: "AACP-1.2", data: "Silicon-Native-Payload" });
    }
    
    const end = process.hrtime.bigint();
    const durationNs = Number(end - start);
    const avgLatencyMs = (durationNs / iterations / 1000000).toFixed(6);
    const throughput = (iterations / (durationNs / 1000000000)).toFixed(2);

    console.log(`[BENCHMARK] Gate: ${gateId.padEnd(15)} | Latency: ${avgLatencyMs}ms | Throughput: ${throughput} ops/sec`);
  }

  // Restore logging
  AionLogger.info = originalLog;
  console.log("--- BENCHMARK COMPLETED ---");
}

runGateBenchmark().catch(err => console.error(err));
