# Mercado Libre Backend Test

Este repositorio contiene el código fuente para el test práctico de backend para aspirantes a Mercado Libre.

## Tecnologías Utilizadas

- **Servidor**: Node.js con Express y TypeScript
- **Pruebas Unitarias**: Jest, React Testing Library

## Estructura del Proyecto

El backend está diseñado para manejar las solicitudes de la aplicación frontend y comunicarse con la base de datos. Los componentes principales son:

1. **Controladores**: Manejan las solicitudes entrantes y devuelven las respuestas adecuadas.
2. **Modelos**: Definen la estructura de los datos en la base de datos.
3. **Rutas**: Definen los endpoints de la API a los que se pueden hacer solicitudes.

## Rutas de la API

- **Búsqueda**: `/api/items?q=:query`
- **Detalle del Producto**: `/api/items/:id`

## Instrucciones de Instalación

Para instalar y ejecutar este proyecto localmente, sigue estos pasos:

1. Clona el repositorio:

```
git clone [URL_DEL_REPOSITORIO]
```

2. Instala las dependencias:

```
npm install
```

3. Inicia el servidor de desarrollo:

```
npm start
```

## Pruebas Unitarias

Para ejecutar las pruebas unitarias, utiliza el siguiente comando:

```
npm test
```

## Contribuciones

Las contribuciones son bienvenidas. Por favor, envía un pull request o abre un issue para discutir los cambios propuestos.

## Autor

- **Nombre**: Sebastian Mosquera Valencia
