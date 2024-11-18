const db = require('./index');
const helpers = require('../helpers');

const index = async (req, res) => {
    let response = {};

    try {
        const query = 'SELECT * FROM edicion ;';

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
        const query1 = 'SELECT idgenero as id, nombre FROM genero;';
        const query2 = 'SELECT idautor as id, nombre FROM autor;';
        const query3 = 'SELECT idlibro as id, nombre FROM libro;';
        const query4 = 'SELECT ideditorial as id, nombre FROM editorial;';
        const query5 = 'SELECT idsaga as id, nombre FROM saga;';

        const generos = await db.awaitQuery(query1);
        const autores = await db.awaitQuery(query2);
        const libros = await db.awaitQuery(query3);
        const editoriales = await db.awaitQuery(query4);
        const sagas = await db.awaitQuery(query5);

        response.generos = generos;
        response.autores = autores;
        response.libros = libros;
        response.editoriales = editoriales;
        response.sagas = sagas;
    } catch (e) {
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

const store = async (req, res) => {
    let response = {};

    try {
        const { isbn, nombre, precio, fecha_publicacion, numero_paginas, descripcion, image, libro, editorial, saga } = req.body;
        const idsaga = (saga?.id === 0) ? saga?.idsaga : null;
        const query = `
        INSERT INTO 
        edicion(isbn, nombre, precio, fecha_publicacion, numero_paginas, descripcion, image, idlibro, ideditorial, idsaga) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        await db.awaitQuery(query, [isbn, nombre, precio, fecha_publicacion, numero_paginas, descripcion, image, libro?.id, editorial?.id, idsaga]);

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
        const query = `
            SELECT e.*, l.nombre as lnombre, ed.nombre as ednombre, s.nombre as snombre FROM edicion e
            inner join libro l on l.idlibro = e.idlibro
            inner join editorial ed on ed.ideditorial = e.ideditorial
            left outer join saga s on s.idsaga = e.idsaga
            WHERE idedicion = ?;
        `;
        const edicion = await db.awaitQuery(query, [id]);

        const query11 = `
            SELECT a.idautor as id, a.nombre as nombre FROM edicion_autor ea
            inner join autor a on a.idautor = ea.idautor
            WHERE ea.idedicion = ?;
        `;
        const query22 = `
            SELECT g.idgenero as id, g.nombre as nombre FROM edicion_genero eg
            inner join genero g on g.idgenero = eg.idgenero
            WHERE eg.idedicion = ?;
        `;
        const query1 = 'SELECT idgenero as id, nombre FROM genero;';
        const query2 = 'SELECT idautor as id, nombre FROM autor;';
        const query3 = 'SELECT idlibro as id, nombre FROM libro;';
        const query4 = 'SELECT ideditorial as id, nombre FROM editorial;';
        const query5 = 'SELECT idsaga as id, nombre FROM saga;';

        const generos = await db.awaitQuery(query1);
        const autores = await db.awaitQuery(query2);
        const libros = await db.awaitQuery(query3);
        const editoriales = await db.awaitQuery(query4);
        const sagas = await db.awaitQuery(query5);

        const generosSelected = await db.awaitQuery(query22, [id]);
        const autoresSelected = await db.awaitQuery(query11, [id])

        response.data = edicion[0];
        response.generos = generos;
        response.autores = autores;
        response.libros = libros;
        response.editoriales = editoriales;
        response.sagas = sagas;
        response.autoresSelected = autoresSelected;
        response.generosSelected = generosSelected;
    } catch (e) {
        response = helpers.failRequest(e, req, res);
    }

    res.status(response?.status ?? 200).send(response);
}

const update = async (req, res) => {
    let response = {};
    await db.awaitBeginTransaction();

    try {
        const { id } = req.params;
        const { isbn, nombre, precio, fecha_publicacion, numero_paginas, descripcion, image, libro, editorial, saga, autores, generos } = req.body;
        const idsaga = saga.id ? saga.id : null;

        const query = `
            UPDATE edicion 
            SET isbn = ?, nombre = ?, precio = ?, fecha_publicacion = ?, numero_paginas = ?, descripcion = ?, image = ?, idlibro = ?, ideditorial = ?, idsaga = ?
            WHERE idedicion = ?;
        `;

        await db.awaitQuery(
            query,
            [isbn, nombre, precio, fecha_publicacion, numero_paginas, descripcion, image, libro?.id, editorial?.id, idsaga, id]
        );

        const query1 = 'SELECT * FROM edicion_autor WHERE idedicion = ?;';
        const query2 = 'SELECT * FROM edicion_genero WHERE idedicion = ?;';
        const autores2 = await db.awaitQuery(query1, [id]);
        const generos2 = await db.awaitQuery(query2, [id]);

        await Promise.all(autores.map(async item => {
            const autor2 = autores2.find(value => value.idautor == item.id);
            if (autor2 === undefined) {
                const queryAutor = 'INSERT INTO edicion_autor(idedicion, idautor) VALUES(?, ?);';
                await db.awaitQuery(queryAutor, [id, item.id]);
            }
        }));
        await Promise.all(generos.map(async item => {
            const genero2 = generos2.find(value => value.idgenero == item.id);
            if (genero2 === undefined) {
                const queryGenero = 'INSERT INTO edicion_genero(idedicion, idgenero) VALUES(?, ?);';
                await db.awaitQuery(queryGenero, [id, item.id]);
            }
        }));

        await db.awaitCommit();
        response.message = 'Dato actualizado';
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
        const query = 'DELETE FROM edicion WHERE idedicion = ?;';

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
    store,
    edit,
    update,
    destroy
}