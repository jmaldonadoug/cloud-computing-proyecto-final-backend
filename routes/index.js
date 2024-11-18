var express = require('express');
var router = express.Router();

const autorController = require('../controllers/autor');
const editorialController = require('../controllers/editorial');
const libroController = require('../controllers/libro');
const clienteController = require('../controllers/cliente');
const generoController = require('../controllers/genero');
const proveedorController = require('../controllers/proveedor');
const sagaController = require('../controllers/saga');
const edicionController = require('../controllers/edicion');
const compraController = require('../controllers/compra');


router.get('/autores', autorController.index);
router.get('/autor/:id/edit', autorController.edit);
router.post('/autor/store', autorController.store);
router.post('/autor/:id/update', autorController.update);
router.delete('/autor/:id', autorController.destroy);

router.get('/editoriales', editorialController.index);
router.get('/editorial/:id/edit', editorialController.edit);
router.post('/editorial/store', editorialController.store);
router.post('/editorial/:id/update', editorialController.update);
router.delete('/editorial/:id', editorialController.destroy);

router.get('/libros', libroController.index);
router.get('/libro/:id/edit', libroController.edit);
router.post('/libro/store', libroController.store);
router.post('/libro/:id/update', libroController.update);
router.delete('/libro/:id', libroController.destroy);

router.get('/clientes', clienteController.index);
router.get('/cliente/:id/edit', clienteController.edit);
router.post('/cliente/store', clienteController.store);
router.post('/cliente/:id/update', clienteController.update);
router.delete('/cliente/:id', clienteController.destroy);

router.get('/generos', generoController.index);
router.get('/genero/:id/edit', generoController.edit);
router.post('/genero/store', generoController.store);
router.post('/genero/:id/update', generoController.update);
router.delete('/genero/:id', generoController.destroy);

router.get('/proveedores', proveedorController.index);
router.get('/proveedor/:id/edit', proveedorController.edit);
router.post('/proveedor/store', proveedorController.store);
router.post('/proveedor/:id/update', proveedorController.update);
router.delete('/proveedor/:id', proveedorController.destroy);

router.get('/sagas', sagaController.index);
router.get('/saga/:id/edit', sagaController.edit);
router.post('/saga/store', sagaController.store);
router.post('/saga/:id/update', sagaController.update);
router.delete('/saga/:id', sagaController.destroy);

router.get('/ediciones', edicionController.index);
router.get('/edicion/create', edicionController.create);
router.get('/edicion/:id/edit', edicionController.edit);
router.post('/edicion/store', edicionController.store);
router.post('/edicion/:id/update', edicionController.update);
router.delete('/edicion/:id', edicionController.destroy);

router.get('/compras', compraController.index);
router.get('/compra/create', compraController.create);
router.get('/compra/:id/detail', compraController.detail);
router.post('/compra/:id/storeDetail', compraController.storeDetail);
router.post('/compra/store', compraController.store);
router.delete('/compra/:id', compraController.destroy);

module.exports = router;
