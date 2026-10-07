import React, { useState } from 'react';

export default function App() {
  const [vistaActual, setVistaActual] = useState('mostrador-pos');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [notificacion, setNotificacion] = useState<string | null>(null);

  // Choco Mascot State
  const [chocoExpresion, setChocoExpresion] = useState('normal'); 
  const [chocoConsejoIndex, setChocoConsejoIndex] = useState(0);

  const consejosChoco = [
    "🍫 ¡Tip Pro! Compra insumos al por mayor una vez al mes para ahorrar hasta un 25% en costos.",
    "💡 Negocio: Las fotos con luz natural cerca de la ventana venden el doble en redes sociales.",
    "✨ Seguridad: Pedir código de verificación para cambiar tu Yape/Plin evita fraudes en tienda física.",
    "💸 Finanzas: Separa siempre el dinero de tus insumos de tus ganancias personales.",
    "🌸 TikTok Tip: Muestra el relleno crujiente de pistacho en video, ¡es viral asegurado!",
    "🍰 Finanzas: Lleva el control diario de tus ventas en caja para evitar mermas fantasma."
  ];

  const interactuarChoco = () => {
    const expresiones = ['anime', 'chad', 'normal'];
    const proximaExp = expresiones[Math.floor(Math.random() * expresiones.length)];
    setChocoExpresion(proximaExp);
    setChocoConsejoIndex((prev) => (prev + 1) % consejosChoco.length);
    setTimeout(() => setChocoExpresion('normal'), 4000);
  };

  const mostrarNotificacion = (msg: string) => {
    setNotificacion(msg);
    setTimeout(() => setNotificacion(null), 3500);
  };

  const [esPro, setEsPro] = useState(false);
  const [intentosPostresGratis, setIntentosPostresGratis] = useState(0);
  const [tipoFiltroClase, setTipoFiltroClase] = useState('todos');

  // Estado para el QR o Formato de Pago Yape/Plin personal del usuario
  const [qrUsuario, setQrUsuario] = useState({
    numero: '',
    nombreTitular: '',
    configurado: false
  });
  
  const [mostrarWidgetConfigQR, setMostrarWidgetConfigQR] = useState(false);
  const [inputNumQR, setInputNumQR] = useState('');
  const [inputNombreQR, setInputNombreQR] = useState('');

  // Estados para flujo de seguridad con código de verificación
  const [pasoSeguridadQR, setPasoSeguridadQR] = useState('formulario'); // 'formulario' o 'codigo'
  const [codigoEnviadoSimulado, setCodigoEnviadoSimulado] = useState('');
  const [codigoIngresado, setCodigoIngresado] = useState('');

  const [modalConfigurarQR, setModalConfigurarQR] = useState(false);
  
  // Modal de Ticket Exitoso Yape-style con Choco
  const [ticketExitoso, setTicketExitoso] = useState<any>(null);

  const [recetasBase, setRecetasBase] = useState<any[]>(() => {
    const lista = [];
    const listaDificultades = ['Fácil', 'Intermedio', 'Avanzado'];
    
    const tiposPostres = [
      { nombre: "Torta Fudge de Chocolate", icono: "🎂", clase: "Tortas", cat: "tiktok" },
      { nombre: "Cupcake Red Velvet con frosting", icono: "🧁", clase: "Cupcakes", cat: "instagram" },
      { nombre: "Frappe Cremoso de Café Moka", icono: "🥤", clase: "Bebidas/Frappes", cat: "app" },
      { nombre: "Cookie con Chispas de Colores", icono: "🍪", clase: "Cookies", cat: "instagram" },
      { nombre: "Croissant Relleno de Pistacho", icono: "🥐", clase: "Croissants", cat: "app" },
      { nombre: "Chocoteja Artesanal Dubai", icono: "🍫", clase: "Chocolates", cat: "tiktok" },
      { nombre: "Cupcake de Vainilla con Chispas", icono: "🧁", clase: "Cupcakes", cat: "tiktok" },
      { nombre: "Frappe Helado de Oreo y Fresa", icono: "🥤", clase: "Bebidas/Frappes", cat: "instagram" },
      { nombre: "Cheesecake de Maracuyá", icono: "🍰", clase: "Tortas", cat: "instagram" },
      { nombre: "Alfajor Clásico de Lúcuma", icono: "🥮", clase: "Cookies", cat: "app" }
    ];

    let idCounter = 1;
    for (let pIdx = 0; pIdx < tiposPostres.length; pIdx++) {
      const itemTipo = tiposPostres[pIdx];
      for (let i = 1; i <= 9; i++) {
        const difIndex = Math.floor((i - 1) / 3);
        const dif = listaDificultades[difIndex];
        
        const precioJusto = parseFloat((3.50 + ((idCounter * 1.3) % 11.50)).toFixed(2));

        lista.push({
          id: idCounter++,
          nombre: `${itemTipo.nombre} #${Math.ceil(idCounter/10)} 💖`,
          precio: precioJusto,
          categoria: itemTipo.cat,
          clase: itemTipo.clase,
          icono: itemTipo.icono,
          dificultad: dif,
          desc: `Receta profesional paso a paso optimizada (${itemTipo.clase}). Nivel: ${dif}.`,
          ingredientes: [
            "500g Harina pastelera sin preparar",
            "200g Mantequilla sin sal de alta calidad",
            "150g Azúcar rubia o blanca refinada",
            "3 Unidades de huevos frescos de granja",
            "1 Cucharadita de esencia pura de vainilla",
            "100ml Crema de leche o leche entera"
          ],
          pasos: [
            "Paso 1: Tamizar los ingredientes secos en un bol amplio para evitar grumos y asegurar una textura fina.",
            "Paso 2: Batir la mantequilla a temperatura ambiente junto con el azúcar hasta obtener una consistencia cremosa.",
            "Paso 3: Integrar los huevos uno a uno batiendo constantemente y añadir la esencia de vainilla.",
            "Paso 4: Incorporar los ingredientes secos alternando con la leche mediante movimientos envolventes.",
            "Paso 5: Hornear a 180°C según el indicador de dificultad y dejar enfriar antes de servir o decorar."
          ]
        });
      }
    }

    const ordenDif: Record<string, number> = { 'Fácil': 1, 'Intermedio': 2, 'Avanzado': 3 };
    lista.sort((a, b) => ordenDif[a.dificultad] - ordenDif[b.dificultad]);

    return lista;
  });

  const [carrito, setCarrito] = useState<any[]>([]);
  const [modalReceta, setModalReceta] = useState<any>(null);
  const [modalQR, setModalQR] = useState<any>(null);
  const [modalNuevoProducto, setModalNuevoProducto] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState('todas');

  const [nuevaReceta, setNuevaReceta] = useState({
    nombre: '',
    precioSugerido: ''
  });

  const detectarIconoYClase = (nombre: string) => {
    const lower = nombre.toLowerCase();
    if (lower.includes('frappe') || lower.includes('licuado') || lower.includes('jugo') || lower.includes('shake')) {
      return { icono: '🥤', clase: 'Bebidas/Frappes' };
    }
    if (lower.includes('cupcake') || lower.includes('muffin') || lower.includes('magdalena')) {
      return { icono: '🧁', clase: 'Cupcakes' };
    }
    if (lower.includes('torta') || lower.includes('pastel') || lower.includes('cake')) {
      return { icono: '🎂', clase: 'Tortas' };
    }
    if (lower.includes('cookie') || lower.includes('galleta')) {
      return { icono: '🍪', clase: 'Cookies' };
    }
    if (lower.includes('croissant') || lower.includes('cachito')) {
      return { icono: '🥐', clase: 'Croissants' };
    }
    if (lower.includes('chocoteja') || lower.includes('chocolate') || lower.includes('trufa')) {
      return { icono: '🍫', clase: 'Chocolates' };
    }
    return { icono: '🍰', clase: 'Otros' };
  };

  const agregarRecetaCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!esPro) {
      if (intentosPostresGratis >= 3) {
        mostrarNotificacion("👑 ¡Límite alcanzado! Necesitas el Plan Pro para agregar más postres.");
        setModalNuevoProducto(false);
        setVistaActual('suscripcion');
        return;
      }
      setIntentosPostresGratis(prev => prev + 1);
    }

    if (!nuevaReceta.nombre || !nuevaReceta.precioSugerido) return;
    const infoAuto = detectarIconoYClase(nuevaReceta.nombre);

    const item = {
      id: Date.now(),
      nombre: nuevaReceta.nombre + " 💖",
      precio: parseFloat(nuevaReceta.precioSugerido),
      categoria: 'app',
      clase: infoAuto.clase,
      icono: infoAuto.icono,
      dificultad: 'Fácil',
      desc: `Receta personalizada detectada como ${infoAuto.clase}.`,
      ingredientes: ["Insumos estándar según preparación."],
      pasos: ["Mezclar ingredientes, procesar y servir."]
    };
    setRecetasBase([item, ...recetasBase]);
    setNuevaReceta({ nombre: '', precioSugerido: '' });
    setModalNuevoProducto(false);
    
    const restan = 3 - (intentosPostresGratis + 1);
    if (!esPro && restan > 0) {
      mostrarNotificacion(`¡Añadido con éxito! Te quedan ${restan} intentos gratuitos.`);
    } else if (!esPro) {
      mostrarNotificacion("¡Guardado! Has agotado tus 3 intentos gratuitos. Activa PRO.");
    } else {
      mostrarNotificacion("¡Guardado con éxito en tu catálogo!");
    }
  };

  const eliminarDeRecetas = (id: number) => {
    setRecetasBase(recetasBase.filter(r => r.id !== id));
    mostrarNotificacion("Producto eliminado del catálogo.");
  };

  const editarPrecioProducto = (id: number, nombreActual: string, precioActual: number) => {
    const nuevoPrecioStr = prompt(`Editar precio recomendado para "${nombreActual}":`, precioActual.toString());
    if (nuevoPrecioStr !== null && !isNaN(parseFloat(nuevoPrecioStr))) {
      const nuevoPrecio = parseFloat(nuevoPrecioStr);
      setRecetasBase(recetasBase.map(r => r.id === id ? { ...r, precio: nuevoPrecio } : r));
      mostrarNotificacion(`¡Precio actualizado a S/ ${nuevoPrecio.toFixed(2)}!`);
    }
  };

  const agregarAlCarrito = (item: any) => {
    setCarrito(prevCarrito => {
      const existente = prevCarrito.find(i => i.id === item.id);
      if (existente) {
        return prevCarrito.map(i => i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i);
      } else {
        return [...prevCarrito, { ...item, cantidad: 1 }];
      }
    });
    mostrarNotificacion(`Añadido ${item.nombre} al Mostrador POS`);
  };

  const cambiarCantidadCarrito = (id: number, delta: number) => {
    setCarrito(prevCarrito => {
      return prevCarrito.map(i => {
        if (i.id === id) {
          const nuevaCant = i.cantidad + delta;
          return nuevaCant > 0 ? { ...i, cantidad: nuevaCant } : null;
        }
        return i;
      }).filter(Boolean);
    });
  };

  const eliminarDelCarrito = (id: number) => {
    setCarrito(prevCarrito => prevCarrito.filter(i => i.id !== id));
    mostrarNotificacion("Producto descartado del ticket");
  };

  const intentarGenerarQR = (precio: number, nombre: string) => {
    if (!esPro) {
      mostrarNotificacion("👑 ¡Función exclusiva PRO! Necesitas el plan Pro para generar tu QR Yape/Plin.");
      setVistaActual('suscripcion');
      return;
    }
    if (!qrUsuario.configurado) {
      mostrarNotificacion("⚠ ¡Atención! Debes registrar el QR o datos de tu Yape/Plin de pastelería primero para poder cobrar.");
      setMostrarWidgetConfigQR(true);
      return;
    }
    setModalQR({ precio, nombre, itemsComprados: [...carrito] });
  };

  const recetasFiltradas = recetasBase.filter(r => {
    const matchCat = filtroCategoria === 'todas' || r.categoria === filtroCategoria;
    const matchClase = tipoFiltroClase === 'todos' || r.clase === tipoFiltroClase;
    return matchCat && matchClase;
  });

  const productosRecomendadosPOS = recetasBase.slice(0, 10);

  const solicitarCodigoVerificacion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputNumQR || !inputNombreQR) return;
    
    const codigoAleatorio = Math.floor(1000 + Math.random() * 9000).toString();
    setCodigoEnviadoSimulado(codigoAleatorio);
    setPasoSeguridadQR('codigo');
    mostrarNotificacion(`🔒 Código de seguridad enviado por SMS/WhatsApp al titular (Código simulado: ${codigoAleatorio})`);
  };

  const verificarYGuardarQR = (e: React.FormEvent) => {
    e.preventDefault();
    if (codigoIngresado !== codigoEnviadoSimulado) {
      mostrarNotificacion("❌ Código de verificación incorrecto. Inténtalo de nuevo.");
      return;
    }

    setQrUsuario({
      numero: inputNumQR,
      nombreTitular: inputNombreQR,
      configurado: true
    });
    setMostrarWidgetConfigQR(false);
    setModalConfigurarQR(false);
    setPasoSeguridadQR('formulario');
    setCodigoIngresado('');
    mostrarNotificacion("✨ ¡Identidad verificada! Yape/Plin de pastelería actualizado con éxito.");
  };

  return (
    <div className="min-h-screen bg-[#1c1224] text-pink-100 font-sans relative selection:bg-pink-500 selection:text-white text-base">
      
      {notificacion && (
        <div className="fixed bottom-6 right-6 bg-pink-600 text-white px-6 py-3.5 rounded-2xl shadow-2xl z-50 border-2 border-pink-300 font-bold animate-bounce flex items-center gap-3">
          <span>✨</span> {notificacion}
        </div>
      )}

      {menuAbierto && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuAbierto(false)}></div>
          <aside className="relative w-72 bg-[#261733] border-r-2 border-pink-500/40 p-6 flex flex-col justify-between shadow-2xl z-10">
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black bg-gradient-to-r from-pink-400 to-amber-300 bg-clip-text text-transparent">SeñaClara PRO</h2>
                <button onClick={() => setMenuAbierto(false)} className="text-pink-300 hover:text-white text-xl font-bold p-1">✕</button>
              </div>

              <nav className="space-y-3">
                <button 
                  onClick={() => { setVistaActual('catalogo'); setMenuAbierto(false); }} 
                  className={`w-full text-left font-bold px-4 py-3 rounded-xl transition flex items-center gap-3 ${vistaActual === 'catalogo' ? 'bg-pink-600 text-white shadow-lg' : 'hover:bg-pink-500/20 text-pink-300'}`}
                >
                  <span>🍰</span> Catálogo & Mostrador
                </button>
                <button 
                  onClick={() => { setVistaActual('mostrador-pos'); setMenuAbierto(false); }} 
                  className={`w-full text-left font-bold px-4 py-3 rounded-xl transition flex items-center gap-3 ${vistaActual === 'mostrador-pos' ? 'bg-pink-600 text-white shadow-lg' : 'hover:bg-pink-500/20 text-pink-300'}`}
                >
                  <span>🛒</span> Mostrador POS (Caja)
                </button>
                <button 
                  onClick={() => { setVistaActual('recetario'); setMenuAbierto(false); }} 
                  className={`w-full text-left font-bold px-4 py-3 rounded-xl transition flex items-center gap-3 ${vistaActual === 'recetario' ? 'bg-pink-600 text-white shadow-lg' : 'hover:bg-pink-500/20 text-pink-300'}`}
                >
                  <span>📖</span> Recetario Viral (90+)
                </button>
                <button 
                  onClick={() => { setVistaActual('suscripcion'); setMenuAbierto(false); }} 
                  className={`w-full text-left font-bold px-4 py-3 rounded-xl transition flex items-center gap-3 ${vistaActual === 'suscripcion' ? 'bg-pink-600 text-white shadow-lg' : 'hover:bg-pink-500/20 text-pink-300'}`}
                >
                  <span>👑</span> Suscripción PRO
                </button>
              </nav>
            </div>

            <div className="bg-[#1c1224] p-4 rounded-2xl border border-pink-500/20 text-center space-y-2">
              <p className="text-xs text-pink-300/80">Versión 2.0 Definitiva</p>
              {esPro && (
                <button onClick={() => { setPasoSeguridadQR('formulario'); setModalConfigurarQR(true); setMenuAbierto(false); }} className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-2.5 rounded-xl text-xs shadow flex items-center justify-center gap-2">
                  <span>📱</span> Configurar / Cambiar Yape & Plin
                </button>
              )}
              <button onClick={() => { setModalQR({ precio: 199.00, nombre: "Activación Plan Pro Anual", itemsComprados: [] }); setMenuAbierto(false); }} className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 font-black py-2.5 rounded-xl text-xs shadow">
                ✨ Activar PRO Anual
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Choco Mascota Flotante */}
      <div 
        onClick={interactuarChoco}
        className="fixed top-4 right-4 z-40 bg-[#261733]/95 border-2 border-pink-400/80 rounded-3xl p-3 shadow-2xl cursor-pointer transform hover:scale-105 transition flex items-center gap-3 backdrop-blur"
        title="¡Toca a Choco para recibir consejos de repostería y finanzas!"
      >
        <div className="relative w-14 h-18 bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 rounded-2xl p-1 shadow-lg flex flex-col items-center justify-between border-2 border-pink-200 overflow-hidden">
          <div className="absolute -top-1 -left-1 text-[8px] animate-pulse">✨</div>
          <div className="absolute top-1 -right-1 text-[8px] animate-pulse">✨</div>
          <div className="w-12 h-7 bg-gradient-to-b from-amber-800 to-amber-950 rounded-lg grid grid-cols-3 gap-0.5 p-0.5 border border-amber-700">
            <div className="bg-amber-700/80 rounded-sm"></div>
            <div className="bg-amber-700/80 rounded-sm"></div>
            <div className="bg-amber-700/80 rounded-sm"></div>
            <div className="bg-amber-700/80 rounded-sm"></div>
            <div className="bg-amber-700/80 rounded-sm"></div>
            <div className="bg-amber-700/80 rounded-sm"></div>
          </div>
          <div className="w-full h-10 bg-pink-400 rounded-xl relative flex flex-col items-center justify-center shadow-inner border-t border-pink-300">
            {chocoExpresion === 'chad' && <span className="text-xs">🗿</span>}
            {chocoExpresion === 'anime' && <span className="text-xs">🥺✨</span>}
            {chocoExpresion === 'normal' && (
              <div className="flex flex-col items-center relative">
                <div className="flex gap-2 mb-0.5">
                  <div className="w-2.5 h-2.5 bg-slate-900 rounded-full relative flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                  <div className="w-2.5 h-2.5 bg-slate-900 rounded-full relative flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </div>
                <div className="w-3 h-1.5 bg-slate-900 rounded-b-full"></div>
                <div className="absolute top-1 -left-1 w-2 h-1 bg-pink-300 rounded-full"></div>
                <div className="absolute top-1 -right-1 w-2 h-1 bg-pink-300 rounded-full"></div>
              </div>
            )}
          </div>
        </div>

        <div className="hidden sm:block max-w-[180px]">
          <div className="text-xs font-bold text-pink-300 flex items-center gap-1">
            <span>Choco Asistente 🍫</span>
          </div>
          <p className="text-[10px] text-pink-100/90 leading-tight mt-0.5">
            {consejosChoco[chocoConsejoIndex]}
          </p>
        </div>
      </div>

      <header className="w-full max-w-7xl mx-auto pt-6 px-4 mb-6">
        <div className="bg-[#261733] border-2 border-pink-500/40 rounded-3xl p-5 shadow-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMenuAbierto(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black px-4 py-3 rounded-2xl shadow-lg border border-pink-300 flex items-center gap-2 transform hover:scale-105 transition"
            >
              <span className="text-xl">☰</span> Menú
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-300 to-amber-300 bg-clip-text text-transparent">
                SeñaClara PRO ✨
              </h1>
              <p className="text-sm text-pink-200/90">POS de Lujo & Recetario Viral con 90+ Recetas</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => setVistaActual('catalogo')} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${vistaActual === 'catalogo' ? 'bg-pink-600 text-white' : 'bg-[#1c1224] text-pink-300 border border-pink-500/30'}`}>Catálogo</button>
            <button onClick={() => setVistaActual('mostrador-pos')} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${vistaActual === 'mostrador-pos' ? 'bg-pink-600 text-white' : 'bg-[#1c1224] text-pink-300 border border-pink-500/30'}`}>Mostrador POS</button>
            <button onClick={() => setVistaActual('recetario')} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${vistaActual === 'recetario' ? 'bg-pink-600 text-white' : 'bg-[#1c1224] text-pink-300 border border-pink-500/30'}`}>Recetario Viral (90+)</button>
            <button onClick={() => setVistaActual('suscripcion')} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${vistaActual === 'suscripcion' ? 'bg-pink-600 text-white' : 'bg-[#1c1224] text-pink-300 border border-pink-500/30'}`}>Suscripción</button>
          </div>
        </div>
      </header>

      {mostrarWidgetConfigQR && (
        <div className="w-full max-w-7xl mx-auto px-4 mb-6">
          <div className="bg-gradient-to-r from-pink-900/80 via-[#261733] to-purple-900/80 border-2 border-pink-400 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-pink-500/20 rounded-2xl flex items-center justify-center text-3xl shrink-0 border border-pink-400/40">🔒</div>
              <div>
                <h3 className="text-lg font-bold text-pink-200">🛡️ Configuración Segura de Yape / Plin</h3>
                <p className="text-xs text-pink-300/90">Para evitar fraudes o cambios no autorizados, cada cambio requerirá un código de verificación SMS/WhatsApp.</p>
              </div>
            </div>

            {pasoSeguridadQR === 'formulario' ? (
              <form onSubmit={solicitarCodigoVerificacion} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <input 
                  type="text" 
                  placeholder="N° Celular (Yape/Plin)" 
                  value={inputNumQR} 
                  onChange={(e) => setInputNumQR(e.target.value)} 
                  required 
                  className="bg-[#1c1224] border border-pink-500/40 rounded-xl px-4 py-2.5 text-pink-100 placeholder-pink-300/40 text-xs focus:outline-none focus:border-pink-300"
                />
                <input 
                  type="text" 
                  placeholder="Nombre de Pastelería / Negocio" 
                  value={inputNombreQR} 
                  onChange={(e) => setInputNombreQR(e.target.value)} 
                  required 
                  className="bg-[#1c1224] border border-pink-500/40 rounded-xl px-4 py-2.5 text-pink-100 placeholder-pink-300/40 text-xs focus:outline-none focus:border-pink-300"
                />
                <button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black px-5 py-2.5 rounded-xl shadow text-xs transition whitespace-nowrap">
                  🔐 Enviar Código de Seguridad
                </button>
              </form>
            ) : (
              <form onSubmit={verificarYGuardarQR} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
                <input 
                  type="text" 
                  placeholder="Ingresa código de 4 dígitos" 
                  value={codigoIngresado} 
                  onChange={(e) => setCodigoIngresado(e.target.value)} 
                  maxLength={4}
                  required 
                  className="bg-[#1c1224] border border-pink-500/40 rounded-xl px-4 py-2.5 text-pink-100 placeholder-pink-300/40 text-xs tracking-widest font-black text-center focus:outline-none focus:border-pink-300 w-48"
                />
                <button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 text-white font-black px-5 py-2.5 rounded-xl shadow text-xs transition whitespace-nowrap">
                  ✅ Verificar y Guardar
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <main className="w-full max-w-7xl mx-auto px-4 pb-16">
        
        {vistaActual === 'catalogo' && (
          <div className="space-y-8">
            <div className="bg-[#261733] border-2 border-pink-500/40 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-pink-300">🍰 Catálogo de Productos y Mostrador</h2>
                <p className="text-sm text-pink-300/80">Administra tus postres, precios recomendados y añade creaciones nuevas.</p>
              </div>
              <button 
                onClick={() => setModalNuevoProducto(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black px-6 py-3.5 rounded-2xl shadow-xl transition transform hover:scale-105 text-sm flex items-center gap-2"
              >
                <span>➕</span> Añadir al Catálogo
              </button>
            </div>

            <div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <h3 className="text-lg font-bold text-pink-300">Filtrar por Clase de Postre</h3>
                
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setTipoFiltroClase('todos')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${tipoFiltroClase === 'todos' ? 'bg-pink-600 text-white' : 'bg-[#261733] text-pink-300 border border-pink-500/30'}`}>Todas</button>
                  <button onClick={() => setTipoFiltroClase('Tortas')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${tipoFiltroClase === 'Tortas' ? 'bg-pink-600 text-white' : 'bg-[#261733] text-pink-300 border border-pink-500/30'}`}>🎂 Tortas</button>
                  <button onClick={() => setTipoFiltroClase('Cupcakes')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${tipoFiltroClase === 'Cupcakes' ? 'bg-pink-600 text-white' : 'bg-[#261733] text-pink-300 border border-pink-500/30'}`}>🧁 Cupcakes</button>
                  <button onClick={() => setTipoFiltroClase('Bebidas/Frappes')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${tipoFiltroClase === 'Bebidas/Frappes' ? 'bg-pink-600 text-white' : 'bg-[#261733] text-pink-300 border border-pink-500/30'}`}>🥤 Frappes</button>
                  <button onClick={() => setTipoFiltroClase('Cookies')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${tipoFiltroClase === 'Cookies' ? 'bg-pink-600 text-white' : 'bg-[#261733] text-pink-300 border border-pink-500/30'}`}>🍪 Cookies</button>
                  <button onClick={() => setTipoFiltroClase('Croissants')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${tipoFiltroClase === 'Croissants' ? 'bg-pink-600 text-white' : 'bg-[#261733] text-pink-300 border border-pink-500/30'}`}>🥐 Croissants</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recetasFiltradas.map(p => (
                  <div key={p.id} className="bg-[#261733] border-2 border-pink-500/30 hover:border-pink-500/80 rounded-3xl p-6 shadow-xl flex flex-col justify-between transition transform hover:-translate-y-1 relative group">
                    <button 
                      onClick={() => eliminarDeRecetas(p.id)} 
                      className="absolute top-4 right-4 text-pink-400 hover:text-rose-400 bg-[#1c1224] p-2 rounded-xl border border-pink-500/20 text-xs font-bold transition"
                      title="Eliminar del catálogo"
                    >
                      ✕ Eliminar
                    </button>
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-pink-500/20 rounded-2xl border border-pink-500/30 flex items-center justify-center text-2xl shadow-inner">
                          {p.icono || '🧁'}
                        </div>
                        <span className="text-xs bg-purple-500/20 text-purple-300 font-bold px-3 py-1 rounded-full border border-purple-500/30">
                          {p.clase || 'Postre'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-2 pr-16">
                        <h3 className="text-xl font-bold text-pink-200">{p.nombre}</h3>
                      </div>
                      
                      <div className="mb-3">
                        <div className="text-2xl font-black text-amber-300">S/ {p.precio.toFixed(2)}</div>
                        <p className="text-[11px] text-pink-300/80 font-medium mt-0.5">⭐ Precio recomendado (justo y accesible para todos)</p>
                      </div>

                      <p className="text-sm text-pink-300/80 mb-6">{p.desc}</p>
                    </div>

                    <div className="space-y-2">
                      <button 
                        onClick={() => editarPrecioProducto(p.id, p.nombre, p.precio)}
                        className="w-full bg-[#1c1224] hover:bg-pink-500/20 text-pink-300 border border-pink-500/40 text-xs font-bold py-2 px-3 rounded-xl transition text-center"
                      >
                        ✏️ Editar Precio
                      </button>
                      <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => setModalReceta(p)} className="bg-purple-600/40 hover:bg-purple-600/70 text-pink-200 text-xs font-bold py-3 px-3 rounded-xl border border-pink-500/30 transition text-center">
                          📖 Ver Receta
                        </button>
                        <button onClick={() => agregarAlCarrito(p)} className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-bold py-3 px-3 rounded-xl shadow transition text-center">
                          🛒 Añadir POS
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {vistaActual === 'mostrador-pos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-pink-300">🛒 10 Productos Recomendados para Mostrador</h2>
                  <p className="text-xs text-pink-300/80">Selecciona, agrega al ticket o añade más productos personalizados.</p>
                </div>
                <button 
                  onClick={() => setModalNuevoProducto(true)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow hover:scale-105 transition"
                >
                  ➕ Añadir más
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
                {productosRecomendadosPOS.map(p => (
                  <div key={p.id} className="bg-[#261733] border-2 border-pink-500/30 hover:border-pink-500 rounded-2xl p-4 shadow-lg flex flex-col justify-between transition">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-pink-500/20 rounded-xl flex items-center justify-center text-xl shrink-0">{p.icono || '🧁'}</div>
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-pink-200 text-sm truncate">{p.nombre}</h4>
                        <p className="text-xs text-amber-300 font-extrabold mt-0.5">S/ {p.precio.toFixed(2)} (Recomendado)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => agregarAlCarrito(p)}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-bold py-2 px-3 rounded-xl shadow transition text-center"
                      >
                        ➕ Agregar
                      </button>
                      <button 
                        onClick={() => eliminarDeRecetas(p.id)}
                        className="bg-[#1c1224] hover:bg-rose-500/20 text-pink-300 hover:text-rose-300 text-xs font-bold py-2 px-3 rounded-xl border border-pink-500/20 transition text-center"
                        title="Descartar producto"
                      >
                        🗑️ Descartar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#261733] border-2 border-pink-500/40 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-pink-300 mb-4 pb-2 border-b border-pink-500/20 flex items-center justify-between">
                  <span>Ticket de Venta</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full">Caja Activa</span>
                </h3>
                {carrito.length === 0 ? (
                  <p className="text-sm text-pink-300/50 text-center py-12">No hay productos en el ticket actual.</p>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto mb-4 pr-1">
                    {carrito.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-[#1c1224] p-3 rounded-xl border border-pink-500/20 text-sm gap-2">
                        <div className="overflow-hidden pr-1">
                          <span className="font-bold text-pink-100 block truncate">{item.nombre}</span>
                          <span className="text-amber-300 text-xs font-extrabold">S/ {(item.precio * item.cantidad).toFixed(2)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="flex items-center bg-pink-950/60 rounded-lg border border-pink-500/30 overflow-hidden">
                            <button onClick={() => cambiarCantidadCarrito(item.id, -1)} className="px-2 py-0.5 text-pink-300 hover:bg-pink-600 text-xs font-bold">-</button>
                            <span className="px-2 text-xs font-bold text-white">{item.cantidad}</span>
                            <button onClick={() => cambiarCantidadCarrito(item.id, 1)} className="px-2 py-0.5 text-pink-300 hover:bg-pink-600 text-xs font-bold">+</button>
                          </div>
                          <button 
                            onClick={() => eliminarDelCarrito(item.id)}
                            className="text-pink-400 hover:text-rose-400 text-xs font-bold px-2 py-1 bg-pink-500/10 rounded-lg"
                            title="Quitar producto"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-pink-500/20 pt-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-pink-200">Total a Pagar:</span>
                  <span className="text-2xl font-black text-amber-300">
                    S/ {carrito.reduce((acc, curr) => acc + (curr.precio * curr.cantidad), 0).toFixed(2)}
                  </span>
                </div>
                {!qrUsuario.configurado && esPro && (
                  <p className="text-[11px] text-amber-300 font-bold mb-2 text-center bg-amber-500/10 p-2 rounded-xl border border-amber-500/30">
                    ⚠️ Ingresa tu Yape/Plin arriba para habilitar cobros.
                  </p>
                )}
                <button 
                  disabled={carrito.length === 0}
                  onClick={() => {
                    const total = carrito.reduce((acc, curr) => acc + (curr.precio * curr.cantidad), 0);
                    intentarGenerarQR(total, `Venta Mostrador (${carrito.reduce((a, c) => a + c.cantidad, 0)} items)`);
                  }}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 text-white font-black py-3.5 rounded-2xl shadow-xl transition flex items-center justify-center gap-2 text-sm"
                >
                  💳 Generar Cobro QR Yape/Plin {esPro ? '' : '🔒 (PRO)'}
                </button>
              </div>
            </div>
          </div>
        )}

        {vistaActual === 'recetario' && (
          <div className="space-y-8">
            <div className="bg-[#261733] border-2 border-pink-500/40 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-pink-400 to-amber-300 bg-clip-text text-transparent">
                  📖 Recetario Viral ({recetasBase.length} Recetas)
                </h2>
                <p className="text-sm text-pink-200/90 mt-1">Clasificadas por red social y tipo de postre.</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setModalNuevoProducto(true)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-4 py-2.5 rounded-xl shadow transition text-sm flex items-center gap-2"
                >
                  <span>➕</span> Añadir Receta
                </button>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setFiltroCategoria('todas')} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filtroCategoria === 'todas' ? 'bg-pink-600 text-white' : 'bg-[#1c1224] text-pink-300 border border-pink-500/30'}`}>Todas</button>
                  <button onClick={() => setFiltroCategoria('tiktok')} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filtroCategoria === 'tiktok' ? 'bg-pink-600 text-white' : 'bg-[#1c1224] text-pink-300 border border-pink-500/30'}`}>🔥 TikTok</button>
                  <button onClick={() => setFiltroCategoria('instagram')} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filtroCategoria === 'instagram' ? 'bg-pink-600 text-white' : 'bg-[#1c1224] text-pink-300 border border-pink-500/30'}`}>📸 Instagram</button>
                  <button onClick={() => setFiltroCategoria('app')} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${filtroCategoria === 'app' ? 'bg-pink-600 text-white' : 'bg-[#1c1224] text-pink-300 border border-pink-500/30'}`}>👑 Recomendación de la App</button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 bg-[#261733]/60 p-4 rounded-2xl border border-pink-500/20">
              <span className="text-xs text-pink-300 font-bold self-center mr-2">Filtrar por Clase:</span>
              <button onClick={() => setTipoFiltroClase('todos')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${tipoFiltroClase === 'todos' ? 'bg-pink-600 text-white' : 'bg-[#261733] text-pink-300 border border-pink-500/30'}`}>Todos</button>
              <button onClick={() => setTipoFiltroClase('Tortas')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${tipoFiltroClase === 'Tortas' ? 'bg-pink-600 text-white' : 'bg-[#261733] text-pink-300 border border-pink-500/30'}`}>🎂 Tortas</button>
              <button onClick={() => setTipoFiltroClase('Cupcakes')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${tipoFiltroClase === 'Cupcakes' ? 'bg-pink-600 text-white' : 'bg-[#261733] text-pink-300 border border-pink-500/30'}`}>🧁 Cupcakes</button>
              <button onClick={() => setTipoFiltroClase('Bebidas/Frappes')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${tipoFiltroClase === 'Bebidas/Frappes' ? 'bg-pink-600 text-white' : 'bg-[#261733] text-pink-300 border border-pink-500/30'}`}>🥤 Frappes</button>
              <button onClick={() => setTipoFiltroClase('Cookies')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${tipoFiltroClase === 'Cookies' ? 'bg-pink-600 text-white' : 'bg-[#261733] text-pink-300 border border-pink-500/30'}`}>🍪 Cookies</button>
              <button onClick={() => setTipoFiltroClase('Croissants')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${tipoFiltroClase === 'Croissants' ? 'bg-pink-600 text-white' : 'bg-[#261733] text-pink-300 border border-pink-500/30'}`}>🥐 Croissants</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recetasFiltradas.map(p => (
                <div key={p.id} className="bg-[#261733] border-2 border-pink-500/30 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-3 py-1 rounded-full border border-amber-500/30 uppercase">
                        {p.categoria === 'tiktok' ? '🔥 TikTok' : p.categoria === 'instagram' ? '📸 Instagram' : '👑 Recomendación de la App'}
                      </span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${p.dificultad === 'Fácil' ? 'bg-emerald-500/20 text-emerald-300' : p.dificultad === 'Intermedio' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'}`}>
                        {p.dificultad}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{p.icono || '🧁'}</span>
                      <h3 className="text-xl font-bold text-pink-200">{p.nombre}</h3>
                    </div>
                    <div className="mb-3">
                      <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-2.5 py-1 rounded-lg border border-purple-500/30">
                        Clase: {p.clase}
                      </span>
                    </div>
                    <p className="text-sm text-pink-300/80 mb-4">{p.desc}</p>
                  </div>
                  <button onClick={() => setModalReceta(p)} className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 rounded-xl shadow transition text-sm">
                    📖 Leer Receta Detallada
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {vistaActual === 'suscripcion' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black bg-gradient-to-r from-amber-300 to-pink-400 bg-clip-text text-transparent">
                Elige tu Plan SeñaClara PRO ✨
              </h2>
              <p className="text-sm text-pink-200/90">Desbloquea 90+ recetas virales ilimitadas y POS avanzado.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#261733] border-2 border-pink-500/40 hover:border-pink-500 rounded-3xl p-8 shadow-2xl flex flex-col justify-between transition relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-pink-500 text-white font-black text-xs px-5 py-1.5 rounded-bl-2xl shadow">
                  7 DÍAS GRATIS
                </div>
                <div>
                  <h3 className="text-xl font-black text-pink-300 mb-2">Plan Mensual Pro</h3>
                  <p className="text-sm text-pink-200/80 mb-6">Prueba 7 días gratis y luego S/ 19.00 / mes.</p>
                  <div className="text-4xl font-black text-amber-300 mb-6">
                    S/ 19.00 <span className="text-xs font-normal text-pink-300">/ mes</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm text-pink-100">
                    <li className="flex items-center gap-2"><span>✨</span> <strong>¡Incluye 7 días de prueba gratis!</strong></li>
                    <li className="flex items-center gap-2"><span>✨</span> Creación ilimitada de productos propios</li>
                    <li className="flex items-center gap-2"><span>✨</span> Acceso a 90+ recetas virales</li>
                    <li className="flex items-center gap-2"><span>✨</span> Generador QR Yape/Plin ilimitado</li>
                  </ul>
                </div>
                <button 
                  onClick={() => setModalQR({ precio: 19.00, nombre: "Plan Mensual SeñaClara PRO (Prueba 7 Días Gratis)", itemsComprados: [] })}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black py-3.5 rounded-2xl shadow-xl transition text-sm"
                >
                  🎁 Activar 7 Días de Prueba Gratis
                </button>
              </div>

              <div className="bg-[#261733] border-2 border-amber-400/60 hover:border-amber-400 rounded-3xl p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden transition">
                <div className="absolute top-0 right-0 bg-amber-400 text-amber-950 font-black text-xs px-6 py-1.5 rounded-bl-2xl shadow">
                  ¡PLAN ANUAL!
                </div>
                <div>
                  <h3 className="text-xl font-black text-amber-300 mb-2">Plan Anual Pro</h3>
                  <p className="text-sm text-pink-200/80 mb-4">Pago único anual con acceso total e ininterrumpido.</p>
                  <div className="text-4xl font-black text-amber-300 mb-6">
                    S/ 199.00 <span className="text-xs font-normal text-pink-300">/ año</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm text-pink-100">
                    <li className="flex items-center gap-2"><span>✨</span> Todo lo incluido en el Plan Mensual</li>
                    <li className="flex items-center gap-2"><span>✨</span> Generador QR Yape/Plin ilimitado</li>
                    <li className="flex items-center gap-2"><span>✨</span> Soporte prioritario con Choco Mascota</li>
                    <li className="flex items-center gap-2"><span>✨</span> Actualizaciones exclusivas de temporada</li>
                  </ul>
                </div>
                <button 
                  onClick={() => setModalQR({ precio: 199.00, nombre: "Suscripción Anual SeñaClara PRO", itemsComprados: [] })}
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-black py-3.5 rounded-2xl shadow-xl transition text-sm"
                >
                  👑 Activar Plan Anual PRO (S/ 199.00)
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {modalNuevoProducto && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#261733] border-2 border-pink-500/50 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setModalNuevoProducto(false)} className="absolute top-4 right-4 text-pink-300 hover:text-white text-xl font-bold w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">✕</button>
            
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🧁</span>
              <div>
                <h3 className="text-xl font-bold text-pink-300">Añadir Nuevo Postre</h3>
                {!esPro && (
                  <p className="text-xs text-pink-300/80">Intentos gratuitos usados: {intentosPostresGratis}/3</p>
                )}
              </div>
            </div>

            <form onSubmit={agregarRecetaCustom} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-pink-300 mb-1">Nombre del Postre o Bebida:</label>
                <input 
                  type="text" 
                  placeholder="Ej. Frappe de Fresa, Cupcake Vainilla..." 
                  value={nuevaReceta.nombre} 
                  onChange={(e) => setNuevaReceta({...nuevaReceta, nombre: e.target.value})}
                  required 
                  className="w-full bg-[#1c1224] border border-pink-500/30 rounded-xl px-4 py-3 text-pink-100 placeholder-pink-300/40 focus:outline-none focus:border-pink-400 text-sm" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-pink-300 mb-1">Precio Sugerido S/:</label>
                <input 
                  type="number" 
                  step="0.5" 
                  placeholder="Ej. 6.50" 
                  value={nuevaReceta.precioSugerido} 
                  onChange={(e) => setNuevaReceta({...nuevaReceta, precioSugerido: e.target.value})}
                  required 
                  className="w-full bg-[#1c1224] border border-pink-500/30 rounded-xl px-4 py-3 text-pink-100 placeholder-pink-300/40 focus:outline-none focus:border-pink-400 text-sm" 
                />
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-black py-3.5 rounded-2xl shadow-xl transition text-sm mt-2">
                {!esPro && intentosPostresGratis >= 3 ? "👑 Activar Plan Pro Ilimitado" : "💖 Guardar en el Catálogo"}
              </button>
            </form>
          </div>
        </div>
      )}

      {modalReceta && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#261733] border-2 border-pink-500/50 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setModalReceta(null)} className="absolute top-4 right-4 text-pink-300 hover:text-white text-xl font-bold w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">✕</button>
            
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{modalReceta.icono || '🧁'}</span>
              <div>
                <h2 className="text-2xl font-bold text-pink-300">{modalReceta.nombre}</h2>
                <span className="text-xs bg-purple-500/20 text-purple-300 font-bold px-3 py-0.5 rounded-full border border-purple-500/30 mt-1 inline-block">
                  Clase: {modalReceta.clase}
                </span>
              </div>
            </div>
            <p className="text-amber-300 font-extrabold text-lg mb-4">Precio Recomendado: S/ {modalReceta.precio.toFixed(2)} (Ajustado para todos los bolsillos)</p>
            <p className="text-sm text-pink-200/90 mb-6 bg-pink-950/40 p-4 rounded-2xl border border-pink-500/20">{modalReceta.desc}</p>
            
            <h3 className="text-md font-bold text-pink-300 mb-3">🛒 Ingredientes Detallados:</h3>
            <ul className="mb-6 bg-[#1c1224] p-4 rounded-2xl border border-pink-500/20 space-y-2">
              {modalReceta.ingredientes?.map((ing: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-pink-100">
                  <span className="text-pink-400">🔹</span> {ing}
                </li>
              ))}
            </ul>

            <h3 className="text-md font-bold text-pink-300 mb-3">👩‍🍳 Paso a Paso Extenso & Profesional:</h3>
            <div className="space-y-3 mb-6">
              {modalReceta.pasos?.map((paso: string, i: number) => (
                <div key={i} className="bg-[#1c1224] border border-pink-500/20 p-4 rounded-2xl text-sm text-pink-200 leading-relaxed">
                  {paso}
                </div>
              ))}
            </div>

            <button onClick={() => { const p = modalReceta.precio; const n = modalReceta.nombre; setModalReceta(null); intentarGenerarQR(p, n); }} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3.5 rounded-2xl shadow-lg transition text-sm">
              💳 Generar Cobro Yape/Plin {esPro ? '' : '🔒 (PRO)'}
            </button>
          </div>
        </div>
      )}

      {modalConfigurarQR && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#261733] border-2 border-pink-500/50 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button onClick={() => setModalConfigurarQR(false)} className="absolute top-4 right-4 text-pink-300 hover:text-white text-xl font-bold w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">✕</button>
            
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🔒</span>
              <div>
                <h3 className="text-xl font-bold text-pink-300">Configuración Segura Yape/Plin</h3>
                <p className="text-xs text-pink-300/80">Protegido contra fraudes mediante código SMS.</p>
              </div>
            </div>

            {pasoSeguridadQR === 'formulario' ? (
              <form onSubmit={solicitarCodigoVerificacion} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-pink-300 mb-1">Número de Celular (Yape/Plin):</label>
                  <input 
                    type="text" 
                    placeholder="Ej. 987 654 321" 
                    defaultValue={qrUsuario.numero}
                    onChange={(e) => setInputNumQR(e.target.value)}
                    required 
                    className="w-full bg-[#1c1224] border border-pink-500/30 rounded-xl px-4 py-3 text-pink-100 placeholder-pink-300/40 focus:outline-none focus:border-pink-400 text-sm" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-pink-300 mb-1">Nombre de la Pastelería o Negocio:</label>
                  <input 
                    type="text" 
                    placeholder="Ej. Repostería Dulce Amor" 
                    defaultValue={qrUsuario.nombreTitular}
                    onChange={(e) => setInputNombreQR(e.target.value)}
                    required 
                    className="w-full bg-[#1c1224] border border-pink-500/30 rounded-xl px-4 py-3 text-pink-100 placeholder-pink-300/40 focus:outline-none focus:border-pink-400 text-sm" 
                  />
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black py-3.5 rounded-2xl shadow-xl transition text-sm mt-2">
                  🔐 Solicitar Código de Verificación
                </button>
              </form>
            ) : (
              <form onSubmit={verificarYGuardarQR} className="space-y-4 text-center">
                <p className="text-xs text-pink-200">Hemos enviado un código de 4 dígitos a tu celular registrado para autorizar el cambio.</p>
                <div className="my-3">
                  <input 
                    type="text" 
                    placeholder="0 0 0 0" 
                    value={codigoIngresado} 
                    onChange={(e) => setCodigoIngresado(e.target.value)}
                    maxLength={4}
                    required 
                    className="w-48 mx-auto bg-[#1c1224] border-2 border-pink-500 rounded-xl px-4 py-3 text-white text-xl tracking-[1em] font-black text-center focus:outline-none" 
                  />
                  <p className="text-[10px] text-amber-300 mt-2">Código simulado de prueba: <strong className="text-white">{codigoEnviadoSimulado}</strong></p>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black py-3.5 rounded-2xl shadow-xl transition text-sm">
                  ✅ Confirmar y Guardar Cambios
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {modalQR && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#261733] border-2 border-emerald-500/50 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-center">
            <button onClick={() => setModalQR(null)} className="absolute top-4 right-4 text-emerald-300 hover:text-white text-xl font-bold w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">✕</button>
            
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📱</div>
            <h3 className="text-2xl font-bold text-emerald-300 mb-1">¡Código QR Generado! ✨</h3>
            <p className="text-sm text-emerald-100/80 mb-4">Escanea con Yape, Plin o tu billetera favorita.</p>
            
            <div className="bg-white p-6 rounded-3xl inline-block shadow-inner mb-4 relative">
              <div className="w-48 h-48 bg-slate-900 rounded-2xl flex flex-col items-center justify-center p-4 text-white relative overflow-hidden shadow-lg">
                <div className="absolute inset-2 grid grid-cols-6 gap-1 opacity-90">
                  <div className="bg-pink-400 rounded-sm"></div><div className="bg-white rounded-sm"></div><div className="bg-pink-400 rounded-sm"></div><div className="bg-white rounded-sm"></div><div className="bg-pink-400 rounded-sm"></div><div className="bg-white rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div><div className="bg-amber-400 rounded-sm"></div><div className="bg-white rounded-sm"></div><div className="bg-amber-400 rounded-sm"></div><div className="bg-white rounded-sm"></div><div className="bg-pink-400 rounded-sm"></div>
                  <div className="bg-pink-400 rounded-sm"></div><div className="bg-white rounded-sm"></div><div className="bg-pink-400 rounded-sm"></div><div className="bg-white rounded-sm"></div><div className="bg-pink-400 rounded-sm"></div><div className="bg-white rounded-sm"></div>
                </div>
              </div>
            </div>

            <div className="bg-[#1c1224] p-4 rounded-2xl border border-emerald-500/30 mb-6 text-left">
              <div className="text-xs text-emerald-300 font-bold mb-1">Concepto: <span className="text-white">{modalQR.nombre}</span></div>
              <div className="text-xs text-emerald-300 font-bold mb-1">Negocio: <span className="text-white">{qrUsuario.nombreTitular}</span></div>
              <div className="text-xs text-emerald-300 font-bold mb-1">Celular: <span className="text-white">{qrUsuario.numero}</span></div>
              
              {modalQR.itemsComprados && modalQR.itemsComprados.length > 0 && (
                <div className="mt-2 pt-2 border-t border-emerald-500/20">
                  <span className="text-xs text-emerald-300 font-bold block mb-1">Productos comprados:</span>
                  <div className="space-y-1 max-h-24 overflow-y-auto">
                    {modalQR.itemsComprados.map((it: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-[11px] text-pink-100">
                        <span className="truncate pr-2">• {it.cantidad}x {it.nombre}</span>
                        <span className="font-bold text-amber-300 shrink-0">S/ {(it.precio * it.cantidad).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-lg font-black text-amber-300 mt-3 pt-2 border-t border-emerald-500/20">Monto Total: S/ {modalQR.precio.toFixed(2)}</div>
            </div>
            
            <button onClick={() => { 
              const infoCobro = modalQR;
              const esSuscripcion = infoCobro.nombre.includes("Plan") || infoCobro.nombre.includes("PRO");
              setModalQR(null); 
              
              if (esSuscripcion) {
                setEsPro(true);
                setMostrarWidgetConfigQR(true);
                setVistaActual('mostrador-pos');
                mostrarNotificacion("👑 ¡Bienvenida a PRO! Configura tu Yape o Plin de pastelería abajo.");
              } else {
                setCarrito([]);
                setTicketExitoso(infoCobro);
              }
            }} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 text-white font-bold py-3.5 rounded-2xl shadow-lg transition text-sm">
              ✅ Simular Pago Exitoso
            </button>
          </div>
        </div>
      )}

      {ticketExitoso && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#7b1fa2] border-4 border-pink-400 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-center text-white overflow-hidden">
            <button onClick={() => setTicketExitoso(null)} className="absolute top-4 right-4 text-pink-200 hover:text-white text-xl font-bold w-8 h-8 rounded-full bg-purple-900/60 flex items-center justify-center">✕</button>
            
            <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xl border-2 border-white relative">
              <span className="text-3xl">🍫✨</span>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-black text-xs border-2 border-white">
                ✓
              </div>
            </div>

            <div className="bg-emerald-500 text-slate-950 font-black text-xs uppercase px-3 py-1 rounded-full inline-block mb-3 shadow">
              ¡Pago Exitoso en Recepción!
            </div>

            <h3 className="text-2xl font-black mb-1">¡Yapeado / Plineado!</h3>
            <p className="text-xs text-pink-200 mb-4">La transacción ha sido verificada y abonada correctamente.</p>
            
            <div className="bg-purple-950/80 p-4 rounded-2xl border border-pink-500/30 mb-6 text-left space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-pink-300">Pastelería:</span> <span className="font-bold">{qrUsuario.nombreTitular}</span></div>
              <div className="flex justify-between"><span className="text-pink-300">N° Celular:</span> <span className="font-bold">{qrUsuario.numero}</span></div>
              
              {ticketExitoso.itemsComprados && ticketExitoso.itemsComprados.length > 0 && (
                <div className="pt-2 border-t border-purple-800">
                  <span className="text-pink-300 font-bold block mb-1">Detalle de productos comprados:</span>
                  <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                    {ticketExitoso.itemsComprados.map((it: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-[11px] text-pink-100 bg-purple-900/40 p-1.5 rounded-lg">
                        <span className="truncate pr-2">{it.cantidad}x {it.nombre}</span>
                        <span className="font-bold text-amber-300 shrink-0">S/ {(it.precio * it.cantidad).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between border-t border-purple-800 pt-2 mt-1">
                <span className="text-pink-300 font-bold text-sm">Monto Total:</span> 
                <span className="text-amber-300 font-black text-base">S/ {ticketExitoso.precio.toFixed(2)}</span>
              </div>
            </div>
            
            <button onClick={() => setTicketExitoso(null)} className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 text-purple-950 font-black py-3 rounded-2xl shadow-xl transition text-sm">
              🎉 Aceptar y Nueva Venta
            </button>
          </div>
        </div>
      )}

      <footer className="w-full max-w-7xl mx-auto text-center text-xs text-pink-300/60 py-6">
        SeñaClara PRO &copy; 2026 — El POS Definitivo para Emprendedoras Exitosas 💖
      </footer>
    </div>
  );
}
