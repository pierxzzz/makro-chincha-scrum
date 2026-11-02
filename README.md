# Requerimientos y Gantt · Makro Chincha

## Datos compartidos en la nube

Los checks de RF/RNF, Gantt, ceremonias, tareas por rol, asistencias, observaciones del Product Owner, evaluación docente del Scrum Master y validaciones semanales del stakeholder se leen y guardan en Firebase. Los cambios aparecen en tiempo real en los navegadores y dispositivos conectados al mismo proyecto. Los enlaces HTTPS/HTTP y las validaciones semanales se guardan en Firestore. La subida directa de evidencias Word, Excel y PowerPoint requiere habilitar Cloud Storage en el plan Blaze con una cuenta de facturación; mientras no se configure, la interfaz permite guardar enlaces y muestra este requisito. El apartado semanal solo se muestra al rol Stakeholder · QA y sus datos están limitados por reglas. Los Developers ven las observaciones asignadas a su rol y editan sus respuestas; el Scrum Master consulta el seguimiento; solo el Product Owner puede eliminar observaciones permanentemente. La hora de los cambios se registra en Firestore; la página la muestra en hora de Lima.

La configuración del cliente está en `assets/js/firebase-config.js` y apunta al proyecto `scrumadaptativo`. El proyecto usa Cloud Firestore en la región `northamerica-northeast1`. Para que la sincronización funcione:

1. La autenticación anónima ya está habilitada en **Authentication → Método de acceso**.
2. Las reglas de Firestore ya están desplegadas en el proyecto `scrumadaptativo`. Para volver a publicarlas:

   ```sh
   firebase deploy --only firestore:rules --project scrumadaptativo
   ```

3. Para subir archivos, crea/activa una cuenta de facturación y vincúlala al plan Blaze en Firebase Console → Storage; después crea el bucket y cambia `FIREBASE_STORAGE_READY` a `true` en `assets/js/firebase-config.js`.
4. Abre la página con conexión a Internet e inicia sesión con el integrante correspondiente. Si la página indica un error de Firebase, no se guardará el cambio localmente como si se hubiera sincronizado.

En la primera conexión con las nuevas reglas, el tablero elimina una sola vez únicamente los documentos Gantt (`g0`, `g1`, etc.) de `marks`. Los checks de requerimientos, tareas y ceremonias, y todos los registros de asistencia, se conservan. Los checks históricos que existan solo en el `localStorage` de un navegador no se migran automáticamente: su autoría no se puede verificar.

## Seguridad y atribución

El acceso actual usa autenticación anónima y PIN de demostración que está incluido en el código público del sitio. **El nombre y el PIN no comprueban quién es la persona**; cualquier visitante puede leer y modificar los checks del equipo eligiendo un integrante. Las reglas limitan la escritura al proyecto y al formato de datos esperado, pero no hacen confiable la identidad indicada por el cliente. No guardes datos personales, secretos ni uses esta versión como auditoría formal.

Para identificar realmente quién cambió cada check, cada integrante debe tener una cuenta Firebase verificada (por ejemplo, correo institucional) y las reglas deben asociar de forma fija cada cuenta con su rol. Eso requiere recopilar las direcciones institucionales del equipo y habilitar/configurar el proveedor de autenticación correspondiente en Firebase.

## Publicación de la página

El workflow `.github/workflows/pages.yml` publica los archivos estáticos en GitHub Pages al subir cambios a `main`, si está habilitada la opción **Settings → Pages → Source: GitHub Actions**. La URL de este proyecto es `https://pierxzzz.github.io/makro-chincha-scrum/`; verifica el estado del workflow de publicación en GitHub Actions.

## Estructura

- `Requerimientos y Gantt · Scrum Adaptativo · Makro Chincha.html`: página principal.
- `assets/css/styles.css`: estilos y diseño adaptable.
- `assets/js/app.js`: tablero, checks, asistencia y sincronización en tiempo real.
- `assets/images/makro-lost-property-flow.svg`: ilustración local del flujo de objetos perdidos.
- `assets/js/firebase-config.js`: configuración del proyecto Firebase.
- `firestore.rules`: permisos de Firestore.
- `storage.rules`: permisos de archivos de evidencia cuando Cloud Storage esté habilitado.

## Seguimiento del proyecto

Los requisitos funcionales y no funcionales reflejan el Word: RF-01 a RF-32 y RNF-01 a RNF-11. El Gantt concentra preparación, borradores, prototipos y arquitectura en las semanas 1–10; la semana 10 contempla la migración del entorno de pruebas a Ubuntu en la VPS. Los sprints 1–4 abarcan las semanas 11–14 y completan los RF-01 a RF-32.

Antes de habilitar esta versión, publica las nuevas reglas de Firestore:

```sh
firebase deploy --only firestore:rules --project scrumadaptativo
```

El Gantt permite buscar, filtrar por rol y estado, imprimir el cronograma o descargar como CSV las actividades visibles. La arquitectura prevista usa Spring Boot con Java en backend y Angular con TypeScript en frontend. El equipo Front End se enfoca en la interfaz gráfica y UI/UX.

El formulario de observaciones permite al Product Owner asignar comentarios a Front End o Back End y vincularlos con un RF. El Developer asignado puede tomar la observación, registrar avances, corregir su respuesta incluso después de resolverla y marcarla resuelta; la bandeja muestra el tiempo abierto y destaca las pendientes por más de 24 horas. El Scrum Master tiene una vista de seguimiento. Las reglas de Firestore limitan las respuestas al Developer asignado y la eliminación al Product Owner; el borrado en lote se limita a observaciones resueltas y requiere confirmación. Los cambios se reflejan en tiempo real. La evaluación docente aparece únicamente al rol Scrum Master; sus permisos de lectura y escritura también están restringidos por `firestore.rules`.

Este sitio es el tablero de planificación. Firestore guarda checks, asistencias, observaciones, evaluación y validaciones semanales; la carga directa de archivos sigue pendiente de habilitar facturación para Cloud Storage. El sitio no almacena objetos perdidos reales ni implementa aún el sistema web de control descrito por los requerimientos. La selección del integrante sigue siendo de demostración, no una autenticación de identidad verificada: por ello, el acceso a la vista QA está limitado por rol en reglas, pero no equivale a comprobar la identidad real del stakeholder.
