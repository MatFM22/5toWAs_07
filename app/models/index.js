// Import sequelize and the model files
import Sequelize from 'sequelize';
//import sequelize from '../config/database';  // assuming you have a database.js file to configure Sequelize
import User from './user.model.js';
import Role from './role.model.js';

// Initialize the db object
const db = {};

// Define the models
db.Sequelize = Sequelize;
//db.sequelize = sequelize;  // Assuming you are passing the sequelize instance

// Define the models
//db.role = Role(sequelize, Sequelize);
//db.user = User(sequelize, Sequelize);

// Definimos una relación de muchos a muchos entre roles y usuarios
db.role.belongsToMany(db.user, {
    through: "user_roles",     // Nombre de la tabla intermedia que almacena las relaciones
    foreignKey: "roleId",      // Clave foránea en la tabla intermedia que referencia a roles
    otherKey: "userId",        // Clave foránea en la tabla intermedia que referencia a usuarios
});

// Definimos la relación inversa de muchos a muchos entre usuarios y roles
db.user.belongsToMany(db.role, {
    through: "user_roles",     // Nombre de la tabla intermedia
    foreignKey: "userId",      // Clave foránea que referencia a usuarios
    otherKey: "roleId",        // Clave foránea que referencia a roles
    as: "roles",               // Alias para acceder a los roles de un usuario
});

// Definimos una constante con los posibles roles que se pueden asignar
db.ROLES = ["user", "admin", "moderator"];

// Exportamos el objeto db para que pueda ser utilizado en otras partes de la aplicación
export default db;