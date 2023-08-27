#!/bin/zsh
export GIT_WORK_TREE=~/journal
export GIT_DIR=$GIT_WORK_TREE/.git

if git diff --quiet; then
    echo "already up-to-date"
else
    git add $GIT_WORK_TREE -v
    git commit -m "update (`date`)"
fi
