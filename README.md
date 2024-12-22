# Actividad_N-3

*Realizado por:*
Adriana Borja, Camila Quirola, Genesis Tito y Marco Chacon

## LINK VIDEO DEMOSTRATIVO

https://drive.google.com/file/d/17HRc3mN3ZYBvw0XUNbvlWiRAyVAPaDfM/view

**GESTIÓN DE PROYECTOS Y PARTICIPANTES CON CUSTOM ELEMENTS**

## Gestión de Proyectos y Participantes

Este proyecto es una aplicación web diseñada para gestionar la relación entre proyectos y participantes. La aplicación permite registrar, visualizar, actualizar y eliminar tanto proyectos como participantes, gestionando una relación de muchos a muchos entre ellos. Para construir una interfaz modular y reutilizable, se utilizan Custom Elements, Shadow DOM y Templates. Además, una API REST desarrollada con Express y MySQL se encarga de gestionar los datos en la base de datos.

## Bases de Datos

La base de datos "db_proyecto" es el núcleo de almacenamiento de datos de la aplicación. Está compuesta por las siguientes colecciones:

- **Proyectos**: 
  - `id`: Identificador único del proyecto.
  - `nombre`: Nombre del proyecto.
  - `descripcion`: Descripción detallada del proyecto.
  - `fecha_inicio`: Fecha de inicio del proyecto.
  - `fecha_fin`: Fecha de finalización del proyecto.
  - `estado`: Estado actual del proyecto (Activo, Completado, Cancelado).

- **Participantes**:
  - `id`: Identificador único del participante.
  - `nombre`: Nombre del participante.
  - `apellido`: Apellido del participante.
  - `email`: Correo electrónico del participante, debe ser único.
  - `rol`: Rol o posición del participante dentro del proyecto.
  - `estado`: Estado del participante (Activo, Inactivo).

## Interfaz de Usuario

La interfaz de usuario de la aplicación está compuesta por varios componentes clave, cada uno desempeñando un papel específico:

- **Menú de Navegación**: Este componente permite a los usuarios alternar fácilmente entre las vistas de gestión de proyectos y de participantes. Es una barra de navegación estilizada que mejora la usabilidad de la aplicación.
  
- **Encabezado**: Un componente que muestra la información del usuario, incluyendo el nombre, el rol y la fecha actual. Este componente proporciona un contexto adicional para el usuario.

- **Tabla de Visualización**: Este componente muestra las relaciones entre proyectos y participantes. Permite registrar, actualizar y eliminar datos con facilidad, proporcionando una visión clara y organizada de las relaciones.

- **Pie de Página**: Componente que se encuentra al final de la página y muestra información adicional, como los derechos de autor y enlaces de contacto. Es un buen lugar para mostrar información menos prioritaria pero aún relevante.

- **Contenedor Principal**: Este componente encapsula toda la aplicación, gestionando la estructura global y asegurando que todos los componentes se visualicen correctamente.

- **API REST**: La API proporciona endpoints para gestionar las tablas de proyectos, participantes y sus relaciones. Admite operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y permite una interacción fluida entre el frontend y la base de datos.

## Configuraciones

Para que la aplicación funcione correctamente, es necesario configurar algunos aspectos en el fichero de `node.js` de `api_rest`:

- **Accesos a la Base de Datos**: Configurar los detalles de conexión a la base de datos MySQL, incluyendo el host, el usuario, la contraseña y el nombre de la base de datos.
  
- **Puerto de Ejecución**: El puerto 5000 se utiliza para ejecutar la API en localhost. Es importante asegurarse de que este puerto esté libre y no esté siendo utilizado por otro servicio.

## Endpoints de la API

A continuación se describen los endpoints implementados en el archivo `index.js` para gestionar los datos de proyectos, participantes y asignaciones:

### **Endpoints de Proyectos**
1. **`GET /proyectos`**  
   - Descripción: Obtiene la lista de todos los proyectos.  
   - Respuesta: Devuelve un array de objetos de proyectos.  
   - Código:
     ```javascript
     app.get('/proyectos', (req, res) => {
         db.query('SELECT * FROM proyectos', (error, results) => {
             if (error) return res.status(500).json({ error: error.message });
             res.json(results);
         });
     });
     ```

2. **`POST /proyectos`**  
   - Descripción: Crea un nuevo proyecto.  
   - Respuesta: Devuelve el ID del proyecto creado y un mensaje de éxito.  
   - Código:
     ```javascript
     app.post('/proyectos', (req, res) => {
         const { nombre, descripcion, fecha_inicio, fecha_fin } = req.body;
         db.query(
             'INSERT INTO proyectos (nombre, descripcion, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?)',
             [nombre, descripcion, fecha_inicio, fecha_fin],
             (error, results) => {
                 if (error) return res.status(500).json({ error: error.message });
                 res.status(201).json({ id: results.insertId, message: 'Proyecto creado exitosamente' });
             }
         );
     });
     ```

3. **`PUT /proyectos/:id`**  
   - Descripción: Actualiza un proyecto existente.  
   - Respuesta: Devuelve un mensaje de éxito si se actualiza correctamente.  
   - Código:
     ```javascript
     app.put('/proyectos/:id', (req, res) => {
         const { id } = req.params;
         const { nombre, descripcion, fecha_inicio, fecha_fin } = req.body;
         db.query(
             'UPDATE proyectos SET nombre = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ? WHERE id = ?',
             [nombre, descripcion, fecha_inicio, fecha_fin, id],
             (error, results) => {
                 if (error) return res.status(500).json({ error: error.message });
                 if (results.affectedRows === 0) return res.status(404).json({ error: 'Proyecto no encontrado' });
                 res.status(200).json({ message: 'Proyecto actualizado exitosamente' });
             }
         );
     });
     ```

4. **`DELETE /proyectos/:id`**  
   - Descripción: Elimina un proyecto por su ID.  
   - Respuesta: Devuelve un mensaje de éxito si se elimina correctamente.  
   - Código:
     ```javascript
     app.delete('/proyectos/:id', (req, res) => {
         db.query('DELETE FROM proyectos WHERE id = ?', [req.params.id], (error, results) => {
             if (error) return res.status(500).json({ error: error.message });
             if (results.affectedRows === 0) return res.status(404).json({ error: 'Proyecto no encontrado' });
             res.status(200).json({ message: 'Proyecto eliminado exitosamente' });
         });
     });
     ```

### **Endpoints de Participantes**
5. **`GET /participantes`**  
   - Descripción: Obtiene la lista de todos los participantes.  
   - Respuesta: Devuelve un array de objetos de participantes.  
   - Código:
     ```javascript
     app.get('/participantes', (req, res) => {
         db.query('SELECT * FROM participantes', (error, results) => {
             if (error) return res.status(500).json({ error: error.message });
             res.json(results);
         });
     });
     ```

6. **`POST /participantes`**  
   - Descripción: Crea un nuevo participante.  
   - Respuesta: Devuelve el ID del participante creado y un mensaje de éxito.  
   - Código:
     ```javascript
     app.post('/participantes', (req, res) => {
         const { nombre, apellido, email, rol } = req.body;
         db.query(
             'INSERT INTO participantes (nombre, apellido, email, rol) VALUES (?, ?, ?, ?)',
             [nombre, apellido, email, rol],
             (error, results) => {
                 if (error) return res.status(500).json({ error: error.message });
                 res.status(201).json({ id: results.insertId, message: 'Participante creado exitosamente' });
             }
         );
     });
     ```

7. **`PUT /participantes/:id`**  
   - Descripción: Actualiza un participante existente.  
   - Respuesta: Devuelve un mensaje de éxito si se actualiza correctamente.  
   - Código:
     ```javascript
     app.put('/participantes/:id', (req, res) => {
         const { id } = req.params;
         const { nombre, apellido, email, rol } = req.body;
         db.query(
             'UPDATE participantes SET nombre = ?, apellido = ?, email = ?, rol = ? WHERE id = ?',
             [nombre, apellido, email, rol, id],
             (error, results) => {
                 if (error) return res.status(500).json({ error: error.message });
                 if (results.affectedRows === 0) return res.status(404).json({ error: 'Participante no encontrado' });
                 res.status(200).json({ message: 'Participante actualizado exitosamente' });
             }
         );
     });
     ```

8. **`DELETE /participantes/:id`**  
   - Descripción: Elimina un participante por su ID.  
   - Respuesta: Devuelve un mensaje de éxito si se elimina correctamente.  
   - Código:
     ```javascript
     app.delete('/participantes/:id', (req, res) => {
         db.query('DELETE FROM participantes WHERE id = ?', [req.params.id], (error, results) => {
             if (error) return res.status(500).json({ error: error.message });
             if (results.affectedRows === 0) return res.status(404).json({ error: 'Participante no encontrado' });
             res.status(200).json({ message: 'Participante eliminado exitosamente' });
         });
     });
     ```

### **Endpoints de Asignaciones**
9. **`GET /asignaciones`**  
   - Descripción: Obtiene todas las asignaciones entre proyectos y participantes.  
   - Respuesta: Devuelve un array de objetos que relacionan proyectos y participantes.  
   - Código:
     ```javascript
     app.get('/asignaciones', (req, res) => {
         db.query(
             `SELECT pp.proyecto_id, p.nombre AS proyecto, pp.participante_id, pa.nombre AS participante, pa.apellido 
              FROM proyecto_participante pp
              JOIN proyectos p ON pp.proyecto_id = p.id
              JOIN participantes pa ON pp.participante_id = pa.id`,
             (error, results) => {
                 if (error) return res.status(500).json({ error: error.message });
                 res.json(results);
             }
         );
     });
     ```

10. **`POST /asignaciones`**  
    - Descripción: Crea una asignación entre un proyecto y un participante.  
    - Respuesta: Devuelve un mensaje de éxito si se crea correctamente.  
    - Código:
      ```javascript
      app.post('/asignaciones', (req, res) => {
          const { proyecto_id, participante_id } = req.body;

          if (!proyecto_id || !participante_id) {
              return res.status(400).json({ error: 'Faltan datos requeridos (proyecto_id o participante_id)' });
          }

          db.query(
              'INSERT INTO proyecto_participante (proyecto_id, participante_id) VALUES (?, ?)',
              [proyecto_id, participante_id],
              (error, results) => {
                  if (error) {
                      if (error.code === 'ER_DUP_ENTRY') {
                          return res.status(400).json({ error: 'La asignación ya existe' });
                      }
                      return res.status(500).json({ error: error.message });
                  }
                  res.status(201).json({ message: 'Asignación creada exitosamente' });
              }
          );
      });
      ```

11. **`DELETE /asignaciones/:proyecto_id/:participante_id`**  
    - Descripción: Elimina una asignación entre un proyecto y un participante.  
    - Respuesta: Devuelve un mensaje de éxito si se elimina correctamente.  
    - Código:
      ```javascript
      app.delete('/asignaciones/:proyecto_id/:participante_id', (req, res) => {
          const { proyecto_id, participante_id } = req.params;
          db.query(
              'DELETE FROM proyecto_participante WHERE proyecto_id = ? AND participante_id = ?',
              [proyecto_id, participante_id],
              (error, results) => {
                  if (error) return res.status(500).json({ error: error.message });
                  if (results.affectedRows === 0) return res.status(404).json({ error: 'Asignación no encontrada' });
                  res.status(200).json({ message: 'Asignación eliminada exitosamente' });
              }
          );
      });


## Frameworks y Herramientas

Este proyecto utiliza una combinación de tecnologías modernas para el desarrollo frontend y backend:

- **Frontend**:
  - **HTML**: Para la estructura básica de la aplicación web.
  - **CSS**: Para el estilo y la presentación de los elementos de la interfaz.
  - **JavaScript**: Para la lógica y la interacción del lado del cliente.
  - **Custom Elements**: Para crear componentes reutilizables.
  - **Shadow DOM**: Para encapsular estilos y mantener la integridad del componente.
  - **Templates**: Para definir contenido que puede ser reutilizado.

- **Backend**:
  - **Node.js**: Plataforma para la construcción del backend de la aplicación.
  - **Express**: Framework para construir la API REST y manejar las rutas y las solicitudes.

- **Base de Datos**:
  - **MySQL**: Sistema de gestión de bases de datos relacional utilizado para almacenar los datos.
  - **phpMyAdmin**: Herramienta de gestión de MySQL accesible a través del servidor XAMPP.

- **Herramientas**:
  - **Visual Studio Code**: Editor de código fuente utilizado para el desarrollo.
  - **Live Server**: Extensión para Visual Studio Code que permite un servidor local de desarrollo con recarga en vivo.
  - **Postman**: Herramienta utilizada para probar y desarrollar las API, enviando solicitudes HTTP y viendo las respuestas.

## Requisitos

Para ejecutar este proyecto, necesitas tener instalados los siguientes programas:

- **Node.js**: Entorno de ejecución para JavaScript.
- **MySQL**: Sistema de gestión de bases de datos.
- **XAMPP**: Paquete de software que incluye Apache, MySQL y PHP, utilizado para gestionar MySQL.
- **Visual Studio Code**: Editor de código fuente.

## Ejecución

Para poner en marcha la aplicación, sigue estos pasos:

1. **Levantar el servidor de phpMyAdmin**:
   - Abre XAMPP y asegúrate de que el servidor MySQL está en ejecución.
   - Abre phpMyAdmin para gestionar la base de datos.

2. **Abrir la terminal de `api_rest` en Visual Studio Code**:
   - Navega a la carpeta `api_rest` y abre una terminal.
   - Ejecuta el script para iniciar el servidor de la API:
     ```bash
     npx nodemon index.js
     ```

3. **Ejecutar el archivo `index.html` con Live Server**:
   - Abre la carpeta del frontend en Visual Studio Code.
   - Haz clic derecho en `index.html` y selecciona `Open with Live Server`.
   - Asegúrate de que el Live Server está ejecutándose correctamente y navega a la dirección proporcionada (normalmente `http://localhost:5500`).

Siguiendo estos pasos, podemos tener la aplicación en funcionamiento y estar listo para gestionar proyectos y participantes con mayor facilidad.
