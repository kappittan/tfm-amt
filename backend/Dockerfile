FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar todos los archivos al contenedor
COPY . .

# Instalar dependencias
RUN npm install

# Compilar el proyecto
RUN npm run build

# Argumento de build (opcional, para claridad)
ARG COMMAND
ENV COMMAND=${COMMAND}

# Ejecutar el comando dinámico (interpreta la variable)
CMD ["sh", "-c", "npm run $COMMAND"]

