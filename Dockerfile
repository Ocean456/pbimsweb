FROM node:14.16.0-alpine3.10
WORKDIR /app
COPY index.js /app
CMD ["node", "index.js"]
