# Etapa 1: Build de la aplicación con Maven
FROM maven:3.8.5-openjdk-11 AS build
WORKDIR /app
# Copia el archivo pom.xml primero para aprovechar la cache de dependencias
COPY pom.xml .
# Descarga las dependencias
RUN mvn dependency:go-offline

# Copia el código fuente de la aplicación
COPY src ./src

# Compila la aplicación y empaquétala
RUN mvn clean package -DskipTests

# Etapa 2: Crear la imagen final
FROM openjdk:11-jre-slim
WORKDIR /app

# Agregar metadatos a la imagen
LABEL maintainer="Your Name <your.email@example.com>"
LABEL version="1.0"
LABEL description="Smart Logistics Application"

# Crear un usuario no root
RUN groupadd -r appuser && useradd -r -g appuser appuser
USER appuser

# Copia el JAR generado (asegúrate de que el nombre coincida con el generado por Maven)
COPY --from=build /app/target/*.jar app.jar

# Exponer el puerto 
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q --spider http://localhost:8080/actuator/health || exit 1

# Configuración de JVM para contenedores
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
