#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:8000}"

echo "Checking ${BASE_URL}/api/v1/health"
curl -fsS "${BASE_URL}/api/v1/health"
echo

echo "Checking model adapters"
curl -fsS "${BASE_URL}/api/v1/integrations/model-adapters" > /tmp/afrivoice-model-adapters.json
python -m json.tool /tmp/afrivoice-model-adapters.json >/dev/null
echo "OK"

