FROM node:16.16.0-slim

USER node

WORKDIR /home/node/app

CMD [ "tail", "-f", "/dev/null" ]