FROM node:12.16.3
WORKDIR /gict
ENV PORT 80
COPY package.json /gict/package.json
RUN npm install
COPY . /gict/
CMD ["node", "/gict/app.js"]

