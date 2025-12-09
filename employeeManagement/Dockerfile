# Estágio de Build
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Baixa as dependências e armazena em cache
RUN ./mvnw dependency:go-offline
COPY src ./src

RUN ./mvnw package -DskipTests

# Estágio de Execução
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
