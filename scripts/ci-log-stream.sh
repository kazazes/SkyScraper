#!/bin/sh

set -x

BUILDS=$(gcloud builds list | grep WORKING | cut -f1 -d " " | tr "\n" " " | sed 's/^[[:blank:]]*//;s/[[:blank:]]*$//' )
[[ -z "$BUILDS" ]] && echo "No running builds." && exit 1

tmux start-server
tmux -f /dev/null new-session -c $PWD -d -s CI
for build in $BUILDS
do
  TITLE=$(gcloud builds describe $build | head -n 3 | tail -n 1)
  tmux new-window -a -c $PWD -n "$TITLE" "gcloud builds log --stream $build"
  tmux setw status-position top
  tmux setw mouse on
  tmux setw status on
  tmux setw status-justify centre
done

tmux select-window -t CI:0

tmux -2 attach-session -t CI
