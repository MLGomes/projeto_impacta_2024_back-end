const { Router } = require('express');
const ProductController = require('./Controllers/SystemController');

const routes = Router();

routes.get('/user', (req, res) => {
    return res.status(200).json({ message: "Servidor OK" });
});

routes.post('/createuser', ProductController.create);
routes.get('/listusers', ProductController.all);
routes.get('/listusers/:id', ProductController.show);
routes.put('/updateuser/:id', ProductController.update);
routes.delete('/delete/:id', ProductController.delete);
routes.post('/createcargo', ProductController.createcargo);
routes.get('/listcargos', ProductController.allcargos);

module.exports = routes;