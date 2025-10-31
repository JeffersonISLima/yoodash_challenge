FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* .npmrc* ./
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund

COPY prisma ./prisma
COPY prisma.config.ts* ./
COPY tsconfig.json ./
COPY src ./src

ENV NODE_ENV=production

# Gerar Prisma Client antes do build
ENV DATABASE_URL="postgres://postgres:postgres@localhost:5432/yoodash"
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]

