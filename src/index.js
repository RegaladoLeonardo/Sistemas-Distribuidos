"use strict";

const ejecurar = document.querySelector('#botones');

const direccion = document.getElementById('direccion');

const IP = document.getElementById('IP');
const N = document.getElementById('N');

const potencia = [0,1,2,3,4,5,6,7,8]
const numeros = [128,64,32,16,8,4,2,1]
const mascaras = ["255.255.255.0","255.255.0.0","255.0.0.0"]


ejecurar.addEventListener('click', () => {
    let mascara = "";
    let subredes = N.value;

    let array1 = IP.value.split('.');
    alert(N.value)

    if(array1[0]>=0 && array1[0]<128){

        mascara = "255.0.0.0" 
        
        
    }else if(array1[0]>=128 && array1[0]<192){
        mascara = "255.255.0.0" 
    }else if(array1[0]>=192 && array1[0]<224){
        mascara = "25|5.255.255.0" 
    }else{
        console.log("No pertenece a ninguna mascara")
    }


    let IpConvertido = binario(IP.value);
    console.log(IpConvertido)

    let Mconvertido = binario(mascara);
    console.log(Mconvertido)

    bits(subredes, mascara)
    

    
})

const bits = (n, mascara) => {
    let posiciones= 0;

    for (var i=0; i < potencia.length; i++) {
        
        console.log(potencia[i]+"--Numero con potencia "+Math.pow(2,potencia[i])+"")

        if(Math.pow(2,potencia[i]) >= n){

            console.log("Entro"+potencia[i])
            posiciones = potencia[i];
            i = 1000;
        }
    }

    console.log("posiciones: "+ posiciones)


}

const binario = (ip) => {

    //console.log("metodo: "+ip)
    let binario = []
    let resultado = "";
    var arraydeIP = ip.split('.');
/*
    for (var i=0; i < arraydeIP.length; i++) {
        alert(arraydeIP[i] + " --- ");
    }
*/
    let numerito = 0 ;
    arraydeIP.forEach( Ip => {

        let cuarteto = "";
        let cantidad = 8;
        if(parseInt(Ip) > 0){
            let a= 0;
            
            while(Ip>0){
                cantidad = cantidad - 1;
                //console.log("cantidad: "+cantidad)
                if(Ip >= numeros[a]){
                    Ip = Ip - numeros[a];
                    cuarteto = cuarteto + "1";
                }else{
                    cuarteto = cuarteto + "0";
                }
                a = a +1;
            }

            for (var k=0; k < cantidad ; k++) {
                cuarteto = cuarteto + "0";
            }
            
        }else if(Ip == 0){
            cuarteto = "00000000"
        }

        binario[numerito] = cuarteto;
        numerito = numerito + 1;        
        
    })
    /*
    for (var i=0; i < binario.length; i++) {
        console.log(i+"--" + binario[i]);
    }
    */
    resultado = binario[0] +"." + binario[1]+"."+binario[2]+ "."+binario[3];

    return resultado ;

}



const root = document.getElementById('root');

const nombre = document.getElementById('nombre');
const correo = document.getElementById('correo');
const edad = document.getElementById('edad');

const boton = document.getElementById('boton');

const personas = [
    { name: 'Felipe', edad: 23, correo: 'a@a.a' },
    { name: 'Leonardo', edad: 16, correo: 'b@b.b' },
    { name: 'Martha', edad: 27, correo: 'c@c.c' }
];

const agregarPersona = () => {
    const persona = { name: nombre.value, edad: edad.value, correo: correo.value };
    personas.push(persona);
    pintarTabla();

}

const pintarTabla = () => {
    let data = '';
    personas.forEach( persona => {
        data = data + `
            <tr>
                <td>${persona.name}</td>
                <td>${persona.edad}</td>
                <td>${persona.correo}</td>
            </tr>
        `;
    })

    const table = `
        <table class="table">
            <thead>
                <th> Nombre </th>
                <th> Edad </th>
                <th> Correo </th>
            </thead>
            <tbody>
                ${data}
            </tbody>
        </table>
    `;

    root.innerHTML = table;
}

pintarTabla();

boton.addEventListener('click', (event) => {
    agregarPersona();
});














 






/*
    const table = document.createElement('table');

const thead = document.createElement('thead');

const col1 = document.createElement('th');
col1.innerText = 'Nombre';

const col2 = document.createElement('th');
col2.innerText = 'Edad';

const col3 = document.createElement('th');
col3.innerText = 'Correo';

thead.appendChild(col1);
thead.appendChild(col2);
thead.appendChild(col3);

table.appendChild(thead);

table.classList.add(['table']);

root.appendChild(table);
*/