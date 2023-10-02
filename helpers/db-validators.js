const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') =>{

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
          throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }
  }

//Ver si el correo existe
const emailExiste = async( correo='') =>{

  const existeEmail = await Usuario.findOne({ correo });
  if ( existeEmail ) {
    throw new Error(`El correo ${ correo } ya esta registrado en la BD`);
  }

}  


//Ver si el usuario existe
const usuarioExistePorId = async( id ) =>{

  const exisUsuario= await Usuario.findById( id );
  if ( !exisUsuario ) {
    throw new Error(`El id ${ id } no existe `);
  }

}  

  module.exports = { 
    esRolValido,
    emailExiste,
    usuarioExistePorId
  }