// Datos de demostración. Reemplazar por consultas reales a Lovable Cloud.

export const funcionarios = [
  { ci: "5123488", nombre: "María González Suárez", cargo: "Directora de RRHH", secretaria: "Administrativa", estado: "Activo", ingreso: "2018-03-12" },
  { ci: "6781234", nombre: "Juan Carlos Roca", cargo: "Tesorero Municipal", secretaria: "Finanzas", estado: "Activo", ingreso: "2020-07-01" },
  { ci: "4922110", nombre: "Sofía Mendoza Vaca", cargo: "Jefa de Catastro", secretaria: "Planificación", estado: "Activo", ingreso: "2019-11-04" },
  { ci: "7834509", nombre: "Luis Fernando Peña", cargo: "Fiscalizador", secretaria: "Recaudaciones", estado: "Vacaciones", ingreso: "2021-02-15" },
  { ci: "3344128", nombre: "Ana Lucía Choque", cargo: "Auxiliar Caja 02", secretaria: "Finanzas", estado: "Activo", ingreso: "2022-09-19" },
  { ci: "9981273", nombre: "Pedro Antonio Rivero", cargo: "Inspector de Obras", secretaria: "Obras Públicas", estado: "Activo", ingreso: "2017-05-22" },
];

export const contribuyentes = [
  { nit: "1234567019", nombre: "Comercial San Isidro SRL", tipo: "Jurídico", deuda: 12480, estado: "Mora", predios: 2 },
  { nit: "5123488", nombre: "María González Suárez", tipo: "Natural", deuda: 0, estado: "Al día", predios: 1 },
  { nit: "7894561", nombre: "Hotel Amboró", tipo: "Jurídico", deuda: 3250, estado: "Plan de pago", predios: 1 },
  { nit: "2233445", nombre: "Cooperativa Buena Vista", tipo: "Jurídico", deuda: 0, estado: "Al día", predios: 4 },
  { nit: "6677889", nombre: "Roberto Aguilar Vargas", tipo: "Natural", deuda: 845, estado: "Notificado", predios: 1 },
];

export const predios = [
  { codigo: "BV-01-04-12-007", zona: "UV-12", direccion: "Calle Sucre #245", propietario: "Comercial San Isidro SRL", superficie: 480, avaluo: 285000 },
  { codigo: "BV-02-01-03-018", zona: "UV-03", direccion: "Av. Amboró km 1", propietario: "Hotel Amboró", superficie: 2200, avaluo: 1450000 },
  { codigo: "BV-01-02-08-004", zona: "UV-08", direccion: "Calle Bolívar #112", propietario: "María González Suárez", superficie: 350, avaluo: 165000 },
  { codigo: "BV-03-05-01-021", zona: "UV-22", direccion: "Barrio El Carmen", propietario: "Cooperativa Buena Vista", superficie: 1200, avaluo: 540000 },
];

export const pagos = [
  { fecha: "2026-09-12 10:14", recibo: "REC-2026-04821", contribuyente: "Hotel Amboró", concepto: "Patente municipal Q3", canal: "Banco Unión", monto: 1820, estado: "Aplicado" },
  { fecha: "2026-09-12 09:47", recibo: "REC-2026-04820", contribuyente: "Comercial San Isidro", concepto: "Inmueble 2025", canal: "QR Tigo Money", monto: 4250, estado: "Aplicado" },
  { fecha: "2026-09-12 09:31", recibo: "REC-2026-04819", contribuyente: "Roberto Aguilar V.", concepto: "Vehículo placa 3421-BVA", canal: "Caja municipal", monto: 645, estado: "Aplicado" },
  { fecha: "2026-09-11 16:02", recibo: "REC-2026-04818", contribuyente: "María González S.", concepto: "Tasa de aseo", canal: "Web", monto: 120, estado: "Observado" },
  { fecha: "2026-09-11 15:45", recibo: "REC-2026-04817", contribuyente: "Cooperativa Buena Vista", concepto: "Inmuebles (4)", canal: "Transferencia BCP", monto: 8900, estado: "Aplicado" },
];

export const tramites = [
  { codigo: "BV-2026-0481", tipo: "Licencia de funcionamiento", ciudadano: "Panadería La Espiga", estado: "En revisión", dias: 2 },
  { codigo: "BV-2026-0480", tipo: "Certificación catastral", ciudadano: "Sofía Mendoza", estado: "Aprobado", dias: 1 },
  { codigo: "BV-2026-0479", tipo: "Plan de pago", ciudadano: "Hotel Amboró", estado: "Aprobado", dias: 3 },
  { codigo: "BV-2026-0478", tipo: "Reclamo — alumbrado", ciudadano: "Vecinos UV-08", estado: "Derivado", dias: 4 },
  { codigo: "BV-2026-0477", tipo: "Permiso de construcción", ciudadano: "Inmobiliaria Ichilo", estado: "Observado", dias: 6 },
];

export const notificaciones = [
  { codigo: "NOT-2026-1182", contribuyente: "Comercial San Isidro SRL", tipo: "Mora — Patente", monto: 12480, vencimiento: "2026-08-15", estado: "Notificado" },
  { codigo: "NOT-2026-1181", contribuyente: "Inmobiliaria Ichilo", tipo: "Observación catastral", monto: 0, vencimiento: "2026-09-20", estado: "En gestión" },
  { codigo: "NOT-2026-1180", contribuyente: "Hotel Amboró", tipo: "Vencimiento próximo", monto: 3250, vencimiento: "2026-09-30", estado: "Pendiente" },
  { codigo: "NOT-2026-1179", contribuyente: "Roberto Aguilar V.", tipo: "Mora — Inmueble", monto: 845, vencimiento: "2026-07-30", estado: "Reincidente" },
];
