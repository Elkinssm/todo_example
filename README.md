# Template base miniprogramas

Este es un proyecto base de una aplicación realizada en miniprogramas. La aplicación sigue una arquitectura MVVM (Model-View-ViewModel).

## Arquitectura del Proyecto

La arquitectura del proyecto está basada en el patrón MVVM (Model-View-ViewModel), que separa la lógica de negocio, la lógica de presentación y la interfaz de usuario en diferentes capas. A continuación se describe cada una de estas capas y su función en el proyecto.

### Model

La capa de Model se encarga de gestionar los datos de la aplicación. Esta capa incluye las fuentes de datos locales y remotas, así como los repositorios que actúan como intermediarios entre las fuentes de datos y los ViewModels.

- **Data Sources**: Se encargan de obtener los datos de diferentes fuentes, como APIs remotas o almacenamiento local.
  - [AppDataSourceRemote](main/data/atributes/app/dataSource/AppDataSourceRemote.js): Fuente de datos remota.
  - [AppDataSourceLocal](main/data/atributes/app/dataSource/appDataSourceLocal.js): Fuente de datos local.
- **Repositories**: Proveen una interfaz única para acceder a los datos desde los ViewModels.
  - [AppRepository](main/data/atributes/app/repository/AppRepository.js): Repositorio que combina las fuentes de datos remotas y locales.

### ViewModel

La capa de ViewModel actúa como un intermediario entre la capa de Model y la capa de View. Los ViewModels contienen la lógica de presentación y gestionan los datos que se mostrarán en la interfaz de usuario.

- [appViewModel](main/domain/appViewModel.js): ViewModel principal que gestiona la lógica de la aplicación.

```javascript
// filepath: ../template-project/main/domain/appViewModel.js
const AppRepository = require('../data/atributes/app/repository/AppRepository')

async function startGetCharacters(path) {
  const appRepository = new AppRepository()
  const data = await appRepository.getCharacters(path)
  return data
}

module.exports.startGetCharacters = startGetCharacters
```

## Estructura del Proyecto

La estructura del proyecto es la siguiente:



### Archivos Principales

- **app.acss**: Archivo de estilos globales de la aplicación.
- **app.js**: Archivo principal de la aplicación.
- **app.json**: Configuración de la aplicación.
- **commitlint.config.js**: Configuración de reglas para los mensajes de commit.
- **jsdoc.json**: Configuración de JSDoc para la generación de documentación.

### Carpeta `main`

#### Carpeta `data`

- **atributes**: Contiene las fuentes de datos y repositorios para las diferentes entidades de la aplicación.
  - **app**: Fuente de datos y repositorios relacionados con la aplicación.
- **config**: Configuración local y remota de la aplicación.
  - **local**: Configuración local.
  - **remote**: Configuración remota.

#### Carpeta `domain`

Contiene los ViewModels que actúan como una capa intermedia entre la interfaz de usuario y los datos.

- **appViewModel.js**: ViewModel para la aplicación.
- **attemptedViewModel.js**: ViewModel para los intentos de registro.
- **companyViewModel.js**: ViewModel para la empresa.
- **idClaroViewModel.js**: ViewModel para la integración con ID Claro.
- **loginViewModel.js**: ViewModel para el login.
- **navigateViewModel.js**: ViewModel para la navegación.
- **userViewModel.js**: ViewModel para el usuario.
- **utils**: Utilidades y funciones de validación.
  - **hasValue.js**: Función para validar valores no nulos.
  - **validateEmail.js**: Función para validar emails.
  - **validateNames.js**: Función para validar nombres.

#### Carpeta `ui`

Contiene los recursos de la interfaz de usuario.

- **assets**: Recursos como íconos e imágenes.
- **pages**: Páginas de la aplicación.
  - **home**: Página de inicio.
- **styles**: Estilos de la aplicación.
  - **index.acss**: Archivo de estilos principal.

### Carpeta `test`

Contiene los archivos de pruebas unitarias.

- **homeViewModel.test.js**: Pruebas para el HomeViewModel.
- **userViewModel.test.js**: Pruebas para el UserViewModel.

### Otros Archivos

- **package.json**: Archivo de configuración de npm que incluye scripts y dependencias del proyecto.
- **README.md**: Documentación general del proyecto.

## Scripts de npm

- `doc`: Genera la documentación usando JSDoc.
- `prepare`: Instala husky para los hooks de git.
- `phoenix`: Elimina y reinstala los módulos de node.
- `lint`: Ejecuta eslint para verificar el código.
- `lint:styles`: Ejecuta stylelint para verificar los estilos.
- `test`: Ejecuta las pruebas unitarias con cobertura.
- `test-watch`: Ejecuta las pruebas unitarias en modo watch.
- `test:stage`: Ejecuta las pruebas unitarias en el entorno de stage.

## Dependencias

- **crypto-js**: Librería para criptografía en JavaScript.

## Dependencias de Desarrollo

- **@babel/preset-env**: Preset de Babel para compilar JavaScript moderno.
- **@commitlint/cli**: CLI para commitlint.
- **@commitlint/config-conventional**: Configuración convencional para commitlint.
- **dependency-cruiser**: Herramienta para analizar dependencias.
- **eslint**: Linter para JavaScript.
- **eslint-config-standard**: Configuración estándar para eslint.
- **eslint-plugin-import**: Plugin de eslint para importaciones.
- **eslint-plugin-n**: Plugin de eslint para Node.js.
- **eslint-plugin-promise**: Plugin de eslint para promesas.
- **husky**: Herramienta para gestionar hooks de git.
- **jest**: Framework de pruebas unitarias.
- **jest-junit**: Reporter de JUnit para Jest.
- **jest-sonar-reporter**: Reporter de Sonar para Jest.
- **jsdoc**: Herramienta para generar documentación a partir de comentarios en el código.
- **jsdoc-tsimport-plugin**: Plugin de JSDoc para importar tipos.
- **lint-staged**: Herramienta para ejecutar linters en archivos staged.
- **rimraf**: Herramienta para eliminar carpetas.
- **standard**: Linter estándar para JavaScript.
- **stylelint**: Linter para estilos.
- **stylelint-config-standard**: Configuración estándar para stylelint.

## Configuración de Jest

- **coverageThreshold**: Umbral de cobertura de código.
- **coverageReporters**: Reporters de cobertura.
- **collectCoverageFrom**: Archivos de los que se recolectará la cobertura.
- **coverageDirectory**: Directorio donde se guardará la cobertura.
- **testEnvironment**: Entorno de pruebas.
- **reporters**: Reporters de pruebas.
- **testResultsProcessor**: Procesador de resultados de pruebas.
- **testTimeout**: Tiempo de espera para las pruebas.

## Configuración de Jest-JUnit

- **outputDirectory**: Directorio de salida para los reportes.
- **outputName**: Nombre del archivo de salida.
- **usePathForSuiteName**: Usar la ruta para el nombre del suite.

## Configuración de Jest-Sonar

- **reportPath**: Ruta del reporte.
- **reportFile**: Archivo del reporte.
- **indent**: Indentación del reporte.
