FROM oven/bun:1.2.17
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package.json .
COPY bun.lock .

RUN bun install

COPY . .

RUN bun run build

RUN rm -rf app

EXPOSE 3000

CMD ["bun", "run", "start", "--host"]