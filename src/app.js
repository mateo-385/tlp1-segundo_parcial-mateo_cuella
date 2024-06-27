const { db } = require("../src/db/db.js")
const express = require("express")
const app = express()
const PORT = 3000

//Middleware
app.use(express.json())

//Rutas

//Raiz
app.get("/", (req, res) => {
    res.send("Hola desde mi servidor")
})

//Obtener todos los productos
app.get("/products", (req, res) => {
    res.json(db)
})

//Obtener productos por id
app.get("/products/:id", (req, res) => {
    const id = req.params.id
    const product = db.find(product => product.id == id)
    res.json(product)
})

//Crear un producto
app.post("/products", (req, res) => {
    const id = db.length + 1
    const { name, quantity, price } = req.body
    db.push({ id, name, quantity, price })
    res.send("Producto creado correctamente")

})

//Actualizar un producto
app.put("/products/:id", (req, res) => {
    const id = req.params.id
    const { name, quantity, price } = req.body
    db.forEach(product => {
        if (product.id == id) {
            product.name = name, product.quantity = quantity, product.price = price
        }
    })
    res.send("Producto actualizado correctamente")

})

//Eliminar un producto
app.delete("/products/:id", (req, res) => {
    const id = req.params.id
    db.forEach((product, index) => {
        if (product.id == id) {
            db.splice(index, 1)
        }
    })
    res.send("Producto eliminado correctamente")
})

//Servidor
app.listen(PORT, () => {
    console.log(`Servidor inicializado en puerto ${PORT}`);
})