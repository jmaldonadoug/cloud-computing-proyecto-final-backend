
const failRequest = (e, req, res) => {
    const isGet = req.method === 'GET';
    const response = {};
    response.error = e;
    response.message = e?.message ?? e;
    response.url = req.path;
    response.status = 400;
    response.request = (isGet) ? req.query : req.body;

    res.status(400).send(response);
}


module.exports = {
    failRequest
}