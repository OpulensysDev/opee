document.addEventListener('DOMContentLoaded', function() {
    // Initialize Materialize components
    M.AutoInit();

    // Initialize AOS
    AOS.init();

    // Initialize Headroom
    var header = document.querySelector(".header");
    var headroom = new Headroom(header);
    headroom.init();

    // Initialize Swiper
    var swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
        },
    });

    // GSAP Animations
    gsap.from("#apresentacao h1", {duration: 1, x: -100, opacity: 0, ease: "power3.out"});
    gsap.from("#apresentacao p", {duration: 1, x: 100, opacity: 0, ease: "power3.out", delay: 0.5});
    gsap.from("#apresentacao .btn", {duration: 1, y: 50, opacity: 0, ease: "power3.out", delay: 1});

    // Anime.js animation for "Saiba Mais" button
    var saibaButton = document.querySelector('#saiba-mais-btn');
    saibaButton.addEventListener('mouseenter', function() {
        anime({
            targets: saibaButton,
            scale: 1.1,
            duration: 800,
            elasticity: 400
        });
    });
    saibaButton.addEventListener('mouseleave', function() {
        anime({
            targets: saibaButton,
            scale: 1,
            duration: 600,
            elasticity: 300
        });
    });

    // Lottie Animation
    var animation = lottie.loadAnimation({
        container: document.getElementById('lottie-animation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets3.lottiefiles.com/packages/lf20_ggwq3ysg.json' // Replace with your Lottie JSON file
    });

    // Three.js 3D Chart
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('grafico-3d').appendChild(renderer.domElement);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    // ECharts
    var myChart = echarts.init(document.getElementById('grafico-3d'));
    var option = {
        tooltip: {},
        visualMap: {
            max: 20,
            inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            }
        },
        xAxis3D: {
            type: 'category',
            data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021']
        },
        yAxis3D: {
            type: 'category',
            data: ['Alunos', 'Aprovação', 'Participação', 'Projetos']
        },
        zAxis3D: {
            type: 'value'
        },
        grid3D: {
            boxWidth: 200,
            boxDepth: 80,
            viewControl: {
                // projection: 'orthographic'
            },
            light: {
                main: {
                    intensity: 1.2,
                    shadow: true
                },
                ambient: {
                    intensity: 0.3
                }
            }
        },
        series: [{
            type: 'bar3D',
            data: [
                [0, 0, 18], [1, 0, 23], [2, 0, 29], [3, 0, 34], [4, 0, 40], [5, 0, 50], [6, 0, 60],
                [0, 1, 12], [1, 1, 15], [2, 1, 18], [3, 1, 22], [4, 1, 26], [5, 1, 31], [6, 1, 35],
                [0, 2, 9], [1, 2, 11], [2, 2, 13], [3, 2, 16], [4, 2, 19], [5, 2, 23], [6, 2, 28],
                [0, 3, 5], [1, 3, 6], [2, 3, 7], [3, 3, 9], [4, 3, 11], [5, 3, 14], [6, 3, 17]
            ],
            shading: 'lambert',
            label: {
                textStyle: {
                    fontSize: 16,
                    borderWidth: 1
                }
            },
            emphasis: {
                label: {
                    textStyle: {
                        fontSize: 20,
                        color: '#900'
                    }
                },
                itemStyle: {
                    color: '#900'
                }
            }
        }]
    };
    myChart.setOption(option);

    // Particles.js
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
                value: "#ffffff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 5
                }
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
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Mobile menu toggle
    var menuToggle = document.getElementById('menu-toggle');
    var header = document.querySelector('.header');
    menuToggle.addEventListener('click', function() {
        header.classList.toggle('open');
    });
});
