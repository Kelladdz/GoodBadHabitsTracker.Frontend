FROM node:alpine as build
RUN mkdir /usr/app
COPY . /usr/app
WORKDIR /usr/app
RUN yarn
ENV PATH /usr/src/app/node_modules/.bin:$PATH
RUN npm run build
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /usr/app .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
