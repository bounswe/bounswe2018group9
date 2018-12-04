#!/bin/bash
HOST="root@46.101.223.116"

# set ENV
if [ -n "$1"]; then
  ENV="$1"
else
  echo "Assuming development deployment!"
  ENV="dev"
fi

# TODO: do scp with tar for efficiency
scp -r backend $HOST:~/$ENV
ssh $HOST 'killall node; screen -XS "actopus:$ENV" quit; screen -dmS "actopus:$ENV" bash -c "cd ~/$ENV/backend && npm install && sudo npm run start:$ENV"; exit'
