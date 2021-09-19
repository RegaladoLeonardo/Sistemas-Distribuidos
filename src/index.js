"use strict";

import './styles.css';

const ruta = document.getElementById('ruta');
const ejecurar = document.querySelector('#botones');

const IP = document.getElementById('IP');
const N = document.getElementById('N');

const potencia = [0,1,2,3,4,5,6,7,8,9,10,11]
const numeros = [128,64,32,16,8,4,2,1]
const mascaras = ["255.255.255.0","255.255.0.0","255.0.0.0"]



ejecurar.addEventListener('click', () => {
    let mascara = "";
    let subredes = N.value;
    let l;
    let clase="";
    
    console.log(IP.value)

    let array1 = IP.value.split('.');
    alert(N.value)

    if(array1[0]>=0 && array1[0]<128){

        mascara = "255.0.0.0" 
        l= 1
        clase ="A"
        
    }else if(array1[0]>=128 && array1[0]<192){
        mascara = "255.255.0.0" 
        l = 2
        clase = "B"

    }else if(array1[0]>=192 && array1[0]<224){
        mascara = "255.255.255.0" 
        l = 3
        clase = "C"
    }else{
        
        console.log("No pertenece a ninguna mascara")
    }




    let IpConvertido = binario(IP.value);
    //console.log(IpConvertido)

    let Mconvertido = binario(mascara);
    //console.log(Mconvertido)

    let MascaraB = bits(subredes, Mconvertido);
    //console.log(MascaraB[0])

    let SaltoR = Salto(MascaraB[0], l)    
    let Host = Hosts(MascaraB[0])

    pintarT(IP.value, SaltoR,   MascaraB[1], l, Host)
    
    console.log(clase)
    document.formulario.clase.value=clase;

    
})

const Hosts= ( MarcaraIp ) => {
    
    let arrayh = MarcaraIp.split('.');
    let ceros= 0;
    let resultadoH;
    
    for (let i = 0; i < arrayh.length; i++) {
        

        if(arrayh[i] == "00000000"){
            ceros = ceros + 8
        }else{
            let arrayp =arrayh[i].split("");

            for (let k = 0; k < arrayp.length; k++) {
                
                if(arrayp[k] == 0){
                    ceros = ceros + 1 ;
                }
    
                
            }
        }

        
        
    }

    //console.log("ceros: "+ ceros)
    resultadoH = (Math.pow(2, ceros)) -2
    console.log("resultado -----------"+resultadoH)

    return resultadoH;
}


const pintarT = (IP, Salto, numeroR, lugar, Host) => {
    let datos = '';
    /*
    personas.forEach( persona => {
        data = data + `
            <tr>
                <td>${persona.name}</td>
                <td>${persona.edad}</td>
                <td>${persona.correo}</td>
            </tr>
        `;
    })

*/

    let lapso = Salto;
    let a = Salto
    for (let j = 0; j < numeroR; j++) {

        lapso = (a *( j + 1 )) - 1

        console.log("Este es el lapso: "+lapso)
       //const element = array[j];
        console.log("ip en curso: " +IP)

        let array = IP.split('.');
        //let b = 0;
        let saltito = 0;
        let clave = 0;

        for (let k = 0; k < array.length; k++) {
            
            if(array[k] == 0 ){
                //saltito = saltito + Salto;
                //array[k] = saltito
                clave = k;
                k = 999999999

            }
        }


        array[clave] = (Salto*j);
        let rango1 = array[0] +"." + array[1]+"."+ array[2]+ "."+array[3];

        let arrayf = rango1.split('.');
        let op = 0;
        for (let l = 0; l < arrayf.length; l++) {
            /*
            if(arrayf[l] =! 0){
                op = op + 1 
            }*/
            if(arrayf[l] == 0 ||  arrayf[l] == array[clave]){
                
                //console.log(lugar+"=="+l)
                if(lugar == l ){
                    console.log("entro")
                    arrayf[l] = lapso; 
                    
                }else{
                    arrayf[l] = 255;
                }
                

            }else{
                op = op + 1;
            }      
        }

        let rango2 = arrayf[0] +"." + arrayf[1]+"."+ arrayf[2]+ "."+arrayf[3];

        //la idea ahora es que se va  tomar como referecnia la mascara para sbaer donde se puede agregar si en el segundo o tercero  o cuarto termino

        datos = datos + `
            <tr>
                <td>${j+1}</td>
                <td>${rango1}</td>
                <td>/</td>
                <td>${rango2}</td>
                <td>${Host}</td>
            </tr>
        `;
    }



    const tabla = `
        <table class="table">
            <thead>
                <th> Subred </th>
                <th> Rango inicial </th>
                <th></th>
                <th> Rango final </th>
                <th> Host por subred </th>
            </thead>
            <tbody>
                ${datos}
            </tbody>
        </table>
    `;

    ruta.innerHTML = tabla;
}

pintarT()



const Salto = (MascaraB , l) => {
    let arrayB =MascaraB.split('.');
    let salto = 256;
    let arrayR = [];

    for(let i=0; i<arrayB.length ; i++ ){
        let suma= 0;
        let arrayp =arrayB[i].split("");
        //console.log("cada componente: "+ arrayB[i])
        for(let k=0; k<arrayp.length ; k++ ){
            //console.log("cada palabra: "+k+"-"+ arrayp[k])
        
            if(arrayp[k] == 1){
                suma = suma + numeros[k]; 

            }
        }

        arrayR[i] = suma;
        
    }

    salto = salto - arrayR[l];

    //console.log("salto: "+salto)

    return salto;
}

const bits = (n, mascara) => {
    let posiciones= 0;
    let RedesN = 0;
    let NumerosCeros = 0 ;

    for (var i=0; i < potencia.length; i++) {
        
        //console.log(potencia[i]+"--Numero con potencia "+Math.pow(2,potencia[i])+"")

        if(Math.pow(2,potencia[i]) >= n){

            RedesN = Math.pow(2,potencia[i])
            //console.log("Entro"+potencia[i])
            posiciones = potencia[i];
            i = 1000;

        }
    }

    //console.log("robo: "+ posiciones)
    let resultado = "";
    let a;
    let arraym = mascara.split('.');
    let agregado="";
    let establecido = 8 -posiciones;
    for (var i=0; i <arraym.length; i++) {
        //console.log(i+"--" + arraym[i])

        if(arraym[i] == "00000000"){   
            while(posiciones>0){

                agregado = agregado + "1";
                posiciones = posiciones -1;
            }
            while(establecido>0){

                agregado = agregado + "0"
                establecido = establecido - 1;
            }
            a = i;
            i = 100

        }
    }
    
    arraym[a] = agregado ; 
    
    resultado = arraym[0] +"." + arraym[1]+"."+ arraym[2]+ "."+arraym[3];
    //console.log("resultado "+ resultado)

    return [resultado, RedesN];
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

//=============================================================================


const root = document.getElementById('root');
//--------------------------
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
//----------------------------------------------------


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



