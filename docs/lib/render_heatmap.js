function getPageYear() {
    const pathMatch = window.location.pathname.match(/\/(\d{4})\/?$/);
    if (pathMatch) {
        return pathMatch[1];
    }

    const titleMatch = document.title.match(/\b(20\d{2})\b/);
    if (titleMatch) {
        return titleMatch[1];
    }

    const headings = document.querySelectorAll('main h1, main h2');
    for (const heading of headings) {
        const headingMatch = heading.textContent.match(/\b(20\d{2})\b/);
        if (headingMatch) {
            return headingMatch[1];
        }
    }

    return null;
}

function getCounts(year) {
    // TOC Element
    const root = document.querySelector('ul[data-md-component="toc"]');
    if (!root) {
        console.warn('ul[data-md-component="toc"] Not Found');
        return {};
    }

    const mainUl = root.querySelector('li.md-nav__item > nav.md-nav > ul.md-nav__list');
    if (!mainUl) {
        console.warn('ul.md-nav__list Not Found');
        return {};
    }

    const dateCounts = {};
    const dateItems = mainUl.querySelectorAll(':scope > li.md-nav__item');
    dateItems.forEach(li => {
        // every <li> is a date
        const dateLink = li.querySelector(':scope > a.md-nav__link');
        if (!dateLink) return;

        // parse date
        const rawText = dateLink.textContent.trim();
        const match = rawText.match(/^(\d{1,2})\.(\d{1,2})$/);
        if (!match) {
            return;
        }
        const [, month, day] = match;
        const monthPadded = month.padStart(2, '0');
        const dayPadded = day.padStart(2, '0');
        const dateKey = `${year}-${monthPadded}-${dayPadded}`;

        let recordCount = 0;
        const subUl = li.querySelector(':scope > nav.md-nav > ul.md-nav__list');
        if (subUl) {
            const recordItems = subUl.querySelectorAll(':scope > li.md-nav__item');
            recordCount = recordItems.length;
        }

        dateCounts[dateKey] = recordCount;
    });
    return dateCounts;
}

function renderHeatmap() {
    const container = document.getElementById('heatmap_cvs');
    if (!container) {
        return;
    }

    const year = getPageYear();
    if (!year) {
        console.warn('Cannot infer page year for heatmap');
        return;
    }

    const dateCounts = getCounts(year);
    if (Object.keys(dateCounts).length === 0) {
        return;
    }

    // Make rendering idempotent when Material triggers multiple page events.
    container.innerHTML = '';

    var heatMapDate = new HeatMapDate();
    var optionDate = {
        data: dateCounts,
        dateStart: `${year}-01-01`,
        dateEnd: `${year}-12-31`,
        rect: {
            stroke: {
                show: true,
                background: '#333',
                opacity: 0.6
            }
        },
        tip: {
            show: true,
            formatter: '{b} records on {a}'
        }
    };
    heatMapDate.setOption(optionDate);
    heatMapDate.init(container);
}

if (typeof document$ !== 'undefined' && document$.subscribe) {
    // Material for MkDocs uses client-side navigation, so `window.onload` is unreliable.
    document$.subscribe(() => {
        renderHeatmap();
    });
} else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderHeatmap);
} else {
    renderHeatmap();
}
