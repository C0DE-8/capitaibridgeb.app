(function () {
    const header = document.querySelector('.header.navbar-area');
    const toggle = header?.querySelector('.mobile-menu-btn, .home-menu-toggle');
    const panel = header?.querySelector('.navbar-collapse, .home-nav-links');
    const brand = header?.querySelector('.navbar-brand, .home-brand');

    if (!header || !toggle || !panel || !brand) return;

    header.classList.add('site-sidebar-header');
    panel.classList.add('site-sidebar-panel');
    panel.classList.remove('collapse');
    panel.setAttribute('aria-hidden', 'true');
    panel.setAttribute('aria-label', 'Site navigation');

    toggle.classList.remove('mobile-menu-btn', 'active');
    toggle.classList.add('site-sidebar-toggle');
    toggle.removeAttribute('data-bs-toggle');
    toggle.removeAttribute('data-bs-target');
    toggle.setAttribute('aria-controls', panel.id);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');

    const panelHead = document.createElement('div');
    panelHead.className = 'site-sidebar-panel-head';
    const panelBrand = brand.cloneNode(true);
    panelBrand.classList.add('site-sidebar-brand');
    panelBrand.href = 'index.html';
    panelBrand.removeAttribute('id');
    panelBrand.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));

    const closeButton = document.createElement('button');
    closeButton.className = 'site-sidebar-close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Close navigation menu');
    closeButton.innerHTML = '&times;';
    panelHead.append(panelBrand, closeButton);
    panel.prepend(panelHead);

    panel.querySelectorAll('.navbar-nav a').forEach((link) => {
        if (link.textContent.trim().startsWith('Home')) link.href = 'index.html';
        if (link.querySelector('.site-sidebar-arrow')) return;
        const arrow = document.createElement('span');
        arrow.className = 'site-sidebar-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '\u203a';
        link.append(arrow);
    });

    const contact = document.createElement('div');
    contact.className = 'site-sidebar-contact';
    contact.setAttribute('aria-label', 'Contact details');
    contact.innerHTML = [
        '<a href="mailto:contact@capitaibridgeb.app"><span class="site-sidebar-contact-icon" aria-hidden="true">&#9993;</span><span>contact@capitaibridgeb.app</span></a>',
        '<a href="tel:+13462687410"><span class="site-sidebar-contact-icon" aria-hidden="true">&#9742;</span><span>+1 (346) 268-7410</span></a>'
    ].join('');
    panel.append(contact);

    const backdrop = document.createElement('div');
    backdrop.className = 'site-sidebar-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.append(backdrop);

    function closeMenu(restoreFocus) {
        panel.classList.remove('site-sidebar-open');
        panel.style.removeProperty('transform');
        panel.style.removeProperty('visibility');
        backdrop.classList.remove('is-visible');
        panel.setAttribute('aria-hidden', 'true');
        panel.inert = true;
        document.body.classList.remove('site-sidebar-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
        if (restoreFocus) toggle.focus();
    }

    function openMenu() {
        panel.inert = false;
        panel.classList.add('site-sidebar-open');
        panel.style.transform = 'translateX(0)';
        panel.style.visibility = 'visible';
        backdrop.classList.add('is-visible');
        panel.setAttribute('aria-hidden', 'false');
        document.body.classList.add('site-sidebar-open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close navigation menu');
        closeButton.focus();
    }

    toggle.addEventListener('click', () => {
        toggle.classList.remove('active');
        if (toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
        else openMenu();
    });
    closeButton.addEventListener('click', () => closeMenu(true));
    backdrop.addEventListener('click', () => closeMenu(true));
    panel.querySelectorAll('.navbar-nav a').forEach((link) => {
        link.addEventListener('click', () => closeMenu(false));
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            closeMenu(true);
        }
    });
    window.matchMedia('(min-width: 992px)').addEventListener('change', (event) => {
        if (event.matches) closeMenu(false);
    });

    panel.inert = true;
})();
