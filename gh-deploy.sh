#!/bin/sh

MSG=$1

if [[ $(git status -s) ]]
then
    echo "The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

echo "Deleting old build"
rm -rf src/client/dist
mkdir src/client/dist
git worktree prune
rm -rf .git/worktrees/dist/

echo "Checking out gh-pages branch into dist"
git worktree add -B gh-pages src/client/dist origin/gh-pages

echo "Removing existing files"
rm -rf src/client/dist/*

echo "Building site $FLAG"
npm run build:client

echo "Updating gh-pages branch"
cd src/client/dist && git add --all && git commit -m "$MSG (gh-client.sh)" && git push