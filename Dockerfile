FROM node:16-slim

WORKDIR /srv/app
ENV NODE_ENV production

COPY package.json package.json  
RUN npm install --legacy-peer-deps

# Add your source files
COPY . .  
CMD ["npm","start"]  