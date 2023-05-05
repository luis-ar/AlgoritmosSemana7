const txtcodigo = document.querySelector("#codigo");
const txtnombre = document.querySelector("#nombre");
const txtapellido = document.querySelector("#apellido");
const txtcorreo = document.querySelector("#email");
const guardar = document.querySelector("#boton-guardar");
const actualizar = document.querySelector("#boton-actualizar");
const eliminarbtn = document.querySelector("#boton-eliminar");
const consultar = document.querySelector("#boton-consultar");
const llenarDatos = document.querySelector(".llenar-datos");

class Nodo {
  constructor(codigo, nombre, apellido, correo, siguiente = null) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.siguiente = siguiente;
  }
}

class ListaEnlazada {
  constructor() {
    this.cabeza = null;
    this.longitud = 0;
  }
  //agregar
  agregar(codigo, nombre, apellido, correo) {
    const nodo = new Nodo(codigo, nombre, apellido, correo);
    if (this.cabeza === null) {
      this.cabeza = nodo;
    } else {
      let nodoActual = this.cabeza;
      while (nodoActual.siguiente !== null) {
        nodoActual = nodoActual.siguiente;
      }
      nodoActual.siguiente = nodo;
    }
    this.longitud++;
  }
  //buscar por codigo
  buscar(codigo) {
    let nodoActual = this.cabeza;
    while (nodoActual !== null) {
      if (nodoActual.codigo === codigo) {
        return nodoActual;
      }
      nodoActual = nodoActual.siguiente;
    }
    return null;
  }
  //actualizar
  actualizar(codigo, nombre, apellido, correo) {
    const nodo = this.buscar(codigo);
    if (nodo !== null) {
      nodo.nombre = nombre;
      nodo.apellido = apellido;
      nodo.correo = correo;
    }
  }

  //eliminar

  eliminar(codigo) {
    let nodoActual = this.cabeza;
    let nodoAnterior = null;
    while (nodoActual !== null) {
      if (nodoActual.codigo === codigo) {
        if (nodoAnterior === null) {
          this.cabeza = nodoActual.siguiente;
        } else {
          nodoAnterior.siguiente = nodoActual.siguiente;
        }
        this.longitud--;
        return nodoActual;
      }
      nodoAnterior = nodoActual;
      nodoActual = nodoActual.siguiente;
    }
    return null;
  }
}

function LimpiarEntradas() {
  txtcodigo.value = "";
  txtnombre.value = "";
  txtapellido.value = "";
  txtcorreo.value = "";
  txtcodigo.focus();
}
const lista = new ListaEnlazada();

function VerDatos() {
  let cod, nom, apellido, correo;
  let nodoActual = lista.cabeza;
  num = 0;
  llenarDatos.innerHTML = "";
  while (nodoActual !== null) {
    cod = nodoActual.codigo;
    nom = nodoActual.nombre;
    apellido = nodoActual.apellido;
    correo = nodoActual.correo;
    num++;

    const fila = document.createElement("tr");
    fila.innerHTML = `
                <td>${num}</td>
                <td>${cod}</td>
                <td>${nom}</td>
                <td>${apellido}</td>
                <td>${correo}</td>
              `;

    llenarDatos.appendChild(fila);

    nodoActual = nodoActual.siguiente;
  }
}

guardar.addEventListener("click", () => {
  let cod = txtcodigo.value;
  let nom = txtnombre.value.toUpperCase();
  let apellido = txtapellido.value.toUpperCase();
  let correo = txtcorreo.value;
  lista.agregar(cod, nom, apellido, correo);
  LimpiarEntradas();
  VerDatos();
});

eliminarbtn.addEventListener("click", () => {
  let cod = txtcodigo.value;
  lista.eliminar(cod);

  LimpiarEntradas();
  VerDatos();
});

consultar.addEventListener("click", () => {
  let cod = txtcodigo.value;
  if (cod === "") {
    alert("Ingrese un codigo por favor");
  } else {
    busqueda = lista.buscar(cod);
    if (busqueda !== null) {
      txtnombre.value = busqueda.nombre;
      txtapellido.value = busqueda.apellido;
      txtcorreo.value = busqueda.correo;
    } else {
      alert("El código: " + cod + ", no esta en la Lista..");
    }
  }
});

actualizar.addEventListener("click", () => {
  let cod = txtcodigo.value;
  let nom = txtnombre.value.toUpperCase();
  let apellido = txtapellido.value.toUpperCase();
  let correo = txtcorreo.value;
  lista.actualizar(cod, nom, apellido, correo);

  LimpiarEntradas();
  VerDatos();
});

// class Nodo {
//   constructor(cod, nom, ape, correo) {
//     this.codigo = cod;
//     this.nombre = nom;
//     this.apellido = ape;
//     this.correo = correo;
//     this.sig = null;
//   }
// }

// let ini, fin;
// let pFound;
// let num = 0;

// function LimpiarEntradas() {
//   txtcodigo.value = "";
//   txtnombre.value = "";
//   txtapellido.value = "";
//   txtcorreo.value = "";
//   txtcodigo.focus();
// }

// function VerDatos() {
//   let cod, nom, apellido, correo;
//   let aux = ini;
//   num = 0;
//   llenarDatos.innerHTML = "";
//   while (aux != null) {
//     cod = aux.codigo;
//     nom = aux.nombre;
//     apellido = aux.apellido;
//     correo = aux.correo;
//     num++;

//     const fila = document.createElement("tr");
//     fila.innerHTML = `
//               <td>${num}</td>
//               <td>${cod}</td>
//               <td>${nom}</td>
//               <td>${apellido}</td>
//               <td>${correo}</td>
//             `;

//     llenarDatos.appendChild(fila);

//     aux = aux.sig;
//   }
// }

// function buscar(inicio, cod) {
//   let pos = inicio;
//   while (pos !== null && cod.toLowerCase() !== pos.codigo.toLowerCase()) {
//     pos = pos.sig;
//   }
//   return pos;
// }

// function insertaInicio(inicio, cod, nom, apellido, correo) {
//   const nuevo = {
//     codigo: cod,
//     nombre: nom,
//     apellido: apellido,
//     correo: correo,
//     sig: inicio,
//   };
//   inicio = nuevo;
//   return inicio;
// }

// function eliminar(actual) {
//   let anterior = ini;
//   while (anterior.sig !== actual && anterior.sig !== null) {
//     anterior = anterior.sig;
//   }
//   if (actual !== null) {
//     if (anterior === actual) {
//       ini = actual.sig;
//     } else {
//       anterior.sig = actual.sig;
//     }
//   }
//   return ini;
// }

// // guardar.addEventListener("click", () => {
// //   let cod = txtcodigo.value;
// //   let nom = txtnombre.value.toUpperCase();
// //   let apellido = txtapellido.value.toUpperCase();
// //   let correo = txtcorreo.value;
// //   ini = insertaInicio(ini, cod, nom, apellido, correo);
// //   LimpiarEntradas();
// //   VerDatos();
// // });

// actualizar.addEventListener("click", () => {
//   if (txtcodigo != null) {
//     pFound.codigo = txtcodigo.value;
//   }
//   if (txtnombre != null) {
//     pFound.nombre = txtnombre.value;
//   }
//   pFound.apellido = txtapellido.value;
//   pFound.correo = txtcorreo.value;
//   LimpiarEntradas();
//   VerDatos();
//   alert("modificando");
// });

// eliminar1.addEventListener("click", () => {
//   eliminar(pFound);
//   LimpiarEntradas();
//   VerDatos();
//   if (ini == null) alert("La lista esta vacia");
// });
