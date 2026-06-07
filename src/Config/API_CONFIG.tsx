export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080/',
  ENDPOINTS: {
    AUTH: {
      LOGIN:          'users/login',
      REGISTER:       'users/trabajador/registrarTrabajador',
      BIBLIOTECARIAS: 'users/librains',
    },
    LIBRO: {
      CREATE:            'libros',
      DESHABILITAR:      'libros/disable',
      ACTUALIZAR_PRECIO: 'libros',
      OBTENER:           'libros',
      RECIENTES:         'libros/recent',
      AUMENTAR_COPIA:    'libros/updateStock',
    },
    USUARIO: {
      CREATE:        'users/register',
      DESHABILITAR:  'users/disable',
      OBTENER:       'users',
      CON_PRESTAMOS: 'users/loan',
    },
    TRANSACCION: {
      CREATE:      'transaction',
      TOP_FICCION: 'transaction/fiction',
      VENTAS_ANIO: 'transaction/ventas',
      COMEDIA:     'transaction/Comedia',
      DETAILS:     'transaction/details',
    },
  },
};