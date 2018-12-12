#!/bin/sh

set -e

BUILDS=$(gcloud builds list | grep WORKING | cut -f1 -d " " | tr "\n" " ")
[[ -z "$BUILDS" ]] && echo "No running builds." && exit 1
FIRST=$(echo $BUILDS | cut -f1 -d " " )
FIRST_TITLE=$(gcloud builds describe $FIRST | head -n 3 | tail -n 1)
SECOND=$(echo $BUILDS | cut -f2 -d " ")
SECOND_TITLE=$(gcloud builds describe $SECOND | head -n 3 | tail -n 1)

tmux start-server
tmux new-session -d -s CI
tmux rename-window 'CI Build'
tmux select-window -t CI:0
tmux send-keys "gcloud builds log --stream $FIRST && sleep infinity" 'C-m'
tmux split-window -h
tmux send-keys "gcloud builds log --stream $SECOND && sleep infinity" 'C-m'
tmux -2 attach-session -t CI
