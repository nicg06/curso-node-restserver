
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, usuarioExistePorId} = require('../helpers/db-validators');


const { usuariosGet, 
        usuariosPost, 
        usuariosPut,
        usuariosPatch, usuariosDelete } = require('../controllers/usuarios');



 const router = Router();

 router.get('/',  usuariosGet );


 router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( usuarioExistePorId ),
    check('rol').custom( esRolValido ),
    validarCampos
  ], usuariosPut );

  router.post('/', [
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('password', 'El password debe ser mayor a 6 letras').isLength({ min: 6 }),
      check('correo', 'El correo no es válido').isEmail(),
      check('correo').custom( emailExiste ),
      //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
      check('rol').custom( esRolValido ),
      validarCampos
  ], usuariosPost);

  router.delete('/:id',[
      check('id', 'No es un id válido').isMongoId(),
      check('id').custom( usuarioExistePorId ),
      validarCampos
    ],  usuariosDelete );

  router.patch('/',  usuariosPatch);


module.exports = router;