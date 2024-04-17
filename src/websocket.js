
import __dirname from "./utils/utils.js";
//import ProductManagerFS from "./dao/ProductManagerFS.js";
//const PM = new ProductManagerFS(`${__dirname}/../Productos.json`);

import ProductManagerDB from "./dao/ProductManagerDB.js";
const PM = new ProductManagerDB();
//Funcion para Actualizacion de Productos en tiempo real
const socketUpdatedProducts = async (socket) => {
    const products = await PM.getProducts();
    socket.emit('productList',products);
    console.log("Productos Actualizados en tiempo real")
}

export default (io) => {

    let messages = [];

    io.on("connection", (socket) => {
        
        console.log("Nuevo cliente conectado")

        // Cuando se conecta un cliente, emite la lista de productos actual
        socketUpdatedProducts(socket);

        //socket escuchando lista de productos en tiempo real
        socket.on('messageProduct',data=>{
            console.log(data);
        })

        socket.on('messageChat',data=>{
            messages.push(data)
            io.emit('messageLogs', messages)
        })
    })
}

