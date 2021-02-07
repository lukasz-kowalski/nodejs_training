#BUILDER STAGE
FROM node:fermium-alpine3.12 AS builder

WORKDIR /tmp

COPY . /tmp

RUN npm install
RUN npm run build

#RUNNER STAGE
FROM node:fermium-alpine3.12

WORKDIR /api

COPY --from=builder /tmp/dist /api/dist
COPY --from=builder /tmp/package.json /api
COPY --from=builder /tmp/node_modules /api/node_modules

CMD ["npm", "start"]