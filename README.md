# 📦 beonboard

beonboard es una librería de onboarding para equipos de desarrollo, 
diseñada para integrarse directamente dentro del mismo código del proyecto. 
Su objetivo es facilitar la incorporación de nuevos miembros al equipo, 
permitiéndoles aprender el stack, los procesos desde adentro, de forma accesible
y siempre actualizada.

el onboarding deja de ser un documento externo olvidado, y pasa a ser parte viva del código que todos pueden consultar y actualizar fácilmente.

🚀 Características
- Onboarding integrado al proyecto
- Reutilizable y accesible en cualquier momento
- Estructura clara, fácil de mantener
- Información clave del proyecto centralizada
- Reduce el tiempo de adaptación de nuevos miembros
- evita documentación desactualizada o dispersa

# Instalación

``npm install beonboard --save-dev``

## 📝 Directivas

Agregar descripciones dentro de tu código usando directivas especiales que te permiten enriquecer el onboarding de los nuevos miembros. Estas directivas son fáciles de utilizar y se agregan directamente en el código fuente.

### **`// onboarding-file`**
Agrega una descripción al archivo para proporcionar un contexto general sobre su propósito y funcionamiento.

```js
// onboarding-file Este archivo contiene la lógica principal de autenticación para el sistema.
```

### **`// onboarding-next-line`**
Agrega una descripción a la línea siguiente de código. Es útil cuando deseas explicar una parte específica del código de forma detallada.

```js
// onboarding-next-line Esta línea valida si el usuario tiene permisos para acceder a la página.
const hasPermission = checkUserPermissions(user);
```

## 🚀 Uso

### onboarding completo 
ejecutar ``npx beonboard`` o 
``npx onboarding``

```bash
----------------------------------------------------------------------------------------------------
beonboard 1.0.1
----------------------------------------------------------------------------------------------------
├── bin/
│   └── cli.js
│       │ punto inicial de entrada del ejecutable
│
└── src/
    ├── commands/
    │   └── onboarding.js
    │       │ acá se hace toda la magia
    │       │
    │       │   8│ comando principal cli
    │       │   9│ export default function onboarding(name, options, command) {
    │       │  10│ ...
    │
    ├── commons/
    │   ├── constants.js
    │   │   │ contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes
    │   │   │
    │   │   │   3│ listado de directorios que no se analizan
    │   │   │   4│ export const IGNORED_DIRS_PATTERNS = [
    │   │   │   5│ ...
    │   │   │  10│ extensiones de archivos que analiza en busca de directivas
    │   │   │  11│ export const INCLUDED_FILES_PATTERNS = [
    │   │   │  12│ ...
    │   │   │  17│ constantes de directivas que se buscan para armar el tree
    │   │   │  18│ export const DIRECTIVE_FILE = '// onboarding-file'
    │   │   │  19│ ...
    │   │
    │   └── output.js
    │       │ helper para formateo de salidas en consola
    │       │
    │       │  13│ formatea el arbol
    │       │  14│ export function treeDefault(nodes, prefix = '', isLast = true) {
    │       │  15│ ...
    │
```

### onboarding solo archivos sin lineas de código 
ejecutar ``npx onboarding --files``

```bash
----------------------------------------------------------------------------------------------------
beonboard 1.0.1
----------------------------------------------------------------------------------------------------
├── bin/
│   └── cli.js
│       │ punto inicial de entrada del ejecutable
│
└── src/
    ├── commands/
    │   └── onboarding.js
    │       │ acá se hace toda la magia
    │
    ├── commons/
    │   ├── constants.js
    │   │   │ contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes contiene constantes
    │   │
    │   └── output.js
    │       │ helper para formateo de salidas en consola
    │
    ├── controllers/
    │   ├── file-system.js
    │   │   │ lectura de archivos
    │   │   │ siguente texto para testear multiples lineas
    │   │   │ otra linea
    │   │
    │   └── text-analysis.js
    │       │ aqui se analizan las directivas en el archivo
    │
    └── index.js
        │ Contiene lo referente al manejo por comando
```

### onboarding compacto en una sola linea
ejecutar ``npx onboarding --files --oneline``

```bash
----------------------------------------------------------------------------------------------------
beonboard 1.0.1
----------------------------------------------------------------------------------------------------
├── bin/
│   └── cli.js                  # punto inicial de entrada del ejecutable
└── src/
    ├── commands/
    │   └── onboarding.js       # acá se hace toda la magia
    ├── commons/
    │   ├── constants.js        # contiene constantes contiene constantes contiene constantes contiene ...
    │   └── output.js           # helper para formateo de salidas en consola
    ├── controllers/
    │   ├── file-system.js      # lectura de archivos siguente texto para testear multiples lineas otr ...
    │   └── text-analysis.js    # aqui se analizan las directivas en el archivo
    └── index.js                # Contiene lo referente al manejo por comando
----------------------------------------------------------------------------------------------------
```
