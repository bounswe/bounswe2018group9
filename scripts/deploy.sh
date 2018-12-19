#!/bin/bash
HOST="root@46.101.223.116"

# set ENV
if [ -z "$1" ]
then
  echo "Assuming development deployment!"
  ENV="dev"
else
  ENV="$1"
fi

echo "ENV: $ENV"

# TODO: do scp with tar for efficiency
scp -r backend/* $HOST:~/$ENV

DEPLOY_TASK="screen -XS 'actopus:"$ENV"' quit; screen -dmS 'actopus:"$ENV"' bash -c 'cd "$ENV" && npm install && sudo npm run start:"$ENV"'; exit"
echo "$DEPLOY_TASK"

ssh $HOST $DEPLOY_TASK
