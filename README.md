# PWA Control de Gasolina — Entrega en 1 minuto

## Qué es
Mini‑app web (instalable como app) para reducir **L/pedido** sin romper el **P90 ETA ≤ 35’**. Funciona offline.

## Archivos
- `index.html` — La app (un solo archivo).
- `sw.js` — Service Worker para modo offline.
- *(Manifest embebido en `index.html`)*

## Cómo desplegar (1 minuto)
1) **Sube ambos archivos** a una carpeta pública **HTTPS** (o usa `localhost`).
   - Rápido: GitHub Pages / Netlify / Vercel / un hosting con HTTPS.
   - Local: `python -m http.server 8000` y abre `http://localhost:8000`.
2) Abre `index.html` en el navegador del móvil/PC.
3) Pulsa **📶 Offline** para registrar `sw.js` (Service Worker).
4) Menú del navegador → **Instalar app** (añadir a la pantalla de inicio).

## Cómo se usa (flujo 0→100)
1) **Configura riders** y su **baseline L/pedido** (Config).
2) **Registra turnos** (pedidos, litros, adopción, P90, €/L) (Registro).
3) **Calcula bono 50/50** (Bono) y comparte recibo por WhatsApp.
4) **Semáforo** decide: Verde (escalar) · Ámbar (extender 7d) · Rojo (parar).

## Privacidad / Datos
- Todo se guarda en **localStorage** del dispositivo del gerente.
- El Service Worker solo cachea archivos para funcionar **offline**.

## Requisitos
- Navegador moderno con soporte PWA (Chrome/Edge/Firefox/Safari reciente).
- **HTTPS o localhost** para activar el Service Worker.
