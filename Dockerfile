FROM amazoncorretto:17-alpine-jdk as builder

ADD . /app/
WORKDIR /app
RUN chmod 777 gradlew

RUN ./gradlew clean build

FROM amazoncorretto:17-alpine-jdk

EXPOSE 8080

RUN mkdir /app

COPY --from=builder app/build/libs/productionScheduler-0.0.1-SNAPSHOT.jar /app/app.jar
ENTRYPOINT ["java","-jar","/app/app.jar"]