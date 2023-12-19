FROM node:14
WORKDIR /app
RUN apt-get update && apt-get install -y git

RUN git clone https://github.com/rgredel/productionScheduler.git .

RUN cd frontend
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]