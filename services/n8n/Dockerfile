FROM n8nio/n8n:latest

# User runs as node by default in the base image
USER root

# Cloud Run specific configurations
ENV N8N_PORT=8080
ENV N8N_PROTOCOL=https

# Database configuration (loaded from secrets at runtime)
ENV DB_TYPE=postgresdb
ENV DB_POSTGRESDB_PORT=5432

# N8N configuration
ENV N8N_BASIC_AUTH_ACTIVE=true
ENV EXECUTIONS_PROCESS=main
ENV EXECUTIONS_MODE=regular
ENV N8N_METRICS=false
ENV GENERIC_TIMEZONE=Australia/Sydney

# Expose port for Cloud Run
EXPOSE 8080

# Switch back to node user
USER node

# The base image already has the correct ENTRYPOINT and CMD
# No need to override
