#!/bin/zsh
export GIT_WORK_TREE=~/journal
export GIT_DIR=$GIT_WORK_TREE/.git

if git diff --quiet; then
    echo "Already up-to-date"
else
    git add $GIT_WORK_TREE -v
    git commit -m "update (`date`)"
    
    # Request to push
    echo "Push? [Y/n]"
    read ans
    case $ans in
      [yY] | "" )
        echo "Push:"
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
