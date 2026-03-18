# Real Estate Management Frontend

Este es el proyecto frontend para la gestión de usuarios y ventas de inmuebles, creado con **React**, **Vite** y **Tailwind CSS**.

## Características Implementadas

- **Autenticación Completa**: Vistas de SignIn y Registro según el diseño adjunto.
- **Rutas Protegidas**: Autenticación persistente utilizando \`AuthContext\` y \`localStorage\`.
- **Axios Interceptors**: Configurado para insertar automáticamente el JWT en las llamadas al backend de forma segura.
- **Dashboard y Layout**: Sidebar de navegación idéntica al diseño oscuro profundo (\`#0F172A\`).
- **Gestión de Inmuebles (Real Estate)**: 
  - Tarjetas (Cards) de inmuebles con sombras sutiles y estados visuales (Available / Sold).
  - Filtros dinámicos sin recarga.
  - Componente de modal para Agregar y Editar inmuebles (\`EstateForm\`).
- **Gestión de Usuarios**:
  - Tabla de usuarios (User Management) con estatus y datos de lugar/ventas.
  - Formulario de creación y edición (\`UserForm\`).
- **Performance de UI**:
  - TailwindCSS utilizado para diseño responsivo.
  - \`lucide-react\` para iconos consistentes.
  - Clases utilitarias (\`clsx\`, \`tailwind-merge\`) para componentes escalables.
  - Paleta de colores solicitada inyectada globalmente.

---

## 🛠 Instalación y Ejecución

*Es importante mencionar que los archivos de configuración (`package.json`, `index.html`, `vite.config.js`, etc.) fueron generados siguiendo el estándar de Vite + React debido a la naturaleza full-stack y de red de este entorno automatizado.*

### Paso 1: Instalar Dependencias

Abre tu terminal en la ruta principal del proyecto y ejecuta:

\`\`\`bash
npm install
\`\`\`

*(Nota: Este proyecto trae configuradas todas las dependencias necesarias:* \`react\`, \`react-dom\`, \`react-router-dom\`, \`tailwindcss\`, \`lucide-react\`, \`axios\`, \`clsx\` y \`tailwind-merge\`*).*

### Paso 2: Configurar Endpoint del Backend (Opcional)

Si posees un backend activo (como el desarrollado en \`Node.js\`), asegúrate de revisar el archivo de la API.
Abre el archivo: \`src/services/api.js\` y cambia \`API_URL\` a la ruta correspondiente si es distinta de \`http://localhost:3000/api\`

### Paso 3: Ejecutar Servidor de Desarrollo

Una vez instaladas las dependencias, levanta el proyecto ejecutando:

\`\`\`bash
npm run dev
\`\`\`

Se abrirá el servidor en Vite, típicamente en `http://localhost:5173`. 
Podrás visualizar inmediatamente las pantallas de Login o bien explorar el Dashboard (puedes engañar la autenticación o conectar a tu API).

## Paleta de Colores
- Primario: `#0F172A` (Azul Medianoche)
- Acento: `#10B981` (Verde Esmeralda)
- Fondo: `#F8FAFC` (Gris Ultra-claro)
- Superficies: `#FFFFFF` (Blanco puro)
- Fuente: `Inter`
