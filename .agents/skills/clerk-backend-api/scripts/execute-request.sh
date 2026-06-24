#!/usr/bin/env bash

# Execute a Clerk Backend API request with scope enforcement.
#
# Usage: bash execute-request.sh [--admin] <METHOD> <PATH> [BODY]
#
# Scope enforcement:
#   GET     — always allowed
#   POST, PUT, PATCH — requires CLERK_BAPI_SCOPES="write" or --admin flag
#   DELETE  — requires CLERK_BAPI_SCOPES="write,delete" or --admin flag

set -euo pipefail

# Walk up from $PWD to find .env/.env.local (mirrors Clerk CLI behavior).
# Stops at the first directory that provides CLERK_SECRET_KEY.
_dir="$PWD"
while true; do
  for _envfile in "$_dir/.env" "$_dir/.env.local"; do
    if [[ -f "$_envfile" ]]; then
      while IFS='=' read -r _k _v; do
        case "$_k" in
          CLERK_SECRET_KEY|CLERK_BAPI_SCOPES|CLERK_REST_API_URL)
            _v="${_v%\"}"; _v="${_v#\"}"
            export "$_k=$_v"
            ;;
        esac
      done < <(grep -E '^(CLERK_SECRET_KEY|CLERK_BAPI_SCOPES|CLERK_REST_API_URL)=' "$_envfile")
    fi  done
  [[ -n "${CLERK_SECRET_KEY:-}" ]] && break
  _parent="$(dirname "$_dir")"
  [[ "$_parent" == "$_dir" ]] && break
  _dir="$_parent"
done
unset _dir _parent _envfile

# Parse --admin flag
ADMIN=false
if [[ "${1:-}" == "--admin" ]]; then
  ADMIN=true
  shift
fi

METHOD="${1:?Usage: execute-request.sh [--admin] <METHOD> <PATH> [BODY]}"
PATH_ARG="${2:?Usage: execute-request.sh [--admin] <METHOD> <PATH> [BODY]}"
BODY="${3:-}"

METHOD_UPPER=$(echo "$METHOD" | tr '[:lower:]' '[:upper:]')
SCOPES="${CLERK_BAPI_SCOPES:-}"

# Scope check
if [[ "$ADMIN" == false ]]; then
      if ! has_scope "write"; then
        echo "ERROR: $METHOD_UPPER requests require CLERK_BAPI_SCOPES=\"write\" or --admin flag." >&2
        echo "Current CLERK_BAPI_SCOPES: \"$SCOPES\"" >&2
        exit 1
      fi
      ;;
    DELETE)
      if ! has_scope "write" || ! has_scope "delete"; then
        echo "ERROR: DELETE requests require CLERK_BAPI_SCOPES=\"write,delete\" or --admin flag." >&2      ;;
    DELETE)
      if [[ "$SCOPES" != *"write"* ]] || [[ "$SCOPES" != *"delete"* ]]; then
        echo "ERROR: DELETE requests require CLERK_BAPI_SCOPES=\"write,delete\" or --admin flag." >&2
        echo "Current CLERK_BAPI_SCOPES: \"$SCOPES\"" >&2
        exit 1
      fi
      ;;
    *)
      echo "ERROR: Unknown HTTP method: $METHOD_UPPER" >&2
      exit 1
      ;;
  esac
fi

# Base URL: use CLERK_REST_API_URL if set, otherwise default to production
BASE_URL="${CLERK_REST_API_URL:-https://api.clerk.com}"

# Build curl command
CURL_ARGS=(
  -s
  --show-error
  --fail-with-body
  --connect-timeout "${CLERK_API_CONNECT_TIMEOUT:-10}"
  --max-time "${CLERK_API_MAX_TIME:-60}"
  -X "$METHOD_UPPER"
  "${BASE_URL}/v1${PATH_ARG}"
  -H "Authorization: Bearer ${CLERK_SECRET_KEY:?CLERK_SECRET_KEY is not set}"
  -H "Content-Type: application/json"
)

if [[ -n "$BODY" ]]; then
  CURL_ARGS+=(-d "$BODY")
fi

curl "${CURL_ARGS[@]}"