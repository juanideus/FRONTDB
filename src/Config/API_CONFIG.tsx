export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  ENDPOINTS: {
      AUTH: {
          LOGIN:          'trabajador/iniciarSesion',
          REGISTER:       'trabajador/registrarTrabajador',
          BIBLIOTECARIAS: 'trabajador/Bibliotecaria',
      },
      LIBRO: {
          CREATE:            'Libro',
          DESHABILITAR:      'Libro',
          ACTUALIZAR_PRECIO: 'Libro/precio',
          OBTENER:           'Libro',
          RECIENTES:         'Libro/Reciente',
          AUMENTAR_COPIA:    'Libro/AumentarCopia',
      },
      USUARIO: {
          CREATE:        'usuario',
          DESHABILITAR:  'usuario',
          OBTENER:       'usuario',
          CON_PRESTAMOS: 'usuario/Prestamos',
      },
      TRANSACCION: {
          CREATE:      'transaccion/create',
          TOP_FICCION: 'transaccion/top10Ficcion2026',
          VENTAS_ANIO: 'transaccion/ventas',
          COMEDIA:     'transaccion/Comedia',
      },
  },
};