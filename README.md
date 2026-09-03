# Transportes Fénix

Aplicación independiente de Tours Alvin.

- Supabase independiente: proyecto `Transportes Fenix`.
- Dominio de producción: `https://transportes-fenix.vercel.app`.
- Registro de cliente: nombre(s), apellido(s), teléfono/WhatsApp, correo, contraseña y confirmación.
- El perfil `cliente` se crea automáticamente en Supabase mediante trigger al registrarse.
- Cotizaciones, flota, promociones, mensajes y niveles de usuario viven en la base independiente de Fénix.

Para correos de confirmación, en Supabase Authentication > URL Configuration debe estar configurado el Site URL `https://transportes-fenix.vercel.app` y agregado el redirect permitido `https://transportes-fenix.vercel.app/**`.
