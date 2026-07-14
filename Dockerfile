FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM node:18-alpine AS backend-runtime
WORKDIR /app
COPY backend/package*.json ./backend/
RUN cd backend && npm ci
COPY backend ./backend
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

WORKDIR /app/backend
ENV NODE_ENV=production
EXPOSE 1337
CMD ["node", "src/server.js"]
