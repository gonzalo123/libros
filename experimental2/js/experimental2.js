/* ============================================================
   EXPERIMENTAL 2 — ARCHIVE BEHAVIOUR + CENTRAL BOOK REGISTRY
   ============================================================ */

document.documentElement.classList.add('has-js');

const BOOKS = [
    {
        slug: 'tremenda-turra',
        title: 'Tremenda turra',
        subtitle: 'Ensayos desde la Antigüedad para pensar el presente.',
        description: 'Ensayos desde la Antigüedad para pensar el presente.',
        cover: '../assets/images/tremenda_turra.jpg',
        category: 'Ensayo / Antigüedad',
        categories: ['ensayo', 'antiguedad'],
        leanpubUrl: 'https://leanpub.com/tremendaTurra',
        status: 'Novedad'
    },
    {
        slug: 'el-canto-del-macho-cabrio',
        title: 'El canto del macho cabrío',
        subtitle: 'Tragedia / Grecia',
        description: 'Resúmenes de tragedias griegas.',
        cover: '../assets/images/Tragedias1.png',
        category: 'Tragedia / Grecia',
        categories: ['antiguedad', 'historia'],
        leanpubUrl: 'https://leanpub.com/elcantodelmachocabrio',
        status: 'Disponible'
    },
    {
        slug: 'alejandro-magno',
        title: 'Alejandro Magno',
        subtitle: 'Historia / Biografía',
        description: 'Alejandro Magno y su legado en la historia de la humanidad.',
        cover: '../assets/images/Alejandro1.png',
        category: 'Historia / Biografía',
        categories: ['historia'],
        leanpubUrl: 'https://leanpub.com/alejandro',
        status: 'Disponible'
    },
    {
        slug: 'pedante-e-innecesario',
        title: 'Pedante e Innecesario',
        subtitle: 'Ensayo / Reflexión',
        description: 'La antología de ensayos que nadie había pedido.',
        cover: '../assets/images/PedanteInecesario1.png',
        category: 'Ensayo / Reflexión',
        categories: ['ensayo'],
        leanpubUrl: 'https://leanpub.com/pedanteeinnecesario',
        status: 'Disponible'
    },
    {
        slug: 'mujeres-ilustres',
        title: 'Vidas y opiniones de las mujeres ilustres',
        subtitle: 'Antigüedad / Mujeres',
        description: 'Selección de historias de mujeres que dejaron su impronta en la antigua Grecia.',
        cover: '../assets/images/VidaOpinionesMujeresIlustres1.png',
        category: 'Antigüedad / Mujeres',
        categories: ['antiguedad', 'historia'],
        leanpubUrl: 'https://leanpub.com/mujeresilustresantiguagrecia',
        status: 'Disponible'
    },
    {
        slug: 'pensando-fuerte',
        title: 'Pensando fuerte',
        subtitle: 'Ensayo / Deriva',
        description: 'Divagaciones de alguien que no sabe muy bien de lo que está hablando.',
        cover: '../assets/images/pensando_fuerte.png',
        category: 'Ensayo / Deriva',
        categories: ['ensayo'],
        leanpubUrl: 'https://leanpub.com/pensandofuerte',
        status: 'Disponible'
    },
    {
        slug: 'sobre-la-naturaleza',
        title: 'Sobre la naturaleza',
        subtitle: 'Filosofía / Presocráticos',
        description: 'Apuntes de filosofía presocrática.',
        cover: '../assets/images/sobre_la_naturaleza.png',
        category: 'Filosofía / Presocráticos',
        categories: ['antiguedad', 'filosofia'],
        leanpubUrl: 'https://leanpub.com/sobrelanaturaleza',
        status: 'Disponible'
    },
    {
        slug: 'codigo-solido',
        title: 'Código sólido',
        subtitle: 'Desarrollo / Principios',
        description: 'Reflexiones sobre el desarrollo de código y principios SOLID.',
        cover: '../assets/images/codigo_solido.png',
        category: 'Desarrollo / Principios',
        categories: ['codigo'],
        leanpubUrl: 'https://leanpub.com/codigosolido',
        status: 'Disponible'
    }
];

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function setupFilters() {
    const buttons = $$('[data-filter]');
    const cards = $$('[data-book-card]');
    const result = $('.filter-result');
    const empty = $('.empty-filter');

    if (!buttons.length || !cards.length) return;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            let visible = 0;

            buttons.forEach(item => {
                const active = item === button;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-pressed', String(active));
            });

            cards.forEach(card => {
                const categories = card.dataset.categories.split(' ');
                const matches = filter === 'all' || categories.includes(filter);
                card.hidden = !matches;
                if (matches) visible += 1;
            });

            if (result) result.textContent = `${visible} resultado${visible === 1 ? '' : 's'}`;
            if (empty) empty.hidden = visible !== 0;
        });
    });
}

function setupReveals() {
    const elements = $$('.reveal');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        elements.forEach(element => element.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px' });

    elements.forEach(element => observer.observe(element));
}

function setupPointerAtmosphere() {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.addEventListener('pointermove', event => {
        document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
        document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);

        const stage = $('.orbit-stage');
        if (stage) {
            const x = event.clientX - window.innerWidth / 2;
            const y = event.clientY - window.innerHeight / 2;
            stage.style.setProperty('--stage-x', `${x}px`);
            stage.style.setProperty('--stage-y', `${y}px`);
        }
    });
}

function setText(selector, value) {
    const element = $(selector);
    if (element) element.textContent = value;
}

function renderNotFound() {
    const grid = $('.book-detail-grid');
    const status = $('.book-detail-status');
    if (status) status.innerHTML = '<span class="eyebrow"><span class="eyebrow-line"></span> REGISTRO / 404</span><span class="detail-live">SEÑAL PERDIDA</span>';
    if (!grid) return;

    grid.innerHTML = `
        <div class="detail-copy detail-copy--not-found">
            <p class="eyebrow"><span class="eyebrow-line"></span> ARCHIVO / SIN COORDENADAS</p>
            <h1>Señal no encontrada</h1>
            <p class="detail-description">El objeto que buscas no aparece en esta órbita. El archivo completo sigue abierto.</p>
            <a class="primary-cta" href="index.html#archivo"><span>VOLVER AL ARCHIVO</span><b>↗</b></a>
        </div>`;
    document.title = 'SEÑAL PERDIDA / ARCHIVO';
}

function renderBookDetail() {
    if (!$('.book-detail-shell')) return;

    const slug = new URLSearchParams(window.location.search).get('book');
    const index = BOOKS.findIndex(book => book.slug === slug);
    if (index === -1) {
        renderNotFound();
        return;
    }

    const book = BOOKS[index];
    const number = String(index + 1).padStart(2, '0');
    const previous = BOOKS[(index - 1 + BOOKS.length) % BOOKS.length];
    const next = BOOKS[(index + 1) % BOOKS.length];
    const cover = $('[data-detail-cover]');

    $$('.book-page [data-detail-index]').forEach(element => { element.textContent = number; });
    setText('[data-detail-category]', book.category.toUpperCase());
    setText('[data-detail-title]', book.title);
    setText('[data-detail-subtitle]', book.subtitle);
    setText('[data-detail-description]', book.description);
    setText('[data-detail-status]', `${book.status.toUpperCase()} / DESCARGA ABIERTA`);

    if (cover) {
        cover.src = book.cover;
        cover.alt = `Portada de ${book.title}`;
    }

    const link = $('[data-detail-link]');
    if (link) link.href = book.leanpubUrl;

    const previousLink = $('[data-detail-prev]');
    const nextLink = $('[data-detail-next]');
    if (previousLink) {
        previousLink.href = `book.html?book=${previous.slug}`;
        previousLink.textContent = `← ${previous.title.toUpperCase()}`;
    }
    if (nextLink) {
        nextLink.href = `book.html?book=${next.slug}`;
        nextLink.textContent = `${next.title.toUpperCase()} →`;
    }

    document.title = `${book.title.toUpperCase()} / ARCHIVO`;
    const description = $('meta[name="description"]');
    if (description) description.content = `${book.title}: ${book.description}`;
}

setupFilters();
setupReveals();
setupPointerAtmosphere();
renderBookDetail();
