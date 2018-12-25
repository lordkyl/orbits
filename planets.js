
var planetaryData = [
    {
        size:24,
        r: 1.1,
        angle: Math.atan(-0.2598180163498774 / 0.2139478132176988),
        period: orbitalPeriod(88)
    },
    {
        size: 48,
        r: 1,
        angle: Math.atan(-0.1777960564669540 / 0.6963714878318398),
        period: orbitalPeriod(224.7)
    },
    {
        size:52,
        r: 0.88,
        angle: Math.atan(0.2113939115395026 / 0.9619118370691714),
        period: orbitalPeriod(365.2)
    },
    {
        size: 34,
        r: 0.8,
        angle: Math.atan(1.254826123456618 / 0.6834185494048711),
        period: orbitalPeriod(687)
    },
    {
        size: 125,
        r: 1,
        angle: Math.atan(-2.283635765159224 / -4.844529489819140),
        period: orbitalPeriod(4331)
    },
    {
        size: 100,
        r: 1,
        angle: Math.atan(1.845649255549651 / -9.889913318308842),
        period: orbitalPeriod(10747)
    },
    {
        size: 68,
        r: 0.9,
        angle: Math.atan(17.06102424246945 / 10.17296804818794),
        period: orbitalPeriod(30589)
    }, 
    {
        size: 64,
        r: 0.75,
        angle: Math.atan(28.96533794292632 / -7.555848874527176),
        period: orbitalPeriod(59800)
    }
];

//use to calculate delta time
var start_time = 0; // performance.now();

function setup(){
    var orbits = Array.from(document.getElementsByClassName('orbit'));
    var scale = window.innerWidth / 1920;

    document.getElementsByClassName('sun')[0].style.transform = 'rotateX(90deg) scale(' + scale + ')';

    orbits.forEach( (orbit, index) => {
        var data = planetaryData[index];


        var radius = data.r * (window.innerWidth / planetaryData.length) * (index+1) - data.size; // * window.innerWidth) - data.size;


        orbit.style.width = radius + 'px';
        orbit.style.height = radius + 'px';
        orbit.style.marginLeft = radius * -0.5 + 'px';
        orbit.style.marginTop = radius * -0.5 + 'px';

        // orbit.style.width = data.r * 2 + 'px';
        // orbit.style.height = data.r * 2+ 'px';
        // orbit.style.marginLeft = data.r * -1 + 'px';
        // orbit.style.marginTop = data.r * -1 + 'px';

        var planet = orbit.querySelector('.planet');
        planet.style.width = data.size + 'px';
        planet.style.height = data.size + 'px';
        planet.style.transform = 'scale(' + scale + ')';

        planetaryData[index].animation = setupSVG(planet, data.period);
        planetaryData[index].orbit = orbit;
        //planetaryData[index].planet = planet;
        planetaryData[index].pos = orbit.querySelector('.pos');
        planetaryData[index].percent = percentFromAngle(data.angle);
    })

}

function percentFromAngle(angle){
    if (angle < 0) angle += (Math.PI * 2);

    return angle / (Math.PI * 2);
}

function setupSVG(planet, period){

    // var p1 = 'M 4.9959082,0 C 4.8340992,10e-4 4.6724482,0.0104 4.5115243,0.0273 1.9503392,0.26257 -3.4957973e-4,2.43843 1.4267191e-6,4.99996 -0.00199861,7.57231 2.099094,9.84149 4.4802737,9.97262 c 0.1712921,0.018 0.3434003,0.0271 0.5156345,0.0273 2.7614747,0 5.0000918,-2.23858 5.0000918,-5 0,-2.76142 -2.2386171,-5 -5.0000918,-5 z';
    // var p2 = 'm 4.9959082,0 c -0.161809,0.001 -0.32346,0.0104 -0.4843839,0.0273 2.396442,0.27764284 4.3016854,2.41113 4.3020364,4.97266 -0.002,2.57235 -2.2229412,4.6720385 -4.333287,4.97266 0.1712921,0.018 0.3434003,0.0271 0.5156345,0.0273 2.7614747,0 5.0000918,-2.23858 5.0000918,-5 0,-2.76142 -2.2386171,-5 -5.0000918,-5 z';

    //var p2 = 'M4.996 0C4.834 0.001 4.672 0.01 4.512 0.027 1.95 0.263 0 2.438 0 5-0.002 7.572 2.099 9.841 4.48 9.973c0.171 0.018 0.343 0.027 0.516 0.027 2.761 0 5-2.239 5-5 0-2.761-2.239-5-5-5z';
    //var p1 = 'm4.996 0c-0.162 0.001-0.323 0.01-0.484 0.027 2.396 0.278 4.302 2.411 4.302 4.973-0.002 2.572-2.223 4.672-4.333 4.973 0.171 0.018 0.343 0.027 0.516 0.027 2.761 0 5-2.239 5-5 0-2.761-2.239-5-5-5z';
    var p1 = 'M 10,4.999 C 9.999,4.837 9.99,4.676 9.973,4.515 9.695,6.911 7.562,8.817 5,8.817 2.428,8.815 0.328,6.594 0.027,4.484 0.009,4.655 0,4.827 0,5 c 0,2.761 2.239,5 5,5 2.761,0 5,-2.239 5,-5 z';
    var p2 = 'M 10,4.999 C 9.999,4.837 9.99,4.676 9.973,4.515 9.7541484,1.9722907 7.562,0.00708573 5,0.00708573 2.428,0.00508573 0.25253943,1.998837 0.027,4.484 0.009,4.655 0,4.827 0,5 c 0,2.761 2.239,5 5,5 2.761,0 5,-2.239 5,-5 z';

    var svg = SVG(planet).size('100%', '100%').viewbox(0,0,10,10)
    var path = svg.path(p1);
    path.fill('#ffffff');

    return path.animate(period)
    .plot(p2)
    .pause();

}

function tick(now){

    var elapsed = now - start_time;

    //animate the planets
    planetaryData.forEach( (data, index) => {


        if (data.orbit) {
            var percent = elapsed / data.period;

            data.percent += percent;

            if (data.percent > 1) data.percent -= 1;

            draw(data);
        }
    });

    start_time = now;

    requestAnimationFrame(tick);
}

function draw(data){
    var position = data.percent;

    //calculate the shadow animation progress
    var shadow = position <= 0.5 
        ? position * 2 
        : 2 - position * 2;

    data.animation.at(shadow);

    var pos1 = position * 2 * Math.PI;

    //offset the rotation effecting a "starting" position at the bottom
    var angle = Math.PI * 1.25 + pos1;
    
    data.orbit.style.transform = 'rotateZ(' + angle + 'rad)';
    data.pos.style.transform = 'rotateX(90deg) rotateY(' + (angle*-1) + 'rad) rotateZ(' + (pos1 * -1) + 'rad)';

}

setup();
setTimeout(function(){
    start_time = performance.now();
    requestAnimationFrame(tick);
})

//calculate an orbital period for the given data assuming the earth orbits in 20 seconds
function orbitalPeriod(period){
    return period / 365.2 * 60000;
}

