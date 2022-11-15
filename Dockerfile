FROM node:18
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
COPY prisma ./prisma/
RUN ls -a
RUN npm install --ignore-scripts
RUN npx prisma generate
RUN npm run build
## this is stage two , where the app actually runs
FROM node:18
WORKDIR /usr
COPY prisma ./prisma/
COPY --from=0 /usr/build .
COPY package.json ./
RUN npm install --ignore-scripts
RUN npx prisma generate
##--only=production
RUN npm install pm2 -g
EXPOSE 3456
CMD ["pm2-runtime","app.js"]