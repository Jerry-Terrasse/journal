#!/bin/zsh
export GIT_WORK_TREE=~/journal
export GIT_DIR=$GIT_WORK_TREE/.git

if git diff --exit-code; then
    echo "Already up-to-date"
else
    # Request to push
    echo -n "Push? [Y/n]"
    read ans
    case $ans in
      [yY] | "" )
        echo "Push:"
        git add $GIT_WORK_TREE -v
        git commit -m "update (`date`)"
        git push
        ;;
      [nN] )
        echo "Abort."
        ;;

      * )
        echo "Invalid response."
        ;;
    esac
fi
