FROM node:18-slim AS base

# APP: backend | docs | frontend
ARG APP
ENV APP=${APP:?}

# Use the correct version of the package manager
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

### ========================= ###

FROM base AS build

# Set working directory
WORKDIR /app

# Copy source code in container
COPY . .

# Install dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build app
RUN pnpm run --prefix apps/${APP} build

# Generate a portable package
RUN pnpm deploy --filter=${APP} --prod /prod/${APP}

### ========================= ###

FROM base AS app

# Get the portable package
COPY --from=build /prod/${APP} .

# Execute app
CMD ["pnpm", "start:prod"]
