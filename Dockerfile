# ---- base: Node + pnpm (camada compartilhada pelos demais estágios) ----
FROM node:24-alpine AS base

RUN apk add --no-cache libc6-compat
RUN npm install --global pnpm@12.4.1

WORKDIR /app


# ---- deps: só os manifests, para o cache das dependências sobreviver a mudanças no código ----
FROM base AS dependencies

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
  pnpm install --frozen-lockfile


# ---- build ----
FROM base AS builder

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN --mount=type=cache,id=next-cache,target=/app/.next/cache \
  pnpm build


# ---- runner: apenas o output standalone, sem pnpm nem devDependencies ----
FROM node:24-alpine AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
