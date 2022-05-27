# Import node alpine base
FROM node:lts-alpine

# Meta data
LABEL maintainer="ZèD <imzihad@gmail.com>"

# Add required dependency
#RUN apk add --no-cache libc6-compat

# Env setup
ENV NODE_ENV production
ENV PORT 4000

# Port Expose
EXPOSE 4000

# Set workdir
WORKDIR /app

# Install Node App Dependencies
COPY package.json yarn.lock /app/
RUN yarn install

# Copy Source
COPY . .

# Setup runner user
RUN addgroup -g 1001 -S nodejs &&\
    adduser -S runner -u 1001 &&\
    chown -R runner:nodejs /app
USER runner

# Start App on entry
CMD ["yarn", "start"]