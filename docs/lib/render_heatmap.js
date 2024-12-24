function getCounts() {
    // TOC Element
    const root = document.querySelector('ul[data-md-component="toc"]');
    if (!root) {
        console.warn('ul[data-md-component="toc"] Not Found');
        return;
    }

    const mainUl = root.querySelector('li.md-nav__item > nav.md-nav > ul.md-nav__list');
    if (!mainUl) {
        console.warn('ul.md-nav__list Not Found');
        return;
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
        const dateKey = `2024-${monthPadded}-${dayPadded}`;

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


window.onload = function () {
    var dateCounts = getCounts()
    var heatMapDate = new HeatMapDate()
    var optionDate = {
        data: dateCounts,
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
    }
    heatMapDate.setOption(optionDate)
    heatMapDate.init(document.getElementById('heatmap_cvs'))
}