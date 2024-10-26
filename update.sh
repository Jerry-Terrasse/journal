#!/bin/zsh
export GIT_WORK_TREE=~/journal
export GIT_DIR=$GIT_WORK_TREE/.git

if git --paginate diff --exit-code; then
    echo "Already up-to-date"
else
    # Request to push
    echo -n "Push? [Y/n]"
    read ans
    case $ans in
      [yY] | "" )
        echo
        git add $GIT_WORK_TREE -v
        echo
        git commit -m "update (`date`)"
        echo
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
