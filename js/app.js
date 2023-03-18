//Variables

const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const maximo = document.querySelector('#maximo');
const minimo = document.querySelector('#minimo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//contenedor para los resultados
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 10;

//Generar un objeto con la busqueda
const datosBusqueda = {
    marca : '',
    año : '',
    minimo : '',
    maximo : '',
    puertas : '',
    transmision : '',
    color : '',
}


//Eventos
document.addEventListener('DOMContentLoaded', ()=>{
    mostrarAutos(autos);  // Muestra los autos al cargar



    // Llena las opciones de años
    llenarSelect();

});


// Event listener para los select de busqueda. (el change es una de las formas de leer el select)
 marca.addEventListener('change', (e)=>{
   datosBusqueda.marca = e.target.value; 

   filtrarAuto();
 });
 year.addEventListener('change', (e)=>{
    datosBusqueda.year = parseInt(e.target.value); 
    filtrarAuto();
 });
 maximo.addEventListener('change', (e)=>{
    datosBusqueda.maximo = e.target.value; 
    filtrarAuto();
 });
 minimo.addEventListener('change', (e)=>{
    datosBusqueda.minimo = e.target.value; 
    filtrarAuto();
 });
 puertas.addEventListener('change', (e)=>{
    datosBusqueda.puertas = parseInt(e.target.value); 
    filtrarAuto();
 });
 transmision.addEventListener('change', (e)=>{
    datosBusqueda.transmision = e.target.value; 
    filtrarAuto();
 });
 color.addEventListener('change', (e)=>{
    datosBusqueda.color = e.target.value; 
    filtrarAuto();
    //console.log(datosBusqueda);
 });


//Funciones
function mostrarAutos(autos){
    limpiarHTML(); // Elimina el HTML previo. Itera y muestra el resultado buscado. va por fuera del forEach, ya que por dentro recetea todo ignorando el return en caso de no querer filtraciones.
    autos.forEach(auto =>{
        // se usa distruturing para quitar auto de ${auto.marca}.
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('p');
        //muestra un listado de los autos.marca en la pagina
        autoHTML.textContent = `
         ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} -Precio: ${precio} - Color: ${color}
        
        
        `;

        //Insertar en el html
        resultado.appendChild(autoHTML);

    });
}

function limpiarHTML() {  // Se crea esta funcion para limpiar los autos que no estan dentro del filtro
// mientras haya algo = resultado.firstChild
while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild); // ayuda a que se quiten los sobrantes despues de la filtracion.
}
}


// Genera los años del select. esto se agrega al codigo de html
function llenarSelect(){
     // hace una conteo regresivo, va de mayor a menor
    for(let i = max; i >= min; i-- ){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i; 
        year.appendChild(opcion); // agrega las opciones de año al select
        
    }
}

// Funcion que filtra en base a la busqueda. Imprime solo el de la marca buscada
function filtrarAuto(){
    //para filtrar siempre usamos filter. La siguiente es una funcion de alto nivel(es una funcion que toma otra funcion)
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    //console.log(resultado);
    // Se llama la funcion de mostrarAutos para que aparescan en pantalla pero ahora con los filtros
   
    if(resultado.length /*si hay algo*/ ){
        mostrarAutos(resultado);
    } else{
        //llamar aqui la funcion limparHTML() o en la funcion noResultado
        noResultado();
    }

}
//para que aparesca el texto en pantalla se crea un div con la funcion noResultado
function noResultado(){
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultado';
    //se agrega el noResultado al resultado
    resultado.appendChild(noResultado);
}

// funcion para comparar la marca nomas
function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if(marca) { 
        return auto.marca === marca;
    }
    // si el usuario no selecciona nada se retorna el auto completo
    return auto;
};
function filtrarYear(auto){
    const {year} = datosBusqueda;
    if(year) { 
        return auto.year === year; //debido a que el year del auto viene como string se cambia a numero para poderlo comparar de lo contrario no se puede 
    }
    // si el usuario no selecciona nada se retorna el auto completo
    return auto;
};
function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if(minimo) { 
        return auto.precio >= minimo; 
    }
    return auto;

}
function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if(maximo) { 
        return auto.precio <= maximo; 
    }
    return auto;

}
function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if(puertas) { 
        return auto.puertas === puertas; 
    }
    return auto;

}
function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision;
    }
    return auto;
 }
 function filtrarColor(auto){
    const {color} = datosBusqueda;
    if(color){
        return auto.color === color;
    }
    return auto;
 }