---
layout: layouts/base.njk
title: "Guía de Configuración"
lang: es
slug: "docs/configuration"
permalink: /es/docs/configuration/
eleventyNavigation:
  key: configuration
  parent: docs
  order: 2
---

# Guía de Configuración

Esta guía cubre todas las opciones de configuración disponibles para personalizar tu instalación.

## Configuración Básica

### Ajustes de la Aplicación

El archivo de configuración principal se encuentra en `config/app.json`. Aquí están los ajustes clave:

```json
{
  "app": {
    "name": "Nombre de tu App",
    "port": 3000,
    "environment": "production",
    "debug": false
  }
}
```

### Configuración de Base de Datos

Configura tu conexión de base de datos en `config/database.json`:

```json
{
  "database": {
    "type": "postgresql",
    "host": "localhost",
    "port": 5432,
    "name": "myapp_db",
    "user": "dbuser",
    "password": "contraseña_segura"
  }
}
```

## Configuración Avanzada

### Ajustes de Autenticación

Configura las opciones de autenticación en `config/auth.json`:

```json
{
  "auth": {
    "sessionTimeout": 3600,
    "tokenExpiry": 86400,
    "requireEmailVerification": true,
    "allowRegistration": true
  }
}
```

### Configuración de Correo Electrónico

Configura los servicios de correo en `config/email.json`:

```json
{
  "email": {
    "provider": "smtp",
    "host": "smtp.gmail.com",
    "port": 587,
    "secure": true,
    "auth": {
      "user": "tu-correo@gmail.com",
      "pass": "tu-contraseña-app"
    }
  }
}
```

## Variables de Entorno

Puedes sobrescribir cualquier configuración usando variables de entorno:

- `APP_PORT`: Sobrescribe el puerto predeterminado
- `APP_ENV`: Establece el entorno (development, staging, production)
- `DB_HOST`: Host de la base de datos
- `DB_USER`: Usuario de la base de datos
- `DB_PASS`: Contraseña de la base de datos

## Mejores Prácticas de Configuración

1. **Nunca subas datos sensibles**: Usa variables de entorno para contraseñas y claves API
2. **Usa diferentes configuraciones para diferentes entornos**: Mantén configuraciones separadas para desarrollo, staging y producción
3. **Documenta tus configuraciones**: Agrega comentarios para explicar ajustes no obvios
4. **Valida las configuraciones**: Usa el validador integrado: `npm run validate-config`

## Aplicar Cambios de Configuración

Después de hacer cambios de configuración:

1. Detén la aplicación
2. Ejecuta `npm run build` para reconstruir con las nuevas configuraciones
3. Inicia la aplicación con `npm start`

## Solución de Problemas de Configuración

Si encuentras problemas de configuración:

1. Revisa los logs en `logs/app.log`
2. Verifica la sintaxis JSON en todos los archivos de configuración
3. Asegúrate de que las variables de entorno estén configuradas correctamente
4. Ejecuta `npm run debug-config` para ver la configuración combinada

## Próximos Pasos

- Revisa la [Documentación API](/es/docs/api/) para integrar con servicios externos
- Consulta los [Tutoriales](/es/docs/tutorials/) para escenarios comunes de configuración