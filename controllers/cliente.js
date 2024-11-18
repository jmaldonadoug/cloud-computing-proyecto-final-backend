const db = require('./index');
const helpers = require('../helpers');

const index = async (req, res) => {
    let response = {};

    try {
        const query = 'SELECT * FROM cliente;';

        const data = await db.awaitQuery(query);

        response.data = data;
    } catch (e) {
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

const store = async (req, res) => {
    let response = {};

    try {
        const { nit, nombre, correo, fecha_nacimiento } = req.body;
        const query = 'INSERT INTO cliente(nit, nombre, correo, fecha_nacimiento) VALUES(?, ?, ?, ?);';
        await db.awaitQuery(query, [nit, nombre, correo, fecha_nacimiento]);

        response.message = 'Dato creado';
    } catch (e) {
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

const edit = async (req, res) => {
    let response = {};

    try {
        const { id } = req.params;
        const query = 'SELECT * FROM cliente WHERE idcliente = ?;';
        const cliente = await db.awaitQuery(query, [id]);

        response.data = cliente[0];
    } catch (e) {
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

const update = async (req, res) => {
    let response = {};

    try {
        const { id } = req.params;
        const { nit, nombre, correo, fecha_nacimiento } = req.body;
        const query = 'UPDATE cliente SET nit = ?, nombre = ?, correo = ?, fecha_nacimiento = ? WHERE idcliente = ?;';

        await db.awaitQuery(query, [nit, nombre, correo, fecha_nacimiento, id]);

        response.message = 'Dato actualizado';
    } catch (e) {
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

const destroy = async (req, res) => {
    let response = {};

    try {
        const { id } = req.params;
        const query = 'DELETE FROM cliente WHERE idcliente = ?';

        await db.awaitQuery(query, [id]);

        response.message = 'Dato eliminado';
    } catch (e) {
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

module.exports = {
    index,
    store,
    edit,
    update,
    destroy
}