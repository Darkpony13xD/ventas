# DarkPony · Streaming & IPTV

Tienda web creada con React 19, TypeScript, Vite 7 y Tailwind CSS 4.

## Desarrollo local

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
npm run preview
```

Netlify está configurado mediante `netlify.toml`: usa Node 22, ejecuta `npm run build` y publica `dist`. Conecta el repositorio de GitHub en Netlify y cada commit en `main` se desplegará automáticamente.

## Personalizar la tienda

- Productos, precios y duración: `src/data/products.ts`.
- Número de WhatsApp: `WHATSAPP_NUMBER` en `src/utils/store.ts` (código de país incluido).
- Colores, composición y ajustes para celular: `src/index.css`.
- Textos y secciones: `src/App.tsx`.

El carrito se guarda en el navegador y recupera los precios del catálogo actual. La tienda permite buscar, filtrar por categoría, ordenar por precio y modificar cantidades. Al continuar, abre WhatsApp con el pedido y total; la disponibilidad y el pago se confirman por ese medio.

## Publicar en Netlify

Si el repositorio ya está conectado a Netlify, haz commit y push a la rama de producción. `netlify.toml` establece la compilación y carpeta de publicación automáticamente. El commit local por sí solo no publica: debe llegar a GitHub. No hacen falta claves ni variables de entorno para esta tienda.

La compilación comprueba TypeScript antes de generar el sitio. En Windows puedes usar `npm.cmd` desde PowerShell si este bloquea `npm.ps1`.
