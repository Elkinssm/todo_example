# Template Miniprograma - Arquitectura MVVM

![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-80%25-brightgreen)
![Architecture](https://img.shields.io/badge/architecture-MVVM-blue)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

> Un template completo de miniprograma desarrollado desde cero siguiendo las mejores prácticas de arquitectura MVVM, con integración a la API de Rick and Morty. Perfecto para equipos que quieren aprender desarrollo de miniprogramas con una base sólida.

## ¿Qué es este Proyecto?

Este es un **template base de miniprograma** que implementa la **arquitectura MVVM** (Model-View-ViewModel) de manera clara y escalable. Consume la API de Rick and Morty para mostrar personajes, pero está diseñado para que puedas adaptarlo fácilmente a cualquier otra API o funcionalidad.

### Características Principales

- ️ **Arquitectura MVVM** implementada desde cero con separación clara de responsabilidades
-  **Integración con API externa** (Rick and Morty) con manejo de errores robusto
- **Sistema de cache local** para mejor rendimiento y funcionamiento offline
- **Testing completo** con Jest y cobertura del 80%
-  **UI responsive** y moderna con estilos CSS optimizados
-  **Herramientas de desarrollo** configuradas (ESLint, Stylelint, JSDoc)
-  **Documentación completa** con comentarios JSDoc detallados
- **Escalable** para agregar nuevas funcionalidades fácilmente

##  Arquitectura del Proyecto

###  ¿Por qué MVVM?

> _"Imagina que estamos construyendo una casa. No queremos que todo esté en una sola habitación, ¿verdad? Queremos separar la cocina, el comedor y el dormitorio. En desarrollo, esto se llama 'Separación de Responsabilidades'."_

**Beneficios de MVVM:**

-  **Mantenible**: Cada parte tiene su trabajo específico
-  **Testeable**: Podemos probar cada capa por separado
-  **Escalable**: Fácil agregar nuevas funcionalidades
-  **Reutilizable**: El mismo patrón para diferentes features

###  Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                    USUARIO                                 │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                        VIEW                                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   home.axml    │  │ character.axml  │  │ webview.axml│ │
│  │   home.js      │  │ character.js    │  │ webview.js  │ │
│  │   home.acss    │  │ character.acss  │  │ webview.acss│ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     VIEWMODEL                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              appViewModel.js                            │ │
│  │  • startGetCharacters()                                │ │
│  │  • getCharacterById()                                  │ │
│  │  • getSystemInfo()                                     │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                       MODEL                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Repository   │  │   DataSource    │  │    Source   │ │
│  │ AppRepository  │  │AppDataSource    │  │  AppRemote  │ │
│  │                │  │Remote/Local     │  │             │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                     EXTERNAL                                │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Rick and Morty API                        │ │
│  │              https://rickandmortyapi.com/api/          │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

###  Organización de Carpetas

```
 template-project/
├──  ENTRADA PRINCIPAL
│   ├── 📄 app.js          ← "Puerta principal de la app"
│   ├── 📄 app.json        ← "Plano de la casa"
│   └── 📄 app.acss        ← "Estilo general"
│
├── 🏠 main/               ← "Casa principal"
│   ├── 📊 data/           ← "Sótano - Donde están los datos"
│   │   ├──  atributes/  ← "Cajones organizados"
│   │   │   └── 🎯 app/    ← "Cajón de la aplicación"
│   │   │       ├──  dataSource/    ← "Proveedores de datos"
│   │   │       ├── 🏷️ entities/      ← "Modelos de datos"
│   │   │       ├──  repository/    ← "Organizador principal"
│   │   │       └──  source/        ← "Fuentes de datos"
│   │   └── ⚙️ config/     ← "Configuraciones"
│   │       ├── 🏠 local/  ← "Configuración de la casa"
│   │       └── 🌐 remote/ ← "Configuración del exterior"
│   │
│   ├── 🧠 domain/         ← "Piso medio - Lógica de negocio"
│   │   └── 📄 appViewModel.js ← "Cerebro de la aplicación"
│   │
│   └── 🎨 ui/             ← "Piso superior - Interfaz"
│       ├── 🖼️ assets/     ← "Decoraciones"
│       ├── 📱 pages/      ← "Habitaciones"
│       │   ├──  home/   ← "Sala de estar"
│       │   ├──  character/ ← "Dormitorio"
│       │   └── 🌐 webview/   ← "Terraza"
│       └──  styles/     ← "Estilos de la casa"
│
├── 🧪 test/               ← "Laboratorio de pruebas"
└── 📚 docs/               ← "Manual de la casa"
```

<code_block_to_apply_changes_from>

```
1. 🖱️ Usuario toca la pantalla
                  ↓
2.  home.js detecta el toque
                  ↓
3. 🧠 Llama a appViewModel.startGetCharacters()
                  ↓
4. 📊 appViewModel pide datos al AppRepository
                  ↓
5. 🏪 AppRepository decide: ¿cache o API?
                  ↓
6. 🌐 Si no hay cache, AppDataSourceRemote hace la petición
                  ↓
7. 📡 AppRemote hace HTTP a Rick and Morty API
                  ↓
8.  Los datos regresan por el mismo camino
                  ↓
9. 🎨 home.js actualiza la interfaz
                  ↓
10. 👀 Usuario ve los personajes en pantalla
```

##  Cómo Empezar el Desarrollo

### Plan de Desarrollo por Fases

### FASE 1: Entender la Estructura 
```bash
# 1. Clonar el proyecto
git clone [URL_DEL_PROYECTO]
cd template-project

# 2. Instalar dependencias
npm install

# 3. Ejecutar pruebas para verificar que todo funciona
npm test

# 4. Abrir en el IDE y explorar la estructura
```

### FASE 2: Modificar la Página Principal 

```bash
# 1. Modificar home.axml para cambiar la interfaz
# 2. Modificar home.js para cambiar la lógica
# 3. Modificar home.acss para cambiar los estilos
# 4. Ejecutar npm test para verificar que no rompimos nada
```

### FASE 3: Agregar Nueva Funcionalidad 

```bash
# 1. Crear nueva función en appViewModel.js
# 2. Agregar método en AppRepository.js
# 3. Crear nueva página en ui/pages/
# 4. Escribir pruebas para la nueva funcionalidad
```

## 🛠️ Scripts Disponibles

| Comando               | Descripción                     | ¿Cuándo usarlo?               |
| --------------------- | ------------------------------- | ----------------------------- |
| `npm test`            | Ejecuta todas las pruebas       |  **Después de cada cambio** |
| `npm run test:watch`  | Ejecuta pruebas en modo watch   | Durante desarrollo            |
| `npm run lint`        | Verifica calidad del código     |  **Antes de hacer commit**  |
| `npm run lint:styles` | Verifica calidad de los estilos |  Al modificar CSS           |
| `npm run doc`         | Genera documentación            |  Cuando quieras documentar  |
| `npm run prepare`     | Instala hooks de git (husky)    |  Primera vez                |

##  Funcionalidades

### Páginas Principales

####  **Home** (`/main/ui/pages/home/`)

- Lista de personajes de Rick and Morty
- Información básica: nombre, estado, especie, imagen
- Navegación a otras páginas
- Sistema de cache local para mejor rendimiento

####  **Character** (`/main/ui/pages/character/`)

- Detalles completos de personajes individuales
- Información extendida del personaje
- Navegación de regreso

####  **Webview** (`/main/ui/pages/webview/`)

- Página que puede mostrar contenido web
- Integración con sitios externos

### Características Técnicas

- **API Integration**: Consumo de la API de Rick and Morty
- **Local Storage**: Cache de datos para funcionamiento offline
- **Error Handling**: Manejo robusto de errores y estados de carga
- **Responsive Design**: Interfaz adaptativa para diferentes dispositivos
- **Performance**: Optimizaciones de rendimiento y carga lazy

##  API y Servicios

### Rick and Morty API

El proyecto consume la [API pública de Rick and Morty](https://rickandmortyapi.com/) para obtener información de personajes.

**Endpoints utilizados:**

- `GET /character` - Lista de personajes
- `GET /character/{id}` - Personaje específico por ID

**Ejemplo de respuesta:**

```json
{
  "id": 1,
  "name": "Rick Sanchez",
  "status": "Alive",
  "species": "Human",
  "type": "",
  "gender": "Male",
  "origin": {
    "name": "Earth (C-137)",
    "url": "https://rickandmortyapi.com/api/location/1"
  },
  "location": {
    "name": "Earth (Replacement Dimension)",
    "url": "https://rickandmortyapi.com/api/location/20"
  },
  "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  "episode": ["https://rickandmortyapi.com/api/episode/1"],
  "url": "https://rickandmortyapi.com/api/character/1",
  "created": "2017-11-04T18:50:21.651Z"
}
```

## Testing

### Cobertura de Pruebas

El proyecto incluye un conjunto completo de pruebas unitarias con **Jest**:

- **Cobertura objetivo**: 80% mínimo
- **Entorno**: Node.js
- **Reportes**: HTML, LCOV, Cobertura

### Ejecutar Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Ejecutar pruebas con reporte detallado
npm run test -- --coverage --verbose
```

### Estructura de Pruebas

```
📁 test/
├── 📄 appViewModel.test.js      # Pruebas del ViewModel principal
├──  repository.test.js        # Pruebas del repositorio
├──  dataSource.test.js        # Pruebas de fuentes de datos
└── 📄 setup.js                  # Configuración de pruebas
```

##  Herramientas de Desarrollo

### Linting y Formateo

- **ESLint**: Linting de JavaScript
- **Stylelint**: Linting de estilos CSS
- **Prettier**: Formateo automático de código

### Git Hooks

- **Husky**: Hooks de git automatizados
- **lint-staged**: Linting solo de archivos modificados
- **commitlint**: Validación de mensajes de commit

### Análisis de Código

- **Jest**: Framework de pruebas
- **Coverage**: Reportes de cobertura de código

##  Despliegue

### Preparación para Producción

1. **Verificar calidad del código**

```bash
npm run lint
npm run test
```

2. **Generar documentación**

```bash
npm run doc
```

### Subir a la Plataforma

1. Abrir tu plataforma de desarrollo de miniprogramas
2. Seleccionar "Upload Version"
4. Confirmar la subida

##  Ejercicios Prácticos para el Equipo

###  Ejercicio 1: Cambiar el Color del Botón

```bash
# 1. Abrir home.acss
# 2. Cambiar el color del botón de azul a verde
# 3. Ver el cambio en el IDE
# 4. Ejecutar npm test para verificar
```

### Ejercicio 2: Agregar Nuevo Campo

```bash
# 1. Abrir home.axml
# 2. Agregar el campo "Género" del personaje
# 3. Verificar que se muestra correctamente
```

### Ejercicio 3: Crear Nueva Función

```bash
# 1. Abrir appViewModel.js
# 2. Agregar función getCharacterCount()
# 3. Escribir prueba en test/
# 4. Ejecutar npm test
```

## Guías de Documentación

### JSDoc

El proyecto utiliza **JSDoc** para generar documentación automática del código:

```bash
npm run doc
```

La documentación se genera en la carpeta `docs/` y incluye:

- Documentación de todas las funciones y clases
- Ejemplos de uso
- Diagramas de arquitectura
- Guías de desarrollo

### Comentarios en el Código

Todos los archivos JavaScript incluyen comentarios JSDoc detallados:

```javascript
/**
 * Obtiene personajes desde la API de Rick and Morty
 * @param {string} path - Ruta de la API
 * @returns {Promise<Object>} - Datos de los personajes
 * @throws {Error} - Si hay un error en la petición HTTP
 * @example
 * const characters = await getCharacters('character');
 * console.log(characters.results);
 */
async function getCharacters(path) {
  // Implementación...
}
```

##  Debugging en Miniprogramas

### Console Logs

```javascript
// En cualquier archivo .js
console.log("Debug:", variable);
console.error("Error:", error);
console.warn("Advertencia:", warning);

// En la consola del IDE verás estos mensajes
```

### Herramientas de Desarrollo

- **Miniprogram IDE**: Consola integrada y debugging
- **Chrome DevTools**: Para desarrollo web
- **Postman**: Para probar APIs

## Contribuir

### Cómo Contribuir

1. **Fork** el proyecto
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### Estándares de Código

- Seguir las convenciones de ESLint configuradas
- Escribir pruebas para nuevas funcionalidades
- Mantener cobertura de código al 80% mínimo
- Documentar nuevas funciones con JSDoc

##Reportar Bugs

Si encuentras un bug, por favor:

1. **Buscar** en los issues existentes
2. **Crear** un nuevo issue con:
   - Descripción detallada del problema
   - Pasos para reproducir
   - Comportamiento esperado vs. actual
   - Información del dispositivo/plataforma


##  Contacto

- **Autor**: [Elkin Silva Manrique]
- **Email**: [elkin.silva@claro.com.co]
- **GitHub**: [Elkinssm](https://github.com/Elkinssm)
- **Proyecto**: [https://github.com/Elkinssm/template-project](https://github.com/Elkinssm/template-project)

##  Historial de Versiones

- ✅ Implementación inicial del miniprograma
- ✅ Arquitectura MVVM completa
- ✅ Integración con API de Rick and Morty
- ✅ Sistema de testing configurado
- ✅ Herramientas de desarrollo implementadas

---

##  Consejos para el Equipo

###  Reglas de Oro

1. **Siempre ejecuta `npm test`** después de cada cambio
2. **Un archivo = Una responsabilidad**
3. **Si no sabes dónde poner algo, piensa en MVVM**
4. **Documenta todo con JSDoc**
5. **Haz commits pequeños y frecuentes**

### Señales de Alerta

- ❌ Archivos de más de 100 líneas
- ❌ Funciones que hacen más de una cosa
- ❌ Pruebas que no pasan
- ❌ Código sin comentarios

### Recursos de Aprendizaje

- **Documentación Oficial**: [Miniprogramas Claro](https://miniprogram.alipay.com/docs/)
- **API Rick and Morty**: [rickandmortyapi.com](https://rickandmortyapi.com/)
- **Jest Testing**: [jestjs.io](https://jestjs.io/)

---

Este README incluye:

1. **Explicación clara** de la arquitectura MVVM con analogías
2. **Diagramas visuales** del flujo de datos
3. **Estructura de carpetas** explicada con emojis y metáforas
4. **Explicación detallada** de cada archivo y su función
5. **Plan de desarrollo** paso a paso por fases
6. **Scripts disponibles** con explicaciones de cuándo usarlos
7. **Ejercicios prácticos** para que el equipo aprenda
8. **Consejos y reglas** para el desarrollo
9. **Recursos de aprendizaje** y documentación
10. **Guías de contribución** claras

¿Te gustaría que ajuste alguna sección específica o agregue información adicional?

##  Explicación de Cada Archivo

###  ARCHIVOS DE ENTRADA

#### **`app.js` - El Portero**
```javascript
App({
  async onLaunch() {
    console.log('¡La app se está abriendo!')
    // Aquí iniciamos todo lo necesario
  }
})
````

**¿Qué hace?** Es el primer archivo que se ejecuta cuando la app arranca.

#### **`app.json` - El Plano de la Casa**

```json
{
  "pages": [
    "main/ui/pages/home/home", // Página principal
    "main/ui/pages/character/character", // Página de personajes
    "main/ui/pages/webview/webview" // Página web
  ]
}
```

**¿Qué hace?** Le dice a la app qué páginas tiene y cuál es la principal.

### CARPETA MAIN

#### **DATA - El Sótano de Datos**

**`AppRepository.js` - El Organizador Principal**

```javascript
class AppRepository {
  async getCharacters(path) {
    // Decide si obtener datos del cache o de la API
    const cached = this.getFromCache();
    if (cached) return cached;

    return await this.getFromAPI(path);
  }
}
```

**¿Qué hace?** Es como un bibliotecario que decide de dónde obtener la información.

**`AppDataSourceRemote.js` - El Mensajero Exterior**

```javascript
class AppDataSourceRemote {
  async getCharacters(path) {
    return await AppRemote.getCharacters(path);
  }
}
```

**¿Qué hace?** Se comunica con APIs externas (como Rick and Morty).

**`AppRemote.js` - El Cartero**

```javascript
async function getCharacters(path) {
  return await request({ path });
}
```

**¿Qué hace?** Hace las peticiones HTTP reales a la API.

**`apiConfigs.js` - La Dirección**

```javascript
export const BASEURL = "https://rickandmortyapi.com/api/";
```

**¿Qué hace?** Contiene las URLs y configuraciones de las APIs.

#### **DOMAIN - El Cerebro**

**`appViewModel.js` - El Coordinador**

```javascript
async function startGetCharacters(path) {
  const appRepository = new AppRepository();
  const data = await appRepository.getCharacters(path);
  return data;
}
```

**¿Qué hace?** Conecta la interfaz (View) con los datos (Model).

#### **UI - La Fachada**

**`home.js` - El Camarero**

```javascript
Page({
  data: { characters: [] },
  async onLoad() {
    const data = await appViewModel.startGetCharacters("character");
    this.setData({ characters: data.results });
  },
});
```

**¿Qué hace?** Maneja la lógica de la página y los datos que se muestran.

**`home.axml` - La Mesa**

```xml
<view a:for="{{ characters }}">
  <text>{{item.name}}</text>
  <image src="{{item.image}}" />
</view>
```

**¿Qué hace?** Define cómo se ve la página (HTML del miniprograma).

**`home.acss` - La Decoración**

```css
.character-card {
  background: white;
  border-radius: 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}
```

**¿Qué hace?** Define los estilos y la apariencia visual.



