### Trabajo Práctico N°7 – Sistema de Eventos Bancarios con Kafka ###

## Matías Navone 

# 1. Introducción

El presente trabajo práctico consiste en el desarrollo de un sistema distribuido que simula el ciclo de vida de una transacción bancaria, utilizando Apache Kafka como sistema de mensajería y Next.js (React) para la interfaz web.
El objetivo principal es representar en tiempo real los distintos eventos que conforman una transacción bancaria, aplicando conceptos de orquestación, mensajería asíncrona y buenas prácticas de arquitectura.

# 2. Objetivos

Simular el ciclo completo de una transacción bancaria: iniciar, reservar fondos, verificar fraude, confirmar o revertir, y notificar.

Publicar y consumir eventos a través de Kafka.

Mostrar en tiempo real la evolución de la transacción en una aplicación web.

Practicar conceptos de orquestación (Saga Pattern), idempotencia y uso de colas DLQ.


## 🛠️ Requisitos e Instalación
1. Iniciar la Infraestructura con Docker

La infraestructura de Kafka (Zookeeper, Kafka Broker y Kafka UI) se levanta usando Docker Compose.

# Navega a la raíz del proyecto (donde está el docker-compose.yml)
    docker-compose up -d

2. Instalar Dependencias

Instala las dependencias para el frontend y el backend:

# Instalación de dependencias del Frontend
    cd frontend
    npm install

# Instalación de dependencias del Backend
    cd backend
    npm install 

3. Iniciar Microservicios de Node.js

Abre tres terminales separadas (una para cada servicio del backend) y ejecuta los siguientes comandos:

# Terminal 1: API Gateway (Recibe peticiones del frontend)
    cd backend
    npm run api


# Terminal 2: Orchestrator (Aplica lógica de negocio)
    cd backend
    npm run orchestrator


# Terminal 3: WebSocket Gateway (Envía eventos al frontend)
    cd backend
    npm run gateway

4. Iniciar el Frontend (Simulador)

# Abre una cuarta terminal e inicia la aplicación Next.js:
    cd frontend
    npm run dev


## 🧪 Cómo Realizar Pruebas

# Una vez que todos los componentes están activos:

    Abre el simulador en tu navegador: http://localhost:3000

    Para monitorear los mensajes de Kafka, abre: http://localhost:8085

    ## Prueba de Éxito (Transacción normal)

    Valores: Ingresa cualquier User ID, Cuenta Origen, Cuenta Destino y Monto.

## Comportamiento Esperado: Los eventos aparecerán en secuencia en el panel de Monitoreo: txn.FundsReserved -> txn.FraudChecked -> txn.Committed -> txn.Notified, finalizando con el mensaje "✅ Transacción completada con éxito.".