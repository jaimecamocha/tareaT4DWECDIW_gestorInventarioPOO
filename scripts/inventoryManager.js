// JAIME FERNÁNDEZ CALVO
// https://github.com/jaimecamocha/tareaT4DWECDIW_gestorInventarioPOO.git

import { saveLocalStorage, loadFromLocalStorage } from './localStorage.js';

export class InventoryManager {
    constructor() {
        this.inventario = this.loadInventory();
        this.tablaVisible = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.mostrarInventario();
    }

    //eventos para los distintos botones
    setupEventListeners() {
        document.getElementById("tablaInventario").style.display = "none";
        document.getElementById("agregarBtn").addEventListener("click", () => this.agregarProducto());
        document.getElementById("buscarBtn").addEventListener("click", () => this.buscarProducto());
        document.getElementById("actualizarBtn").addEventListener("click", () => this.actualizarInventario());
        document.getElementById("eliminarBtn").addEventListener("click", () => this.eliminarProducto());
        document.getElementById("mostrarBtn").addEventListener("click", () => this.toggleTabla());
    }

    //agregar productos nuevos
    agregarProducto() {
        const nombre = document.getElementById("nombre").value;
        const cantidad = parseInt(document.getElementById("cantidad").value);
        const precio = parseFloat(document.getElementById("precio").value);

        this.inventario.push({ nombre, cantidad, precio });
        this.mostrarInventario();
        this.saveInventory();

        document.getElementById("nombre").value = "";
        document.getElementById("cantidad").value = "";
        document.getElementById("precio").value = "";
    }

    //busca en el localstorage el producto deseado
    buscarProducto() {
        const nombreBusqueda = document.getElementById("nombreBusqueda").value;
        const resultadoBusqueda = document.getElementById("resultadoBusqueda");

        const productoEncontrado = this.inventario.find(producto => producto.nombre === nombreBusqueda);

        if (productoEncontrado) {
            resultadoBusqueda.textContent = `Nombre: ${productoEncontrado.nombre}, Cantidad: ${productoEncontrado.cantidad}, Precio: ${productoEncontrado.precio} €`;
            document.getElementById("nombreBusqueda").value = "";
        } else {
            resultadoBusqueda.textContent = "Producto no encontrado";
        } 
    }

    //actualiza el localstorage una vez cambiado algún valor de algún producto
    actualizarInventario() {
        const nombreActualizar = document.getElementById("nombreActualizar").value;
        const cantidadActualizar = parseInt(document.getElementById("cantidadActualizar").value);
        const precioActualizar = parseFloat(document.getElementById("precioActualizar").value);

        const producto = this.inventario.find(producto => producto.nombre === nombreActualizar);

        if (producto) {
            producto.cantidad += cantidadActualizar;
            producto.precio = precioActualizar;
        } else {
            this.inventario.push({ nombre: nombreActualizar, cantidad: cantidadActualizar, precio: precioActualizar });
        }

        this.mostrarInventario();
        this.saveInventory();

        document.getElementById("nombreActualizar").value = "";
        document.getElementById("cantidadActualizar").value = "";
        document.getElementById("precioActualizar").value = "";
    }


    //elimina el producto deseado del localstorage
    eliminarProducto() {
        const nombreEliminar = document.getElementById("nombreEliminar").value;

        const index = this.inventario.findIndex(producto => producto.nombre === nombreEliminar);

        if (index !== -1) {
            this.inventario.splice(index, 1);
        }

        this.mostrarInventario();
        this.saveInventory();

        document.getElementById("nombreEliminar").value = "";
    }

    //muestra el inventario
    mostrarInventario() {
        const tbodyInventario = document.getElementById("tbodyInventario");
        tbodyInventario.innerHTML = "";

        for (const producto of this.inventario) {
            const row = tbodyInventario.insertRow();
            const nombreCell = row.insertCell(0);
            const cantidadCell = row.insertCell(1);
            const precioCell = row.insertCell(2);

            nombreCell.innerHTML = producto.nombre;
            cantidadCell.innerHTML = producto.cantidad;
            precioCell.innerHTML = producto.precio;
        }
    }


    //botón para mostrar u ocultar el inventario
    toggleTabla() {
        const tabla = document.getElementById("tablaInventario");
        const botonMostrar = document.getElementById("mostrarBtn");

        if (this.tablaVisible) {
            tabla.style.display = "none";
            botonMostrar.textContent = "Mostrar inventario";
        } else {
            tabla.style.display = "table";
            botonMostrar.textContent = "Ocultar inventario";
        }

        this.tablaVisible = !this.tablaVisible;
    }

    saveInventory() {
        saveLocalStorage("inventario", this.inventario);
    }

    loadInventory() {
        return loadFromLocalStorage("inventario") || [];
    }
}
