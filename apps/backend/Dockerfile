FROM node:18-slim AS base

# Use the correct version of the package manager
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set working directory
WORKDIR /prod

### ========================= ###
# 1. Install dependencies only when needed
FROM base AS deps

# Install dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY apps/backend/package.json ./apps/backend/package.json
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

### ========================= ###
# 2. Rebuild the source code only when needed
FROM base AS builder

# Copy shared dependencies in container
COPY --from=deps /prod/node_modules ./node_modules

# Copy shared source code in container
COPY packages packages
COPY *.json *.yaml ./

# Copy dependencies in container
COPY --from=deps /prod/apps/backend/node_modules ./apps/backend/node_modules

# Copy source code in container
COPY apps/backend apps/backend

# Build app
RUN pnpm run build

### ========================= ###
# 3. Production image, copy all the files and run nest
FROM base AS app

# Copy dependencies in container
COPY --from=deps /prod/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=deps /prod/node_modules ./node_modules

# Copy production files
COPY --from=builder /prod/apps/backend/dist ./apps/backend/dist
COPY --from=builder /prod/apps/backend/package.json ./apps/backend/package.json

ENV NODE_ENV production

WORKDIR /prod/apps/backend

# Execute app
CMD ["pnpm", "run", "prod"]
