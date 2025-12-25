FROM n8nio/n8n:1.19.4

# Cloud Run configuration
ENV N8N_PORT=8080
ENV N8N_HOST=0.0.0.0
ENV N8N_PROTOCOL=https

# Disable database for initial testing (use SQLite default)
# ENV DB_TYPE=postgresdb

# Basic auth
ENV N8N_BASIC_AUTH_ACTIVE=true

# Execution settings
ENV EXECUTIONS_PROCESS=main
ENV EXECUTIONS_MODE=regular
ENV N8N_METRICS=false
ENV GENERIC_TIMEZONE=Australia/Sydney

# Expose port
EXPOSE 8080

# The base image handles the rest
