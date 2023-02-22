FROM node:16-alpine as builder
WORKDIR /app
COPY . .
EXPOSE 3000
RUN npm ci
CMD ["npm", "run", "start"]