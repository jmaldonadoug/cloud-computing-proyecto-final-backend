const db = require('./index');
const helpers = require('../helpers');

const index = async (req, res) => {
    let response = {};

    try {
        const query = 'SELECT * FROM compra c INNER JOIN proveedor p on c.idproveedor = p.idproveedor;';

        const data = await db.awaitQuery(query);

        response.data = data;
    } catch (e) {
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

const create = async (req, res) => {
    let response = {};

    try {
        const query = 'SELECT idproveedor as id, nombre FROM proveedor;';

        const proveedores = await db.awaitQuery(query);

        response.proveedores = proveedores;
    } catch (e) {
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

const detail = async (req, res) => {
    let response = {};

    try {
        const { id } = req.params;
        const query = 'SELECT * FROM edicion;';
        const query2 = 'SELECT c.*, p.nombre as pnombre FROM compra c INNER JOIN proveedor p on p.idproveedor = c.idproveedor WHERE idcompra = ?;';
        const ediciones = await db.awaitQuery(query);
        const compra = await db.awaitQuery(query2, [id]);


        response.ediciones = ediciones;
        response.compra = compra[0];
    } catch (e) {
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

const store = async (req, res) => {
    let response = {};

    try {
        const { fecha, proveedor } = req.body;
        const query = 'INSERT INTO compra(fecha, total, idproveedor) VALUES(?, ?, ?);';
        await db.awaitQuery(query, [fecha, 0, proveedor.id]);

        const query2 = 'SELECT * FROM compra ORDER BY 1 DESC;'
        const compra = await db.awaitQuery(query2);
        const id = compra[0].idcompra;

        response.message = 'Dato creado';
        response.id = id;
    } catch (e) {
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

const storeDetail = async (req, res) => {
    let response = {};
    await db.awaitBeginTransaction();
    try {
        const { id } = req.params;
        const { detail, total } = req.body;

        await Promise.all(detail.map(async item => {
            const queryD = 'INSERT INTO compra_edicion(cantidad, precio, total, idcompra, idedicion) values(?, ?, ?, ?, ?);'
            await db.awaitQuery(queryD, [item.cantidad, item.precio, item.total, id, item.edicion.idedicion]);
        }));

        const query = 'UPDATE compra SET total = ? WHERE idcompra = ?;';
        await db.awaitQuery(query, [total, id]);

        await db.awaitCommit();
        response.message = 'Compra guardada';
    } catch (e) {
        await db.awaitRollback();
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

const destroy = async (req, res) => {
    let response = {};

    try {
        const { id } = req.params;
        const query = 'DELETE FROM compra WHERE idcompra = ?;';

        await db.awaitQuery(query, [id]);

        response.message = 'Dato eliminado';
    } catch (e) {
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

module.exports = {
    index,
    create,
    detail,
    storeDetail,
    store,
    destroy
}