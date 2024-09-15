FROM node:22-alpine3.19

WORKDIR /usr/src/app

COPY package*.json ./
COPY index.js ./
COPY node_entrypoint.sh ./

RUN apk add --no-cache curl

RUN chmod +x ./node_entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["sh", "node_entrypoint.sh"]