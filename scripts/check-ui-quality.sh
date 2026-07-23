#!/bin/sh

set -eu

PROJECT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
SERVER_PORT=8765
SERVER_PID=""

cleanup() {
  if [ -n "$SERVER_PID" ]; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT INT TERM
cd "$PROJECT_DIR"

node --check script.js
node --check i18n.js
prettier --check script.js i18n.js styles.css demo-2/styles.css demo-3/styles.css
git diff --check

mkdir -p tmp
python3 -m http.server "$SERVER_PORT" --bind 127.0.0.1 >tmp/ui-quality-server.log 2>&1 &
SERVER_PID=$!

python3 - "$SERVER_PORT" <<'PY'
import sys
import time
from urllib.error import URLError
from urllib.request import urlopen

port = sys.argv[1]
base_url = f"http://127.0.0.1:{port}/"
paths = [
    "index.html",
    "about.html",
    "contact.html",
    "demo-2/index.html",
    "demo-2/about.html",
    "demo-2/contact.html",
    "demo-3/index.html",
    "demo-3/about.html",
    "demo-3/contact.html",
    "script.js",
    "i18n.js",
    "output/pdf/cross-cultural-guide-to-birth.pdf",
]

for attempt in range(20):
    try:
        with urlopen(base_url, timeout=1) as response:
            if response.status == 200:
                break
    except URLError:
        if attempt == 19:
            raise
        time.sleep(0.1)

failed = []
for path in paths:
    with urlopen(base_url + path, timeout=5) as response:
        print(f"{response.status} {path}")
        if response.status != 200:
            failed.append((path, response.status))

if failed:
    raise SystemExit(f"HTTP checks failed: {failed}")
PY

echo "UI automated quality gate passed."
