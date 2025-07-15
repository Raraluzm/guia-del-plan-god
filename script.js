script_js = """const plan = [
  {
    nombre: "Primer Cuatrimestre",
    asignaturas: [
      { nombre: "Introducción al Derecho", correlativa: "-" },
      { nombre: "Historia del Derecho", correlativa: "-" },
      { nombre: "Interpretación Económica del Derecho", correlativa: "-" },
      { nombre: "Teoría del Estado", correlativa: "-" },
      { nombre: "Taller de Argumentación Jurídica y Oratoria", correlativa: "-" }
    ]
  },
  {
    nombre: "Segundo Cuatrimestre",
    asignaturas: [
      { nombre: "Derecho Privado (PG)", correlativa: "Introducción al Derecho" },
      { nombre: "Psico Sociología Jurídica", correlativa: "-" },
      { nombre: "Derecho Constitucional", correlativa: "Introducción al Derecho" },
      { nombre: "Derecho Internacional Público", correlativa: "Teoría del Estado" },
      { nombre: "Derechos Humanos", correlativa: "Introducción al Derecho" }
    ]
  },
  {
    nombre: "Tercer Cuatrimestre",
    asignaturas: [
      { nombre: "Derecho de las Obligaciones", correlativa: "Derecho Privado (PG)" },
      { nombre: "Teoría General del Proceso", correlativa: "Derecho Privado (PG)" },
      { nombre: "Derecho Penal I (PG)", correlativa: "Derecho Constitucional" },
      { nombre: "Derecho de los Negocios", correlativa: "Interpretación Económica del Derecho" },
      { nombre: "Derecho de Daños", correlativa: "Derecho Privado (PG)" }
    ]
  }
];

const container = document.getElementById("plan-container");
const resetBtn = document.getElementById("reset");

let estadoMaterias = JSON.parse(localStorage.getItem("estadoMaterias")) || {};

function render() {
  container.innerHTML = "";
  plan.forEach(cuatri => {
    const cuatriDiv = document.createElement("div");
    cuatriDiv.className = "cuatrimestre";
    cuatriDiv.innerHTML = `<h2>${cuatri.nombre}</h2>`;

    cuatri.asignaturas.forEach(asig => {
      const materiaDiv = document.createElement("div");
      materiaDiv.className = "materia";

      const nombre = asig.nombre;
      const correlativa = asig.correlativa;

      let estado = estadoMaterias[nombre];
      if (!estado) {
        if (correlativa === "-" || estadoMaterias[correlativa] === "aprobada") {
          estado = "disponible";
        } else {
          estado = "bloqueada";
        }
        estadoMaterias[nombre] = estado;
      }

      materiaDiv.classList.add(estado);
      materiaDiv.textContent = nombre;

      if (estado === "disponible" || estado === "aprobada") {
        materiaDiv.addEventListener("click", () => {
          if (estadoMaterias[nombre] === "aprobada") {
            estadoMaterias[nombre] = "disponible";
          } else {
            estadoMaterias[nombre] = "aprobada";
          }
          actualizarEstados();
          guardar();
          render();
        });
      }

      cuatriDiv.appendChild(materiaDiv);
    });

    container.appendChild(cuatriDiv);
  });
}

function actualizarEstados() {
  plan.forEach(cuatri => {
    cuatri.asignaturas.forEach(asig => {
      const nombre = asig.nombre;
      const correlativa = asig.correlativa;

      if (estadoMaterias[nombre] !== "aprobada") {
        if (correlativa === "-" || estadoMaterias[correlativa] === "aprobada") {
          estadoMaterias[nombre] = "disponible";
        } else {
          estadoMaterias[nombre] = "bloqueada";
        }
      }
    });
  });
}

function guardar() {
  localStorage.setItem("estadoMaterias", JSON.stringify(estadoMaterias));
}

resetBtn.addEventListener("click", () => {
  if (confirm("¿Seguro que querés reiniciar todo?")) {
    localStorage.removeItem("estadoMaterias");
    estadoMaterias = {};
    render();
  }
});

render();
"""

# Guardar archivos
with open(f"{folder}/index.html", "w") as f:
    f.write(index_html)
with open(f"{folder}/style.css", "w") as f:
    f.write(style_css)
with open(f"{folder}/script.js", "w") as f:
    f.write(script_js)

folder
