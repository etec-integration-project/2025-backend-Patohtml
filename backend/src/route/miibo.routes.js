import { Router } from "express"
import { getProductos, createProductos, updateProductos, deleteProductos, getProductosById } from '../route/controllers/miibo.controllers.js'

const router = Router()

router.get('/amiibos', getProductos)

router.get('/amiibos/:id', getProductosById)

router.post('/postAmiibo', createProductos)

router.put('/update', updateProductos)

router.delete('/borra/:id', deleteProductos)


export default router