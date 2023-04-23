//vamos a definir los arreglos q van a manejar los ingresos y arreglos de la app
const ingresos = [ //creacion del arreglo ingreso
    new Ingreso('Sueldo', 2000.00),
    new Ingreso('Venta coche', 1500),
    new Ingreso('Nuevo ingreso',300)
];

const egresos = [ //creacion del arreglo egreso
    new Egreso('Alquiler Pisito', 900),
    new Egreso('Ropa', 400)
];

let cargarApp = () => { //creacion carga app
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}
let totalIngresos = () =>{//creacion total de ingresos sumandolos
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}
let totalEgresos = () =>{//creacion totalEgresos sumandolos
    let totalEgreso =0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero =() => {//creacion carga cabecero actualizando datos y tenemos que sustituir los 4 id.
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML =  formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}
const formatoMoneda = (valor)=>{
    return valor.toLocaleString('es-ES',{style: 'currency', currency: 'EUR', minimumFractionDigit: 2});

}
const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('es-ES',{style: 'percent', minimumFractionDigit: 2});
}

const cargarIngresos = () =>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
};

const crearIngresoHTML = (ingreso) =>{
    let ingresoHTML =` 
                        <div class="elemento limpiarEstilos">
                            <div class="elemento_descripcion">${ingreso.descripcion}</div>
                                <div class="derecha limpiarEstilos">
                                    <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                                    <div class="elemento_eliminar">
                                        <button class="elemento_eliminar--btn">
                                            <ion-icon name='close'
                                            onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    return ingresoHTML;
};
const eliminarIngreso = (id)=>{
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);//es como hacer un bucle for(let ingreso of ingresos) findIndex para encontrar el indice a eliminar
    ingresos.splice(indiceEliminar, 1);//Para eliminar
    cargarCabecero();
    cargarIngresos();
};

const cargarEgresos = () => {
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
                    <div class="elemento limpiarEstilos">
                        <div class="elemento_descripcion">${egreso.descripcion}</div>
                            <div class="derecha limpiarEstilos">
                                <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
                                <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                                <div class="elemento_eliminar">
                                    <button class="elemento_eliminar--btn">
                                        <ion-icon name='close'
                                        onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                                    </button>
                                </div>
                            </div>
                    </div>
    `;
    return egresoHTML;
};

const eliminarEgreso = (id) => {
    let indiceEliminar =egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
};

let agregarDato = () => {
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion= forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value))
            cargarCabecero();
            cargarEgresos();
        }
    }
}