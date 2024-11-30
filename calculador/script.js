document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  const preloader = document.querySelector("[data-preaload]");
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("loaded");
    }, 1500);
  });

  // Menú móvil 
  const botonMenu = document.getElementById("botonMenu");
  const menuMovil = document.getElementById("menuMovil");

  botonMenu.addEventListener("click", () => {
    menuMovil.classList.toggle("visible");
    // Actualizar el aria-expanded para accesibilidad
    const estaExpandido = menuMovil.classList.contains("visible");
    botonMenu.setAttribute("aria-expanded", estaExpandido);
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener("click", (e) => {
    if (!botonMenu.contains(e.target) && !menuMovil.contains(e.target)) {
      menuMovil.classList.remove("visible");
      botonMenu.setAttribute("aria-expanded", "false");
    }
  });

  // Cerrar menú al redimensionar la ventana
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      menuMovil.classList.remove("visible");
      botonMenu.setAttribute("aria-expanded", "false");
    }
  });
});
/**
 * @typedef {Object} Electrodomestico
 * @property {string} nombre - Nombre del electrodoméstico
 * @property {number} potencia - Potencia en watts
 */

/**
 * @typedef {Object} ConsumoElectrodomestico
 * @property {string} clave - Identificador del electrodoméstico
 * @property {number} cantidad - Cantidad de unidades
 * @property {number} horas - Horas de uso diario
 * @property {number} dias - Días de uso semanal
 * @property {number} consumoDiario - Consumo diario en kWh
 */

class CalculadoraEnergia {
  constructor() {
    /** @type {Record<string, Electrodomestico>} */
    this.electrodomesticos = {
      refrigerador: { nombre: "Refrigerador", potencia: 150 },
      televisor: { nombre: "Televisor", potencia: 100 },
      lavadora: { nombre: "Lavadora", potencia: 500 },
      aire_acondicionado: { nombre: "Aire Acondicionado", potencia: 1500 },
      bombilla: { nombre: "Focos LED", potencia: 10 },
      computadora: { nombre: "Computadora", potencia: 200 },
      microondas: { nombre: "Microondas", potencia: 800 },
      secadora: { nombre: "Secadora", potencia: 3000 },
      horno: { nombre: "Horno Eléctrico", potencia: 2000 },
      cafetera: { nombre: "Cafetera", potencia: 1000 },
      plancha: { nombre: "Plancha", potencia: 1500 },
      aspiradora: { nombre: "Aspiradora", potencia: 1200 },
    };

    /** @type {ConsumoElectrodomestico[]} */
    this.listaElectrodomesticos = [];

    /** @type {Object.<string, Chart>} */
    this.graficos = {
      circular: null,
      barras: null,
      lineas: null,
    };

    this.inicializar();
  }

  inicializar() {
    this.inicializarSelectorElectrodomesticos();
    this.configurarEventListeners();
  }

  inicializarSelectorElectrodomesticos() {
    const selector = document.getElementById("selector-electrodomestico");
    if (!selector) return;

    Object.entries(this.electrodomesticos).forEach(([clave, { nombre }]) => {
      const opcion = document.createElement("option");
      opcion.value = clave;
      opcion.textContent = nombre;
      selector.appendChild(opcion);
    });
  }

  configurarEventListeners() {
    document
      .getElementById("agregar-electrodomestico")
      ?.addEventListener("click", () => this.agregarElectrodomestico());

    document
      .getElementById("boton-calcular")
      ?.addEventListener("click", () => this.calcularConsumo());
  }

  /**
   * Valida y obtiene los valores del formulario
   * @returns {Object|null} Valores del formulario o null si hay error
   */
  obtenerValoresFormulario() {
    const valores = {
      claveElectrodomestico: document.getElementById(
        "selector-electrodomestico"
      )?.value,
      cantidad: parseInt(
        document.getElementById("cantidad-electrodomestico")?.value
      ),
      horas: parseInt(document.getElementById("horas-electrodomestico")?.value),
      dias: parseInt(document.getElementById("dias-electrodomestico")?.value),
      costoKwh: parseFloat(document.getElementById("costo-kwh")?.value),
    };

    if (
      !valores.claveElectrodomestico ||
      isNaN(valores.cantidad) ||
      isNaN(valores.horas) ||
      isNaN(valores.dias) ||
      isNaN(valores.costoKwh)
    ) {
      this.mostrarError("Por favor, complete todos los campos correctamente.");
      return null;
    }

    if (
      valores.cantidad <= 0 ||
      valores.horas < 0 ||
      valores.horas > 24 ||
      valores.dias < 1 ||
      valores.dias > 7 ||
      valores.costoKwh <= 0
    ) {
      this.mostrarError(
        "Por favor, ingrese valores válidos para todos los campos."
      );
      return null;
    }

    return valores;
  }

  mostrarError(mensaje) {
    alert(mensaje);
  }

  agregarElectrodomestico() {
    const valores = this.obtenerValoresFormulario();
    if (!valores) return;

    const { nombre, potencia } =
      this.electrodomesticos[valores.claveElectrodomestico];
    const consumoDiario = (potencia * valores.cantidad * valores.horas) / 1000;

    const elementoLista = this.crearElementoLista(
      valores.cantidad,
      nombre,
      valores.dias,
      consumoDiario
    );

    document
      .getElementById("lista-electrodomesticos")
      ?.appendChild(elementoLista);

    this.listaElectrodomesticos.push({
      clave: valores.claveElectrodomestico,
      cantidad: valores.cantidad,
      horas: valores.horas,
      dias: valores.dias,
      consumoDiario,
    });

    this.reiniciarFormulario();
  }

  /**
   * Crea un elemento de lista para un electrodoméstico
   * @param {number} cantidad
   * @param {string} nombre
   * @param {number} dias
   * @param {number} consumoDiario
   * @returns {HTMLLIElement}
   */
  crearElementoLista(cantidad, nombre, dias, consumoDiario) {
    const li = document.createElement("li");
    li.className = "item-electrodomestico";
    li.innerHTML = `
          <div class="info-electrodomestico">
              <span class="nombre-electrodomestico">${cantidad} x ${nombre} | Dias : ${dias} | Consumo: ${consumoDiario}kWh </span>
              <span class="uso-electrodomestico">| ${this.obtenerEtiquetaDias(
                dias
              )}: ${consumoDiario.toFixed(2)} kWh</span>
          </div>
          <button class="eliminar-electrodomestico" type="button" >
              Eliminar
          </button>
      `;

    li.querySelector(".eliminar-electrodomestico")?.addEventListener(
      "click",
      () => this.eliminarElectrodomestico(li)
    );

    return li;
  }

  /**
   * Obtiene la etiqueta para los días de uso
   * @param {number} dias
   * @returns {string}
   */
  obtenerEtiquetaDias(dias) {
    const etiquetas = {
      7: "Diario",
      5: "Laboral",
      2: "Fin de semana",
      1: "Ocasional",
    };
    return etiquetas[dias] || `${dias} días/semana`;
  }

  /**
   * Elimina un electrodoméstico de la lista
   * @param {HTMLLIElement} elemento
   */
  eliminarElectrodomestico(elemento) {
    const indice = Array.from(elemento.parentNode?.children || []).indexOf(
      elemento
    );
    if (indice !== -1) {
      this.listaElectrodomesticos.splice(indice, 1);
      elemento.remove();
    }
  }

  reiniciarFormulario() {
    const campos = [
      "selector-electrodomestico",
      "cantidad-electrodomestico",
      "horas-electrodomestico",
      "dias-electrodomestico",
    ];

    const valoresPorDefecto = ["", "1", "1", "7"];

    campos.forEach((campo, index) => {
      const elemento = document.getElementById(campo);
      if (elemento) elemento.value = valoresPorDefecto[index];
    });
  }

  calcularConsumo() {
    const consumos = this.calcularConsumoTotal();
    if (!consumos) return;

    this.actualizarResultados(consumos);
    this.actualizarGraficos(consumos);
    this.actualizarRecomendacionSolar(consumos);

    document.getElementById("resultados").style.display = "block";
  }

  /**
   * Calcula el consumo total y por electrodoméstico
   * @returns {Object|null}
   */
  calcularConsumoTotal() {
    if (this.listaElectrodomesticos.length === 0) {
      this.mostrarError(
        "Agregue al menos un electrodoméstico para calcular el consumo."
      );
      return null;
    }

    let consumoTotalDiario = 0;
    const consumosPorElectrodomestico = {};

    this.listaElectrodomesticos.forEach(({ clave, consumoDiario, dias }) => {
      const consumoAjustado = (consumoDiario * dias) / 7;
      consumoTotalDiario += consumoAjustado;

      consumosPorElectrodomestico[clave] =
        (consumosPorElectrodomestico[clave] || 0) + consumoAjustado;
    });

    const costoKwh = parseFloat(
      document.getElementById("costo-kwh")?.value || "0"
    );

    return {
      diario: consumoTotalDiario,
      mensual: consumoTotalDiario * 30,
      anual: consumoTotalDiario * 365,
      ahorroAnual: consumoTotalDiario * 365 * costoKwh * 0.8,
      porElectrodomestico: consumosPorElectrodomestico,
    };
  }

  /**
   * Actualiza los resultados en la interfaz
   * @param {Object} consumos
   */
  actualizarResultados({ diario, mensual, anual, ahorroAnual }) {
    const elementos = {
      "consumo-diario": `${diario.toFixed(2)} kWh`,
      "consumo-mensual": `${mensual.toFixed(2)} kWh`,
      "consumo-anual": `${anual.toFixed(2)} kWh`,
      "ahorro-anual-dinero": `$${ahorroAnual.toFixed(2)}`,
    };

    Object.entries(elementos).forEach(([id, valor]) => {
      const elemento = document.getElementById(id);
      if (elemento) elemento.textContent = valor;
    });
  }

  /**
   * Actualiza todos los gráficos
   * @param {Object} consumos
   */
  actualizarGraficos(consumos) {
    this.actualizarGraficoCircular(consumos.porElectrodomestico);
    this.actualizarGraficoBarras(consumos.anual, consumos.ahorroAnual);
    this.actualizarGraficoLineas(consumos.anual, consumos.ahorroAnual);
  }

  /**
   * Actualiza el gráfico circular de distribución de consumo
   * @param {Object} consumosPorElectrodomestico
   */
  actualizarGraficoCircular(consumosPorElectrodomestico) {
    const ctx = document.getElementById("grafico-circular")?.getContext("2d");
    if (!ctx) return;

    const colores = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#C9CBCF",
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
    ];

    const datos = Object.entries(consumosPorElectrodomestico).map(
      ([clave, valor]) => ({
        label: this.electrodomesticos[clave].nombre,
        valor,
      })
    );

    if (this.graficos.circular) this.graficos.circular.destroy();

    this.graficos.circular = new Chart(ctx, {
      type: "pie",
      data: {
        labels: datos.map((d) => d.label),
        datasets: [
          {
            data: datos.map((d) => d.valor),
            backgroundColor: colores.slice(0, datos.length),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "right" },
          title: {
            display: true,
            text: "Distribución del Consumo Anual",
          },
        },
      },
    });
  }

  /**
   * Actualiza el gráfico de barras de consumo vs ahorro
   * @param {number} consumoAnual
   * @param {number} ahorroAnual
   */
  actualizarGraficoBarras(consumoAnual, ahorroAnual) {
    const ctx = document.getElementById("grafico-barras")?.getContext("2d");
    if (!ctx) return;

    if (this.graficos.barras) this.graficos.barras.destroy();

    this.graficos.barras = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Consumo Anual", "Ahorro Anual"],
        datasets: [
          {
            label: "kWh",
            data: [consumoAnual, ahorroAnual],
            backgroundColor: ["#36A2EB", "#FFCE56"],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "kWh",
            },
          },
        },
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Consumo vs Ahorro Anual",
          },
        },
      },
    });
  }

  /**
   * Actualiza el gráfico de líneas de proyección a 10 años
   * @param {number} consumoAnual
   * @param {number} ahorroAnual
   */
  actualizarGraficoLineas(consumoAnual, ahorroAnual) {
    const ctx = document.getElementById("grafico-lineas")?.getContext("2d");
    if (!ctx) return;

    const años = Array.from({ length: 10 }, (_, i) => i + 1);
    const datosProyeccion = {
      consumoSinPaneles: años.map((año) => consumoAnual * año),
      consumoConPaneles: años.map((año) => consumoAnual * año * 0.2),
      ahorroAcumulado: años.map((año) => ahorroAnual * año),
    };

    if (this.graficos.lineas) this.graficos.lineas.destroy();

    this.graficos.lineas = new Chart(ctx, {
      type: "line",
      data: {
        labels: años,
        datasets: [
          {
            label: "Consumo sin paneles solares",
            data: datosProyeccion.consumoSinPaneles,
            borderColor: "#FF6384",
            fill: false,
          },
          {
            label: "Consumo con paneles solares",
            data: datosProyeccion.consumoConPaneles,
            borderColor: "#4BC0C0",
            fill: false,
          },
          {
            label: "Ahorro acumulado",
            data: datosProyeccion.ahorroAcumulado,
            borderColor: "#FFCE56",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: {
            display: true,
            text: "Proyección de Ahorro a 10 Años",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Años",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "kWh",
            },
          },
        },
      },
    });
  }

  /**
   * Actualiza las recomendaciones de paneles solares
   * @param {Object} consumos
   */
  actualizarRecomendacionSolar({ diario, ahorroAnual }) {
    const potenciaRecomendada = diario / 5; // Factor de conversión para paneles solares
    const numeroPaneles = Math.ceil((potenciaRecomendada * 1000) / 300); // Paneles de 300W
    const costoPaneles = numeroPaneles * 50000;
    const costoInstalacion = costoPaneles * 0.3;
    const costoTotal = costoPaneles + costoInstalacion;
    const tiempoRecuperacion = costoTotal / ahorroAnual;

    const elementos = {
      "consumo-promedio-diario": diario.toFixed(2),
      "potencia-recomendada": potenciaRecomendada.toFixed(2),
      "numero-paneles": numeroPaneles,
      "costo-paneles": costoPaneles.toLocaleString(),
      "costo-instalacion": costoInstalacion.toLocaleString(),
      "costo-total": costoTotal.toLocaleString(),
      "ahorro-anual-estimado": ahorroAnual.toLocaleString(),
      "tiempo-recuperacion": tiempoRecuperacion.toFixed(1),
    };

    Object.entries(elementos).forEach(([id, valor]) => {
      const elemento = document.getElementById(id);
      if (elemento) elemento.textContent = valor;
    });
  }
}

// Inicializar la calculadora cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  new CalculadoraEnergia();
});
