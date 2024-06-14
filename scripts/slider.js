const INTERVAL_TIMEOUT = 5000;

function main() {
    const imgSliderContainer = document.querySelector('[img-slider]');
    const imgItems = [
        {
            src: './img/main-slider/image1.jpg',
            textTemplate: `
            <span class="highlight-primary">skiing</span> is not <span class="highlight-primary">a</span> lifestyle <br />
            it's <span class="highlight-primary">life</span>`,
        },
        {
            src: './img/main-slider/image2.jpg',
            textTemplate: `
            There's a <span class="highlight-primary">bright</span> spot <br />
            in every <span class="highlight-secondary">dark</span> cloud`,
            textClass: 'text-center',
        },
        {
            src: './img/main-slider/image3.jpg',
            textTemplate: `
            <span class="highlight-primary">Happiness</span> is<br />
            <span class="highlight-primary">first</span> tracks  in<br />
            <span class="highlight-primary">fresh</span> snow`,
            textClass: 'text-right',
        },
        {
            src: './img/main-slider/image4.jpg',
            textTemplate: `
            <span class="highlight-primary">It</span> always <span class="highlight-primary">seems</span> impossible <br />
            until it's <span class="highlight-primary">done</span>`,
        },
        {
            src: './img/main-slider/image5.jpg',
            textTemplate: `
            It's the <span class="highlight-primary">possibility</span> of having <br />
            a <span class="highlight-primary">dream</span> come <span class="highlight-primary">true</span> <br />
            that makes <span class="highlight-primary">life</span> interesting`,
            textClass: 'text-right',
        },
        {
            src: './img/main-slider/image6.jpg',
            textTemplate: `
            The <span class="highlight-primary">best</span> view <br />
            <span class="highlight-primary">comes</span> after <br />
            the hardest <span class="highlight-primary">climb</span>
            `,
            textClass: 'text-right',
        },
        {
            src: './img/main-slider/image7.jpg',
            textTemplate: `
            The <span class="highlight-primary">cliche</span> is <br /> 
            <span class="highlight-primary">that</span> life is <span class="highlight-primary">a</span> mountain <br />
            You go <span class="highlight-primary">up</span>, reach the <span class="highlight-primary">top</span> <br />
            and then go <span class="highlight-primary">down</span>`,
            textClass: 'text-left',
        },
        {
            src: './img/main-slider/image8.jpg',
            textTemplate: `
            Your <span class="highlight-primary">hopes</span>, <span class="highlight-primary">dreams</span> and <span class="highlight-primary">aspirations</span> <br />
            are trying <span class="highlight-primary">to</span> take you <span class="highlight-primary">airborne</span> <br /><br />
            above <span class="highlight-primary">the</span> clouds, above <span class="highlight-primary">the</span> storms, <br />
            if <span class="highlight-primary">you</span> only <span class="highlight-primary">let them</span>`,
            textClass: 'text-right',
        },
        {
            src: './img/main-slider/image9.jpg',
            textTemplate: `
            The <span class="highlight-primary">bad</span> news is <span class="highlight-primary">time</span> flies <br />
            The <span class="highlight-primary">good</span> news is <span class="highlight-primary">you're</span> the <span class="highlight-primary">pilot</span>`,
            textClass: 'text-left',
        },
        {
            src: './img/main-slider/image10.jpg',
            textTemplate: `
            You <span class="highlight-primary">are</span> never <span class="highlight-primary">too</span> old <br />
            <span class="highlight-primary">to</span> set <span class="highlight-primary">another</span> goal <br />
            or <span class="highlight-primary">to</span> dream  <span class="highlight-primary">a</span> new <span class="highlight-primary">dream</span>`,
            textClass: 'text-center',
        },
        {
            src: './img/main-slider/image11.jpg',
            textTemplate: `
            <span class="highlight-primary">Create</span> a life <br />
            you <span class="highlight-primary">can't wait</span> to <br /> 
            <span class="highlight-primary">wake up</span> to`,
            textClass: 'text-right',
        },
        {
            src: './img/main-slider/image12.jpg',
            textTemplate: `
            <span class="highlight-primary">Today</span> is your <span class="highlight-primary">day</span> <br />
            your <span class="highlight-primary">mountain</span> is waiting <br />
            So get on <span class="highlight-primary">your way</span>`,
            textClass: 'text-left',
        },
        {
            src: './img/main-slider/image13.jpg',
            textTemplate: `
            Sometimes <span class="highlight-primary">in</span> life, <br />
            <span class="highlight-primary">we</span> don't get to <span class="highlight-primary">choose</span> the mountain; <br />
            it chooses <span class="highlight-primary">us</span>`,
            textClass: 'text-right',
        },
        {
            src: './img/main-slider/image14.jpg',
            textTemplate: `
            You have to <span class="highlight-primary">conquer</span> every <span class="highlight-primary">obstacle</span>, <br />
            <span class="highlight-primary">before</span> you can <span class="highlight-primary">reach</span> <br />
            the top of the <span class="highlight-primary">mountain</span>`,
            textClass: 'text-left',
        },
    ];

    initSlider(imgSliderContainer, imgItems);
}

function initSlider(sliderContainer, imgItems) {
    resetElementHTML(sliderContainer);

    const sliderWrapper = createSliderWrapper(sliderContainer);
    const sliderNav = createSliderNav(sliderContainer);

    const imgElements = [];
    const navElements = [];
    for (const [idx, imgItem] of imgItems.entries()) {
        const id = getImgTemplateId(idx);

        const imgElement = getImgTemplate(imgItem, id);
        const navElement = getImgNavTemplate(id);

        sliderNav.appendChild(navElement);
        sliderWrapper.appendChild(imgElement);

        navElements.push(navElement);
        imgElements.push(imgElement);
    }

    addNavLogic(sliderWrapper, navElements, imgElements);
}

function createSliderWrapper(container) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('img-slider-wrapper');
    container.appendChild(wrapper);

    return wrapper;
}

function createSliderNav(container) {
    const nav = document.createElement('nav');
    nav.classList.add('img-slider-nav');
    container.appendChild(nav);

    return nav;
}

function resetElementHTML(element) {
    element.innerHTML = '';
}

function getImgTemplateId(idx) {
    return `image-${idx + 1}`;
}

function getImgTemplate(imgItem, id) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('img-item');

    const img = document.createElement('img');
    img.setAttribute('id', id);
    img.setAttribute('src', imgItem.src);
    if (imgItem.imgClass) {
        typeof imgItem.imgClass === 'string' ? img.classList.add(imgItem.imgClass) : imgItem.imgClass.forEach((className) => img.classList.add(className));
    }

    const text = document.createElement('p');
    text.classList.add('img-slider-text');
    text.setAttribute('id', `${id}-text`);
    if (imgItem.textClass) {
        typeof imgItem.textClass === 'string' ? text.classList.add(imgItem.textClass) : imgItem.textClass.forEach((className) => text.classList.add(className));
    }
    text.innerHTML = imgItem.textTemplate ?? '';

    wrapper.appendChild(img);
    wrapper.appendChild(text);
    return wrapper;
}

function getImgNavTemplate(id) {
    const a = document.createElement('a');
    a.setAttribute('href', `#${id}`);
    return a;
}

function addNavLogic(wrapper, navElements, imgElements) {
    let intervalId = startSliderTimer(wrapper, imgElements);

    for (const navElement of navElements) {
        navElement.addEventListener('click', (e) => {
            e.preventDefault();
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }

            const imgElementId = navElement.getAttribute('href');
            const imgElementIdx = imgElements.map((el) => el.querySelector(imgElementId)).findIndex((el) => !!el);
            scrollIntoElement(wrapper, imgElements[imgElementIdx]);

            intervalId = startSliderTimer(wrapper, imgElements, imgElementIdx);
        });
    }
}

function startSliderTimer(wrapper, imgElements, startingIdx = 1) {
    let currentIdx = startingIdx;
    const intervalId = setInterval(() => {
        currentIdx++;
        if (currentIdx === imgElements.length) {
            currentIdx = 0;
        }

        scrollIntoElement(wrapper, imgElements[currentIdx]);
    }, INTERVAL_TIMEOUT);

    return intervalId;
}

function scrollIntoElement(wrapper, imgElement) {
    wrapper.scrollLeft = imgElement.offsetLeft;
}

main();
