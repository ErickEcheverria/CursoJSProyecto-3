// Variables
const genero = document.querySelector('#genero');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const nacionalidad = document.querySelector('#nacionalidad');

// Contendra los resultados
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 20;

// Generarndo objeto con la buscqueda
const datosBusqueda = {
    genero : '',
    nombre : '',
    minimo : '',
    maximo : '',
    edad : '',
    nacionalidad : ''
}

document.addEventListener('DOMContentLoaded',()=>{
    mostrarPersonas(personas); //Muestra las personas

    // Llena las opciones de años
    llenarSelect();
})

genero.addEventListener('change', e =>{
    datosBusqueda.genero = e.target.value;

    filtrarPersona();
});

year.addEventListener('change', e =>{
    datosBusqueda.year = parseInt(e.target.value);
    filtrarPersona();
});

minimo.addEventListener('change', e =>{
    datosBusqueda.minimo = e.target.value;

    filtrarPersona();
});

maximo.addEventListener('change', e =>{
    datosBusqueda.maximo = e.target.value;

    filtrarPersona();
});

nacionalidad.addEventListener('change', e =>{
    datosBusqueda.nacionalidad = e.target.value;
    filtrarPersona();
});




function mostrarPersonas(personas){

    limpiarHTML();

    personas.forEach(persona => {

        //const {genero,nombre,year,edad,nacionalidad} = persona;
        const personaHTML = document.createElement('p');

        personaHTML.textContent = `
            ${persona.genero}  -  ${persona.nombre}  -  ${persona.year} - Edad:  ${persona.edad}  -  ${persona.nacionalidad}
        `;
        resultado.appendChild(personaHTML)

    })
}

//Limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect(){
    for(let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

function filtrarPersona() {

    limpiarHTML();

    const resultado = personas.filter(filtrarGenero).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarNacionalidad)
    
    if(resultado.length){
        mostrarPersonas(resultado);
    }else{
        noResutado();
    }
}

function noResutado(){
    const noResutado = document.createElement('div');
    noResutado.classList.add('alerta','error');
    noResutado.textContent = 'No hay ninguna Persona que coincida con su busqueda';
    resultado.appendChild(noResutado);
}

function filtrarGenero (persona){
    const {genero} = datosBusqueda;
    if(genero){
        return persona.genero === genero;
    }
    return persona;
}

function filtrarYear (persona){
    const {year} = datosBusqueda;
    if(year){
        return persona.year === year;
    }
    return persona;
}

function filtrarMinimo(persona){
    const {minimo} = datosBusqueda;
    if(minimo){
        return persona.edad >= minimo;
    }
    return persona;
}

function filtrarMaximo(persona){
    const {maximo} = datosBusqueda;
    if(maximo){
        return persona.edad <= maximo;
    }
    return persona;
}

function filtrarNacionalidad (persona){
    const {nacionalidad} = datosBusqueda;
    if(nacionalidad){
        return persona.nacionalidad === nacionalidad;
    }
    return persona;
}