FROM node:14
ADD . /app-front
WORKDIR /app-front

RUN cd frontend
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]