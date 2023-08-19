# ##### DEPENDENCIES

# FROM --platform=linux/amd64 node:20-alpine AS deps
# RUN apk add --no-cache libc6-compat openssl1.1-compat
# WORKDIR /app

# # Install Prisma Client - remove if not using Prisma

# # COPY prisma ./

# # Install dependencies based on the preferred package manager

# COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml\* ./

# RUN \
#  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#  elif [ -f package-lock.json ]; then npm ci; \
#  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
#  else echo "Lockfile not found." && exit 1; \
#  fi

# ##### BUILDER

# FROM --platform=linux/amd64 node:20-alpine AS builder
# # ARG DATABASE_URL
# # ARG NEXT_PUBLIC_CLIENTVAR

# # ARG NEXT_PUBLIC_APPWRITE_ENDPOINT
# # ARG NEXT_PUBLIC_APPWRITE_PROJECT
# # ARG NEXT_PUBLIC_APPWRITE_BINANCE_DATA
# # ARG NEXT_PUBLIC_APPWRITE_BALANCE
# # ARG NEXT_PUBLIC_APPWRITE_APIKEY
# # ARG NEXT_PUBLIC_DOMAIN
# # ARG NEXT_PUBLIC_APPWRITE_KUCOIN_DATA
# # ARG NEXT_PUBLIC_APPWRITE_KUCOIN_API
# # ARG NEXT_PUBLIC_FASTAPI
# # ARG NEXT_PUBLIC_FASTAPI_USER
# # ARG NEXT_PUBLIC_FASTAPI_PASSWORD
# # ARG NEXT_PUBLIC_APP_ENV_API
# # ARG NEXT_PUBLIC_REDIS

# # ARG NEXT_PUBLIC_APPWRITE_ENDPOINT='https://baas.hezik.nl/v1'
# # ARG NEXT_PUBLIC_APPWRITE_PROJECT='64ce8c876695923fa07b'
# # ARG NEXT_PUBLIC_APPWRITE_BINANCE_DATA='64cf6e2c4a9d40f7c365'
# # ARG NEXT_PUBLIC_APPWRITE_BALANCE='64cf6e2d55ef25372b3e'
# # ARG NEXT_PUBLIC_APPWRITE_APIKEY=''
# # ARG NEXT_PUBLIC_DOMAIN='http://localhost:3000'
# # ARG NEXT_PUBLIC_APPWRITE_KUCOIN_DATA='64cf6e2f197d1fce5222'
# # ARG NEXT_PUBLIC_APPWRITE_KUCOIN_API='64cf6e2f5eb1ac0275c0'
# # ARG NEXT_PUBLIC_FASTAPI='https://cryptoapi.hezik.nl/api/v2/'
# # ARG NEXT_PUBLIC_FASTAPI_USER='ron'
# # ARG NEXT_PUBLIC_FASTAPI_PASSWORD='Oldsch00l'
# # ARG NEXT_PUBLIC_APP_ENV_API='cryptoapi.hezik.nl'
# # ARG NEXT_PUBLIC_REDIS='redis://:eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81@10.20.30.23:6379/5'

# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# # ENV NEXT_TELEMETRY_DISABLED 1

# RUN \
#  if [ -f yarn.lock ]; then SKIP_ENV_VALIDATION=1 yarn build; \
#  elif [ -f package-lock.json ]; then SKIP_ENV_VALIDATION=1 npm run build; \
#  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && SKIP_ENV_VALIDATION=1 pnpm run build; \
#  else echo "Lockfile not found." && exit 1; \
#  fi

# ##### RUNNER

# FROM --platform=linux/amd64 node:20-alpine AS runner
# WORKDIR /app

# ENV NODE_ENV production

# # ENV NEXT_TELEMETRY_DISABLED 1

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/package.json ./package.json

# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs
# EXPOSE 3000
# ENV PORT 3000

# CMD ["node", "server.js"]
# CMD ["node", "server.js"]


# Naively Simple Node Dockerfile
FROM node:20-alpine
RUN npm install -g npm
RUN npm install -g pnpm
RUN mkdir -p /app/ && chown -R node:node /app
WORKDIR /app

# COPY --chown=node:node package.json ./
COPY --chown=node:node package.json ./
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node . .
# RUN pnpm install

USER node

# ARG NEXT_PUBLIC_APPWRITE_ENDPOINT
# ARG NEXT_PUBLIC_APPWRITE_PROJECT
# ARG NEXT_PUBLIC_APPWRITE_BINANCE_DATA
# ARG NEXT_PUBLIC_APPWRITE_BALANCE
# ARG APPWRITE_APIKEY
# ARG NEXT_PUBLIC_DOMAIN
# ARG APPWRITE_KUCOIN_DATA
# ARG APPWRITE_KUCOIN_API
# ARG FASTAPI
# ARG FASTAPI_USER
# ARG FASTAPI_PASSWORD
# ARG APP_ENV_API
# ARG REDIS

RUN pnpm install --frozen-lockfile
RUN pnpm build

EXPOSE 3000
WORKDIR /app

# CMD [ "turbo", "run build --filter nextjs"]
CMD [ "pnpm", "start" ]
# CMD [ "node", ".next/standalone/server.js" ]