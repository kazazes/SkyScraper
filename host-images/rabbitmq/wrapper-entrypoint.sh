#!/usr/bin/env bash
set -e

(
  count=0
  # Execute list_users until service is up and running
  until timeout 5 rabbitmqctl list_users >/dev/null 2>/dev/null || ((count++ >= 60)); do sleep 1; done
  if rabbitmqctl list_users | grep guest >/dev/null; then
    rabbitmqctl change_password guest scrapingskies

    echo "setup completed"
  else
    echo "already setup"
  fi
) &

# Call original entrypoint
exec docker-entrypoint.sh rabbitmq-server $@
