const db = require('./index');
const helpers = require('../helpers');

const index = async (req, res) => {
    let response = {};

    try {
        const query = 'SELECT * FROM libro;';

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
        const query = 'INSERT INTO libro(nombre) VALUES(?);';
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
        const query = 'SELECT * FROM libro WHERE idlibro = ?;';
        const libro = await db.awaitQuery(query, [id]);

        response.data = libro[0];
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
        const query = 'UPDATE libro SET nombre = ? WHERE idlibro = ?;';

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
        const query = 'DELETE FROM libro WHERE idlibro = ?;';

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