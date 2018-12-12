#!/bin/sh

set -e

echo "Checking for running Google Cloud Build jobs..."

BUILDS=$(gcloud builds list | grep WORKING | cut -f1 -d " " | tr "\n" " " | sed 's/^[[:blank:]]*//;s/[[:blank:]]*$//' )
[[ -z "$BUILDS" ]] && echo "No running builds." && exit 1

tmux start-server
for build in $BUILDS
do
  TITLE=$(gcloud builds describe $build | head -n 3 | tail -n 1)
  tmux new-window -a -c $PWD -n "$TITLE" "gcloud builds log --stream $build"
  tmux setw mouse on
  tmux setw monitor-silence 15
  tmux setw remain-on-exit on
done

tmux -2 attach-session
