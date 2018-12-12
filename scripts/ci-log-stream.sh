#!/bin/sh

set -x

BUILDS=$(gcloud builds list | grep WORKING | cut -f1 -d " " | tr "\n" " ")
[[ -z "$BUILDS" ]] && echo "No running builds." && exit 1
FIRST=$(echo $BUILDS | cut -f1 -d " " )
FIRST_TITLE=$(gcloud builds describe $FIRST | head -n 3 | tail -n 1)
SECOND=$(echo $BUILDS | cut -f2 -d " ")
SECOND_TITLE=$(gcloud builds describe $SECOND | head -n 3 | tail -n 1)

tmux start-server
tmux -f /dev/null new-session -c $PWD -d -s CI "gcloud builds log --stream $FIRST"
tmux setw status-position top
tmux setw mouse on
tmux setw status on
tmux rename-window "$FIRST_TITLE"
tmux select-window -t CI:0
tmux new-window -d -c $PWD -n "$SECOND_TITLE" "gcloud builds log --stream $SECOND"
tmux -2 attach-session -t CI
