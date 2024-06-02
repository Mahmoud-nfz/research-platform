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
COPY apps/frontend/package.json ./apps/frontend/package.json
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
COPY --from=deps /prod/apps/frontend/node_modules ./apps/frontend/node_modules

# Copy source code in container
COPY apps/frontend apps/frontend

# Build app
RUN pnpm run dev --force

### ========================= ###
# 3. Production image, copy all the files and run next
FROM base AS app

# Copy production files
COPY --from=builder /prod/apps/frontend/public ./apps/frontend/public
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /prod/apps/frontend/.next/standalone ./
COPY --from=builder /prod/apps/frontend/.next/static ./apps/frontend/.next/static

ENV NODE_ENV production

WORKDIR /prod/apps/frontend

# Execute app
CMD ["pnpm", "run", "prod"]
