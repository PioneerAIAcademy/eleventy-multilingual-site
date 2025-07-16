---
layout: layouts/base.njk
title: "Guía de Instalación"
lang: es
slug: "docs/installation"
permalink: /es/docs/installation/
eleventyNavigation:
  key: installation
  parent: docs
  order: 1
---

# Guía de Instalación

Esta guía te llevará a través del proceso de instalación de nuestro software en tu sistema.

## Requisitos del Sistema

Antes de comenzar, asegúrate de que tu sistema cumpla con los siguientes requisitos:

- **Sistema Operativo**: Windows 10+, macOS 10.14+, o Linux (Ubuntu 18.04+)
- **Node.js**: Versión 14.0 o superior
- **Memoria**: Mínimo 4GB de RAM
- **Almacenamiento**: Al menos 500MB de espacio libre en disco

## Pasos de Instalación

### Paso 1: Descargar Node.js

Si no tienes Node.js instalado, descárgalo desde [nodejs.org](https://nodejs.org/).

### Paso 2: Clonar el Repositorio

```bash
git clone https://github.com/yourorg/yourrepo.git
cd yourrepo
```

### Paso 3: Instalar Dependencias

```bash
npm install
```

### Paso 4: Configurar el Entorno

Copia el archivo de entorno de ejemplo y actualízalo con tu configuración:

```bash
cp .env.example .env
```

### Paso 5: Ejecutar la Aplicación

```bash
npm start
```

## Verificación

Para verificar que la instalación fue exitosa:

1. Abre tu navegador en `http://localhost:3000`
2. Deberías ver la página de bienvenida
3. Revisa la consola para cualquier mensaje de error

## Solución de Problemas

### Problemas Comunes

**Problema**: `npm install` falla con errores de permisos
**Solución**: Intenta usar `npm install --force` o verifica tus permisos de npm

**Problema**: El puerto 3000 ya está en uso
**Solución**: Cambia el puerto en tu archivo `.env` o detén el servicio en conflicto

## Próximos Pasos

Ahora que tienes el software instalado, procede a la [Guía de Configuración](/es/docs/configuration/) para personalizar tu instalación.