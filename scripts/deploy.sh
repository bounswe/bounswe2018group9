#!/bin/bash
HOST="root@46.101.223.116"

# TODO: do scp with tar for efficiency
scp -r backend $HOST:~
ssh $HOST 'screen -XS "actopus:prod" quit; screen -dmS "actopus:prod" bash -c "cd ~/backend && npm install && sudo npm start:prod"; exit'
