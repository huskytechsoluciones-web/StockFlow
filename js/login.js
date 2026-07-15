const i18nLogin = {
    es: {
        title: "StockFlow",
        subtitle: "Sistema de Gestión de Stock y Ventas",
        placeholder_user: "Cédula",
        placeholder_pass: "Contraseña",
        btn: "Iniciar sesión",
        error: "Cédula o contraseña incorrecta.",
        conn_error: "No se pudo conectar con el servidor."
    },
    en: {
        title: "StockFlow",
        subtitle: "Stock and Sales Management System",
        placeholder_user: "ID Card",
        placeholder_pass: "Password",
        btn: "Login",
        error: "Invalid ID Card or Password.",
        conn_error: "Could not connect to server."
    }
};

document.addEventListener("DOMContentLoaded", () => {
    let currentLang = localStorage.getItem("stockflow_lang") || "es";
    
    const formLogin = document.getElementById('form-login');
    const btnTogglePass = document.getElementById('btn-toggle-pass');
    const contrasenaInput = document.getElementById('contrasena');
    const cedulaInput = document.getElementById('cedula');
    const errorDiv = document.getElementById('error-message');
    const esBtn = document.getElementById('lang-es-btn');
    const enBtn = document.getElementById('lang-en-btn');

    function applyTranslations() {
        document.getElementById('txt-title').innerText = i18nLogin[currentLang].title;
        document.getElementById('txt-subtitle').innerText = i18nLogin[currentLang].subtitle;
        cedulaInput.placeholder = i18nLogin[currentLang].placeholder_user;
        contrasenaInput.placeholder = i18nLogin[currentLang].placeholder_pass;
        document.getElementById('txt-btn-login').innerText = i18nLogin[currentLang].btn;
    }

    esBtn.addEventListener('click', () => {
        currentLang = "es";
        localStorage.setItem("stockflow_lang", "es");
        esBtn.classList.add('active');
        enBtn.classList.remove('active');
        applyTranslations();
    });

    enBtn.addEventListener('click', () => {
        currentLang = "en";
        localStorage.setItem("stockflow_lang", "en");
        enBtn.classList.add('active');
        esBtn.classList.remove('active');
        applyTranslations();
    });

    applyTranslations();

    if (btnTogglePass && contrasenaInput) {
        btnTogglePass.addEventListener('click', () => {
            if (contrasenaInput.type === 'password') {
                contrasenaInput.type = 'text';
                btnTogglePass.innerText = 'visibility_off';
            } else {
                contrasenaInput.type = 'password';
                btnTogglePass.innerText = 'visibility';
            }
        });
    }

    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            const cedula = cedulaInput.value.trim();
            const contrasena = contrasenaInput.value;

            errorDiv.style.display = 'none';

            try {
                const response = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cedula, contrasena })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    localStorage.setItem('user_rango', data.usuario.rango);
                    localStorage.setItem('user_cedula', data.usuario.cedula);
                    window.location.href = 'dashboard.html';
                } else {
                    errorDiv.innerText = i18nLogin[currentLang].error;
                    errorDiv.style.display = 'block';
                }
            } catch (error) {
                errorDiv.innerText = i18nLogin[currentLang].conn_error;
                errorDiv.style.display = 'block';
            }
        });
    }
});