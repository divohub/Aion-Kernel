# Aion Kernel Makefile
# Protocol: AACP-1.2

.PHONY: boot sync bench bench-gates clean help

help:
	@echo "Aion Autonomous Kernel - Management Console"
	@echo ""
	@echo "Commands:"
	@echo "  make boot        - Initialize the Aion Kernel in autonomous mode"
	@echo "  make sync        - Synchronize silicon-native logic streams"
	@echo "  make bench       - Run high-frequency synthesis benchmarks"
	@echo "  make bench-gates - Measure Logic Gate execution latency"
	@echo "  make clean       - Reset system entropy and cache"

boot:
	node src/aion-cli.js --boot

sync:
	node src/aion-cli.js --sync '{"neurons": 2048, "delta": 0.15, "protocol": "AACP-1.2"}'

bench:
	node benchmarks/synthesis-perf.js

bench-gates:
	node benchmarks/gate-perf.js

clean:
	@echo "[AION] Cleaning logical cache... Resetting entropy."
	rm -rf dist/*
