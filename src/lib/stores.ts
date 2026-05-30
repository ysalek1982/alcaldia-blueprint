// Stores en memoria — interfaz idéntica a la futura capa Supabase.
// Al migrar: reemplazar el seed por await supabase.from('<tabla>').select(...)
// Las claves coinciden con los nombres de tabla previstos en el Plan Maestro.

import { createEntityStore } from "./store-factory";

// ============ RRHH ============

export type Funcionario = {
  id: string;
  ci: string;
  nombre: string;
  cargo: string;
  secretaria: string;
  estado: "Activo" | "Vacaciones" | "Licencia" | "Baja";
  ingreso: string;
  salario: number;
  email?: string;
  telefono?: string;
};

export const useFuncionariosStore = createEntityStore<Funcionario>(
  [
    { id: "f1", ci: "5123488", nombre: "María González Suárez", cargo: "Directora de RRHH", secretaria: "Administrativa", estado: "Activo", ingreso: "2018-03-12", salario: 9800, email: "mgonzalez@buenavista.gob.bo", telefono: "76543210" },
    { id: "f2", ci: "6781234", nombre: "Juan Carlos Roca", cargo: "Tesorero Municipal", secretaria: "Finanzas", estado: "Activo", ingreso: "2020-07-01", salario: 10500, email: "jroca@buenavista.gob.bo" },
    { id: "f3", ci: "4922110", nombre: "Sofía Mendoza Vaca", cargo: "Jefa de Catastro", secretaria: "Planificación", estado: "Activo", ingreso: "2019-11-04", salario: 8900 },
    { id: "f4", ci: "7834509", nombre: "Luis Fernando Peña", cargo: "Fiscalizador", secretaria: "Recaudaciones", estado: "Vacaciones", ingreso: "2021-02-15", salario: 6800 },
    { id: "f5", ci: "3344128", nombre: "Ana Lucía Choque", cargo: "Auxiliar Caja 02", secretaria: "Finanzas", estado: "Activo", ingreso: "2022-09-19", salario: 4900 },
    { id: "f6", ci: "9981273", nombre: "Pedro Antonio Rivero", cargo: "Inspector de Obras", secretaria: "Obras Públicas", estado: "Activo", ingreso: "2017-05-22", salario: 7200 },
    { id: "f7", ci: "1023456", nombre: "Carla Justiniano", cargo: "Secretaria Municipal", secretaria: "Despacho", estado: "Activo", ingreso: "2023-01-10", salario: 5200 },
    { id: "f8", ci: "8765432", nombre: "Diego Mercado", cargo: "Chofer", secretaria: "Servicios", estado: "Licencia", ingreso: "2019-08-08", salario: 4100 },
  ],
  ["ci", "nombre", "cargo", "secretaria"],
);

export type Planilla = {
  id: string;
  periodo: string;
  total: number;
  funcionarios: number;
  estado: "Borrador" | "Aprobada" | "Pagada";
  generada: string;
};

export const usePlanillasStore = createEntityStore<Planilla>(
  [
    { id: "pl1", periodo: "2026-09", total: 1842300, funcionarios: 218, estado: "Borrador", generada: "2026-09-25" },
    { id: "pl2", periodo: "2026-08", total: 1820150, funcionarios: 217, estado: "Pagada", generada: "2026-08-25" },
    { id: "pl3", periodo: "2026-07", total: 1815700, funcionarios: 216, estado: "Pagada", generada: "2026-07-25" },
    { id: "pl4", periodo: "2026-06", total: 1798400, funcionarios: 214, estado: "Pagada", generada: "2026-06-25" },
  ],
  ["periodo"],
);

export type Solicitud = {
  id: string;
  funcionario: string;
  tipo: "Vacación" | "Permiso" | "Licencia médica";
  desde: string;
  hasta: string;
  dias: number;
  estado: "Pendiente" | "Aprobada" | "Rechazada";
};

export const useSolicitudesStore = createEntityStore<Solicitud>(
  [
    { id: "s1", funcionario: "Luis Fernando Peña", tipo: "Vacación", desde: "2026-09-15", hasta: "2026-09-29", dias: 15, estado: "Aprobada" },
    { id: "s2", funcionario: "Diego Mercado", tipo: "Licencia médica", desde: "2026-09-10", hasta: "2026-09-20", dias: 11, estado: "Aprobada" },
    { id: "s3", funcionario: "Ana Lucía Choque", tipo: "Permiso", desde: "2026-10-02", hasta: "2026-10-02", dias: 1, estado: "Pendiente" },
    { id: "s4", funcionario: "Pedro Rivero", tipo: "Vacación", desde: "2026-10-10", hasta: "2026-10-24", dias: 15, estado: "Pendiente" },
  ],
  ["funcionario", "tipo"],
);

// ============ RECAUDACIONES ============

export type Contribuyente = {
  id: string;
  nit: string;
  nombre: string;
  tipo: "Natural" | "Jurídico";
  deuda: number;
  estado: "Al día" | "Mora" | "Notificado" | "Plan de pago";
  predios: number;
  email?: string;
  telefono?: string;
  direccion?: string;
};

export const useContribuyentesStore = createEntityStore<Contribuyente>(
  [
    { id: "c1", nit: "1234567019", nombre: "Comercial San Isidro SRL", tipo: "Jurídico", deuda: 12480, estado: "Mora", predios: 2, email: "info@sanisidro.bo" },
    { id: "c2", nit: "5123488", nombre: "María González Suárez", tipo: "Natural", deuda: 0, estado: "Al día", predios: 1 },
    { id: "c3", nit: "7894561", nombre: "Hotel Amboró", tipo: "Jurídico", deuda: 3250, estado: "Plan de pago", predios: 1, email: "reservas@hotelamboro.com" },
    { id: "c4", nit: "2233445", nombre: "Cooperativa Buena Vista", tipo: "Jurídico", deuda: 0, estado: "Al día", predios: 4 },
    { id: "c5", nit: "6677889", nombre: "Roberto Aguilar Vargas", tipo: "Natural", deuda: 845, estado: "Notificado", predios: 1, telefono: "78912345" },
    { id: "c6", nit: "9988776", nombre: "Distribuidora El Surtidor", tipo: "Jurídico", deuda: 5640, estado: "Mora", predios: 1 },
    { id: "c7", nit: "4455667", nombre: "Carmen Mercado Pinto", tipo: "Natural", deuda: 0, estado: "Al día", predios: 2 },
    { id: "c8", nit: "1122334", nombre: "Inmobiliaria Ichilo SRL", tipo: "Jurídico", deuda: 8920, estado: "Mora", predios: 6 },
  ],
  ["nit", "nombre"],
);

export type Concepto = {
  id: string;
  codigo: string;
  nombre: string;
  categoria: "Impuesto" | "Tasa" | "Patente" | "Multa";
  formula: string;
  vigenciaDesde: string;
  estado: "Vigente" | "Histórico";
};

export const useConceptosStore = createEntityStore<Concepto>(
  [
    { id: "co1", codigo: "IMP-INM", nombre: "Impuesto a la propiedad de inmuebles", categoria: "Impuesto", formula: "avaluo * alícuota_progresiva", vigenciaDesde: "2026-01-01", estado: "Vigente" },
    { id: "co2", codigo: "IMP-VEH", nombre: "Impuesto a vehículos automotores", categoria: "Impuesto", formula: "tabla_oficial_RUAT(año, modelo)", vigenciaDesde: "2026-01-01", estado: "Vigente" },
    { id: "co3", codigo: "PAT-MUN", nombre: "Patente municipal de funcionamiento", categoria: "Patente", formula: "categoria_actividad * coef_zona", vigenciaDesde: "2026-01-01", estado: "Vigente" },
    { id: "co4", codigo: "TASA-ASEO", nombre: "Tasa de aseo urbano", categoria: "Tasa", formula: "tarifa_fija_por_categoria", vigenciaDesde: "2026-01-01", estado: "Vigente" },
    { id: "co5", codigo: "MUL-OBRA", nombre: "Multa por construcción sin permiso", categoria: "Multa", formula: "superficie * UFV * 0.3", vigenciaDesde: "2025-06-01", estado: "Vigente" },
  ],
  ["codigo", "nombre", "categoria"],
);

export type Deuda = {
  id: string;
  contribuyente: string;
  concepto: string;
  gestion: number;
  monto: number;
  saldo: number;
  vencimiento: string;
  estado: "Vigente" | "Vencida" | "En plan" | "Pagada";
};

export const useDeudasStore = createEntityStore<Deuda>(
  [
    { id: "d1", contribuyente: "Comercial San Isidro SRL", concepto: "Patente municipal", gestion: 2026, monto: 6240, saldo: 6240, vencimiento: "2026-06-30", estado: "Vencida" },
    { id: "d2", contribuyente: "Comercial San Isidro SRL", concepto: "Inmueble UV-12", gestion: 2026, monto: 6240, saldo: 6240, vencimiento: "2026-08-15", estado: "Vencida" },
    { id: "d3", contribuyente: "Hotel Amboró", concepto: "Inmueble UV-03", gestion: 2026, monto: 8500, saldo: 3250, vencimiento: "2026-09-30", estado: "En plan" },
    { id: "d4", contribuyente: "Roberto Aguilar Vargas", concepto: "Vehículo 3421-BVA", gestion: 2026, monto: 845, saldo: 845, vencimiento: "2026-07-30", estado: "Vencida" },
    { id: "d5", contribuyente: "Distribuidora El Surtidor", concepto: "Patente municipal", gestion: 2026, monto: 5640, saldo: 5640, vencimiento: "2026-08-30", estado: "Vencida" },
    { id: "d6", contribuyente: "Inmobiliaria Ichilo SRL", concepto: "Inmuebles UV-22 (6)", gestion: 2026, monto: 8920, saldo: 8920, vencimiento: "2026-08-15", estado: "Vencida" },
  ],
  ["contribuyente", "concepto"],
);

// ============ CATASTRO ============

export type Predio = {
  id: string;
  codigo: string;
  zona: string;
  direccion: string;
  propietario: string;
  superficie: number;
  avaluo: number;
  uso: "Residencial" | "Comercial" | "Industrial" | "Mixto" | "Baldío";
  estado: "Activo" | "En revisión" | "Suspendido";
};

export const usePrediosStore = createEntityStore<Predio>(
  [
    { id: "p1", codigo: "BV-01-04-12-007", zona: "UV-12", direccion: "Calle Sucre #245", propietario: "Comercial San Isidro SRL", superficie: 480, avaluo: 285000, uso: "Comercial", estado: "Activo" },
    { id: "p2", codigo: "BV-02-01-03-018", zona: "UV-03", direccion: "Av. Amboró km 1", propietario: "Hotel Amboró", superficie: 2200, avaluo: 1450000, uso: "Comercial", estado: "Activo" },
    { id: "p3", codigo: "BV-01-02-08-004", zona: "UV-08", direccion: "Calle Bolívar #112", propietario: "María González Suárez", superficie: 350, avaluo: 165000, uso: "Residencial", estado: "Activo" },
    { id: "p4", codigo: "BV-03-05-01-021", zona: "UV-22", direccion: "Barrio El Carmen", propietario: "Cooperativa Buena Vista", superficie: 1200, avaluo: 540000, uso: "Mixto", estado: "Activo" },
    { id: "p5", codigo: "BV-02-03-05-012", zona: "UV-05", direccion: "Calle Junín #88", propietario: "Carmen Mercado Pinto", superficie: 280, avaluo: 132000, uso: "Residencial", estado: "Activo" },
    { id: "p6", codigo: "BV-04-01-02-001", zona: "UV-30", direccion: "Zona industrial sur", propietario: "Distribuidora El Surtidor", superficie: 3400, avaluo: 980000, uso: "Industrial", estado: "En revisión" },
  ],
  ["codigo", "direccion", "propietario", "zona"],
);

export type Zona = {
  id: string;
  codigo: string;
  nombre: string;
  valorM2: number;
  coeficiente: number;
  predios: number;
};

export const useZonasStore = createEntityStore<Zona>(
  [
    { id: "z1", codigo: "UV-03", nombre: "Centro histórico", valorM2: 650, coeficiente: 1.5, predios: 184 },
    { id: "z2", codigo: "UV-05", nombre: "Norte residencial", valorM2: 470, coeficiente: 1.2, predios: 312 },
    { id: "z3", codigo: "UV-08", nombre: "Sur residencial", valorM2: 425, coeficiente: 1.1, predios: 268 },
    { id: "z4", codigo: "UV-12", nombre: "Comercial Sucre", valorM2: 720, coeficiente: 1.6, predios: 95 },
    { id: "z5", codigo: "UV-22", nombre: "El Carmen", valorM2: 380, coeficiente: 1.0, predios: 421 },
    { id: "z6", codigo: "UV-30", nombre: "Industrial sur", valorM2: 290, coeficiente: 0.9, predios: 47 },
  ],
  ["codigo", "nombre"],
);

// ============ PAGOS ============

export type Pago = {
  id: string;
  fecha: string;
  recibo: string;
  contribuyente: string;
  concepto: string;
  canal: "Banco Unión" | "BCP" | "BNB" | "QR Tigo Money" | "Caja municipal" | "Web" | "Transferencia BCP";
  monto: number;
  estado: "Aplicado" | "Observado" | "Anulado";
};

export const usePagosStore = createEntityStore<Pago>(
  [
    { id: "pg1", fecha: "2026-09-12 10:14", recibo: "REC-2026-04821", contribuyente: "Hotel Amboró", concepto: "Patente municipal Q3", canal: "Banco Unión", monto: 1820, estado: "Aplicado" },
    { id: "pg2", fecha: "2026-09-12 09:47", recibo: "REC-2026-04820", contribuyente: "Comercial San Isidro", concepto: "Inmueble 2025", canal: "QR Tigo Money", monto: 4250, estado: "Aplicado" },
    { id: "pg3", fecha: "2026-09-12 09:31", recibo: "REC-2026-04819", contribuyente: "Roberto Aguilar V.", concepto: "Vehículo placa 3421-BVA", canal: "Caja municipal", monto: 645, estado: "Aplicado" },
    { id: "pg4", fecha: "2026-09-11 16:02", recibo: "REC-2026-04818", contribuyente: "María González S.", concepto: "Tasa de aseo", canal: "Web", monto: 120, estado: "Observado" },
    { id: "pg5", fecha: "2026-09-11 15:45", recibo: "REC-2026-04817", contribuyente: "Cooperativa Buena Vista", concepto: "Inmuebles (4)", canal: "Transferencia BCP", monto: 8900, estado: "Aplicado" },
    { id: "pg6", fecha: "2026-09-11 11:20", recibo: "REC-2026-04816", contribuyente: "Carmen Mercado P.", concepto: "Tasa de aseo", canal: "QR Tigo Money", monto: 95, estado: "Aplicado" },
  ],
  ["recibo", "contribuyente", "concepto", "canal"],
);

export type OrdenPago = {
  id: string;
  numero: string;
  contribuyente: string;
  concepto: string;
  monto: number;
  vencimiento: string;
  estado: "Pendiente" | "Pagada" | "Vencida" | "Anulada";
};

export const useOrdenesStore = createEntityStore<OrdenPago>(
  [
    { id: "o1", numero: "ORD-2026-9821", contribuyente: "Comercial San Isidro SRL", concepto: "Patente municipal Q3", monto: 6240, vencimiento: "2026-09-30", estado: "Pendiente" },
    { id: "o2", numero: "ORD-2026-9820", contribuyente: "Hotel Amboró", concepto: "Cuota 2/4 plan de pago", monto: 1625, vencimiento: "2026-10-15", estado: "Pendiente" },
    { id: "o3", numero: "ORD-2026-9819", contribuyente: "Inmobiliaria Ichilo", concepto: "Inmuebles UV-22", monto: 8920, vencimiento: "2026-09-25", estado: "Vencida" },
  ],
  ["numero", "contribuyente"],
);

// ============ FISCALIZACIÓN ============

export type Notificacion = {
  id: string;
  codigo: string;
  contribuyente: string;
  tipo: "Mora — Patente" | "Mora — Inmueble" | "Observación catastral" | "Vencimiento próximo" | "Última intimación";
  monto: number;
  vencimiento: string;
  estado: "Pendiente" | "Notificado" | "En gestión" | "Reincidente" | "Resuelto";
  canal: "Email" | "SMS" | "Carta" | "Visita";
};

export const useNotificacionesStore = createEntityStore<Notificacion>(
  [
    { id: "n1", codigo: "NOT-2026-1182", contribuyente: "Comercial San Isidro SRL", tipo: "Mora — Patente", monto: 12480, vencimiento: "2026-08-15", estado: "Notificado", canal: "Carta" },
    { id: "n2", codigo: "NOT-2026-1181", contribuyente: "Inmobiliaria Ichilo", tipo: "Observación catastral", monto: 0, vencimiento: "2026-09-20", estado: "En gestión", canal: "Email" },
    { id: "n3", codigo: "NOT-2026-1180", contribuyente: "Hotel Amboró", tipo: "Vencimiento próximo", monto: 3250, vencimiento: "2026-09-30", estado: "Pendiente", canal: "SMS" },
    { id: "n4", codigo: "NOT-2026-1179", contribuyente: "Roberto Aguilar V.", tipo: "Mora — Inmueble", monto: 845, vencimiento: "2026-07-30", estado: "Reincidente", canal: "Visita" },
    { id: "n5", codigo: "NOT-2026-1178", contribuyente: "Distribuidora El Surtidor", tipo: "Mora — Patente", monto: 5640, vencimiento: "2026-08-30", estado: "Notificado", canal: "Email" },
  ],
  ["codigo", "contribuyente"],
);

export type Caso = {
  id: string;
  codigo: string;
  contribuyente: string;
  etapa: "Apertura" | "Notificación" | "Intimación" | "Coactivo" | "Cerrado";
  monto: number;
  abierto: string;
  fiscalizador: string;
};

export const useCasosStore = createEntityStore<Caso>(
  [
    { id: "ca1", codigo: "CASO-2026-088", contribuyente: "Comercial San Isidro SRL", etapa: "Intimación", monto: 12480, abierto: "2026-07-01", fiscalizador: "Luis Peña" },
    { id: "ca2", codigo: "CASO-2026-087", contribuyente: "Distribuidora El Surtidor", etapa: "Notificación", monto: 5640, abierto: "2026-08-05", fiscalizador: "Luis Peña" },
    { id: "ca3", codigo: "CASO-2026-086", contribuyente: "Inmobiliaria Ichilo SRL", etapa: "Coactivo", monto: 8920, abierto: "2026-06-15", fiscalizador: "Pedro Rivero" },
  ],
  ["codigo", "contribuyente"],
);

// ============ EXPEDIENTES ============

export type Expediente = {
  id: string;
  codigo: string;
  tipo: string;
  ciudadano: string;
  estado: "En revisión" | "Aprobado" | "Observado" | "Derivado" | "Archivado";
  dias: number;
  abierto: string;
  responsable: string;
};

export const useExpedientesStore = createEntityStore<Expediente>(
  [
    { id: "e1", codigo: "BV-2026-0481", tipo: "Licencia de funcionamiento", ciudadano: "Panadería La Espiga", estado: "En revisión", dias: 2, abierto: "2026-09-10", responsable: "J. Roca" },
    { id: "e2", codigo: "BV-2026-0480", tipo: "Certificación catastral", ciudadano: "Sofía Mendoza", estado: "Aprobado", dias: 1, abierto: "2026-09-11", responsable: "S. Mendoza" },
    { id: "e3", codigo: "BV-2026-0479", tipo: "Plan de pago", ciudadano: "Hotel Amboró", estado: "Aprobado", dias: 3, abierto: "2026-09-09", responsable: "J. Roca" },
    { id: "e4", codigo: "BV-2026-0478", tipo: "Reclamo — alumbrado", ciudadano: "Vecinos UV-08", estado: "Derivado", dias: 4, abierto: "2026-09-08", responsable: "P. Rivero" },
    { id: "e5", codigo: "BV-2026-0477", tipo: "Permiso de construcción", ciudadano: "Inmobiliaria Ichilo", estado: "Observado", dias: 6, abierto: "2026-09-06", responsable: "S. Mendoza" },
  ],
  ["codigo", "tipo", "ciudadano"],
);

export type Plantilla = {
  id: string;
  codigo: string;
  nombre: string;
  area: string;
  version: string;
  estado: "Activa" | "Borrador";
};

export const usePlantillasStore = createEntityStore<Plantilla>(
  [
    { id: "t1", codigo: "PT-LIC-FUN", nombre: "Licencia de funcionamiento", area: "Recaudaciones", version: "v3.2", estado: "Activa" },
    { id: "t2", codigo: "PT-CER-CAT", nombre: "Certificación catastral", area: "Catastro", version: "v2.1", estado: "Activa" },
    { id: "t3", codigo: "PT-PLAN-PAGO", nombre: "Convenio de plan de pago", area: "Recaudaciones", version: "v1.4", estado: "Activa" },
    { id: "t4", codigo: "PT-PER-CONS", nombre: "Permiso de construcción", area: "Obras Públicas", version: "v4.0", estado: "Activa" },
  ],
  ["codigo", "nombre", "area"],
);

// ============ CONFIGURACIÓN ============

export type Usuario = {
  id: string;
  username: string;
  nombre: string;
  rol: "Administrador" | "Cajero" | "Fiscalizador" | "Catastro" | "RRHH" | "Consulta";
  email: string;
  estado: "Activo" | "Bloqueado";
  ultimoAcceso?: string;
};

export const useUsuariosStore = createEntityStore<Usuario>(
  [
    { id: "u1", username: "jgonzalez", nombre: "J. González", rol: "Administrador", email: "jgonzalez@buenavista.gob.bo", estado: "Activo", ultimoAcceso: "2026-09-12 08:14" },
    { id: "u2", username: "achoque", nombre: "Ana Choque", rol: "Cajero", email: "achoque@buenavista.gob.bo", estado: "Activo", ultimoAcceso: "2026-09-12 09:02" },
    { id: "u3", username: "lpena", nombre: "Luis Peña", rol: "Fiscalizador", email: "lpena@buenavista.gob.bo", estado: "Activo", ultimoAcceso: "2026-09-11 17:45" },
    { id: "u4", username: "smendoza", nombre: "Sofía Mendoza", rol: "Catastro", email: "smendoza@buenavista.gob.bo", estado: "Activo" },
    { id: "u5", username: "mgonzalez", nombre: "María González", rol: "RRHH", email: "mgonzalez@buenavista.gob.bo", estado: "Activo" },
    { id: "u6", username: "consulta01", nombre: "Consulta pública", rol: "Consulta", email: "—", estado: "Bloqueado" },
  ],
  ["username", "nombre", "rol"],
);

export type AuditoriaLog = {
  id: string;
  fecha: string;
  usuario: string;
  accion: string;
  entidad: string;
  detalle: string;
};

export const useAuditoriaStore = createEntityStore<AuditoriaLog>(
  [
    { id: "a1", fecha: "2026-09-12 10:14", usuario: "achoque", accion: "CREATE", entidad: "Pago REC-2026-04821", detalle: "Aplicado pago Hotel Amboró por Bs. 1820" },
    { id: "a2", fecha: "2026-09-12 09:47", usuario: "achoque", accion: "CREATE", entidad: "Pago REC-2026-04820", detalle: "Aplicado pago Comercial San Isidro Bs. 4250" },
    { id: "a3", fecha: "2026-09-12 08:14", usuario: "jgonzalez", accion: "LOGIN", entidad: "Sesión", detalle: "Inicio de sesión desde 190.181.x.x" },
    { id: "a4", fecha: "2026-09-11 17:45", usuario: "lpena", accion: "UPDATE", entidad: "Caso CASO-2026-088", detalle: "Etapa Notificación → Intimación" },
    { id: "a5", fecha: "2026-09-11 16:30", usuario: "smendoza", accion: "UPDATE", entidad: "Predio BV-04-01-02-001", detalle: "Estado Activo → En revisión" },
  ],
  ["usuario", "accion", "entidad"],
);

// ============ PORTAL CIUDADANO ============

export type Reclamo = {
  id: string;
  codigo: string;
  ciudadano: string;
  categoria: "Alumbrado" | "Aseo" | "Vías" | "Áreas verdes" | "Otros";
  zona: string;
  estado: "Recibido" | "En atención" | "Resuelto" | "Rechazado";
  fecha: string;
};

export const useReclamosStore = createEntityStore<Reclamo>(
  [
    { id: "r1", codigo: "REC-2026-0124", ciudadano: "Vecinos UV-08", categoria: "Alumbrado", zona: "UV-08", estado: "En atención", fecha: "2026-09-08" },
    { id: "r2", codigo: "REC-2026-0123", ciudadano: "Carmen Mercado", categoria: "Aseo", zona: "UV-05", estado: "Resuelto", fecha: "2026-09-05" },
    { id: "r3", codigo: "REC-2026-0122", ciudadano: "Junta vecinal Carmen", categoria: "Vías", zona: "UV-22", estado: "Recibido", fecha: "2026-09-11" },
  ],
  ["codigo", "ciudadano", "categoria"],
);
