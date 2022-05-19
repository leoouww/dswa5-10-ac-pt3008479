function verificaAutenticacao(req, res, next) {
    if (req.isAuthenticated()) {
    return next();
    } else {
    res.status('401').json('Não autorizado');
    }
}
module.exports = function(app) {
    var controller = app.controllers.curso;
    app.route('/cursos')
        .get(controller.listaCursos)
        .post(controller.salvaCurso);
    app.route('/cursos/:id')
        .get(controller.obtemCurso)
        .delete(controller.removeCurso);
};