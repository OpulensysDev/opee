document.addEventListener('DOMContentLoaded', function() {
    // Initialize fullPage.js
    new fullpage('#fullpage', {
        autoScrolling: true,
        scrollHorizontally: true,
        navigation: true,
        navigationPosition: 'right',
    });

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
    });

    // Initialize Swiper
    new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 5000,
        },
    });

    // GSAP Animations
    gsap.from('.navbar', { duration: 1, y: -50, opacity: 0, ease: 'power3.out' });
    gsap.from('#apresentacao h1', { duration: 1, x: -50, opacity: 0, delay: 0.5, ease: 'power3.out' });
    gsap.from('#apresentacao p', { duration: 1, x: -50, opacity: 0, delay: 0.7, ease: 'power3.out' });
    gsap.from('.icons-container i', { duration: 0.5, scale: 0, opacity: 0, delay: 1, stagger: 0.2, ease: 'back.out(1.7)' });

    // Headroom for header
    var myElement = document.querySelector("header");
    var headroom  = new Headroom(myElement);
    headroom.init();

    // Anime.js for CTA button
    anime({
        targets: '#saiba-mais-btn',
        scale: [1, 1.1],
        duration: 1000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutQuad'
    });

    // ECharts for data visualization
    var chartDom = document.getElementById('chart-container');
    var myChart = echarts.init(chartDom);
    var option = {
        title: {
            text: 'Impacto da OPEE'
        },
        tooltip: {},
        legend: {
            data: ['Alunos', 'Projetos']
        },
        xAxis: {
            data: ['2019', '2020', '2021', '2022']
        },
        yAxis: {},
        series: [{
            name: 'Alunos',
            type: 'bar',
            data: [150, 200, 250, 300]
        }, {
            name: 'Projetos',
            type: 'line',
            data: [3, 4, 6, 7]
        }]
    };
    myChart.setOption(option);

    // Lottie animation
    lottie.loadAnimation({
        container: document.getElementById('lottie-container'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets2.lottiefiles.com/packages/lf20_inti4oxf.json' // Replace with your Lottie JSON file
    });

    // Particle.js background
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#4CAF50'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#4CAF50',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
            }
        },
        retina_detect: true
    });
});
