# Requerimientos y Gantt · Makro Chincha

## Datos compartidos en la nube

Los checks de RF/RNF, Gantt, ceremonias, tareas por rol y asistencias existentes se conservan. Las validaciones QA admiten varios registros por semana (1–15), con creación, edición y eliminación por el rol Stakeholder; los demás roles solo pueden leer en tiempo real las pruebas que la Stakeholder marcó como validadas. La Product Owner registra la aceptación de los RF y administra observaciones; cada Developer solo consulta las observaciones asignadas a su rol y actualiza su respuesta. El Scrum Master conserva su sección de evaluación exclusiva y administra el enlace compartido de Drive. La retroalimentación Likert de cinco preguntas se habilita al iniciar la semana 15 y mantiene una respuesta por rol del equipo. Las nuevas funciones usan Firestore; no guardan resultados ficticios si la nube falla.

La configuración del cliente está en `assets/js/firebase-config.js` y apunta al proyecto `scrumadaptativo`. El proyecto usa Cloud Firestore en la región `northamerica-northeast1`. Para que la sincronización funcione:

1. La autenticación anónima ya está habilitada en **Authentication → Método de acceso**.
2. Las reglas actualizadas de `firestore.rules` se publicaron en el proyecto `scrumadaptativo`. Se actualizan permisos de Firestore; no se borran ni modifican documentos existentes.
3. Las validaciones semanales no usan Cloud Storage: la prueba realizada, el resultado y las observaciones se guardan directamente en Firestore. El enlace de Drive se comparte mediante `projectSettings/drive-evidence`; al iniciar como Scrum Master, el enlace antiguo guardado localmente se migra solo si todavía no existe uno en la nube.
4. Abre la página con conexión a Internet e inicia sesión con el integrante correspondiente. Los perfiles de rol se crean como documentos propios de la sesión anónima; las reglas solo aceptan los cinco perfiles definidos y bloquean cambios/eliminaciones de esos perfiles.
5. Si la página indica un error de Firebase, no se guardará el cambio localmente como si se hubiera sincronizado.

La carga inicial no elimina ni restablece marcas del Gantt, RF/RNF, tareas, ceremonias o asistencias. Los checks históricos que existan solo en el `localStorage` de un navegador no se migran automáticamente: su autoría no se puede verificar.

## Seguridad y atribución

El acceso actual usa autenticación anónima y PINs de demostración incluidos en el código público. **El nombre y el PIN no comprueban quién es la persona**; cualquier visitante puede leer y modificar los checks del equipo eligiendo un integrante. No guardes datos personales, secretos ni uses esta versión como auditoría formal.

Para identificar realmente quién cambió cada check, cada integrante debe tener una cuenta Firebase verificada y las reglas deben asociar de forma fija cada cuenta con su rol. Eso requiere habilitar/configurar el proveedor y asignar UIDs confiables. No se debe desplegar esta versión de reglas con el perfil anónimo seleccionable.

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

Los requisitos funcionales y no funcionales reflejan el Word: RF-01 a RF-32 y RNF-01 a RNF-11. El Gantt concentra preparación, borradores, prototipos y arquitectura en las semanas 1–10; la semana 1 incluye entrevistas al personal de Atención al Cliente de Makro, la semana 4 se dedica únicamente a diagramas UML de casos de uso, actividades, clases y estado, y la semana 10 migra datos de prueba y servicios Spring Boot desde Windows 10 a Ubuntu. Los sprints 1–4 abarcan las semanas 11–14 y completan los RF-01 a RF-32; la semana 15 es la entrega final y cualquier integrante del equipo puede marcarla.

El equipo continúa usando los cinco accesos por nombre/PIN existentes. Esos PIN no verifican identidad; el despliegue permite sincronizar datos en Firestore, pero no convierte los roles de demostración en una protección frente a visitantes que suplanten a un integrante.

El Gantt permite buscar, filtrar por rol y estado, imprimir el cronograma o descargar como CSV las actividades visibles. La arquitectura prevista usa Spring Boot con Java en backend y Angular con TypeScript en frontend. El equipo Front End se enfoca en la interfaz gráfica y UI/UX.

La Product Owner puede crear, editar y eliminar observaciones vinculadas a RF y asignadas a un Developer. Cada Developer consulta solo sus propias asignaciones y puede responderlas o resolverlas; Scrum Master y Stakeholder no tienen acceso a ese seguimiento. La Product Owner también puede registrar la aceptación de RF por sprint. La evaluación docente continúa visible únicamente para Scrum Master.

Este sitio es el tablero de planificación; no almacena objetos perdidos reales ni implementa aún el sistema web descrito por los requerimientos. **Riesgo conocido:** la selección de nombre/PIN y el perfil anónimo no verifican identidad. Los roles del cliente no son una barrera de seguridad mientras no se configuren cuentas Firebase Auth verificadas y una asignación confiable por UID/custom claims. Aunque las reglas restringen acciones por rol, el esquema de demostración permite suplantar roles; no lo uses con datos reales.
