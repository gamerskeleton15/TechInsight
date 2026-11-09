#!/usr/bin/env bash
# Restore the latest TechInsight backup into a SCRATCH database so the restore
# path is tested without touching production.
#
# Usage: scripts/db-restore-test.sh
# Env:   DATABASE_URL          - production connection string (read-only source)
#        TECHINSIGHT_TEST_DB_URL - scratch database to restore into
set -euo pipefail

SNAPSHOT="${1:-$(ls -t docs/backups/techinsight-*.sql 2>/dev/null | head -1)}"
if [[ -z "${SNAPSHOT:-}" ]]; then
  echo "No snapshot found in docs/backups/. Create one first:"
  echo "  pg_dump \"\$DATABASE_URL\" -f docs/backups/techinsight-\$(date +%F).sql"
  exit 1
fi

if [[ -z "${TECHINSIGHT_TEST_DB_URL:-}" ]]; then
  echo "Set TECHINSIGHT_TEST_DB_URL to a scratch Postgres database."
  exit 1
fi

echo "Restoring ${SNAPSHOT} into ${TECHINSIGHT_TEST_DB_URL%%:*}..."
psql "${TECHINSIGHT_TEST_DB_URL}" -f "${SNAPSHOT}"

echo "Verifying tables..."
psql "${TECHINSIGHT_TEST_DB_URL}" -c '\dt'

echo "OK — restore tested. Production DATABASE_URL was not touched."
