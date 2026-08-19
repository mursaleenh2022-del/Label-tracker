FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

# Copy app source
COPY . .

# Generate Prisma client and build typescript
RUN npx prisma generate
RUN npm run build

# Bind to 0.0.0.0 for Cloud Run
ENV HOST=0.0.0.0

EXPOSE 8080

CMD [ "npm", "start" ]
