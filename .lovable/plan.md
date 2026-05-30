# Plan: Subsistemas reales por módulo — G.A.M. Buena Vista

Cada módulo del Plan Maestro pasa de ser **una sola pantalla** a un **subsistema completo** con su propia navegación interna, listados, detalle, formularios (alta/edición), filtros y acciones — todo operando sobre un **store local en memoria** (Zustand) listo para reemplazar por consultas a Lovable Cloud sin tocar la UI.

## Arquitectura común para todos los subsistemas

```
/<modulo>                     → Resumen del subsistema (KPIs + accesos)
/<modulo>/<entidad>           → Listado (tabla + filtros + buscador + acciones)
/<modulo>/<entidad>/nuevo     → Formulario de alta (drawer/sheet)
/<modulo>/<entidad>/$id       → Ficha de detalle (tabs internos)
/<modulo>/configuracion       → Parámetros propios del subsistema
```

- `ModuleShell` (nuevo): header del subsistema + breadcrumb + **sub-nav horizontal** de entidades.
- `EntityToolbar`: buscador, filtros por estado, exportar, acciones masivas, botón "Nuevo".
- `FormSheet`: drawer lateral reutilizable para alta/edición con validación Zod.
- `DetailTabs`: pestañas (Resumen / Movimientos / Documentos / Auditoría).
- `useEntityStore<T>()`: factory Zustand con `list / get / create / update / remove / filter` — interfaz idéntica a la futura capa Supabase.

## Subsistemas y sub-módulos

### 1. Recursos Humanos (`/rrhh`)
- `funcionarios` (legajo, contrato, ficha con tabs: Datos, Contrato, Asistencia, Historial)
- `planillas` (generar, aprobar, exportar; detalle con líneas por funcionario)
- `asistencia` (marcaciones, atrasos, justificaciones)
- `solicitudes` (vacaciones, permisos, licencias — workflow aprobar/rechazar)
- `cargos-secretarias` (catálogo organizacional)

### 2. Recaudaciones (`/recaudaciones`)
- `contribuyentes` (alta natural/jurídico, ficha con deudas y pagos)
- `deudas` (generación por concepto, plan de pagos, descuentos)
- `conceptos` (inmuebles, vehículos, patentes, tasas — parámetros y vigencias)
- `mora` (segmentación, acciones de cobro)

### 3. Catastro (`/catastro`)
- `predios` (alta, ficha con datos técnicos + propietarios + avalúo)
- `mapa` (vista SVG interactiva por UV/zona)
- `zonas` (UV, valores por m², coeficientes)
- `tramites` (mutaciones, fusiones, divisiones)

### 4. Pagos Electrónicos (`/pagos`)
- `ordenes` (generar orden, QR, vencimiento)
- `movimientos` (libro de caja, filtros por canal y fecha)
- `conciliacion` (extractos bancarios, matching, diferencias)
- `canales` (configuración de bancos, billeteras)

### 5. Portal Ciudadano (`/portal`)
- `consulta-deuda` (público, sin login)
- `mis-tramites` (timeline)
- `reclamos` (alta y seguimiento)
- `pagar-en-linea` (simulación QR/tarjeta)

### 6. Fiscalización (`/fiscalizacion`)
- `notificaciones` (emisión masiva, plantillas, acuses)
- `casos` (apertura por mora, etapas, resolución)
- `inspecciones` (asignación a fiscalizadores, georreferencia)

### 7. Reportes / BI (`/reportes`)
- `tablero` (KPIs ejecutivos)
- `catalogo` (lista de reportes con parámetros)
- `constructor` (selector simple de dimensiones/métricas)

### 8. Expedientes (`/expedientes`)
- `expedientes` (alta, ficha con documentos, firmas, derivaciones)
- `plantillas` (CRUD)
- `firmas` (cola de firma digital)

### 9. Configuración (`/configuracion`)
- `usuarios`, `roles`, `permisos`
- `parametros` (tasas, vigencias, fórmulas versionadas)
- `auditoria` (log inmutable filtrable)
- `conexiones` (Cloud, bancos, SRI)
- `notificaciones-plantillas` (SMS/email)

## Detalles técnicos

- **Estado:** instalar `zustand`. Un store por entidad: `src/stores/<entidad>.store.ts`. Cada store expone la **misma interfaz** que tendrá el cliente Supabase (`list({filters,page}) → {rows,count}`), de modo que migrar = cambiar la implementación interna del store.
- **Validación:** `zod` para schemas; reutilizados luego como tipos de filas Postgres.
- **Formularios:** `react-hook-form` + `zodResolver` + componentes shadcn `Form`, `Input`, `Select`, `Textarea`, `Sheet`.
- **Tablas:** se mantiene `DataTable` actual; se le añade paginación, orden por columna y selección múltiple.
- **Routing:** se aprovecha file-based de TanStack. Estructura por carpetas:
  ```
  src/routes/rrhh.tsx                 (layout con ModuleShell + Outlet)
  src/routes/rrhh.index.tsx           (resumen)
  src/routes/rrhh.funcionarios.tsx
  src/routes/rrhh.funcionarios.$ci.tsx
  src/routes/rrhh.planillas.tsx
  ...
  ```
  Se aplica el mismo patrón a los 9 módulos.
- **Mock seed:** `src/lib/mock-data.ts` se separa en `src/lib/seed/<entidad>.ts` y se carga al instanciar cada store.
- **Compat Cloud:** cada store ya incluye comentario `// TODO: reemplazar por supabase.from('<tabla>')` con la query exacta esperada.

## Entregables y orden de ejecución

1. Infraestructura común: `zustand`, `ModuleShell`, `EntityToolbar`, `FormSheet`, `DetailTabs`, factory de store y schemas Zod base.
2. Subsistemas en este orden (mayor valor primero):
   1. Recaudaciones  2. Catastro  3. RRHH  4. Pagos  5. Fiscalización
   6. Expedientes  7. Portal Ciudadano  8. Reportes  9. Configuración
3. Ajuste de `AppSidebar` para mostrar la sub-nav del subsistema activo.
4. QA visual de cada subsistema en el preview.

## Alcance explícitamente fuera

- No se activa Lovable Cloud todavía (se hace al final cuando confirmes).
- No hay autenticación real ni RLS — solo guardias mock.
- No hay integración bancaria real, solo simulación de conciliación.

## Tamaño estimado

~45-55 archivos nuevos, ~9 stores, ~25 formularios. Todo dentro del mismo sistema de diseño actual (verde institucional, dorado, teal).

¿Confirmas que avance con este plan tal cual, o ajustamos prioridades / recortamos sub-módulos?