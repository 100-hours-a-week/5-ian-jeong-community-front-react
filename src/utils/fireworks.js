
var sparks = 75; // how many sparks per clicksplosion
var speed = 33; // how fast - smaller is faster
var bangs = 5; // how many can be launched simultaneously (note that using too many can slow the script down)
var colours = ['#03f', '#0e0', '#0cf', '#f93']; // blue, green, purple, cyan

/****************************
    *   Clicksplosion Effect    *
    *(c)2012-3 mf2fm web-design *
    *  http://www.mf2fm.com/rv  *
    * DON'T EDIT BELOW THIS BOX *
    ****************************/

var intensity = [];
var Xpos = [];
var Ypos = [];
var dX = [];
var dY = [];
var stars = [];
var decay = [];
var timers = [];
var swide = 800;
var shigh = 600;
var sleft = 0;
var sdown = 0;
var count = 0;

function clicksplode() { 
    if (document.getElementById) {
        var i, j;
        window.onscroll = set_scroll;
        window.onresize = set_width;
        document.onclick = eksplode;
        set_width();
        set_scroll();

        for (i = 0; i < bangs; i++) {
            for (j = sparks * i; j < sparks + sparks * i; j++) {
                stars[j] = createDiv('*', 13);
                document.body.appendChild(stars[j]);
            }
        }
    }
}

function createDiv(char, size) {
    var div = document.createElement('div');
    var sty = div.style;
    sty.font = size + 'px monospace';
    sty.position = 'absolute';
    sty.backgroundColor = 'transparent';
    sty.visibility = 'hidden';
    sty.zIndex = '101';
    div.appendChild(document.createTextNode(char));

    return div;
}

function bang(N) {
    var i, Z, A = 0;
    for (i = sparks * N; i < sparks * (N + 1); i++) { 
        if (decay[i]) {
            Z = stars[i].style;
            Xpos[i] += dX[i];
            Ypos[i] += (dY[i] += 1.25 / intensity[N]);
            if (Xpos[i] >= swide || Xpos[i] < 0 || Ypos[i] >= shigh + sdown || Ypos[i] < 0) {
                decay[i] = 1;
            } else {
                Z.left = Xpos[i] + 'px';
                Z.top = Ypos[i] + 'px';
            }
            if (decay[i] === 15) Z.fontSize = '7px';
            else if (decay[i] === 7) Z.fontSize = '2px';
            else if (decay[i] === 1) Z.visibility = 'hidden';
            decay[i]--;
        } else {
            A++;
        }
    }

    if (A !== sparks) timers[N] = setTimeout(() => bang(N), speed);
}

function eksplode(e) { 
    var target = e.target || e.srcElement;
    if (target.tagName.toLowerCase() === 'input' || target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'textarea') {
        return;
    }

    var x, y, i, M, Z, N;
    set_scroll();
    y = e.pageY;
    x = e.pageX;
    N = ++count % bangs;
    M = Math.floor(Math.random() * 3 * colours.length);
    intensity[N] = 5 + Math.random() * 4;
    for (i = N * sparks; i < (N + 1) * sparks; i++) {
        Xpos[i] = x;
        Ypos[i] = y - 5;
        dY[i] = (Math.random() - 0.5) * intensity[N];
        dX[i] = (Math.random() - 0.5) * (intensity[N] - Math.abs(dY[i])) * 1.25;
        decay[i] = 16 + Math.floor(Math.random() * 16);
        Z = stars[i].style;
        if (M < colours.length) Z.color = colours[i % 2 ? count % colours.length : M];
        else if (M < 2 * colours.length) Z.color = colours[count % colours.length];
        else Z.color = colours[i % colours.length];
        Z.fontSize = '13px';
        Z.visibility = 'visible';
    }
    clearTimeout(timers[N]);
    bang(N);
} 

function set_width() {
    var sw_min = 999999;
    var sh_min = 999999;
    if (document.documentElement && document.documentElement.clientWidth) {
        if (document.documentElement.clientWidth > 0) sw_min = document.documentElement.clientWidth;
        if (document.documentElement.clientHeight > 0) sh_min = document.documentElement.clientHeight;
    }
    if (typeof window.innerWidth == 'number' && window.innerWidth) {
        if (window.innerWidth > 0 && window.innerWidth < sw_min) sw_min = window.innerWidth;
        if (window.innerHeight > 0 && window.innerHeight < sh_min) sh_min = window.innerHeight;
    }
    if (document.body.clientWidth) {
        if (document.body.clientWidth > 0 && document.body.clientWidth < sw_min) sw_min = document.body.clientWidth;
        if (document.body.clientHeight > 0 && document.body.clientHeight < sh_min) sh_min = document.body.clientHeight;
    }
    if (sw_min === 999999 || sh_min === 999999) {
        sw_min = 800;
        sh_min = 600;
    }
    swide = sw_min - 7;
    shigh = sh_min - 7;
}

function set_scroll() {
    if (typeof window.pageYOffset == 'number') {
        sdown = window.pageYOffset;
        sleft = window.pageXOffset;
    } else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
        sdown = document.body.scrollTop;
        sleft = document.body.scrollLeft;
    } else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
        sleft = document.documentElement.scrollLeft;
        sdown = document.documentElement.scrollTop;
    } else {
        sdown = 0;
        sleft = 0;
    }
}

export default clicksplode;
