const db = require('./index');
const helpers = require('../helpers');

const index = async (req, res) => {
    let response = {};

    try {
        const query = 'SELECT * FROM saga;';

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
        const { nombre } = req.body;
        const query = 'INSERT INTO saga(nombre) VALUES(?);';
        await db.awaitQuery(query, [nombre]);

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
        const query = 'SELECT * FROM saga WHERE idsaga = ?;';
        const saga = await db.awaitQuery(query, [id]);

        response.data = saga[0];
    } catch (e) {
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

const update = async (req, res) => {
    let response = {};

    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const query = 'UPDATE saga SET nombre = ? WHERE idsaga = ?;';

        await db.awaitQuery(query, [nombre, id]);

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
        const query = 'DELETE FROM saga WHERE idsaga = ?;';

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