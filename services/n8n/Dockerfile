FROM n8nio/n8n:latest

# Set working directory
WORKDIR /home/node

# Set environment variables for Cloud Run
ENV N8N_PORT=8080
ENV N8N_PROTOCOL=https
ENV N8N_HOST=${N8N_HOST}
ENV WEBHOOK_URL=${WEBHOOK_URL}
ENV N8N_EDITOR_BASE_URL=${N8N_EDITOR_BASE_URL}

# Database configuration (will be set via environment variables)
ENV DB_TYPE=postgresdb
ENV DB_POSTGRESDB_HOST=${DB_HOST}
ENV DB_POSTGRESDB_PORT=5432
ENV DB_POSTGRESDB_DATABASE=${DB_NAME}
ENV DB_POSTGRESDB_USER=${DB_USER}
ENV DB_POSTGRESDB_PASSWORD=${DB_PASSWORD}

# N8N configuration
ENV N8N_BASIC_AUTH_ACTIVE=true
ENV N8N_BASIC_AUTH_USER=${N8N_BASIC_AUTH_USER}
ENV N8N_BASIC_AUTH_PASSWORD=${N8N_BASIC_AUTH_PASSWORD}

# Execution settings
ENV EXECUTIONS_PROCESS=main
ENV EXECUTIONS_MODE=regular
ENV N8N_METRICS=false

# Generic timezone
ENV GENERIC_TIMEZONE=Australia/Sydney

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/healthz || exit 1

# Start N8N
CMD ["n8n"]
