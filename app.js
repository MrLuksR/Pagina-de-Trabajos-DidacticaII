// ===== ELEMENTOS =====
const taskWrapper = document.getElementById('task-wrapper');
const contentWrapper = document.getElementById('content-wrapper');
const sectionTitle = document.getElementById('section-title');
const contentFrame = document.getElementById('content-frame');
const backButtonContainer = document.getElementById('back-button-container');
const backToListBtn = document.getElementById('back-to-list');


// ===== ABRIR TAREA =====
document.querySelectorAll('.task-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        // Obtener datos del botón
        const title = button.dataset.title;
        const link = button.dataset.link;

        // Ocultar lista de tareas
        taskWrapper.classList.add('hidden');
        sectionTitle.textContent = title;
        
        // Configurar y mostrar iframe
        contentFrame.src = link;
        contentWrapper.classList.remove('hidden');
        contentWrapper.classList.add('show');

        // Mostrar botón flotante de vuelta
        backButtonContainer.classList.add('visible');

        // Animar número hacia arriba izquierda
        animateBackButton();
    });
});


// ===== ANIMAR BOTÓN DE VUELTA =====
function animateBackButton() {
    const icon = document.getElementById('back-icon');
    const text = document.getElementById('back-text');
    
    // Cambiar el icono a una flecha hacia arriba
    icon.style.transform = 'rotate(0deg)';
    text.textContent = 'Volver';
    
    // Cambiar el evento del botón para volver al inicio
    backToListBtn.onclick = goToHome;
}


// ===== VOLVER A LA LISTA =====
function goToList() {
    // Ocultar contenido
    contentWrapper.classList.remove('show');
    contentWrapper.classList.add('hidden');
    
    // Mostrar lista de tareas
    taskWrapper.classList.remove('hidden');
    sectionTitle.textContent = 'Tareas disponibles';
    
    // Ocultar botón flotante
    backButtonContainer.classList.remove('visible');
    
    // Limpiar iframe
    contentFrame.src = '';
    
    // Resetear propiedades del botón
    resetBackButton();
}


// ===== VOLVER AL INICIO (CON ANIMACIÓN) =====
function goToHome() {
    const icon = document.getElementById('back-icon');
    
    // Animar salida del botón
    backButtonContainer.style.transform = 'translateY(-20px)';
    backButtonContainer.style.opacity = '0';
    
    setTimeout(() => {
        goToList();
        
        // Resetear después de un corto tiempo
        backButtonContainer.style.transform = '';
        backButtonContainer.style.opacity = '';
    }, 300);
}


// ===== RESETEAR BOTÓN =====
function resetBackButton() {
    const icon = document.getElementById('back-icon');
    const text = document.getElementById('back-text');
    
    icon.style.transform = '';
    icon.textContent = '←';
    text.textContent = 'Volver';
    
    // Quitar el onclick personalizado
    backToListBtn.onclick = null;
}


// ===== ESC PARA VOLVER =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!contentWrapper.classList.contains('hidden')) {
            goToList();
        }
    }
});


// ===== ANIMACIONES DE HOVER =====
const cards = document.querySelectorAll('.task-list li');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});


// ===== OBSERVER PARA ANIMACIONES DE ENTRADA =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.task-list li').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
});