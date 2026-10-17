# Requerimientos y Gantt · Makro Chincha

## Datos compartidos en la nube

Los checks de RF/RNF, Gantt, ceremonias, tareas por rol, asistencias, observaciones del Product Owner y evaluación docente del Scrum Master se leen y guardan en Cloud Firestore. Los cambios aparecen en tiempo real en los navegadores y dispositivos conectados al mismo proyecto Firebase. Los Developers ven las observaciones asignadas a su rol y editan sus respuestas; el Scrum Master consulta el seguimiento; solo el Product Owner puede eliminar observaciones individuales o, en lote, las ya resueltas. La hora de los cambios se registra en Firestore; la página la muestra en hora de Lima.

La configuración del cliente está en `assets/js/firebase-config.js` y apunta al proyecto `proyectoscrum-ffd53`. Para que la sincronización funcione:

1. En Firebase Console, habilita **Authentication → Sign-in method → Anonymous**.
2. Crea/habilita Cloud Firestore en ese proyecto.
3. Publica las reglas de `firestore.rules` en el proyecto:

   ```sh
   firebase deploy --only firestore:rules --project proyectoscrum-ffd53
   ```

4. Abre la página con conexión a Internet e inicia sesión con el integrante correspondiente. Si la página indica un error de Firebase, no se guardará el cambio localmente como si se hubiera sincronizado.

En la primera conexión con las nuevas reglas, el tablero elimina una sola vez todos los documentos de la colección Firestore `marks` para que los checks de requisitos, Gantt, tareas y ceremonias comiencen sin marcas. La migración no lee, modifica ni elimina documentos de `asist`, que conserva las asistencias del calendario. Los checks históricos que existan solo en el `localStorage` de un navegador no se migran automáticamente: su autoría no se puede verificar.

## Seguridad y atribución

El acceso actual usa autenticación anónima y PIN de demostración que está incluido en el código público del sitio. **El nombre y el PIN no comprueban quién es la persona**; cualquier visitante puede leer y modificar los checks del equipo eligiendo un integrante. Las reglas limitan la escritura al proyecto y al formato de datos esperado, pero no hacen confiable la identidad indicada por el cliente. No guardes datos personales, secretos ni uses esta versión como auditoría formal.

Para identificar realmente quién cambió cada check, cada integrante debe tener una cuenta Firebase verificada (por ejemplo, correo institucional) y las reglas deben asociar de forma fija cada cuenta con su rol. Eso requiere recopilar las direcciones institucionales del equipo y habilitar/configurar el proveedor de autenticación correspondiente en Firebase.

## Publicación de la página

El workflow `.github/workflows/pages.yml` publica los archivos estáticos en GitHub Pages al subir cambios a `main`, si está habilitada la opción **Settings → Pages → Source: GitHub Actions**. La URL de este proyecto es `https://pierxz10.github.io/proyectoscrum/`; confirma que el workflow termine correctamente y que Pages esté activado en la configuración del repositorio.

## Estructura

- `Requerimientos y Gantt · Scrum Adaptativo · Makro Chincha.html`: página principal.
- `assets/css/styles.css`: estilos y diseño adaptable.
- `assets/js/app.js`: tablero, checks, asistencia y sincronización en tiempo real.
- `assets/images/makro-lost-property-flow.svg`: ilustración local del flujo de objetos perdidos.
- `assets/js/firebase-config.js`: configuración del proyecto Firebase.
- `firestore.rules`: permisos de Firestore.

## Seguimiento del proyecto

Los requisitos funcionales y no funcionales reflejan el Word: RF-01 a RF-32 y RNF-01 a RNF-11. La limpieza única inicial borra todas las marcas de avance en `marks` (requisitos, Gantt, tareas y ceremonias), pero no borra asistencias en `asist`. El Gantt contiene exactamente 25 actividades: 24 hasta la semana 14 y la entrega final de la semana 15, a cargo de María, Product Owner.

Antes de habilitar esta versión, publica las nuevas reglas de Firestore:

```sh
firebase deploy --only firestore:rules --project proyectoscrum-ffd53
```

El Gantt distribuye el trabajo en cinco sprints de producto, precedidos por la planificación inicial. Permite buscar, filtrar por rol y estado, imprimir el cronograma o descargar como CSV las actividades visibles. El equipo Front End se enfoca en la interfaz gráfica y UI/UX del sistema web. El diagrama del flujo operativo incluye una ilustración SVG local, sin dependencias de imágenes externas.

El formulario de observaciones permite al Product Owner asignar comentarios a Front End o Back End y vincularlos con un RF. El Developer asignado puede tomar la observación, registrar avances, corregir su respuesta incluso después de resolverla y marcarla resuelta; la bandeja muestra el tiempo abierto y destaca las pendientes por más de 24 horas. El Scrum Master tiene una vista de seguimiento. Las reglas de Firestore limitan las respuestas al Developer asignado y la eliminación al Product Owner; el borrado en lote se limita a observaciones resueltas y requiere confirmación. Los cambios se reflejan en tiempo real. La evaluación docente aparece únicamente al rol Scrum Master; sus permisos de lectura y escritura también están restringidos por `firestore.rules`.

Este sitio es el tablero de planificación. La nube guarda checks, asistencias, observaciones y evaluación; no almacena objetos perdidos reales ni implementa aún el sistema web de control descrito por los requerimientos. La selección del integrante sigue siendo de demostración, no una autenticación de identidad verificada.
