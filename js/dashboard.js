const i18nDash = {
    es: {
        m_inv: "Inventario", m_vta: "Ventas", m_gto: "Gastos", m_out: "Cerrar Sesión",
        t_inv: "Gestión de Inventario", t_vta: "Registro de Transacciones", t_gto: "Seguimiento de Costos",
        c_ing: "Ingresos Totales", c_gto: "Gastos Totales", c_prod: "Total Productos", c_low: "Stock Crítico",
        f_p_reg: "Registrar Producto", f_p_cod: "Código Único", f_p_nom: "Nombre", f_p_cos: "Precio Costo",
        f_p_vta: "Precio Venta", f_p_med: "Unidad de Medida", f_p_cant: "Cantidad Inicial", f_p_min: "Stock Mínimo",
        f_p_btn: "Guardar Producto", t_p_title: "Productos en Existencia",
        th_cod: "Código", th_nom: "Nombre", th_stk: "Stock", th_cos: "Costo", th_vta: "Venta", th_est: "Estado",
        st_ok: "Estable", st_low: "Stock Bajo", notif_vta: "¡Venta registrada exitosamente!",
        f_v_title: "Nueva Transacción", f_v_can: "Canal de Venta", f_v_sel: "Seleccionar Producto",
        f_v_cnt: "Cantidad", f_v_add: "Añadir Ítem", f_v_btn: "Procesar Venta", t_v_title: "Ítems de la Venta Actual",
        th_v_sub: "Subtotal", f_g_title: "Registrar Gasto", f_g_cat: "Categoría de Gasto", f_g_des: "Descripción",
        f_g_mon: "Monto ($)", f_g_fec: "Fecha", f_g_btn: "Guardar Gasto", t_g_title: "Historial de Costos",
        alert_msg: "¡Alerta de Stock Mínimo! Producto bajo de existencias: "
    },
    en: {
        m_inv: "Inventory", m_vta: "Sales", m_gto: "Expenses", m_out: "Logout",
        t_inv: "Inventory Management", t_vta: "Sales Registration", t_gto: "Expense Tracking",
        c_ing: "Total Income", c_gto: "Total Expenses", c_prod: "Total Products", c_low: "Critical Stock",
        f_p_reg: "Register Product", f_p_cod: "Unique Code", f_p_nom: "Name", f_p_cos: "Cost Price",
        f_p_vta: "Sales Price", f_p_med: "Unit of Measure", f_p_cant: "Initial Stock", f_p_min: "Min Stock",
        f_p_btn: "Save Product", t_p_title: "Current Inventory",
        th_cod: "Code", th_nom: "Name", th_stk: "Stock", th_cos: "Cost", th_vta: "Sale", th_est: "Status",
        st_ok: "Stable", st_low: "Low Stock", notif_vta: "Sales transaction processed!",
        f_v_title: "New Transaction", f_v_can: "Sales Channel", f_v_sel: "Select Product",
        f_v_cnt: "Quantity", f_v_add: "Add Item", f_v_btn: "Process Sale", t_v_title: "Current Sale Items",
        th_v_sub: "Subtotal", f_g_title: "Register Expense", f_g_cat: "Expense Category", f_g_des: "Description",
        f_g_mon: "Amount ($)", f_g_fec: "Date", f_g_btn: "Save Expense", t_g_title: "Cost History",
        alert_msg: "Low Stock Warning! Running out of: "
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const rango = localStorage.getItem('user_rango');
    const cedula = localStorage.getItem('user_cedula');
    let currentLang = localStorage.getItem("stockflow_lang") || "es";
    let carrito = [];
    let listaProductosGlobal = [];

    if (!rango || !cedula) {
        window.location.href = 'dashboard.html';
        return;
    }

    document.getElementById('user-cedula').innerText = `Cédula: ${cedula}`;
    document.getElementById('user-role').innerText = rango;

    if (rango === "Vendedor") {
        document.getElementById('box-reg-prod').style.display = 'none';
        document.getElementById('box-reg-gasto').style.display = 'none';
    } else if (rango === "Repositor") {
        document.getElementById('menu-vta-btn').style.display = 'none';
        document.getElementById('menu-gto-btn').style.display = 'none';
    }

    function switchModule(activeTabId, sectionId, titleKey) {
        document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
        document.querySelectorAll('.module-section').forEach(s => s.style.display = 'none');
        document.getElementById(activeTabId).classList.add('active');
        document.getElementById(sectionId).style.display = 'block';
        document.getElementById('dash-module-title').innerText = i18nDash[currentLang][titleKey];
    }

    document.getElementById('menu-inv-btn').addEventListener('click', () => switchModule('menu-inv-btn', 'section-inventario', 't_inv'));
    document.getElementById('menu-vta-btn').addEventListener('click', () => switchModule('menu-vta-btn', 'section-ventas', 't_vta'));
    document.getElementById('menu-gto-btn').addEventListener('click', () => switchModule('menu-gto-btn', 'section-gastos', 't_gto'));

    function applyTranslations() {
        document.getElementById('lbl-m-inv').innerText = i18nDash[currentLang].m_inv;
        document.getElementById('lbl-m-vta').innerText = i18nDash[currentLang].m_vta;
        document.getElementById('lbl-m-gto').innerText = i18nDash[currentLang].m_gto;
        document.getElementById('lbl-m-out').innerText = i18nDash[currentLang].m_out;
        document.getElementById('lbl-card-ing').innerText = i18nDash[currentLang].c_ing;
        document.getElementById('lbl-card-gto').innerText = i18nDash[currentLang].c_gto;
        document.getElementById('lbl-card-prod').innerText = i18nDash[currentLang].c_prod;
        document.getElementById('lbl-card-low').innerText = i18nDash[currentLang].c_low;
        
        document.getElementById('lbl-title-pform').innerText = i18nDash[currentLang].f_p_reg;
        document.getElementById('lbl-f-cod').innerText = i18nDash[currentLang].f_p_cod;
        document.getElementById('lbl-f-nom').innerText = i18nDash[currentLang].f_p_nom;
        document.getElementById('lbl-f-cos').innerText = i18nDash[currentLang].f_p_cos;
        document.getElementById('lbl-f-vta').innerText = i18nDash[currentLang].f_p_vta;
        document.getElementById('lbl-f-med').innerText = i18nDash[currentLang].f_p_med;
        document.getElementById('lbl-f-cant').innerText = i18nDash[currentLang].f_p_cant;
        document.getElementById('lbl-f-min').innerText = i18nDash[currentLang].f_p_min;
        document.getElementById('lbl-f-btn').innerText = i18nDash[currentLang].f_p_btn;
        document.getElementById('lbl-title-ptable').innerText = i18nDash[currentLang].t_p_title;
        
        document.getElementById('th-p-cod').innerText = i18nDash[currentLang].th_cod;
        document.getElementById('th-p-nom').innerText = i18nDash[currentLang].th_nom;
        document.getElementById('th-p-cant').innerText = i18nDash[currentLang].th_stk;
        document.getElementById('th-p-cos').innerText = i18nDash[currentLang].th_cos;
        document.getElementById('th-p-vta').innerText = i18nDash[currentLang].th_vta;
        document.getElementById('th-p-est').innerText = i18nDash[currentLang].th_est;

        document.getElementById('lbl-title-vform').innerText = i18nDash[currentLang].f_v_title;
        document.getElementById('lbl-v-canal').innerText = i18nDash[currentLang].f_v_can;
        document.getElementById('lbl-v-prod').innerText = i18nDash[currentLang].f_v_sel;
        document.getElementById('lbl-v-cant').innerText = i18nDash[currentLang].f_v_cnt;
        document.getElementById('lbl-v-add').innerText = i18nDash[currentLang].f_v_add;
        document.getElementById('lbl-v-btn').innerText = i18nDash[currentLang].f_v_btn;
        document.getElementById('lbl-title-vtable').innerText = i18nDash[currentLang].t_v_title;
        document.getElementById('th-v-nom').innerText = i18nDash[currentLang].th_nom;
        document.getElementById('th-v-cant').innerText = i18nDash[currentLang].th_stk;
        document.getElementById('th-v-pre').innerText = i18nDash[currentLang].th_vta;
        document.getElementById('th-v-sub').innerText = i18nDash[currentLang].th_v_sub;

        document.getElementById('lbl-title-gform').innerText = i18nDash[currentLang].f_g_title;
        document.getElementById('lbl-g-cat').innerText = i18nDash[currentLang].f_g_cat;
        document.getElementById('lbl-g-des').innerText = i18nDash[currentLang].f_g_des;
        document.getElementById('lbl-g-mon').innerText = i18nDash[currentLang].f_g_mon;
        document.getElementById('lbl-g-fec').innerText = i18nDash[currentLang].f_g_fec;
        document.getElementById('lbl-g-btn').innerText = i18nDash[currentLang].f_g_btn;
        document.getElementById('lbl-title-gtable').innerText = i18nDash[currentLang].t_g_title;
        document.getElementById('th-g-fec').innerText = i18nDash[currentLang].f_g_fec;
        document.getElementById('th-g-cat').innerText = i18nDash[currentLang].f_g_cat;
        document.getElementById('th-g-des').innerText = i18nDash[currentLang].f_g_des;
        document.getElementById('th-g-mon').innerText = i18nDash[currentLang].f_g_mon;

        const activeA = document.querySelector('.sidebar-menu a.active');
        if (activeA.id === 'menu-inv-btn') document.getElementById('dash-module-title').innerText = i18nDash[currentLang].t_inv;
        if (activeA.id === 'menu-vta-btn') document.getElementById('dash-module-title').innerText = i18nDash[currentLang].t_vta;
        if (activeA.id === 'menu-gto-btn') document.getElementById('dash-module-title').innerText = i18nDash[currentLang].t_gto;
    }

    document.getElementById('dash-es-btn').addEventListener('click', () => { currentLang = "es"; localStorage.setItem("stockflow_lang", "es"); applyTranslations(); cargarDatosDelServidor(); });
    document.getElementById('dash-en-btn').addEventListener('click', () => { currentLang = "en"; localStorage.setItem("stockflow_lang", "en"); applyTranslations(); cargarDatosDelServidor(); });

    function showToast(message, isAlert = false) {
        const wrapper = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast-notif ${isAlert ? 'alert-stock' : ''}`;
        toast.innerHTML = `<span class="material-symbols-outlined">${isAlert ? 'warning' : 'info'}</span> <span>${message}</span>`;
        wrapper.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }

    async function cargarDatosDelServidor() {
        try {
            const resMetricas = await fetch('http://localhost:3000/api/metricas');
            const metricas = await resMetricas.json();
            document.getElementById('stat-ingresos').innerText = `$${metricas.ingresos.toFixed(2)}`;
            document.getElementById('stat-gastos').innerText = `$${metricas.egresos.toFixed(2)}`;
            document.getElementById('stat-total-productos').innerText = metricas.total_productos;
            document.getElementById('stat-stock-bajo').innerText = metricas.alertas;

            const resProd = await fetch('http://localhost:3000/api/productos');
            listaProductosGlobal = await resProd.json();
            const tbodyProd = document.getElementById('tabla-productos-body');
            const selectVenta = document.getElementById('venta-producto-select');
            
            tbodyProd.innerHTML = '';
            selectVenta.innerHTML = '';

            listaProductosGlobal.forEach(p => {
                const esCritico = p.cantidad <= p.stock_minimo;
                if (esCritico) {
                    showToast(`${i18nDash[currentLang].alert_msg} ${p.nombre} (${p.cantidad} ${p.unidad_medida})`, true);
                }
                const fila = `
                    <tr>
                        <td><strong>${p.codigo}</strong></td>
                        <td>${p.nombre}</td>
                        <td>${p.cantidad} ${p.unidad_medida}</td>
                        <td>$${parseFloat(p.precio_costo).toFixed(2)}</td>
                        <td>$${parseFloat(p.precio_venta).toFixed(2)}</td>
                        <td><span class="status-badge ${esCritico ? 'low' : 'ok'}">${esCritico ? i18nDash[currentLang].st_low : i18nDash[currentLang].st_ok}</span></td>
                    </tr>
                `;
                tbodyProd.innerHTML += fila;

                const opt = document.createElement('option');
                opt.value = p.id;
                opt.innerText = `${p.nombre} (Dispo: ${p.cantidad})`;
                selectVenta.appendChild(opt);
            });

            const resGastos = await fetch('http://localhost:3000/api/gastos');
            const gastos = await resGastos.json();
            const tbodyGastos = document.getElementById('tabla-gastos-body');
            tbodyGastos.innerHTML = '';
            gastos.forEach(g => {
                const fila = `
                    <tr>
                        <td>${g.fecha.split('T')[0]}</td>
                        <td>${g.categoria}</td>
                        <td>${g.descripcion}</td>
                        <td>$${parseFloat(g.monto).toFixed(2)}</td>
                    </tr>
                `;
                tbodyGastos.innerHTML += fila;
            });

        } catch (e) {}
    }

    document.getElementById('form-producto').addEventListener('submit', async (e) => {
        e.preventDefault();
        const body = {
            codigo: document.getElementById('prod-codigo').value.trim(),
            nombre: document.getElementById('prod-nombre').value.trim(),
            categoria_id: 1,
            precio_costo: parseFloat(document.getElementById('prod-costo').value),
            precio_venta: parseFloat(document.getElementById('prod-venta').value),
            unidad_medida: document.getElementById('prod-medida').value.trim(),
            cantidad: parseInt(document.getElementById('prod-cantidad').value),
            stock_minimo: parseInt(document.getElementById('prod-minimo').value),
            usuario_cedula: cedula
        };

        const res = await fetch('http://localhost:3000/api/productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (res.ok) {
            document.getElementById('form-producto').reset();
            cargarDatosDelServidor();
        }
    });

    document.getElementById('btn-add-item').addEventListener('click', () => {
        const pId = parseInt(document.getElementById('venta-producto-select').value);
        const cant = parseInt(document.getElementById('venta-cantidad').value);
        const prod = listaProductosGlobal.find(x => x.id === pId);

        if (prod && cant > 0) {
            const subtotal = prod.precio_venta * cant;
            carrito.push({ id: prod.id, nombre: prod.nombre, cantidad: cant, precio_venta: prod.precio_venta, subtotal });
            renderCarrito();
        }
    });

    function renderCarrito() {
        const tbody = document.getElementById('tabla-cart-body');
        tbody.innerHTML = '';
        let total = 0;
        carrito.forEach(c => {
            total += c.subtotal;
            tbody.innerHTML += `<tr><td>${c.nombre}</td><td>${c.cantidad}</td><td>$${c.precio_venta.toFixed(2)}</td><td>$${c.subtotal.toFixed(2)}</td></tr>`;
        });
        document.getElementById('cart-total-value').innerText = `$${total.toFixed(2)}`;
    }

    document.getElementById('form-venta').addEventListener('submit', async (e) => {
        e.preventDefault();
        if (carrito.length === 0) return;

        const body = {
            canal_venta: document.getElementById('venta-canal').value.trim(),
            vendedor_cedula: cedula,
            items: carrito
        };

        const res = await fetch('http://localhost:3000/api/ventas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            showToast(i18nDash[currentLang].notif_vta);
            carrito = [];
            renderCarrito();
            document.getElementById('form-venta').reset();
            cargarDatosDelServidor();
        }
    });

    document.getElementById('form-gasto').addEventListener('submit', async (e) => {
        e.preventDefault();
        const body = {
            categoria_gasto_id: parseInt(document.getElementById('gasto-categoria-select').value),
            descripcion: document.getElementById('gasto-descripcion').value.trim(),
            monto: parseFloat(document.getElementById('gasto-monto').value),
            fecha: document.getElementById('gasto-fecha').value
        };

        const res = await fetch('http://localhost:3000/api/gastos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            document.getElementById('form-gasto').reset();
            cargarDatosDelServidor();
        }
    });

    document.getElementById('btn-logout').addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = 'index.html';
    });

    applyTranslations();
    cargarDatosDelServidor();
});