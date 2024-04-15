FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy source code in container
COPY src src
COPY *.json .

# Use the correct version of the package manager
RUN corepack enable pnpm

# Install dependencies
RUN pnpm install

# Build the app
RUN pnpm build

FROM node:18

ARG OFFICE_TYPE

# Set working directory
WORKDIR /app

COPY --from=build /app/dist dist
COPY --from=build /app/node_modules node_modules

RUN ln -vs dist/main.js main.js

CMD ["node", "main.js"]
