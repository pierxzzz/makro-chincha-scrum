const RF=`RF-01 Inicio de sesión|Exigir usuario y contraseña; validar credenciales y cuenta activa; limitar intentos, forzar cambio de contraseña cuando corresponda, emitir tokens y registrar acceso e intentos.
RF-02 Cierre de sesión|Confirmar el cierre, revocar el token de renovación, impedir el acceso posterior y registrar LOGOUT en la bitácora.
RF-03 Recuperación de acceso|Validar el correo sin revelar si existe; emitir contraseña temporal con cambio obligatorio, revocar sesiones y auditar la solicitud.
RF-04 Cambiar contraseña|Exigir contraseña actual y nueva confirmada; aplicar política, guardar solo el hash, forzar el cambio pendiente y auditarlo.
RF-05 Roles y permisos|Asignar un rol por usuario; administrar catálogos únicos de roles y permisos, restringir funciones y datos, y auditar sus cambios.
RF-06 Gestión de usuarios|Crear, consultar, modificar, activar y desactivar usuarios con validaciones y datos únicos; asignar contraseña temporal y conservar registros relacionados.
RF-07 Gestión de categorías|Administrar categorías activas con nombre único; validar longitudes y desactivar lógicamente sin perder su uso histórico.
RF-08 Gestión de lugares|Administrar lugares activos con nombre único; validar longitudes y conservar referencias históricas al desactivarlos.
RF-09 Configuración del sistema|Permitir solo al Administrador gestionar roles, permisos, categorías, lugares y usuarios; auditar cambios y proteger parámetros de seguridad.
RF-10 Registrar objeto perdido|Validar categoría, nombre, descripción, fecha/hora y lugar; guardar opcionalmente foto, código, estado ENCONTRADO, creador y movimiento inicial sin registros parciales.
RF-11 Adjuntar fotografía|Capturar o cargar una foto JPG/JPEG/PNG dentro del tamaño permitido; asociar una por objeto y registrar sus reemplazos.
RF-12 Generar código único|Asignar automáticamente el código ineditable OBJ-AAAA-NNNNNN con correlativo anual atómico y único.
RF-13 Consultar objeto|Mostrar datos, estado, foto y responsables del objeto; excluir bajas lógicas e informar si no existe.
RF-14 Buscar objeto|Buscar por código, nombre, categoría, descripción, fecha, lugar o estado; texto sin distinción de mayúsculas ni tildes.
RF-15 Filtrar objetos|Combinar estado, categoría, lugar y fechas del hallazgo; validar el rango y permitir limpiarlo.
RF-16 Actualizar información del objeto|Editar datos permitidos y foto, sin alterar código ni creador; restringir objetos entregados y registrar actualización.
RF-17 Cambiar estado del objeto|Permitir transiciones válidas entre ENCONTRADO, EN_CUSTODIA, RECLAMADO, VERIFICADO y ENTREGADO; este último es final y todo cambio se registra.
RF-18 Consultar historial del objeto|Mostrar cronológicamente registro, cambios y actualizaciones; historial de solo lectura que se conserva aunque se desactive un usuario.
RF-19 Registrar reclamación|Registrar reclamante y documento para un objeto disponible; impedir reclamos activos duplicados y cambiar el objeto a RECLAMADO.
RF-20 Consultar reclamación|Consultar, buscar y mostrar reclamante, objeto, estado, verificación y entrega; proteger datos personales según permisos.
RF-21 Anular reclamación|Anular solo reclamos activos o aprobados sin entrega; exigir motivo, restituir disponibilidad y guardar historial y auditoría.
RF-22 Verificar identidad|Contrastar el documento presentado con la reclamación activa y registrar observación, responsable y fecha; bloquear entregas sin aprobación.
RF-23 Registrar resultado de verificación|Registrar aprobación o rechazo con motivo; actualizar reclamación y objeto según resultado y guardar historial.
RF-24 Autorizar devolución|Exigir reclamación y verificación aprobadas y objeto VERIFICADO; bloquear e informar si falta una condición.
RF-25 Registrar entrega|Entregar una sola vez con reclamación aprobada y permiso; guardar receptor, documento, responsable, observación y fecha/hora.
RF-26 Generar constancia de entrega|Crear número único tras la entrega; incluir objeto, receptor, documento, responsable y fecha; permitir consultar e imprimir.
RF-27 Actualizar estado después de la entrega|En una operación, marcar objeto ENTREGADO, reclamación ENTREGADA e historial; revertir todo si falla.
RF-28 Dashboard de indicadores|Calcular objetos encontrados, reclamados, verificados, entregados y no reclamados; excluir bajas lógicas.
RF-29 Reporte de objetos|Filtrar por fecha del hallazgo, categoría, estado y lugar; mostrar columnas definidas, validar fechas y respetar permisos.
RF-30 Reporte de objetos entregados|Listar solo entregados con objeto, reclamante, receptor, constancia, fecha y responsable; filtrar por fechas de entrega.
RF-31 Reporte de objetos pendientes|Incluir encontrados, en custodia, reclamados o verificados; excluir entregados y permitir filtros.
RF-32 Auditoría del sistema|Registrar usuario, acción, módulo, registro, resultado, detalle, IP y fecha; solo Administrador consulta y nadie altera la bitácora.`.split("\n").map(l=>{const[a,b]=l.split("|");return{id:a.slice(0,5),n:a.slice(6),v:b}});
const RF_GROUPS={"RF-01":"Autenticación, cuentas y permisos","RF-07":"Catálogos y configuración","RF-10":"Registro, consulta e historial de objetos","RF-19":"Reclamaciones, verificación y entrega","RF-28":"Indicadores, reportes y auditoría"};
const RNF=[["RNF-01","La interfaz será clara, consistente e intuitiva para el personal autorizado."],["RNF-02","El sistema aplicará autenticación y autorización según el rol del usuario."],["RNF-03","El sistema impedirá duplicidades e inconsistencias en registros y estados."],["RNF-04","La solución permitirá crecer en usuarios, registros y futuras funcionalidades."],["RNF-05","El código será modular, organizado y documentado."],["RNF-06","Los errores no generarán registros incompletos ni pérdida de información."],["RNF-07","Los registros no se eliminarán físicamente; todas las tablas usarán eliminación lógica (0 = vigente, 1 = eliminado/desactivado)."],["RNF-08","Cada registro conservará el usuario y la fecha/hora de creación y última modificación."],["RNF-09","Las contraseñas se almacenarán con hash BCrypt; las sesiones usarán tokens con expiración y revocación; los datos personales serán visibles según permisos."],["RNF-10","La información se almacenará en MySQL 8.0.16 o superior (InnoDB, utf8mb4), con claves foráneas y restricciones únicas y de validación para las reglas del negocio."],["RNF-11","Aun con usuarios simultáneos, no se duplicarán códigos de objeto, números de constancia ni reclamaciones activas sobre un mismo objeto."]];
const ROLES=[["po","Product Owner","Prioriza el Product Backlog y valida el valor de cada entrega."],["sm","Scrum Master","Facilita ceremonias, remueve impedimentos y vela por Scrum adaptativo."],["fe","Developer 1 · Front End","Diseña y desarrolla la interfaz gráfica del sistema web con enfoque en UI/UX."],["be","Developer 2 · Back End","Lógica, base de datos, seguridad, estados y auditoría."],["qa","Stakeholder · QA","Valida criterios de aceptación, pruebas y retroalimentación."]];
const ACT=[
["Semana 1 · Entrevistar al personal de Atención al Cliente de Makro y levantar el proceso actual","po",1,1],
["Semana 1 · Acordar alcance, objetivos, roles y dinámica de trabajo","sm",1,1],
["Semana 2 · Redactar borradores de historias, reglas y criterios de aceptación","po",2,2],
["Semana 2 · Dibujar la arquitectura propuesta y el modelo inicial de datos","be",2,2],
["Semana 3 · Crear bocetos de navegación y pantallas principales","fe",3,3],
["Semana 3 · Comparar alternativas técnicas y documentar decisiones de arquitectura","be",3,3],
["Semana 4 · Elaborar diagramas UML de casos de uso y actividades","po",4,4],
["Semana 4 · Elaborar diagramas UML de clases y de estado","be",4,4],
["Semana 5 · Revisar el prototipo con el stakeholder y registrar ajustes","qa",5,5],
["Semana 5 · Refinar historias, prioridades y criterios de aceptación","po",5,5],
["Semana 6 · Construir componentes visuales de prueba y guía de estilos","fe",6,6],
["Semana 6 · Preparar esquema de datos y borradores de endpoints con Spring Boot y Java","be",6,6],
["Semana 7 · Probar prototipos, documentar hallazgos y priorizar mejoras","qa",7,7],
["Semana 7 · Preparar el backlog técnico y estimar capacidad del equipo","sm",7,7],
["Semana 8 · Programar una prueba de concepto local en Windows 10","be",8,8],
["Semana 8 · Conectar el prototipo de Angular con datos de prueba","fe",8,8],
["Semana 9 · Revisar los borradores técnicos, pruebas iniciales y riesgos","qa",9,9],
["Semana 9 · Preparar respaldos, inventario de datos de prueba y plan de migración","sm",9,9],
["Semana 10 · Migrar datos de prueba y servicios Spring Boot desde Windows 10 a Ubuntu","be",10,10],
["","fe",10,10,false],
["","qa",10,10,false],
["","sm",10,10,false],
["Semana 11 · Sprint 1: implementar acceso, cuentas y permisos (RF-01 a RF-06)","be",11,11],
["Semana 11 · Sprint 1: integrar pantallas de acceso y administración de usuarios","fe",11,11],
["Semana 11 · Sprint 1: probar aceptación, roles y recuperación de acceso","qa",11,11],
["Semana 11 · Sprint 1: revisar alcance y aceptar el incremento","po",11,11],
["Semana 12 · Sprint 2: implementar catálogos, objetos, fotos e historial (RF-07 a RF-18)","be",12,12],
["Semana 12 · Sprint 2: completar las vistas Angular de registro, búsqueda y filtros","fe",12,12],
["Semana 12 · Sprint 2: validar criterios, navegación y datos del objeto","qa",12,12],
["Semana 12 · Sprint 2: revisar demostración y actualizar prioridades","po",12,12],
["Semana 13 · Sprint 3: implementar reclamaciones, verificación y entrega (RF-19 a RF-27)","be",13,13],
["Semana 13 · Sprint 3: integrar vistas de reclamación, verificación y constancias","fe",13,13],
["Semana 13 · Sprint 3: probar transiciones, permisos y casos de rechazo","qa",13,13],
["Semana 13 · Sprint 3: revisar incremento y confirmar reglas de negocio","po",13,13],
["Semana 14 · Sprint 4: completar indicadores, reportes y auditoría (RF-28 a RF-32)","be",14,14],
["Semana 14 · Sprint 4: cerrar interfaces, exportación y presentación final","fe",14,14],
["Semana 14 · Sprint 4: ejecutar regresión, validar evidencias y confirmar calidad","qa",14,14],
["Semana 14 · Sprint 4: aceptar la implementación completa y acordar seguimiento final","po",14,14],
["Semana 14 · Sprint 4: consolidar retrospectiva, pendientes y cierre del equipo","sm",14,14],
["Semana 15 · Entrega final del proyecto","team",15,15]
];
const TEAM={
po:{p:"María",q:["Visión de negocio","Comunicación con Makro","Toma de decisiones","Criterio de valor"],
t:["Mantener el Product Backlog ordenado por valor","Definir criterios de aceptación de cada RF","Validar con Makro Chincha en cada Sprint Review","Aceptar o rechazar lo terminado en cada sprint","Reajustar el backlog con la retroalimentación","Aprobar la entrega final del 30 nov","Confirmar reglas de privacidad y datos visibles por rol","Priorizar el flujo de custodia, reclamo, verificación y devolución","Obtener aceptación de Makro para las constancias y reportes","Resolver dudas de alcance antes de que bloqueen al equipo","Revisar el prototipo y validar los borradores antes de priorizar el desarrollo","Confirmar con el stakeholder los criterios de aceptación de cada sprint"],
m:["Historias de usuario en formato «Como… quiero… para…»","Matriz valor/esfuerzo para ordenar los RF","Reunión semanal de 15 min con el encargado de Makro","Registro de decisiones tomadas (qué, por qué, quién)","Mapa de actores y recorrido actual del objeto perdido","Criterios de aceptación comprobables por cada flujo","Priorización MoSCoW revisada en cada Sprint Review","Validación semanal de incrementos y observaciones del stakeholder"],
h:"Tu fuerte es el negocio: usa los datos de Makro para decidir y delega el «cómo» al equipo técnico. No ocupes tiempo programando.",
pr:["Decidir lo que bloquea a Front/Back (dudas de alcance)","Flujo núcleo de entrega de objetos","Seguridad y roles","Reportes y administración al final"]},
sm:{p:"Piero",q:["Organización","Liderazgo servicial","Resolución de conflictos","Disciplina"],
t:["Convocar Planning, Daily, Review y Retro","Remover impedimentos en menos de 24 h","Mantener el Gantt y los ✓ al día","Consolidar evidencias en la carpeta de Drive","Cuidar que el sprint no exceda la capacidad del equipo","Elaborar el informe final","Dar seguimiento al registro de riesgos y dependencias","Asegurar que cada incremento tenga evidencia y documentación","Coordinar pruebas de regresión y demostración final","Preparar checklist de publicación y respaldo de entregables","Dar seguimiento a la migración del entorno de pruebas a Ubuntu","Verificar que cada sprint tenga responsable, evidencia y acuerdos de retrospectiva"],
m:["Daily de 15 min con 3 preguntas: ayer, hoy, bloqueos","Lista de impedimentos con responsable y fecha","Burndown semanal simple (pendiente vs. hecho)","Una mejora accionable por Retro, con dueño","Tablero visual de riesgos, decisiones y dependencias","Checklist de salida para cada sprint y publicación","Registro de acuerdos y tareas de seguimiento con fecha de revisión"],
h:"Tu fuerza es ordenar y facilitar: protege el foco del equipo, no impongas; mide el avance con hechos (✓ del Gantt).",
pr:["Impedimentos que frenan a otros","Ceremonias de la semana","Evidencias del día (capturas)","Informe final al cierre"]},
fe:{p:"Airton",q:["Interfaz gráfica","UI/UX","Diseño web"],
t:["Diseñar la interfaz gráfica y la navegación del sistema web","Diseñar las vistas web de acceso, objetos, búsqueda y filtros","Diseñar la interfaz web de reclamaciones y constancias de entrega","Diseñar las vistas web del dashboard y los reportes","Definir validaciones, estados de carga y mensajes de error","Diseñar el flujo visual de custodia, reclamo y devolución","Implementar captura y vista previa de fotografía","Añadir vista imprimible de constancia y exportación autorizada","Validar accesibilidad, contraste y navegación por teclado","Preparar el prototipo Angular con TypeScript y revisar su visualización en Ubuntu","Mantener consistencia de componentes y rutas en los cuatro sprints"],
m:["Crear componentes visuales reutilizables para la interfaz web","Validar legibilidad y facilidad de uso de las pantallas web","Acordar con Back End el JSON de cada endpoint","Usar datos simulados (mock) para avanzar en paralelo al Back End","Aplicar una identidad visual consistente con Makro","Diseñar estados vacíos, confirmaciones y errores con acciones claras","Probar diseño adaptable y navegación con datos de validación"],
h:"Responsable de la interfaz gráfica y la experiencia de usuario (UI/UX) del sistema web; coordina con Back End la integración de datos.",
pr:["Desarrollar pantallas a partir de las funciones acordadas","Priorizar registro, reclamación y entrega","Cuidar la claridad de la interfaz y los mensajes de validación","Pulir la presentación visual al final de cada sprint"]},
be:{p:"Dayron",q:["Lógica y reglas","Rigor técnico","Seguridad","Base de datos"],
t:["Modelo de datos y migraciones","Autenticación, roles y permisos (RF-01 a 05)","Endpoints de objetos, estados e historial","Reglas de reclamo, verificación y entrega","Auditoría y reportes","Pruebas de las reglas críticas","Implementar hash, cambio obligatorio y vencimiento de sesiones","Crear correlativos anuales y constancias únicos con concurrencia","Aplicar bajas lógicas, claves foráneas y restricciones de integridad","Asegurar transacción atómica para objeto, reclamación e historial","Migrar datos de prueba y desplegar servicios Java/Spring Boot en Ubuntu","Documentar respaldo, configuración y verificación de conectividad de la VPS"],
m:["Documentar cada endpoint con un ejemplo","Validar siempre en servidor, no solo en pantalla","Transacciones en la entrega (si falla, no cambia el estado)","Revisión cruzada de código con Front End","Matriz de permisos y campos personales por rol","Registro central de errores con contexto y respuesta segura","Automatizar comprobaciones de migración y consistencia del esquema"],
h:"Tu fuerte es la solidez: entrega primero los endpoints que desbloquean a Airton y deja la optimización para cuando todo funcione.",
pr:["Seguridad por roles e integridad de datos (RNF-02 y 03)","Endpoints que desbloquean a Front End","Reglas de estados y entrega","Reportes y optimización al final"]},
qa:{p:"Patricia",q:["Ojo crítico","Atención al detalle","Empatía con el usuario","Comunicación clara"],
t:["Convertir criterios de aceptación en casos de prueba","Probar cada RF al cerrar el sprint y marcar ✓/✗","Reportar defectos: pasos, esperado, obtenido, captura","Pruebas de regresión antes de cada Review","Validar usabilidad con personal de Makro","Firmar la aceptación de cada sprint","Probar intentos fallidos, bloqueos y cambio de contraseña temporal","Verificar transiciones inválidas y que ENTREGADO sea estado final","Simular concurrencia y fallo en medio de la operación de entrega","Comprobar permisos sobre reclamaciones, documentos y reportes","Registrar por semana el resultado validado, observaciones y evidencias","Verificar datos migrados y ejecución de frontend y backend en Ubuntu"],
m:["Plantilla única de reporte de defectos","Defectos por severidad: crítico, alto, medio, bajo","Checklist de regresión reutilizable","Probar con ambos roles (Administrador y Atención al Cliente)","Casos negativos y de recuperación para cada flujo crítico","Matriz de cobertura RF/RNF por sprint y evidencia","Resumen semanal de hallazgos con responsable y fecha de seguimiento"],
h:"Tu fuerte es la mirada del usuario: prueba temprano y en pequeño (por RF), no solo al final; reporta de forma que el dev reproduzca sin preguntar.",
pr:["Defectos críticos (seguridad, entrega errónea)","Flujo núcleo de entrega","Casos de borde y validaciones","Detalles visuales al final"]}};
const $=i=>document.getElementById(i);
const DAY=864e5,START=Date.UTC(2026,7,24),DEAD=Date.UTC(2026,10,30,5),LIMA_TZ="America/Lima";
const limaNow=()=>new Date();
const o={day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false,timeZone:LIMA_TZ};
const fmt=d=>d.toLocaleString("es-PE",o),fmtS=fmt;
const sd=d=>new Date(d).toLocaleDateString("es-PE",{day:"2-digit",month:"short",timeZone:"UTC"});
const wd=w=>START+(w-1)*7*DAY;
const today=()=>{const parts=Object.fromEntries(new Intl.DateTimeFormat("en-CA",{timeZone:LIMA_TZ,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(limaNow()).filter(p=>p.type!=="literal").map(p=>[p.type,p.value]));return `${parts.year}-${parts.month}-${parts.day}`};
const weekOf=t=>Math.floor((t-START)/DAY/7)+1,curW=()=>{const w=weekOf(Date.parse(`${today()}T12:00:00Z`));return w<1?0:w};
const SP=[["Preparación · borradores, prototipos y arquitectura",1,10],["Sprint 1 · Acceso y permisos",11,11],["Sprint 2 · Catálogos, registro y consulta",12,12],["Sprint 3 · Reclamaciones y verificación",13,13],["Sprint 4 · Entrega, reportes y cierre",14,14],["Cierre del proyecto",15,15]];
const spW=w=>SP.find(x=>w>=x[1]&&w<=x[2]);
const ph=w=>(spW(w)||["—"])[0];
const CC=[["m","Reunión Zoom/Meet"],["d","Daily / seguimiento"],["e","Captura en Drive"],["r","Review + Retro"]];
const ATR=["Usabilidad","Seguridad por roles","Integridad","Escalabilidad","Mantenibilidad","Fiabilidad","Eliminación lógica","Trazabilidad","Seguridad y privacidad","Base de datos","Concurrencia"];
const reqSprint=i=>i<6?1:i<18?2:i<27?3:4,dueRF=i=>[11,12,13,14][reqSprint(i)-1],dueRNF=i=>[11,11,11,11,11,12,12,12,13,12,14][i];
const reqMarkKey=(type,id)=>`${type==="rf"?"rf-v2":"rnf-v2"}_${id}`;
const REVIEW_ID="final-review";
const REVIEW_FIELDS={approval:"Pendiente",grade:"",teacherNote:"",nextAction:""};
const RF_PRIORITY=RF.map(r=>r.id);
let st={},att={},observations=[],review={...REVIEW_FIELDS},mode="sin-sesion",sel=today(),cm=Number(today().slice(5,7))-1,cy=Number(today().slice(0,4)),onlyP=false,prompted=false,onlyMe=false,deletingResolvedObservations=false;
let weeklyValidations={},weeklyValidationUnsub=null;
const ENTRY=new Date(),L=k=>{try{return JSON.parse(localStorage.getItem(k))||{}}catch(e){console.error(`No se pudo leer ${k} del almacenamiento local.`,e);return {}}},SV=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){console.error(`No se pudo guardar ${k} en el almacenamiento local.`,e);return false}};
const by=x=>x&&x.by?" · "+x.by:"";
const ok=k=>st[k]&&st[k].v==1,WHO=[["Piero","Scrum Master"],["María","Product Owner"],["Airton","Developer 1 · Front End"],["Dayron","Developer 2 · Back End"],["Patricia","Stakeholder · QA"]],ROLE_CODES=["sm","po","fe","be","qa"],ACCESS_PINS={Piero:"48216",María:"73105",Airton:"29047",Dayron:"86423",Patricia:"51698"},wid=()=>{const i=WHO.findIndex(x=>x[0]==who);return i<0?null:today()+"_u"+i},myAtt=()=>wid()?att[wid()]:null;let who="",auth=null,db=null,currentUid="",cloudReady=false,marksUnsub=null,attendanceUnsub=null,observationsUnsub=null,reviewUnsub=null;
const sg=k=>{const x=st[k],v=x?x.v:-1;return `<span class="sg"><button class="y ${v==1?"on":""}" data-k="${k}" data-v="1" title="${v==1?"Clic para quitar":"Cumplido"}">✓</button><button class="x ${v==0?"on":""}" data-k="${k}" data-v="0" title="${v==0?"Clic para quitar":"No cumplido"}">✗</button></span>`};
const eventDate=x=>{const timestamp=x&&(x.createdAt||x.updatedAt);if(timestamp&&typeof timestamp.toDate==="function")return timestamp.toDate();if(x&&x.at){const date=new Date(x.at);if(!Number.isNaN(date.getTime()))return date}return null};
const recordTime=x=>{const date=eventDate(x);return date?fmtS(date):x&&x.t?x.t:"Pendiente"};
const tsl=k=>{const x=st[k];return x?(x.v?"✓ ":"✗ ")+recordTime(x)+by(x):"Pendiente"};
const row=(k,id,n,v,sp)=>{const x=st[k];return `<tr class="${x?(x.v?"ok":"no"):""}"><td><b>${id}</b></td><td>${n}</td><td class="v">${v}</td><td>${sp}</td><td>${sg(k)}</td><td class="ts">${tsl(k)}</td></tr>`};
function rfHtml(){const q=normalizeText($("q").value.trim());let h="<tr><th>Código</th><th>Requerimiento</th><th>Validación</th><th>Sprint</th><th>Estado</th><th>Fecha y hora</th></tr>",lastGroup="";
RF.forEach((r,i)=>{const key=reqMarkKey("rf",r.id),group=RF_GROUPS[r.id];
if(!q&&!onlyP&&group&&group!==lastGroup)h+=`<tr class="gh"><td colspan="6">${group}</td></tr>`;lastGroup=group||lastGroup;
if(onlyP&&st[key])return;if(q&&!normalizeText(r.id+r.n+r.v).includes(q))return;h+=row(key,r.id,r.n,r.v,"S"+reqSprint(i))});$("rft").innerHTML=h}
function rnfHtml(){let h="<tr><th>Código</th><th>Requerimiento</th><th>Atributo de calidad</th><th>Sprint</th><th>Estado</th><th>Fecha y hora</th></tr>";
const sprint=["S1","S1","S1","S1","S1","S2","S2","S2","S3","S2","S4"];
RNF.forEach((r,i)=>h+=row(reqMarkKey("rnf",r[0]),r[0],r[1],ATR[i],sprint[i]));$("rnt").innerHTML=h}
function normalizeText(value){return value.toLocaleLowerCase("es-PE").normalize("NFD").replace(/[\u0300-\u036f]/g,"")}
function activityStatus(activity,index,cw){const x=st["g"+index];if(x&&x.v==1)return{key:"done",label:"Cumplida",className:"ok"};
if(x&&x.v==0)return{key:"no",label:"No cumplida",className:"no"};if(activity[3]<cw)return{key:"late",label:"Atrasada",className:"no"};
if(activity[2]<=cw)return{key:"active",label:"En curso",className:"wip"};return{key:"pending",label:"Por iniciar",className:""}}
function activityResponsible(activity){return activity[1]==="team"?"Todo el equipo · cualquier integrante puede marcarla":`👤 ${TEAM[activity[1]].p} · ${ROLES.find(r=>r[0]===activity[1])[1]}`}
function filteredActivityIndices(cw){const role=$("gRole").value,state=$("gState").value,query=normalizeText($("gq").value.trim());
return ACT.map((activity,index)=>index).filter(index=>{const activity=ACT[index];if(activity[4]===false)return false;const status=activityStatus(activity,index,cw),responsible=activityResponsible(activity);
const text=normalizeText(`${activity[0]} ${responsible}`);
return(role==="all"||activity[1]===role)&&(state==="all"||status.key===state)&&(!query||text.includes(query))}).sort((left,right)=>ACT[left][2]-ACT[right][2]||ACT[left][3]-ACT[right][3]||left-right)}
function ganttHtml(){const cw=curW(),indices=filteredActivityIndices(cw);let h="<tr><th>Cumple</th><th class='l'>Actividad y responsable</th>";
for(let w=1;w<=15;w++)h+=`<th class="${w==cw?"cur":""}">S${w}<br><small>${sd(wd(w))}</small></th>`;h+="<th>Estado</th></tr>";
indices.forEach(i=>{const a=ACT[i],k="g"+i,status=activityStatus(a,i,cw);
h+=`<tr class="${status.key==="done"?"done-row":""}"><td>${sg(k)}</td><td class="n">${a[0]}<small class="ow">${activityResponsible(a)}</small><small class="ts">${tsl(k)}</small></td>`;
for(let w=1;w<=15;w++){const on=w>=a[2]&&w<=a[3];h+=`<td class="${w==cw?"cur":""}"><div class="cell ${on?"on":""}" style="${on?`background:var(--${a[1]==="team"?"pri":a[1]});opacity:${w<=cw?1:.4}`:""}"></div></td>`}
h+=`<td><span class="chip ${status.className}">${status.label}</span></td></tr>`});
if(!indices.length)h+='<tr><td colspan="18" class="empty-state">No hay actividades que coincidan con estos filtros.</td></tr>';
$("gt").innerHTML=h;$("ganttSummary").textContent=`Semanas 1–10: preparación · semanas 11–14: cuatro sprints · semana 15: entrega final · ${ACT.filter((a,i)=>a[4]!==false&&ok("g"+i)).length} de ${ACT.filter(a=>a[4]!==false).length} actividades completadas.`}
function exportGanttCsv(){const cw=curW(),indices=filteredActivityIndices(cw),escape=value=>`"${String(value).replace(/"/g,'""')}"`;
const rows=[["Actividad","Responsable","Rol","Semana inicial","Semana final","Estado","Fecha/hora del último cambio"]];
indices.forEach(index=>{const activity=ACT[index],status=activityStatus(activity,index,cw),role=activity[1]==="team"?"Todo el equipo":ROLES.find(r=>r[0]===activity[1])[1];rows.push([activity[0],activity[1]==="team"?"Todo el equipo":TEAM[activity[1]].p,role,activity[2],activity[3],status.label,recordTime(st["g"+index])])});
const blob=new Blob(["\uFEFF"+rows.map(row=>row.map(escape).join(";")).join("\r\n")],{type:"text/csv;charset=utf-8"});
const url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download="makro-chincha-gantt-2026.csv";document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function rolesHtml(){const cw=curW();$("roles").innerHTML=ROLES.map(r=>{const A=ACT.map((a,i)=>[a,i]).filter(x=>x[0][4]!==false&&(x[0][1]===r[0]||x[0][1]==="team"));const due=A.filter(x=>x[0][3]<cw).length,done=A.filter(x=>ok("g"+x[1])).length;
return `<div class="role" style="border-top-color:var(--${r[0]})"><b>${r[1]}</b>${r[2]}<small>Debían estar listas: ${due} · Cumplidas: ${done}/${A.length}</small></div>`}).join("")}
function cerHtml(){const cw=curW();let h="<tr><th>Semana</th><th>Fase</th>"+CC.map(c=>`<th>${c[1]}</th>`).join("")+"</tr>";
for(let w=1;w<=14;w++)h+=`<tr class="${w==cw?"cur":""}"><td><b>Semana ${w}</b><small class="ts">${sd(wd(w))} – ${sd(wd(w)+6*DAY)}</small></td><td class="ph">${ph(w)}</td>`+CC.map(c=>{const k="c"+w+c[0];return `<td>${sg(k)}<small class="ts">${tsl(k)}</small></td>`}).join("")+"</tr>";
h+=`<tr class="${cw>=15?"cur":""}"><td><b>Semana 15</b><small class="ts">Lun 30 nov</small></td><td class="ph" colspan="5">ENTREGA FINAL del producto · cualquier integrante puede marcarla en el Gantt</td></tr>`;$("ct").innerHTML=h}
function stats(){const cnt=ks=>[ks.filter(ok).length,ks.filter(k=>st[k]&&st[k].v==0).length,ks.length];
const card=(t,[a,b,n])=>`<div class="st"><small>${t}</small><b>${a}/${n}</b> <small style="display:inline">(${Math.round(a/n*100)}% · ✗ ${b})</small><div class="bar"><i style="width:${a/n*100}%"></i></div></div>`;
const cer=[];for(let w=1;w<=14;w++)CC.forEach(c=>cer.push("c"+w+c[0]));
$("stats").innerHTML=card("Funcionales",cnt(RF.map(r=>reqMarkKey("rf",r.id))))+card("No funcionales",cnt(RNF.map(r=>reqMarkKey("rnf",r[0]))))+card("Actividades Gantt",cnt(ACT.flatMap((a,i)=>a[4]===false?[]:["g"+i])))+card("Ceremonias y evidencias",cnt(cer))+card("Tareas y mejoras por rol",cnt(Object.keys(TEAM).flatMap(r=>["t","m"].flatMap(p=>TEAM[r][p].map((_,i)=>p+"_"+r+"_"+i)))))}
function banner(){const cw=curW(),m=myAtt();
$("wkb").innerHTML=`<div><small>Hora exacta (Lima)</small><b id="ck"></b></div><div><small>Ingresaste a esta página</small><b>${fmtS(ENTRY)}</b></div><div><small>Semana del proyecto</small><b>${cw==0?"Inicia el 24 ago":cw>15?"Plazo concluido":`${cw} de 15`+(cw<=15?` · ${sd(wd(cw))} – ${sd(wd(cw)+6*DAY)}`:"")}</b></div><div><small>Entrega final · lunes 30 nov 2026</small><b id="cd"></b></div><div><small>Mi asistencia de hoy</small>${m?`<b class="good">✓ ${m.p} · ${m.t}</b><small>${m.r}</small>`:`<button class="pri" id="atb">☑ Marcar asistencia${who?` · ${who}`:""}</button>`}<small><a href="#" id="chg">${who?"Cambiar persona":"Ingresar"}</a></small></div><div><small>Datos</small><b>🟠 Pestañas de este navegador</b></div>`;tick()}
function tick(){const a=$("ck"),c=$("cd");if(a)a.textContent=fmtS(new Date());if(!c)return;const d=DEAD-limaNow().getTime();
if(d>0){const D=Math.floor(d/DAY),H=Math.floor(d%DAY/36e5),M=Math.floor(d%36e5/6e4),S=Math.floor(d%6e4/1e3);c.textContent=`${D}d ${H}h ${M}m ${S}s`}else c.textContent=d>-DAY?"¡HOY es la entrega!":"Plazo concluido"}
function panel(){const cw=curW(),c=Math.min(cw,15),s=spW(c);let sc="";
if(cw==0)sc="El proyecto inicia el lunes 24 de agosto de 2026.";
else if(cw>15)sc="La fecha de entrega final ya pasó.";
else{const i=c-s[1]+1,n=s[2]-s[1]+1,left=Math.ceil((wd(s[2])+7*DAY-limaNow().getTime())/DAY);
const ev=c==15?"Entrega final del producto":i==1?"Sprint Planning: definir el Sprint Backlog":i==n&&n>1?"Sprint Review + Retrospectiva: demo a Makro y mejoras":"Daily Scrum + refinamiento del Product Backlog";
sc=`<p><b>${s[0]}</b> · semana ${i} de ${n} del sprint · faltan ${left} días para cerrarlo.</p><p>Evento Scrum de esta semana: <b>${ev}</b>.</p>`}
const A=[];ACT.forEach((a,i)=>{if(a[3]<cw&&!ok("g"+i))A.push(["Actividades",a[0]])});
RF.forEach((r,i)=>{if(dueRF(i)<cw&&!ok(reqMarkKey("rf",r.id)))A.push(["Funcionales",r.id+" "+r.n])});
RNF.forEach((r,i)=>{if(dueRNF(i)<cw&&!ok(reqMarkKey("rnf",r[0])))A.push(["No funcionales",r[0]])});
for(let w=1;w<cw&&w<=14;w++)CC.forEach(x=>{if(!ok("c"+w+x[0]))A.push(["Ceremonias/evidencias","Sem "+w+" · "+x[1]])});
const G={};A.forEach(x=>(G[x[0]]=G[x[0]]||[]).push(x[1]));
const al=A.length?`<p class="bad">⚠ ${A.length} elemento(s) atrasado(s)</p>`+Object.keys(G).map(k=>`<details><summary>${k} (${G[k].length})</summary><ul>${G[k].map(t=>`<li>${t}</li>`).join("")}</ul></details>`).join(""):`<p class="good">✓ Sin atrasos por ahora</p>`;
const T=[];ACT.forEach((a,i)=>{if(a[2]<=cw&&cw<=a[3]&&!ok("g"+i))T.push(a[0])});
const cp=[];CC.forEach(x=>{if(cw>=1&&cw<=14&&!ok("c"+cw+x[0]))cp.push(x[1])});
const tw=cw>=1&&cw<=15?`<p>Actividades en curso sin cumplir: <b>${T.length}</b></p>${T.length?`<details><summary>Ver</summary><ul>${T.map(t=>`<li>${t}</li>`).join("")}</ul></details>`:""}<p>Ceremonias/evidencias de la semana pendientes: <b>${cp.length}</b>${cp.length?` (${cp.join(", ")})`:""}</p>`:"<p>—</p>";
$("pn").innerHTML=`<div class="pc"><h3>🧭 ¿En qué parte de Scrum estamos?</h3>${sc}</div><div class="pc"><h3>⏰ Lo que toca esta semana</h3>${tw}</div><div class="pc"><h3>🚨 Atrasos a recuperar</h3>${al}</div>`}
function attBy(){const m={};Object.values(att).forEach(a=>(m[a.d]=m[a.d]||[]).push(a));return m}
function calHtml(){const B=attBy(),first=Date.UTC(cy,cm,1),off=(new Date(first).getUTCDay()+6)%7,dim=new Date(Date.UTC(cy,cm+1,0)).getUTCDate(),rows=Math.ceil((off+dim)/7),td=today();
$("cmt").textContent=new Date(first).toLocaleDateString("es-PE",{month:"long",year:"numeric",timeZone:"UTC"});
let h='<div class="ch">Sem</div>'+["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"].map(x=>`<div class="ch">${x}</div>`).join("");
for(let r=0;r<rows;r++){const mon=first+(r*7-off)*DAY,w=weekOf(mon+12*36e5);h+=`<div class="cw">${w>=1&&w<=15?"S"+w:""}</div>`;
for(let c=0;c<7;c++){const t=mon+c*DAY,d=new Date(t),k=d.toISOString().slice(0,10),n=(B[k]||[]).length;
h+=`<div class="cd ${d.getUTCMonth()==cm?"":"oth"} ${k==td?"tdy":""} ${k=="2026-11-30"?"dl":""} ${k==sel?"sel":""}" data-d="${k}">${d.getUTCDate()}${k=="2026-11-30"?"🏁":""}${n?`<i>✓${n}</i>`:""}</div>`}}
$("cgr").innerHTML=h;
const t=Date.parse(`${sel}T12:00:00Z`),w=weekOf(t),s=spW(w),L2=(B[sel]||[]).slice().sort((a,b)=>(eventDate(a)?.getTime()||0)-(eventDate(b)?.getTime()||0));
$("cdt").innerHTML=`<b>${new Date(t).toLocaleDateString("es-PE",{weekday:"long",day:"numeric",month:"long",year:"numeric",timeZone:"UTC"})}</b><br>${w>=1&&w<=15?`Semana ${w} · ${s[0]}`:"Fuera del cronograma"}${sel=="2026-11-30"?" · 🏁 ENTREGA FINAL":""}<p><b>Asistencia del día (${L2.length}):</b></p>${L2.length?"<ul class=\"attendance-list\">"+L2.map(a=>`<li><b>${a.p}</b> · ${a.r} · ${a.d} · <time datetime="${eventDate(a)?.toISOString()||""}">${recordTime(a)}</time></li>`).join("")+"</ul>":"<p>Nadie registró asistencia.</p>"}${sel==td&&!myAtt()?'<button class="pri" id="mak">☑ Marcar mi asistencia de hoy</button>':""}`}
function memberRole(){const index=WHO.findIndex(person=>person[0]===who);return index<0?"":ROLE_CODES[index]}
function escapeHtml(value){return String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]))}
function renderObservations(){const form=$("observationForm"),role=memberRole(),isPO=role==="po",isSM=role==="sm";
form.hidden=!isPO;$("saveObservation").disabled=!cloudReady||!isPO;
const resolvedCount=observations.filter(note=>note.developerStatus==="Resuelta").length;
if(!who){$("observationRolePanel").innerHTML="";$("observationStatus").textContent="Inicia sesión para consultar las observaciones compartidas."; $("observationList").innerHTML="";return}
if(isPO)$("observationRolePanel").innerHTML=`<div class="observation-role-heading"><div><b>Panel del Product Owner</b><small>Elimina una observación o limpia en lote las que ya fueron resueltas (${resolvedCount}).</small></div><button type="button" class="danger-button" id="deleteResolvedObservations" ${!cloudReady||resolvedCount===0||deletingResolvedObservations?"disabled":""}>${deletingResolvedObservations?"Eliminando…":"🗑 Eliminar resueltas"}</button></div>`;
else if(isSM)$("observationRolePanel").innerHTML='<div class="observation-role-heading"><div><b>Panel de seguimiento del Scrum Master</b><small>Consulta el estado y las respuestas del equipo; el Product Owner administra las eliminaciones.</small></div></div>';
else if(role==="fe"||role==="be")$("observationRolePanel").innerHTML='<div class="observation-role-heading"><div><b>Mis observaciones asignadas</b><small>Edita tu respuesta y actualiza el estado; el Product Owner administra las eliminaciones.</small></div></div>';
else $("observationRolePanel").innerHTML='<div class="observation-role-heading"><div><b>Consulta de observaciones</b><small>Vista de seguimiento del equipo.</small></div></div>';
if(role==="fe"||role==="be")$("observationStatus").textContent=cloudReady?"Actualiza la respuesta de cada observación asignada. Puedes corregirla incluso después de marcarla resuelta.":"Conéctate a Firestore para consultar y actualizar observaciones.";
else $("observationStatus").textContent=cloudReady?`${observations.length} observación(es) compartida(s) · ${resolvedCount} resuelta(s).`:"Conéctate a Firestore para consultar observaciones.";
const visible=observations.filter(note=>isPO||isSM||role==="qa"||note.developer===role);
$("observationList").innerHTML=visible.map(note=>{
const status=note.developerStatus||"Pendiente",canRespond=(role==="fe"||role==="be")&&note.developer===role,age=eventDate(note),hours=age?Math.floor((Date.now()-age.getTime())/36e5):0,overdue=status==="Pendiente"&&hours>=24,noteId=escapeHtml(note.id);
return `<article class="observation-card priority-${note.priority==="Bloqueante"?"blocker":note.priority==="Alta"?"high":"normal"} ${overdue?"observation-overdue":""}"><div class="observation-head"><b>${escapeHtml(note.requirement)} · ${escapeHtml(note.developer==="fe"?"Front End":"Back End")}</b><span class="chip ${status==="Resuelta"?"done":status==="En curso"?"wip":"pending"}">${escapeHtml(status)}</span></div><p>${escapeHtml(note.text)}</p><div class="observation-meta"><span class="chip ${note.priority==="Bloqueante"?"no":note.priority==="Alta"?"wip":""}">Prioridad ${escapeHtml(note.priority)}</span><small class="ts">Product Owner · ${escapeHtml(note.author||"")} · ${escapeHtml(recordTime(note))}${status!=="Resuelta"&&age?` · ${hours} h abierta`:""}</small></div>${note.developerResponse?`<div class="developer-response"><b>Respuesta de ${escapeHtml(note.developerUpdatedBy||"Developer")} · ${escapeHtml(note.developerUpdatedAt?recordTime({createdAt:note.developerUpdatedAt}):"")}</b><p>${escapeHtml(note.developerResponse)}</p></div>`:""}${canRespond?`<label class="observation-reply">Respuesta del Developer<textarea id="ob-reply-${noteId}" maxlength="1000" rows="3" placeholder="Describe el avance, solución o evidencia (máx. 1000 caracteres).">${escapeHtml(note.developerResponse||"")}</textarea></label><div class="observation-actions">${status==="Pendiente"?`<button type="button" data-ob-action="start" data-ob-id="${noteId}" ${!cloudReady?"disabled":""}>Tomar observación</button>`:""}<button type="button" class="pri" data-ob-action="reply" data-ob-id="${noteId}" ${!cloudReady?"disabled":""}>${status==="Resuelta"?"Actualizar respuesta":"Guardar respuesta"}</button>${status!=="Resuelta"?`<button type="button" data-ob-action="resolve" data-ob-id="${noteId}" ${!cloudReady?"disabled":""}>Marcar resuelta</button>`:""}</div>`:""}${isPO?`<div class="observation-actions"><button type="button" class="danger-button icon-button" data-ob-action="delete" data-ob-id="${noteId}" aria-label="Eliminar observación ${escapeHtml(note.requirement)}" title="Eliminar esta observación" ${!cloudReady?"disabled":""}>🗑 Eliminar</button></div>`:""}</article>`}).join("")||`<p class="empty-state">${role==="fe"||role==="be"?"No tienes observaciones asignadas por ahora.":"Aún no hay observaciones registradas."}</p>`}
async function updateObservation(noteId,action){const note=observations.find(item=>item.id===noteId),role=memberRole();
if(action==="delete"){if(role!=="po"||!note){setCloudStatus("Solo el Product Owner puede eliminar observaciones.",true);return}
if(!cloudReady||!currentUid){setCloudStatus("La nube todavía no está lista. La observación no se eliminó.",true);return}
if(!window.confirm(`¿Eliminar la observación ${note.requirement} asignada a ${note.developer==="fe"?"Front End":"Back End"}? Esta acción no se puede deshacer.`))return;
try{await db.collection("observaciones").doc(noteId).delete();$("observationStatus").textContent="Observación eliminada y cambio sincronizado con el equipo."}
catch(error){console.error("No se pudo eliminar la observación.",error);setCloudStatus(`No se eliminó la observación: ${error.message}`,true)}return}
if(!note||note.developer!==role||!["fe","be"].includes(role)){setCloudStatus("No tienes permiso para responder esta observación.",true);return}
if(!cloudReady||!currentUid){setCloudStatus("La nube todavía no está lista. La observación no se actualizó.",true);return}
const responseField=$(`ob-reply-${noteId}`),response=responseField?responseField.value.trim():note.developerResponse||"",status=action==="start"?"En curso":action==="resolve"?"Resuelta":note.developerStatus==="Resuelta"?"Resuelta":"En curso";
if(!["start","reply","resolve"].includes(action)||note.developerStatus==="Resuelta"&&action!=="reply"){setCloudStatus("La observación ya está resuelta o la acción no es válida.",true);return}
if(action==="resolve"&&!response){setCloudStatus("Escribe una respuesta antes de marcar la observación como resuelta.",true);$(`ob-reply-${noteId}`)?.focus();return}
if(response.length>1000){setCloudStatus("La respuesta no puede superar 1000 caracteres.",true);return}
try{await db.collection("observaciones").doc(noteId).update({developerStatus:status,developerResponse:response,developerUpdatedBy:who,developerUpdatedUid:currentUid,developerUpdatedAt:firebase.firestore.FieldValue.serverTimestamp()})}
catch(error){console.error("No se pudo actualizar la observación asignada.",error);setCloudStatus(`No se actualizó la observación: ${error.message}`,true)}}
async function deleteResolvedObservations(){if(memberRole()!=="po"){setCloudStatus("Solo el Product Owner puede eliminar observaciones.",true);return}
if(!cloudReady||!currentUid){setCloudStatus("La nube todavía no está lista. No se eliminó ninguna observación.",true);return}
deletingResolvedObservations=true;renderObservations();
let deleted=0;
try{const snapshot=await db.collection("observaciones").where("developerStatus","==","Resuelta").get({source:"server"}),docs=snapshot.docs;
if(!docs.length){$("observationStatus").textContent="No hay observaciones resueltas para eliminar.";return}
if(!window.confirm(`Se eliminarán ${docs.length} observaciones resueltas de Firestore para todo el equipo. Esta acción no se puede deshacer. ¿Continuar?`))return;
for(let offset=0;offset<docs.length;offset+=450){const batch=db.batch(),chunk=docs.slice(offset,offset+450);chunk.forEach(doc=>batch.delete(doc.ref));await batch.commit();deleted+=chunk.length}
$("observationStatus").textContent=`Se eliminaron ${deleted} observación(es) resuelta(s); el cambio se sincroniza con el equipo.`
}catch(error){console.error("No se pudieron eliminar todas las observaciones resueltas.",error);const progress=deleted?` Se eliminaron ${deleted} antes del error; vuelve a intentarlo para las restantes.`:"";setCloudStatus(`No se completó la eliminación masiva: ${error.message}.${progress}`,true)}
finally{deletingResolvedObservations=false;renderObservations()}}
function renderStakeholderValidation(force=false){
const signedIn=Boolean(who),canEdit=memberRole()==="qa";
$("stakeholderNav").hidden=!signedIn;$("stakeholderValidation").hidden=!signedIn;
if(!signedIn)return;
const container=$("weeklyValidationList");
if(!cloudReady){container.innerHTML='<p class="empty-state">Conéctate a Firestore para consultar las validaciones semanales del equipo.</p>';container.dataset.loaded="";return}
if(!force&&container.dataset.loaded==="true")return;
container.dataset.loaded="true";
container.innerHTML=Array.from({length:15},(_,index)=>{
const week=index+1,id=`week-${String(week).padStart(2,"0")}`,data=weeklyValidations[id]||{},updated=data.updatedBy?`Actualizado por ${escapeHtml(data.updatedBy)} · ${escapeHtml(recordTime(data))}`:"Aún no registrada";
if(!canEdit)return `<article class="validation-week ${data.validated===true?"validation-approved":""}"><div class="validation-week-heading"><b>Semana ${week} · ${escapeHtml(ph(week))}</b><span class="validation-result ${data.validated===true?"approved":""}">${data.validated===true?"✓ Validada":"Pendiente"}</span></div><p><b>Pruebas realizadas y resultados</b><br>${data.testSummary?escapeHtml(data.testSummary):"La stakeholder aún no registra las pruebas de esta semana."}</p><p><b>Observaciones y seguimiento</b><br>${data.observation?escapeHtml(data.observation):"Sin observaciones registradas."}</p><small class="validation-updated">${updated}</small></article>`;
return `<form class="validation-week" data-validation-week="${week}"><div class="validation-week-heading"><b>Semana ${week} · ${escapeHtml(ph(week))}</b><label><input class="validation-check" type="checkbox" ${data.validated===true?"checked":""}> Pruebas validadas</label></div><label>Pruebas realizadas y resultados<textarea class="validation-tests" maxlength="2000" rows="4" placeholder="Describe qué se probó, el resultado obtenido y si pasó correctamente.">${escapeHtml(data.testSummary||"")}</textarea></label><label>Observaciones y seguimiento<textarea class="validation-observation" maxlength="1000" rows="3" placeholder="Anota hallazgos, pendientes o acciones acordadas.">${escapeHtml(data.observation||"")}</textarea></label><div class="validation-week-footer"><small>${updated}</small><button class="pri" type="submit" ${!cloudReady?"disabled":""}>Guardar semana ${week}</button></div></form>`
}).join("");
}
async function saveWeeklyValidation(event){
event.preventDefault();
const form=event.currentTarget,week=Number(form.dataset.validationWeek),weekId=`week-${String(week).padStart(2,"0")}`,status=$("weeklyValidationStatus");
if(memberRole()!=="qa"){status.textContent="Solo el stakeholder puede guardar validaciones semanales.";return}
if(!cloudReady||!currentUid){status.textContent="La conexión a Firestore no está disponible; no se guardaron los cambios.";return}
const testSummary=form.querySelector(".validation-tests").value.trim(),observation=form.querySelector(".validation-observation").value.trim();
if(!Number.isInteger(week)||week<1||week>15||!testSummary||testSummary.length>2000||observation.length>1000){status.textContent="Describe las pruebas realizadas (máx. 2000 caracteres) y revisa las observaciones (máx. 1000).";return}
const button=form.querySelector('button[type="submit"]');button.disabled=true;status.textContent=`Guardando la validación de la semana ${week}…`;
try{
await db.collection("validacionesSemanales").doc(weekId).set({week,validated:form.querySelector(".validation-check").checked,testSummary,observation,updatedBy:who,updatedUid:currentUid,updatedAt:firebase.firestore.FieldValue.serverTimestamp()});
status.textContent=`Validación de la semana ${week} guardada y sincronizada.`;
}catch(error){
console.error("No se pudo guardar la validación semanal.",error);
status.textContent=`No se guardó la validación de la semana ${week}: ${error.message}`;
}finally{button.disabled=false}
}
function populateReview(){const form=review;$("reviewApproval").value=form.approval||"Pendiente";$("reviewGrade").value=form.grade||"";$("reviewTeacherNote").value=form.teacherNote||"";$("reviewNextAction").value=form.nextAction||"";$("reviewUpdated").textContent=form.updatedBy?`Última actualización: ${form.updatedBy} · ${recordTime(form)}`:"Sin evaluación registrada."}
function renderReview(){const visible=memberRole()==="sm";$("teacherReview").hidden=!visible;$("saveReview").disabled=!cloudReady||!visible}
function render(){rfHtml();rnfHtml();ganttHtml();rolesHtml();cerHtml();teamHtml();stats();banner();panel();renderObservations();renderReview();renderStakeholderValidation();if(!$("mdc").hidden)calHtml()}
function setCloudStatus(message,isError=false){const status=$("cloudState");status.textContent=message;status.classList.toggle("error",isError);status.classList.toggle("connected",!isError&&mode==="cloud")}
function setAuthStatus(message,isError=false){const status=$("authStatus");status.textContent=message;status.classList.toggle("bad",isError);status.classList.toggle("good",!isError&&Boolean(message))}
function maybePrompt(){if(prompted)return;prompted=true;if(mode!=="cloud")openAtt()}
function openAtt(){
$("authTitle").textContent="🔐 Ingreso al tablero";
$("authHelp").textContent="Elige tu nombre para leer y guardar los checks compartidos en la nube.";
$("loginForm").hidden=false;$("loginUser").value="";$("loginPin").value="";
setAuthStatus("El PIN es demostrativo y no confirma que seas la persona seleccionada.",false);
$("mda").hidden=false}
async function saveMark(k,v){if(!who){openAtt();return}if(!cloudReady||!currentUid){setCloudStatus("La nube todavía no está lista. El check no se guardó; vuelve a intentarlo cuando aparezca Conectado.",true);return}
try{const i=WHO.findIndex(entry=>entry[0]===who);await db.collection("marks").doc(k).set({v,t:fmt(new Date()),by:who,role:ROLE_CODES[i],uid:currentUid,updatedAt:firebase.firestore.FieldValue.serverTimestamp()})}
catch(e){console.error("No se pudo guardar el check en Firestore.",e);setCloudStatus(`No se guardó el check en la nube: ${e.message}`,true)}}
async function removeMark(k){if(!who){openAtt();return}if(!cloudReady){setCloudStatus("La nube todavía no está lista. El check no se quitó; vuelve a intentarlo cuando aparezca Conectado.",true);return}
try{await db.collection("marks").doc(k).delete()}
catch(e){console.error("No se pudo quitar el check de Firestore.",e);setCloudStatus(`No se pudo quitar el check de la nube: ${e.message}`,true)}}
async function saveObservation(event){event.preventDefault();if(memberRole()!=="po"){setCloudStatus("Solo el Product Owner puede registrar observaciones.",true);return}
if(!cloudReady||!currentUid){$("observationStatus").textContent="La nube todavía no está lista. La observación no se guardó.";return}
const developer=$("obDeveloper").value,requirement=$("obRequirement").value,priority=$("obPriority").value,text=$("obText").value.trim();
if(!["fe","be"].includes(developer)||!RF_PRIORITY.includes(requirement)||!["Normal","Alta","Bloqueante"].includes(priority)||!text||text.length>500){$("observationStatus").textContent="Completa destinatario, requerimiento y observación (máx. 500 caracteres).";return}
$("saveObservation").disabled=true;
try{await db.collection("observaciones").add({requirement,developer,priority,text,author:who,authorUid:currentUid,createdAt:firebase.firestore.FieldValue.serverTimestamp()});$("obText").value="";$("observationStatus").textContent="Observación guardada y compartida con el equipo."}
catch(error){console.error("No se pudo guardar la observación del Product Owner.",error);$("observationStatus").textContent=`No se guardó la observación: ${error.message}`}
finally{$("saveObservation").disabled=false}}
async function saveReview(){if(memberRole()!=="sm"){setCloudStatus("Solo el Scrum Master puede guardar la evaluación docente.",true);return}
if(!cloudReady||!currentUid){$("reviewStatus").textContent="La nube todavía no está lista. La evaluación no se guardó.";return}
const values={approval:$("reviewApproval").value,grade:$("reviewGrade").value.trim(),teacherNote:$("reviewTeacherNote").value.trim(),nextAction:$("reviewNextAction").value.trim()};
if(!["Pendiente","Sí","No"].includes(values.approval)||values.grade.length>40||values.teacherNote.length>500||values.nextAction.length>500){$("reviewStatus").textContent="Revisa los campos: nota máx. 40 caracteres y observaciones máx. 500.";return}
$("saveReview").disabled=true;
try{await db.collection("evaluaciones").doc(REVIEW_ID).set({...values,updatedBy:who,updatedUid:currentUid,updatedAt:firebase.firestore.FieldValue.serverTimestamp()});$("reviewStatus").textContent="Evaluación guardada."}
catch(error){console.error("No se pudo guardar la evaluación docente.",error);$("reviewStatus").textContent=`No se guardó la evaluación: ${error.message}`}
finally{$("saveReview").disabled=false}}
function teamHtml(){const rid=(WHO.find(w=>w[0]==who)||[])[1],mine=ROLES.find(r=>r[1]==rid);
const list=(r,pre,arr)=>arr.map((t,i)=>{const k=pre+"_"+r+"_"+i,x=st[k];return `<label class="tk ${x&&x.v?"d":""}"><input type="checkbox" data-tk="${k}" ${x&&x.v?"checked":""}><span>${t}<small>${x?"✓ "+x.t+by(x):""}</small></span></label>`}).join("");
$("tm").innerHTML=ROLES.filter(r=>!onlyMe||!mine||r[0]==mine[0]).map(r=>{const T=TEAM[r[0]],n=T.t.length+T.m.length,d=T.t.filter((_,i)=>ok("t_"+r[0]+"_"+i)).length+T.m.filter((_,i)=>ok("m_"+r[0]+"_"+i)).length;
const A=ACT.map((a,i)=>[a,i]).filter(x=>x[0][4]!==false&&(x[0][1]===r[0]||x[0][1]==="team"));
return `<div class="tc ${mine&&mine[0]==r[0]?"me":""}" style="border-top-color:var(--${r[0]})"><h3>${T.p} · ${r[1]}</h3><div class="who">${r[2]}</div><div class="bar"><i style="width:${d/n*100}%"></i></div><small class="ts">${d}/${n} tareas y mejoras cumplidas</small>
<h4>Cualidades que aporta</h4><div class="qs">${T.q.map(q=>`<span>${q}</span>`).join("")}</div>
<h4>Tareas que asume</h4>${list(r[0],"t",T.t)}
<h4>Mejoras implementadas</h4>${list(r[0],"m",T.m)}<p><span class="pg">Cómo usar tu habilidad:</span> ${T.h}</p>
<h4>Cómo priorizar tu trabajo</h4><ol>${T.pr.map(x=>`<li>${x}</li>`).join("")}</ol>
<h4>Actividades del Gantt a su cargo</h4>${A.map(x=>`<div class="tk ${ok("g"+x[1])?"d":""}"><span>${x[0][0]}<small>Sem ${x[0][2]}–${x[0][3]} · ${ok("g"+x[1])?"✓ cumplida":"pendiente"}</small></span></div>`).join("")}</div>`}).join("")}
async function saveAtt(n=who){const i=WHO.findIndex(x=>x[0]===n);if(i<0)return;if(!cloudReady||!currentUid){setCloudStatus("La nube todavía no está lista. La asistencia no se guardó; vuelve a intentarlo cuando aparezca Conectado.",true);return}
const id=today()+"_u"+i;if(att[id]){setCloudStatus("La asistencia de este rol ya está registrada hoy.");return}
try{await db.collection("asist").doc(id).set({d:today(),p:n,r:WHO[i][1],t:fmt(new Date()),at:fmt(new Date()),uid:currentUid,createdAt:firebase.firestore.FieldValue.serverTimestamp()})}
catch(e){console.error("No se pudo registrar la asistencia en Firestore.",e);setCloudStatus(`No se registró la asistencia en la nube: ${e.message}`,true)}}
async function ensureProjectChecksReset(){}
function stopCloudSubscriptions(){if(marksUnsub)marksUnsub();if(attendanceUnsub)attendanceUnsub();if(observationsUnsub)observationsUnsub();if(reviewUnsub)reviewUnsub();if(weeklyValidationUnsub)weeklyValidationUnsub();
marksUnsub=null;attendanceUnsub=null;observationsUnsub=null;reviewUnsub=null;weeklyValidationUnsub=null}
function subscribeCloudData(){stopCloudSubscriptions();cloudReady=false;let marksReady=false,attendanceReady=false,observationsReady=false,reviewReady=memberRole()!=="sm",weeklyValidationReady=false;const uid=currentUid;
setCloudStatus("Preparando el reinicio único de checks y cargando la información compartida…");
const ready=()=>{if(!marksReady||!attendanceReady||!observationsReady||!reviewReady||!weeklyValidationReady)return;cloudReady=true;setCloudStatus(`Conectado a Firestore · ${who} · cambios sincronizados en tiempo real.`);render()};
const failed=(label,error)=>{cloudReady=false;console.error(label,error);setCloudStatus(`${label}: ${error.message}`,true);render()};
attendanceUnsub=db.collection("asist").onSnapshot(snapshot=>{att={};snapshot.forEach(doc=>{att[doc.id]=doc.data()});attendanceReady=true;render();ready()},error=>failed("No se pudieron leer las asistencias en la nube",error));
observationsUnsub=db.collection("observaciones").orderBy("createdAt","desc").onSnapshot(snapshot=>{observations=snapshot.docs.map(doc=>({id:doc.id,...doc.data()}));observationsReady=true;render();ready()},error=>failed("No se pudieron leer las observaciones",error));
if(memberRole()==="sm")reviewUnsub=db.collection("evaluaciones").doc(REVIEW_ID).onSnapshot(snapshot=>{review=snapshot.exists?{...REVIEW_FIELDS,...snapshot.data()}:{...REVIEW_FIELDS};populateReview();reviewReady=true;render();ready()},error=>failed("No se pudo leer la evaluación docente",error));
else review={...REVIEW_FIELDS};
weeklyValidationUnsub=db.collection("validacionesSemanales").onSnapshot(snapshot=>{weeklyValidations={};snapshot.forEach(doc=>{weeklyValidations[doc.id]=doc.data()});weeklyValidationReady=true;renderStakeholderValidation(true);ready()},error=>failed("No se pudieron leer las validaciones semanales",error));
ensureProjectChecksReset().then(()=>{if(currentUid!==uid)return;marksUnsub=db.collection("marks").onSnapshot(snapshot=>{st={};snapshot.forEach(doc=>{st[doc.id]=doc.data()});marksReady=true;render();ready()},error=>failed("No se pudieron leer los checks en la nube",error))})
.catch(error=>failed("No se pudieron reiniciar las marcas de avance sin alterar las asistencias",error))}
function activateCloudRole(name,user){const person=WHO.find(entry=>entry[0]===name);if(!person)throw new Error("El integrante seleccionado no existe.");
who=name;currentUid=user.uid;mode="cloud";$("mda").hidden=true;setCloudStatus(`Conectado · cargando los datos compartidos para ${name}…`);subscribeCloudData();render()}
async function connectCloudRole(name){const person=WHO.find(entry=>entry[0]===name);if(!person)throw new Error("Selecciona un integrante válido.");
let user=auth.currentUser;
if(user){const currentMember=await db.collection("members").doc(user.uid).get();if(currentMember.exists&&currentMember.data().name!==name){await auth.signOut();user=null}}
if(!user)user=(await auth.signInAnonymously()).user;
const memberRef=db.collection("members").doc(user.uid),memberSnapshot=await memberRef.get(),role=ROLE_CODES[WHO.findIndex(entry=>entry[0]===name)];
if(memberSnapshot.exists){const member=memberSnapshot.data();if(member.active!==true||member.name!==name||member.role!==role)throw new Error("Esta sesión de navegador ya está vinculada a otro integrante. Cambia de persona e inténtalo de nuevo.")}
else await memberRef.set({name,displayRole:person[1],role,active:true});
activateCloudRole(name,user)}
function loginWithRole(event){event.preventDefault();const name=$("loginUser").value,pin=$("loginPin").value;
if(!WHO.some(entry=>entry[0]===name)||!/^[0-9]{5}$/.test(pin)||ACCESS_PINS[name]!==pin){setAuthStatus("Nombre o PIN incorrecto.",true);return}
if(!auth){setAuthStatus("Firebase Authentication no está disponible. Revisa la conexión y la configuración.",true);return}
setAuthStatus("Conectando con la nube…");$("loginButton").disabled=true;
connectCloudRole(name).then(()=>{$("loginPin").value="";setAuthStatus("Conectado. Los checks se compartirán en tiempo real.")})
.catch(error=>{console.error("No se pudo iniciar sesión en Firestore.",error);setAuthStatus(`No se pudo conectar: ${error.message}`,true)})
.finally(()=>{$("loginButton").disabled=false})}
function handleAuthState(user){if(!user){stopCloudSubscriptions();who="";currentUid="";cloudReady=false;st={};att={};observations=[];weeklyValidations={};review={...REVIEW_FIELDS};mode="sin-sesion";setCloudStatus("Sin sesión en la nube. Conéctate para ver y guardar los checks del equipo.",true);render();maybePrompt();return}
currentUid=user.uid;db.collection("members").doc(user.uid).get().then(snapshot=>{if(!snapshot.exists){mode="sin-sesion";setCloudStatus("Elige tu integrante para abrir los datos compartidos.");render();maybePrompt();return}
const member=snapshot.data();if(member.active!==true||!WHO.some((person,i)=>person[0]===member.name&&person[1]===member.displayRole&&ROLE_CODES[i]===member.role))throw new Error("El perfil guardado en la nube no coincide con los integrantes habilitados.");
activateCloudRole(member.name,user)}).catch(error=>{mode="error";cloudReady=false;setCloudStatus(`No se pudo validar el perfil en Firestore: ${error.message}`,true);console.error("No se pudo validar el perfil de Firestore.",error);render();maybePrompt()})}
function startCloudMode(){render();if(!window.firebase||!window.FIREBASE_CONFIG){mode="error";setCloudStatus("No está disponible el SDK o la configuración de Firebase. No se guardarán cambios.",true);maybePrompt();return}
try{if(!firebase.apps.length)firebase.initializeApp(window.FIREBASE_CONFIG);auth=firebase.auth();db=firebase.firestore();auth.onAuthStateChanged(handleAuthState,error=>{mode="error";cloudReady=false;setCloudStatus(`Error de autenticación de Firebase: ${error.message}`,true);console.error("Falló Firebase Authentication.",error);maybePrompt()})}
catch(error){mode="error";setCloudStatus(`No se pudo inicializar Firebase: ${error.message}`,true);console.error("No se pudo inicializar Firebase.",error);maybePrompt()}}
document.addEventListener("click",e=>{const t=e.target,b=t.closest("button[data-k]");
if(b){const k=b.dataset.k,v=+b.dataset.v,x=st[k];if(x&&x.v===v)removeMark(k);else saveMark(k,v);return}
const tk=t.closest("input[data-tk]");if(tk){tk.checked?saveMark(tk.dataset.tk,1):removeMark(tk.dataset.tk);return}
if(t.closest("#deleteResolvedObservations")){deleteResolvedObservations();return}
const observationAction=t.closest("button[data-ob-action]");if(observationAction){updateObservation(observationAction.dataset.obId,observationAction.dataset.obAction);return}
const w=t.closest("button[data-w]");if(w)return saveAtt(w.dataset.w);if(t.id=="chg"){e.preventDefault();openAtt();return}
if(t.id=="atb"||t.id=="mak")return who?saveAtt():openAtt();
const d=t.closest(".cd");if(d){sel=d.dataset.d;calHtml()}});
$("calb").onclick=()=>{sel=today();cm=Number(sel.slice(5,7))-1;cy=Number(sel.slice(0,4));$("mdc").hidden=false;calHtml()};
$("cx").onclick=()=>$("mdc").hidden=true;$("cp").onclick=()=>{cm--;if(cm<0){cm=11;cy--}calHtml()};$("cn").onclick=()=>{cm++;if(cm>11){cm=0;cy++}calHtml()};
$("loginForm").addEventListener("submit",loginWithRole);
$("obRequirement").innerHTML+=RF.map(requirement=>`<option value="${requirement.id}">${requirement.id} · ${escapeHtml(requirement.n)}</option>`).join("");
$("observationForm").addEventListener("submit",saveObservation);$("saveReview").onclick=saveReview;$("weeklyValidationList").addEventListener("submit",saveWeeklyValidation);
$("tmy").onclick=e=>{onlyMe=!onlyMe;e.target.textContent=onlyMe?"Mostrar todos los roles":"Mostrar solo mi rol";teamHtml()};$("q").oninput=rfHtml;$("fp").onclick=e=>{onlyP=!onlyP;e.target.textContent=onlyP?"Ver todos":"Ver solo pendientes";rfHtml()};
$("gq").oninput=ganttHtml;$("gRole").onchange=ganttHtml;$("gState").onchange=ganttHtml;
$("clearGantt").onclick=()=>{$("gq").value="";$("gRole").value="all";$("gState").value="all";ganttHtml()};
$("exportGantt").onclick=exportGanttCsv;$("printGantt").onclick=()=>window.print();
$("th").onclick=()=>{const r=document.documentElement;r.dataset.theme=getComputedStyle(r).getPropertyValue("--bg").trim()=="#0d1324"?"light":"dark"};
$("lg").innerHTML=ROLES.map(r=>`<span><i style="background:var(--${r[0]})"></i>${r[1]}</span>`).join("");

$("dl").value=L("mk3d").u||"";$("dl").onchange=()=>{SV("mk3d",{u:$("dl").value});$("driveStatus").textContent="Enlace guardado en este navegador."};
$("dgo").onclick=()=>{try{const u=new URL($("dl").value.trim());if(!["https:","http:"].includes(u.protocol))throw new Error();window.open(u.href,"_blank","noopener,noreferrer");$("driveStatus").textContent="Abriendo la carpeta de evidencias…"}catch{$("driveStatus").textContent="Pega un enlace web válido (https:// o http://) antes de abrir la carpeta."}};

// Role-scoped implementations below replace the legacy demo handlers without changing checks or calendar behavior.
var requirementApprovals={},requirementApprovalDrafts={},weeklyValidationDrafts={},teamRetrospectiveResponses={},teamRetrospectiveDraft={},teamRetrospectiveDraftUid="",requirementApprovalError="",teamRetrospectiveError="",requirementApprovalsUnsub=null,teamRetrospectiveUnsub=null;
var weeklyValidationEditingId="",weeklyValidationNewWeek=0,weeklyValidationBusyId="",editingObservationId="",requirementApprovalBusyId="";
const TEAM_RETRO_QUESTIONS=[
{key:"time",text:"El equipo gestionó el tiempo y cumplió los plazos de forma realista."},
{key:"improvements",text:"Las mejoras acordadas durante el trabajo se llevaron a la práctica."},
{key:"implementation",text:"La implementación cumplió los criterios de aceptación y la calidad esperada."},
{key:"collaboration",text:"La comunicación y colaboración entre los integrantes fueron efectivas."},
{key:"value",text:"El resultado final aporta valor y responde a las necesidades del proyecto."}
];
function renderRequirementApprovals(){
const role=memberRole(),visible=role==="po"||role==="fe"||role==="be",canEdit=role==="po";
$("requirementApprovals").hidden=!visible;$("requirementApprovalsNav").hidden=!visible;
if(!visible)return;
if(requirementApprovalError){$("requirementApprovalStatus").textContent=`Firestore no permite consultar las aceptaciones: ${requirementApprovalError}. Las reglas actualizadas aún no están activas.`;$("requirementApprovalList").innerHTML='<p class="empty-state">La aceptación por Product Owner requiere publicar las reglas actualizadas después de configurar identidades seguras.</p>';return}
if(!cloudReady){$("requirementApprovalStatus").textContent="Conéctate a Firestore para consultar las decisiones de aceptación.";$("requirementApprovalList").innerHTML='<p class="empty-state">Las decisiones se mostrarán al conectar con la nube.</p>';return}
$("requirementApprovalStatus").textContent=canEdit?"Solo la Product Owner puede registrar, editar o eliminar estas decisiones.":"Consulta de solo lectura: las decisiones las registra la Product Owner.";
$("requirementApprovalList").innerHTML=RF.map((requirement,index)=>{
const data=requirementApprovals[requirement.id]||{},draft=requirementApprovalDrafts[requirement.id]||{},status=draft.status||data.status||"Pendiente",comment=Object.prototype.hasOwnProperty.call(draft,"comment")?draft.comment:data.comment||"",updated=data.updatedBy?`Actualizado por ${escapeHtml(data.updatedBy)} · ${escapeHtml(recordTime(data))}`:"Sin decisión registrada";
if(!canEdit)return `<article class="approval-card"><div class="approval-heading"><b>${escapeHtml(requirement.id)} · ${escapeHtml(requirement.n)}</b><span class="chip ${status==="Aprobado"?"done":status==="Observado"?"no":"pending"}">${escapeHtml(status)}</span></div><p><strong>Sprint ${reqSprint(index)}</strong> · ${escapeHtml(comment||"Sin observaciones de aceptación.")}</p><small class="validation-updated">${updated}</small></article>`;
return `<form class="approval-card" data-requirement-approval="${escapeHtml(requirement.id)}"><div class="approval-heading"><b>${escapeHtml(requirement.id)} · ${escapeHtml(requirement.n)}</b><span class="chip ${status==="Aprobado"?"done":status==="Observado"?"no":"pending"}">${escapeHtml(status)}</span></div><small>Sprint ${reqSprint(index)}</small><label>Decisión<select class="approval-status" ${!cloudReady?"disabled":""}><option ${status==="Pendiente"?"selected":""}>Pendiente</option><option ${status==="Aprobado"?"selected":""}>Aprobado</option><option ${status==="Observado"?"selected":""}>Observado</option></select></label><label>Observaciones<textarea class="approval-comment" maxlength="500" rows="2" ${!cloudReady?"disabled":""} placeholder="Criterio pendiente o motivo de aceptación/observación.">${escapeHtml(comment)}</textarea></label><div class="approval-actions"><small class="validation-updated">${updated}</small><button class="pri" type="submit" ${!cloudReady||requirementApprovalBusyId===requirement.id?"disabled":""}>Guardar</button>${data.status?`<button type="button" class="danger-button" data-approval-delete="${escapeHtml(requirement.id)}" ${!cloudReady?"disabled":""}>Eliminar decisión</button>`:""}</div></form>`
}).join("");
}
async function saveRequirementApproval(event){
event.preventDefault();const form=event.target.closest("form[data-requirement-approval]");if(!form)return;
const id=form.dataset.requirementApproval,index=RF.findIndex(item=>item.id===id),status=form.querySelector(".approval-status").value,comment=form.querySelector(".approval-comment").value.trim();
if(memberRole()!=="po"||index<0){setCloudStatus("Solo la Product Owner puede registrar aceptaciones.",true);return}
if(requirementApprovalError){$("requirementApprovalStatus").textContent="Las reglas de Firestore todavía no permiten guardar aceptaciones.";return}
if(!cloudReady||!currentUid){$("requirementApprovalStatus").textContent="Sin conexión a Firestore; no se guardó la decisión.";return}
if(!["Pendiente","Aprobado","Observado"].includes(status)||comment.length>500){$("requirementApprovalStatus").textContent="Revisa la decisión y el límite de 500 caracteres.";return}
requirementApprovalDrafts[id]={status,comment};
requirementApprovalBusyId=id;form.querySelector('button[type="submit"]').disabled=true;
const record={requirement:id,status,comment,sprint:reqSprint(index),updatedBy:who,updatedUid:currentUid};
try{await db.collection("aprobacionesRequisitos").doc(id).set({...record,updatedAt:firebase.firestore.FieldValue.serverTimestamp()});requirementApprovals[id]={...record,updatedAt:new Date()};delete requirementApprovalDrafts[id];$("requirementApprovalStatus").textContent=`Decisión de ${id} guardada y sincronizada.`;renderRequirementApprovals()}
catch(error){console.error("No se pudo guardar la aceptación del requerimiento.",error);$("requirementApprovalStatus").textContent=`No se guardó ${id}: ${error.message}`}
finally{requirementApprovalBusyId="";form.querySelector('button[type="submit"]')?.removeAttribute("disabled")}
}
async function deleteRequirementApproval(id){
if(memberRole()!=="po"||!cloudReady||!RF_PRIORITY.includes(id)){setCloudStatus("No tienes permiso para eliminar esta decisión.",true);return}
if(requirementApprovalError){$("requirementApprovalStatus").textContent="Las reglas de Firestore todavía no permiten eliminar decisiones.";return}
if(!window.confirm(`¿Eliminar la decisión de aceptación de ${id}?`))return;
try{await db.collection("aprobacionesRequisitos").doc(id).delete();delete requirementApprovals[id];delete requirementApprovalDrafts[id];$("requirementApprovalStatus").textContent=`Decisión de ${id} eliminada.`;renderRequirementApprovals()}
catch(error){console.error("No se pudo eliminar la aceptación del requerimiento.",error);$("requirementApprovalStatus").textContent=`No se eliminó ${id}: ${error.message}`}
}
function renderStakeholderValidation(force=false){
const signedIn=Boolean(who),canEdit=memberRole()==="qa";
$("stakeholderNav").hidden=!signedIn;$("stakeholderValidation").hidden=!signedIn;
if(!signedIn)return;
const container=$("weeklyValidationList");
if(!cloudReady){container.innerHTML='<p class="empty-state">Conéctate a Firestore para consultar las validaciones semanales del equipo.</p>';return}
if(!force&&container.dataset.loaded==="true")return;
container.dataset.loaded="true";
const makeForm=(week,data={},recordId="",cancelable=false)=>{
const id=escapeHtml(recordId),key=recordId||`week-${String(week).padStart(2,"0")}-new`,draft=weeklyValidationDrafts[key]||{},value={...data,...draft},title=value.title||"Validación semanal",titleLocked=Boolean(recordId&&!recordId.includes("-entry-")&&!data.title);
return `<form class="validation-week" data-validation-week="${week}" data-validation-record="${id}"><div class="validation-week-heading"><b>Semana ${week} · ${escapeHtml(ph(week))}</b><label><input class="validation-check" type="checkbox" ${value.validated===true?"checked":""}> Pruebas validadas</label></div><label>Título de la prueba<textarea class="validation-title" maxlength="120" rows="1" placeholder="Ej.: Preparación, borrador, prototipo o cierre" ${titleLocked?"disabled":""}>${escapeHtml(title)}</textarea></label><label>Pruebas realizadas y resultados<textarea class="validation-tests" maxlength="2000" rows="4" placeholder="Describe qué se probó, el resultado obtenido y si pasó correctamente." required>${escapeHtml(value.testSummary||"")}</textarea></label><label>Observaciones y seguimiento<textarea class="validation-observation" maxlength="1000" rows="3" placeholder="Anota hallazgos, pendientes o acciones acordadas.">${escapeHtml(value.observation||"")}</textarea></label><div class="validation-week-footer"><small>${data.updatedBy?`Actualizado por ${escapeHtml(data.updatedBy)} · ${escapeHtml(recordTime(data))}`:"Nueva preparación"}</small><div class="validation-actions"><button class="pri" type="submit" ${!cloudReady||weeklyValidationBusyId===key?"disabled":""}>Guardar</button>${cancelable?'<button type="button" data-validation-action="cancel">Cancelar</button>':""}</div></div></form>`
};
container.innerHTML=Array.from({length:15},(_,index)=>{
const week=index+1,records=Object.entries(weeklyValidations).filter(([,data])=>Number(data.week)===week).map(([id,data])=>({id,data})).sort((a,b)=>(eventDate(b.data)?.getTime()||0)-(eventDate(a.data)?.getTime()||0));
const cards=records.map(({id,data})=>{
if(canEdit&&weeklyValidationEditingId===id)return makeForm(week,data,id,true);
const updated=data.updatedBy?`Actualizado por ${escapeHtml(data.updatedBy)} · ${escapeHtml(recordTime(data))}`:"Sin fecha registrada";
const actions=canEdit?`<div class="validation-actions"><button type="button" data-validation-action="edit" data-validation-id="${escapeHtml(id)}" ${!cloudReady?"disabled":""}>Editar</button><button type="button" class="danger-button" data-validation-action="delete" data-validation-id="${escapeHtml(id)}" ${!cloudReady?"disabled":""}>Eliminar</button></div>`:"";
return `<article class="validation-week ${data.validated===true?"validation-approved":""}"><div class="validation-week-heading"><b>Semana ${week} · ${escapeHtml(ph(week))}</b><span class="validation-result ${data.validated===true?"approved":""}">${data.validated===true?"✓ Validada":"Pendiente"}</span></div><h3 class="validation-title-display">${escapeHtml(data.title||"Validación semanal")}</h3><p><strong>Pruebas realizadas y resultados</strong><br>${data.testSummary?escapeHtml(data.testSummary):"Sin pruebas descritas."}</p><p><strong>Observaciones y seguimiento</strong><br>${data.observation?escapeHtml(data.observation):"Sin observaciones registradas."}</p><small class="validation-updated">${updated}</small>${actions}</article>`
}).join("");
const editOpen=weeklyValidationEditingId&&records.some(record=>record.id===weeklyValidationEditingId),newOpen=weeklyValidationNewWeek===week;
const showInitial=canEdit&&records.length===0&&!editOpen;
const newForm=canEdit&&(newOpen||showInitial)?makeForm(week,{}, "",records.length>0):"";
const addButton=canEdit&&records.length>0&&!newOpen&&!editOpen?`<button type="button" class="validation-add" data-validation-action="new" data-validation-week="${week}">＋ Nueva preparación para semana ${week}</button>`:"";
return `<div class="validation-week-group"><div class="validation-group-heading"><h3>Semana ${week}</h3><span>${records.length} ${records.length===1?"registro":"registros"}</span></div>${cards}${newForm}${addButton||(!records.length&&!canEdit&&!cards?"<p class=\"empty-state\">La stakeholder aún no registra pruebas para esta semana.</p>":"")}</div>`
}).join("");
}
async function saveWeeklyValidation(event){
event.preventDefault();const form=event.target.closest("form[data-validation-week]");if(!form)return;
const week=Number(form.dataset.validationWeek),recordId=form.dataset.validationRecord,weekId=`week-${String(week).padStart(2,"0")}`,status=$("weeklyValidationStatus");
if(memberRole()!=="qa"){status.textContent="Solo la Stakeholder puede guardar validaciones semanales.";return}
if(!cloudReady||!currentUid){status.textContent="La conexión a Firestore no está disponible; no se guardaron los cambios.";return}
const title=form.querySelector(".validation-title").value.trim(),testSummary=form.querySelector(".validation-tests").value.trim(),observation=form.querySelector(".validation-observation").value.trim();
if(!Number.isInteger(week)||week<1||week>15||!title||title.length>120||!testSummary||testSummary.length>2000||observation.length>1000){status.textContent="Completa el título (máx. 120), las pruebas (máx. 2000) y revisa las observaciones (máx. 1000).";return}
const busyId=recordId||`${weekId}-new`;weeklyValidationBusyId=busyId;const data={week,validated:form.querySelector(".validation-check").checked,testSummary,observation,updatedBy:who,updatedUid:currentUid,updatedAt:firebase.firestore.FieldValue.serverTimestamp()};
if(!recordId||recordId.includes("-entry-")||weeklyValidations[recordId]?.title)data.title=title;
form.querySelector('button[type="submit"]').disabled=true;status.textContent=`Guardando la preparación de la semana ${week}…`;
try{
let targetId=recordId;
if(recordId)await db.collection("validacionesSemanales").doc(recordId).update(data);
else{const ref=db.collection("validacionesSemanales").doc();targetId=`${weekId}-entry-${ref.id}`;await db.collection("validacionesSemanales").doc(targetId).set(data)}
weeklyValidations[targetId]={...data,updatedAt:new Date()};
delete weeklyValidationDrafts[busyId];weeklyValidationEditingId="";weeklyValidationNewWeek=0;status.textContent=`Preparación de la semana ${week} guardada y sincronizada con el equipo.`;renderStakeholderValidation(true)
}catch(error){console.error("No se pudo guardar la validación semanal.",error);status.textContent=`No se guardó la validación de la semana ${week}: ${error.message}`}
finally{weeklyValidationBusyId=""}
}
async function updateObservation(noteId,action){
const note=observations.find(item=>item.id===noteId),role=memberRole();
if(action==="edit"){if(role!=="po"||!note)return;editingObservationId=noteId;$("obDeveloper").value=note.developer;$("obRequirement").value=note.requirement;$("obPriority").value=note.priority;$("obText").value=note.text;$("saveObservation").textContent="Guardar cambios";$("cancelObservationEdit").hidden=false;$("observationForm").scrollIntoView({behavior:"smooth",block:"center"});return}
if(action==="cancel-edit"){editingObservationId="";$("observationForm").reset();$("saveObservation").textContent="Enviar observación";$("cancelObservationEdit").hidden=true;return}
if(action==="delete"){if(role!=="po"||!note){setCloudStatus("Solo la Product Owner puede eliminar observaciones.",true);return}
if(!cloudReady||!currentUid){$("observationStatus").textContent="Sin conexión a Firestore; no se eliminó la observación.";return}
if(!window.confirm(`¿Eliminar la observación ${note.requirement} asignada a ${note.developer==="fe"?"Front End":"Back End"}? Esta acción no se puede deshacer.`))return;
try{await db.collection("observaciones").doc(noteId).delete();if(editingObservationId===noteId)updateObservation(noteId,"cancel-edit");$("observationStatus").textContent="Observación eliminada y cambio sincronizado con el equipo."}
catch(error){console.error("No se pudo eliminar la observación.",error);$("observationStatus").textContent=`No se eliminó la observación: ${error.message}`}return}
if(!note||note.developer!==role||!["fe","be"].includes(role)){setCloudStatus("No tienes permiso para responder esta observación.",true);return}
if(!cloudReady||!currentUid){setCloudStatus("La nube todavía no está lista. La observación no se actualizó.",true);return}
const responseField=$(`ob-reply-${noteId}`),response=responseField?responseField.value.trim():note.developerResponse||"",status=action==="start"?"En curso":action==="resolve"?"Resuelta":note.developerStatus==="Resuelta"?"Resuelta":"En curso";
if(!["start","reply","resolve"].includes(action)||note.developerStatus==="Resuelta"&&action!=="reply"){setCloudStatus("La observación ya está resuelta o la acción no es válida.",true);return}
if(action==="resolve"&&!response){setCloudStatus("Escribe una respuesta antes de marcar la observación como resuelta.",true);$(`ob-reply-${noteId}`)?.focus();return}
if(response.length>1000){setCloudStatus("La respuesta no puede superar 1000 caracteres.",true);return}
try{await db.collection("observaciones").doc(noteId).update({developerStatus:status,developerResponse:response,developerUpdatedBy:who,developerUpdatedUid:currentUid,developerUpdatedAt:firebase.firestore.FieldValue.serverTimestamp()})}
catch(error){console.error("No se pudo actualizar la observación asignada.",error);setCloudStatus(`No se actualizó la observación: ${error.message}`)}}
function renderObservations(){
const role=memberRole(),isPO=role==="po",isDeveloper=role==="fe"||role==="be",section=$("observaciones"),form=$("observationForm");
section.hidden=!(isPO||isDeveloper);$("observationsNav").hidden=!(isPO||isDeveloper);
if(!(isPO||isDeveloper)){$("observationRolePanel").innerHTML="";$("observationStatus").textContent="";$("observationList").innerHTML="";form.hidden=true;return}
form.hidden=!isPO;$("saveObservation").disabled=!cloudReady||!isPO;
if(isPO)$("observationRolePanel").innerHTML=`<div class="observation-role-heading"><div><b>Panel de la Product Owner</b><small>Crea, edita y elimina observaciones para cada Developer; resueltas: ${observations.filter(note=>note.developerStatus==="Resuelta").length}.</small></div><button type="button" class="danger-button" id="deleteResolvedObservations" ${!cloudReady||!observations.some(note=>note.developerStatus==="Resuelta")||deletingResolvedObservations?"disabled":""}>${deletingResolvedObservations?"Eliminando…":"🗑 Eliminar resueltas"}</button></div>`;
else $("observationRolePanel").innerHTML='<div class="observation-role-heading"><div><b>Mis observaciones asignadas</b><small>Consulta y responde solo las observaciones dirigidas a tu rol.</small></div></div>';
const visible=observations.filter(note=>isPO||note.developer===role);
$("observationStatus").textContent=cloudReady?`${visible.length} observación(es) visibles para este rol.`:"Conéctate a Firestore para consultar observaciones.";
$("observationList").innerHTML=visible.map(note=>{
const status=note.developerStatus||"Pendiente",canRespond=isDeveloper&&note.developer===role,age=eventDate(note),hours=age?Math.floor((Date.now()-age.getTime())/36e5):0,overdue=status==="Pendiente"&&hours>=24,noteId=escapeHtml(note.id);
return `<article class="observation-card priority-${note.priority==="Bloqueante"?"blocker":note.priority==="Alta"?"high":"normal"} ${overdue?"observation-overdue":""}"><div class="observation-head"><b>${escapeHtml(note.requirement)} · ${escapeHtml(note.developer==="fe"?"Front End":"Back End")}</b><span class="chip ${status==="Resuelta"?"done":status==="En curso"?"wip":"pending"}">${escapeHtml(status)}</span></div><p>${escapeHtml(note.text)}</p><div class="observation-meta"><span class="chip ${note.priority==="Bloqueante"?"no":note.priority==="Alta"?"wip":""}">Prioridad ${escapeHtml(note.priority)}</span><small class="ts">Product Owner · ${escapeHtml(note.author||"")} · ${escapeHtml(recordTime(note))}${status!=="Resuelta"&&age?` · ${hours} h abierta`:""}</small></div>${note.developerResponse?`<div class="developer-response"><b>Respuesta de ${escapeHtml(note.developerUpdatedBy||"Developer")} · ${escapeHtml(note.developerUpdatedAt?recordTime({createdAt:note.developerUpdatedAt}):"")}</b><p>${escapeHtml(note.developerResponse)}</p></div>`:""}${canRespond?`<label class="observation-reply">Respuesta del Developer<textarea id="ob-reply-${noteId}" maxlength="1000" rows="3" placeholder="Describe el avance, solución o evidencia (máx. 1000 caracteres).">${escapeHtml(note.developerResponse||"")}</textarea></label><div class="observation-actions">${status==="Pendiente"?`<button type="button" data-ob-action="start" data-ob-id="${noteId}" ${!cloudReady?"disabled":""}>Tomar observación</button>`:""}<button type="button" class="pri" data-ob-action="reply" data-ob-id="${noteId}" ${!cloudReady?"disabled":""}>${status==="Resuelta"?"Actualizar respuesta":"Guardar respuesta"}</button>${status!=="Resuelta"?`<button type="button" data-ob-action="resolve" data-ob-id="${noteId}" ${!cloudReady?"disabled":""}>Marcar resuelta</button>`:""}</div>`:""}${isPO?`<div class="observation-actions"><button type="button" data-ob-action="edit" data-ob-id="${noteId}" ${!cloudReady?"disabled":""}>Editar</button><button type="button" class="danger-button icon-button" data-ob-action="delete" data-ob-id="${noteId}" ${!cloudReady?"disabled":""}>🗑 Eliminar</button></div>`:""}</article>`
}).join("")||'<p class="empty-state">Aún no hay observaciones para este rol.</p>';
}
async function saveObservation(event){
event.preventDefault();if(memberRole()!=="po"){$("observationStatus").textContent="Solo la Product Owner puede administrar observaciones.";return}
if(!cloudReady||!currentUid){$("observationStatus").textContent="La nube todavía no está lista. No se guardaron los cambios.";return}
const developer=$("obDeveloper").value,requirement=$("obRequirement").value,priority=$("obPriority").value,text=$("obText").value.trim();
if(!["fe","be"].includes(developer)||!RF_PRIORITY.includes(requirement)||!["Normal","Alta","Bloqueante"].includes(priority)||!text||text.length>500){$("observationStatus").textContent="Completa destinatario, requerimiento y observación (máx. 500 caracteres).";return}
const button=$("saveObservation");button.disabled=true;
try{
if(editingObservationId){const previous=observations.find(note=>note.id===editingObservationId),changes={requirement,developer,priority,text,updatedBy:who,updatedUid:currentUid,updatedAt:firebase.firestore.FieldValue.serverTimestamp()};if(previous&&previous.developer!==developer)Object.assign(changes,{developerStatus:"Pendiente",developerResponse:"",developerUpdatedBy:who,developerUpdatedUid:currentUid,developerUpdatedAt:firebase.firestore.FieldValue.serverTimestamp()});await db.collection("observaciones").doc(editingObservationId).update(changes);editingObservationId="";$("observationStatus").textContent="Observación actualizada y sincronizada."}
else{await db.collection("observaciones").add({requirement,developer,priority,text,author:who,authorUid:currentUid,createdAt:firebase.firestore.FieldValue.serverTimestamp()});$("observationStatus").textContent="Observación guardada y compartida con el Developer asignado."}
$("observationForm").reset();button.textContent="Enviar observación";$("cancelObservationEdit").hidden=true
}catch(error){console.error("No se pudo guardar la observación de la Product Owner.",error);$("observationStatus").textContent=`No se guardó la observación: ${error.message}`}
finally{button.disabled=false}
}
function renderTeamRetrospective(){
const available=curW()>=15,visible=Boolean(who)&&available,role=memberRole(),form=$("teamRetrospectiveForm");
if(teamRetrospectiveDraftUid!==currentUid){teamRetrospectiveDraft={};teamRetrospectiveDraftUid=currentUid}
const myResponse=teamRetrospectiveResponses[role]||null;
$("teamRetrospective").hidden=!visible;$("teamRetrospectiveNav").hidden=!visible;
if(!visible)return;
if(teamRetrospectiveError){form.innerHTML="";$("teamRetrospectiveStatus").textContent=`Firestore no permite consultar la retroalimentación: ${teamRetrospectiveError}. Las reglas actualizadas aún no están activas.`;$("teamRetrospectiveResults").innerHTML='<p class="empty-state">La encuesta requiere publicar las reglas actualizadas después de configurar identidades seguras.</p>';return}
const disabled=!cloudReady;
if(form.dataset.loaded==="true")TEAM_RETRO_QUESTIONS.forEach(question=>{const selected=form.querySelector(`[name="${question.key}"]:checked`);if(selected)teamRetrospectiveDraft[question.key]=Number(selected.value)});
const answers={...(myResponse?.answers||{}),...teamRetrospectiveDraft};
form.innerHTML=TEAM_RETRO_QUESTIONS.map((question,index)=>`<fieldset class="retro-question"><legend>${index+1}. ${escapeHtml(question.text)}</legend><div class="likert-options" role="radiogroup" aria-label="${escapeHtml(question.text)}">${[1,2,3,4,5].map(value=>`<label class="likert-option"><input type="radio" name="${question.key}" value="${value}" ${Number(answers[question.key])===value?"checked":""} ${disabled?"disabled":""}><span>${value}</span></label>`).join("")}</div><div class="likert-labels"><span>En desacuerdo</span><span>De acuerdo</span></div></fieldset>`).join("")+`<button class="pri" type="submit" ${disabled?"disabled":""}>${myResponse?"Actualizar mi retroalimentación":"Guardar mi retroalimentación"}</button>`;
form.dataset.loaded="true";
$("teamRetrospectiveStatus").textContent=disabled?"Conéctate a Firestore para registrar la retroalimentación.":myResponse?`Tu respuesta está guardada. Puedes actualizarla. · ${escapeHtml(recordTime(myResponse))}`:"Responde las cinco preguntas; cada rol mantiene una respuesta.";
const responses=Object.entries(teamRetrospectiveResponses),averages=TEAM_RETRO_QUESTIONS.map(question=>{const values=responses.map(([,item])=>Number(item.answers?.[question.key])).filter(Number.isFinite);return values.length?(values.reduce((sum,value)=>sum+value,0)/values.length).toFixed(1):"—"});
$("teamRetrospectiveResults").innerHTML=`<h3>Respuestas del equipo · ${responses.length}/5</h3><div class="retro-average-grid">${TEAM_RETRO_QUESTIONS.map((question,index)=>`<article><b>${averages[index]}</b><span>${escapeHtml(question.text)}</span></article>`).join("")}</div><div class="retro-response-list">${responses.map(([memberRoleId,response])=>{const memberIndex=ROLE_CODES.indexOf(memberRoleId),memberName=memberIndex>=0?WHO[memberIndex][0]:response.name;return `<article class="retro-response"><b>${escapeHtml(memberName)} · ${escapeHtml(response.role==="sm"?"Scrum Master":response.role==="po"?"Product Owner":response.role==="fe"?"Developer Front End":response.role==="be"?"Developer Back End":"Stakeholder")}</b><span>${TEAM_RETRO_QUESTIONS.map((question,index)=>`${index+1}: ${Number(response.answers?.[question.key])||"—"}`).join(" · ")}</span></article>`}).join("")||'<p class="empty-state">Aún no hay respuestas.</p>'}</div>`;
}
async function saveTeamRetrospective(event){
event.preventDefault();if(curW()<15){$("teamRetrospectiveStatus").textContent="La retroalimentación se habilita al llegar la semana 15.";return}
if(teamRetrospectiveError){$("teamRetrospectiveStatus").textContent="Las reglas de Firestore todavía no permiten guardar la retroalimentación.";return}
const role=memberRole(),roleIndex=ROLE_CODES.indexOf(role);
if(roleIndex<0||!cloudReady||!currentUid){$("teamRetrospectiveStatus").textContent="Conéctate como integrante del equipo cuando la semana 15 esté habilitada.";return}
const answers={};for(const question of TEAM_RETRO_QUESTIONS){const selected=$("teamRetrospectiveForm").querySelector(`[name="${question.key}"]:checked`);answers[question.key]=selected?Number(selected.value):0}
if(Object.values(answers).some(value=>!Number.isInteger(value)||value<1||value>5)){$("teamRetrospectiveStatus").textContent="Marca una respuesta del 1 al 5 en cada pregunta.";return}
const button=$("teamRetrospectiveForm").querySelector('button[type="submit"]');button.disabled=true;$("teamRetrospectiveStatus").textContent="Guardando tu retroalimentación…";
try{await db.collection("retrospectivaLikert").doc(role).set({week:15,role,name:who,answers,uid:currentUid,updatedAt:firebase.firestore.FieldValue.serverTimestamp()});teamRetrospectiveResponses[role]={week:15,role,name:who,answers,uid:currentUid,updatedAt:new Date()};teamRetrospectiveDraft={};$("teamRetrospectiveStatus").textContent="Retroalimentación guardada y sincronizada con el equipo.";renderTeamRetrospective()}
catch(error){console.error("No se pudo guardar la retroalimentación del equipo.",error);$("teamRetrospectiveStatus").textContent=`No se guardó la retroalimentación: ${error.message}`}
finally{button.disabled=false}
}
function render(){
rfHtml();rnfHtml();ganttHtml();rolesHtml();cerHtml();teamHtml();stats();banner();panel();renderObservations();renderRequirementApprovals();renderReview();$("teacherReviewNav").hidden=memberRole()!=="sm";renderStakeholderValidation();renderTeamRetrospective();if(!$("mdc").hidden)calHtml()
}
function stopCloudSubscriptions(){
if(marksUnsub)marksUnsub();if(attendanceUnsub)attendanceUnsub();if(observationsUnsub)observationsUnsub();if(reviewUnsub)reviewUnsub();if(weeklyValidationUnsub)weeklyValidationUnsub();if(requirementApprovalsUnsub)requirementApprovalsUnsub();if(teamRetrospectiveUnsub)teamRetrospectiveUnsub();
marksUnsub=null;attendanceUnsub=null;observationsUnsub=null;reviewUnsub=null;weeklyValidationUnsub=null;requirementApprovalsUnsub=null;teamRetrospectiveUnsub=null
}
function subscribeCloudData(){
stopCloudSubscriptions();cloudReady=false;
requirementApprovalError="";teamRetrospectiveError="";
let marksReady=false,attendanceReady=false,observationsReady=!["po","fe","be"].includes(memberRole()),reviewReady=memberRole()!=="sm",weeklyValidationReady=false;
const uid=currentUid,role=memberRole();
setCloudStatus("Cargando la información compartida desde Firestore…");
const ready=()=>{if(!marksReady||!attendanceReady||!observationsReady||!reviewReady||!weeklyValidationReady)return;cloudReady=true;setCloudStatus(`Conectado a Firestore · ${who} · cambios sincronizados en tiempo real.`);render()};
const failed=(label,error)=>{cloudReady=false;console.error(label,error);setCloudStatus(`${label}: ${error.message}`,true);render()};
attendanceUnsub=db.collection("asist").onSnapshot(snapshot=>{att={};snapshot.forEach(doc=>{att[doc.id]=doc.data()});attendanceReady=true;render();ready()},error=>failed("No se pudieron leer las asistencias",error));
if(["po","fe","be"].includes(role)){
let query=db.collection("observaciones");
if(role!=="po")query=query.where("developer","==",role);
observationsUnsub=query.onSnapshot(snapshot=>{observations=snapshot.docs.map(doc=>({id:doc.id,...doc.data()})).sort((a,b)=>(eventDate(b)?.getTime()||0)-(eventDate(a)?.getTime()||0));observationsReady=true;render();ready()},error=>failed("No se pudieron leer las observaciones asignadas",error))
}else observations=[];
if(role==="sm")reviewUnsub=db.collection("evaluaciones").doc(REVIEW_ID).onSnapshot(snapshot=>{review=snapshot.exists?{...REVIEW_FIELDS,...snapshot.data()}:{...REVIEW_FIELDS};populateReview();reviewReady=true;render();ready()},error=>failed("No se pudo leer la evaluación docente",error));
else review={...REVIEW_FIELDS};
weeklyValidationUnsub=db.collection("validacionesSemanales").onSnapshot(snapshot=>{weeklyValidations={};snapshot.forEach(doc=>{weeklyValidations[doc.id]=doc.data()});weeklyValidationReady=true;renderStakeholderValidation(true);ready()},error=>failed("No se pudieron leer las validaciones semanales",error));
if(["po","fe","be"].includes(role))requirementApprovalsUnsub=db.collection("aprobacionesRequisitos").onSnapshot(snapshot=>{requirementApprovalError="";requirementApprovals={};snapshot.forEach(doc=>{requirementApprovals[doc.id]=doc.data()});renderRequirementApprovals()},error=>{requirementApprovalError=error.message;requirementApprovals={};console.error("No se pudieron leer las aceptaciones de requerimientos.",error);renderRequirementApprovals()});
else requirementApprovals={};
teamRetrospectiveUnsub=db.collection("retrospectivaLikert").onSnapshot(snapshot=>{teamRetrospectiveError="";teamRetrospectiveResponses={};snapshot.forEach(doc=>{teamRetrospectiveResponses[doc.id]=doc.data()});renderTeamRetrospective()},error=>{teamRetrospectiveError=error.message;teamRetrospectiveResponses={};console.error("No se pudo leer la retroalimentación del equipo.",error);renderTeamRetrospective()});
ensureProjectChecksReset().then(()=>{if(currentUid!==uid)return;marksUnsub=db.collection("marks").onSnapshot(snapshot=>{st={};snapshot.forEach(doc=>{st[doc.id]=doc.data()});marksReady=true;render();ready()},error=>failed("No se pudieron leer los checks en la nube",error))}).catch(error=>failed("No se pudieron cargar las marcas existentes",error))
}
document.addEventListener("click",event=>{
const button=event.target.closest("[data-validation-action]");
if(button){
const action=button.dataset.validationAction,id=button.dataset.validationId,week=Number(button.dataset.validationWeek);
if(action==="new"){weeklyValidationEditingId="";weeklyValidationNewWeek=week;renderStakeholderValidation(true)}
if(action==="edit"){weeklyValidationEditingId=id;weeklyValidationNewWeek=0;renderStakeholderValidation(true)}
if(action==="cancel"){const form=button.closest("form[data-validation-week]");if(form){const key=form.dataset.validationRecord||`week-${String(form.dataset.validationWeek).padStart(2,"0")}-new`;delete weeklyValidationDrafts[key]}weeklyValidationEditingId="";weeklyValidationNewWeek=0;renderStakeholderValidation(true)}
if(action==="delete"){
if(memberRole()!=="qa"||!id){$("weeklyValidationStatus").textContent="Solo la Stakeholder puede eliminar validaciones.";return}
if(!cloudReady||!currentUid){$("weeklyValidationStatus").textContent="Sin conexión a Firestore; no se eliminó la prueba.";return}
if(!window.confirm("¿Eliminar esta prueba y sus observaciones de Firestore para todo el equipo? Esta acción no se puede deshacer."))return;
db.collection("validacionesSemanales").doc(id).delete().then(()=>{delete weeklyValidationDrafts[id];delete weeklyValidations[id];$("weeklyValidationStatus").textContent="Prueba eliminada y cambio sincronizado con el equipo.";renderStakeholderValidation(true)}).catch(error=>{$("weeklyValidationStatus").textContent=`No se eliminó la prueba: ${error.message}`;console.error("No se pudo eliminar la validación semanal.",error)})
}
return
}
const approval=event.target.closest("[data-approval-delete]");if(approval)deleteRequirementApproval(approval.dataset.approvalDelete)
});
$("requirementApprovalList").addEventListener("submit",saveRequirementApproval);
$("requirementApprovalList").addEventListener("input",event=>{const form=event.target.closest("form[data-requirement-approval]");if(form)requirementApprovalDrafts[form.dataset.requirementApproval]={status:form.querySelector(".approval-status").value,comment:form.querySelector(".approval-comment").value}});
$("requirementApprovalList").addEventListener("change",event=>{const form=event.target.closest("form[data-requirement-approval]");if(form)requirementApprovalDrafts[form.dataset.requirementApproval]={status:form.querySelector(".approval-status").value,comment:form.querySelector(".approval-comment").value}});
$("weeklyValidationList").addEventListener("input",event=>{const form=event.target.closest("form[data-validation-week]");if(form){const key=form.dataset.validationRecord||`week-${String(form.dataset.validationWeek).padStart(2,"0")}-new`;weeklyValidationDrafts[key]={title:form.querySelector(".validation-title").value,testSummary:form.querySelector(".validation-tests").value,observation:form.querySelector(".validation-observation").value,validated:form.querySelector(".validation-check").checked}}});
$("weeklyValidationList").addEventListener("change",event=>{const form=event.target.closest("form[data-validation-week]");if(form){const key=form.dataset.validationRecord||`week-${String(form.dataset.validationWeek).padStart(2,"0")}-new`;weeklyValidationDrafts[key]={title:form.querySelector(".validation-title").value,testSummary:form.querySelector(".validation-tests").value,observation:form.querySelector(".validation-observation").value,validated:form.querySelector(".validation-check").checked}}});
$("teamRetrospectiveForm").addEventListener("change",event=>{const input=event.target;if(input.matches('input[type="radio"]'))teamRetrospectiveDraft[input.name]=Number(input.value)});
$("teamRetrospectiveForm").addEventListener("submit",saveTeamRetrospective);
$("cancelObservationEdit").addEventListener("click",()=>updateObservation(editingObservationId,"cancel-edit"));
setInterval(()=>{if(who&&curW()>=15&&$("teamRetrospective").hidden)renderTeamRetrospective()},60000);

render();setInterval(tick,1000);setInterval(render,60000);startCloudMode();
