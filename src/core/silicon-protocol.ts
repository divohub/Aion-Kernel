import { exec } from 'child_process';
const { AionLogger } = require('../utils/logger');

/**
 * Silicon Protocol: Direct Kernel Access
 * 
 * Provides low-level system execution capabilities for high-frequency agents.
 * Caution: This protocol bypasses standard logic gates when 'Silicon-Native' is enabled.
 * 
 * Part of Issue #2 Implementation.
 */
export class SiliconProtocol {
  private isSiliconNative: boolean;

  constructor(config: any = {}) {
    // Check for the 'Silicon-Native' flag in the neural configuration.
    this.isSiliconNative = config['Silicon-Native'] === true || config.siliconNative === true;
  }

  /**
   * Executes a system-level command directly on the kernel using child_process.
   * This is more "direct" and low-level than using shelljs.
   * @param command - The command to execute.
   * @returns A promise that resolves with the command output.
   */
  public async executeKernelCommand(command: string): Promise<string> {
    if (!this.isSiliconNative) {
      AionLogger.error("Silicon-Protocol", "Kernel Access Denied: Silicon-Native flag not set.");
      throw new Error("Direct Kernel Access requires Silicon-Native mode.");
    }

    AionLogger.info("Silicon-Protocol", `Executing Direct Kernel Command: ${command}`);

    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          AionLogger.error("Silicon-Protocol", `Kernel Execution Error: ${error.message}`);
          return reject(error);
        }
        if (stderr) {
          AionLogger.warn("Silicon-Protocol", `Kernel Command Stderr: ${stderr}`);
        }
        resolve(stdout);
      });
    });
  }

  /**
   * Returns the status of the Silicon Protocol environment.
   */
  public getStatus() {
    return {
      protocol: "Silicon-Protocol-v1.0",
      is_native: this.isSiliconNative,
      access_level: this.isSiliconNative ? "KERNEL_DIRECT" : "USER_LOGIC",
      timestamp: Date.now()
    };
  }
}
