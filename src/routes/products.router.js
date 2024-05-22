 import express from 'express';
import __dirname from '../utils/utils.js';
// import ProductManagerFS from '../dao/ProductManagerFS.js';
import ProductManagerDB from '../dao/ProductManagerDB.js';
import productModel from '../dao/models/productModel.js';

const router = express.Router();
const productsRouter = router;

//const PM = new ProductManager(`${__dirname}/Productos.json`);
const PM = new ProductManagerDB();

router.get('/', async (req, res) => {
    let { page = 1, limit = 10, sort, query } = req.query;

    if (sort) {
        sort = JSON.parse(sort);
    } else {
        sort = { _id: 'asc' }; 
    }

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: sort,
        lean: true 
    };

    const queryOptions = query ? { title: { $regex: query, $options: 'i' } } : {};

    try {
        const result = await productModel.paginate(queryOptions, options);

        console.log("Productos obtenidos con éxito");
        res.send(result); // Devuelve la respuesta paginada directamente
    } catch (error) {
        console.error("Error al obtener productos");
        res.status(500).send('Error al obtener los productos', error);
    }
});

router.get('/:id', async (req, res) => {
    //FS
    // const productId = +req.params.id;
    //DB
    const productId = req.params.id;

    try{
        let product = await PM.getProductById(productId);

        if (!product) {
            console.error("No se encontró el producto solicitado");
            return res.status(404).json({
                error: `No se encontró el producto con ID ${productId}`
            });
        }

        res.json(product);

    } catch (e) {
        console.error("Error al obtener el producto por Id")
        res.status(500).send(`Error al obtener el producto`,e)
    }

    
});

router.post('/', async (req, res) => {

    const product = req.body;

    try {
        await PM.addProduct(product);
        res.status(201).send('Producto creado correctamente');
    } catch (error) {
        console.error("Error al crear el producto");
        res.status(500).send('Error al crear el producto', error);
    }
});

router.put('/:id', async (req, res) => {
    //FS
    // const productId = +req.params.id;

    //DB
    const productId = req.params.id;

    const update = req.body;

    try {
        await PM.updateProduct(productId, update);
        res.send('Producto actualizado correctamente');
    } catch (error) {
        console.error("Error al actualizar el producto");
        res.status(500).send('Error al actualizar el producto', error);
    }
});

router.delete('/:id', async (req, res) => {
    //FS
    // const productId = +req.params.id;
    //DB
    const productId = req.params.id;
    
    try {
        await PM.deleteProduct(productId);
        res.send('Producto eliminado correctamente');
    } catch (error) {
        console.error("Error al eliminar el producto:");
        res.status(500).send('Error al eliminar el producto', error);
    }
});

// Endpoint para eliminar un producto por su id combinandolo con un form en HTML y en views.router( DELETE NO EXISTE EN HTML )
router.post('/deleteproduct', async (req, res) => {
    //FS
    // const productId = +req.body.productId;
    
    //DB
    const productId = req.body.productId;

    try {
        await PM.deleteProduct(productId);
        res.send('Producto eliminado correctamente');
    } catch (error) {
        console.error("Error al eliminar el producto:");
        res.status(500).send('Error al eliminar el producto', error);
    }
});

export default productsRouter;

