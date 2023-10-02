const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');



const usuariosGet = async(req = request, res = response ) => {

    //const { q, nombre='No name', apikey, page=1, limit } =  req.query;
    const { limit = 5, desde= 0 } =req.query;
    const query = { estado: true };
    /*const usuarios = await Usuario.find( query )
          .skip( Number( desde ) )
          .limit(Number(limit));

    const total = await Usuario.countDocuments( query );  */ 
    
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
          .skip( Number( desde ) )
          .limit(Number(limit))

    ]);

    res.json({
        total,
        usuarios
    });
  }

  const usuariosPost = async(req, res = response ) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    
       //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //guarda en db
    await usuario.save();

    res.json({
        msg: 'Post World - Controlador',
        usuario
    });
  }


  const usuariosPut = async(req, res = response ) => {

    const { id } = req.params;
    const { _id ,password, google, correo, ...resto } = req.body;

    //TODO validar contra la base de datos
    if ( password ) {
      //Encriptar contraseña
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync( password, salt );
      
    }

    const usuario =  await Usuario.findByIdAndUpdate( id, resto);

    res.json({
        msg: 'Put World - Controlador',
        usuario 
    });
  }


  const usuariosPatch = (req, res = response ) => {
    res.json({
        msg: 'patch World - Controlador' 
    });
  }
  const usuariosDelete =  async(req, res = response ) => {

    const { id } = req.params;

    //borrar fisicamente
    //const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false} );
    

    res.json(usuario);
  }



  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
  }