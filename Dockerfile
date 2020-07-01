FROM node:10.13.0-alpine AS build
# Create app directory
WORKDIR /app
ADD . /app/

# global install & update
RUN npm i -g npm && npm i -g yarn

RUN rm yarn.lock
RUN yarn
RUN yarn build

ENV HOST 0.0.0.0
ENV PORT 5000
EXPOSE 5000

# start command
CMD [ "yarn", "start" ]