# Hardware Latency Report Template

Create `reports/hardware_latency_report.json` after running inference on an edge device or edge-like machine.

```json
{
  "device": "Raspberry Pi 4 8GB or edge-like CPU machine",
  "ram_gb": 8,
  "cpu": "ARM Cortex-A72 or equivalent",
  "model_name": "fine-tuned-afrivoice",
  "model_runtime": "faster-whisper / onnx / tflite / torch",
  "test_files": 94,
  "mean_latency_ms": 850,
  "p95_latency_ms": 1300,
  "peak_memory_gb": 3.2,
  "notes": "Measured on the full Kaggle test set with automated inference only."
}
```

The competition validator requires:

- `ram_gb` at or below `8`
- `mean_latency_ms` greater than `0`
- real measurements from the target device or an edge-like machine
