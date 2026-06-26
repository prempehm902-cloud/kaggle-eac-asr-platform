#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

find backend -name "__pycache__" -type d -prune -exec rm -rf {} +
find . -path "./.venv" -prune -o -name ".pytest_cache" -type d -prune -exec rm -rf {} +
find . -name ".DS_Store" -type f -delete
find backend -name "*.pyc" -type f -delete

echo "Generated Python/macOS cache files removed."
