const spritejs = require('spritejs')

const {Scene, Sprite} = spritejs

let persimmonPic = require('../static/柿子2.png')
let rocketPic = require('../static/仓.png')
let selfDiggerPic = require('../static/挖机.png')
let otherDiggerPic = require('../static/挖机2.png')
let bgPic = require('../static/bg.png')
let entryPic = require('../static/入口.png')
let loaderPic = require('../static/运载器.png')
let rocket1Pic = require('../static/火箭1号.png')

function init(container) {
    let width = 1920
    let height = 932
    const scene = new Scene({container, width: 1920, height: 932})
    const layer = scene.layer()
    const bg = new Sprite(bgPic)
    const entry = new Sprite(entryPic)

    bg.attr({
        size: [width, height]
    })
    entry.attr({
        pos: [470, 180],
        zIndex: 9
    })

    layer.append(bg);
    layer.append(entry);

    movePersimmon(layer)
    moveOtherDigger(layer)
    moveSelfDigger(layer)
    let fireFn = initRocket(layer)
    setTimeout(() => {
        fireFn.fire()
    }, 1000)
}

function movePersimmon(layer) {
    const persimmon = new Sprite(persimmonPic);
    persimmon.attr({
        size: [15, 20]
    })
    persimmon.animate([
        {pos: [200, 180]},
        {pos: [260, 220]},
        {pos: [325, 200]},
        {pos: [270, 175]},
        {pos: [200, 180]},
    ], {
        duration: 5000,
        iterations: Infinity,
    });
    layer.append(persimmon);
}

function moveOthersRocket(rocket) {
    rocket.animate([
        {pos: [410, 240]},
        {pos: [280, 320]},
        {pos: [420, 430]},
        {pos: [560, 350]},
    ], {
        duration: 3000
    });
    setTimeout(() => {
        rocket.remove()
    }, 3000)
}

function moveSelfRocket(rocket) {
    rocket.animate([
        {pos: [923, 825]},
        {pos: [847, 890]},
        {pos: [756, 830]},
        {pos: [500, 490]},
        {pos: [420, 430]},
        {pos: [560, 350]},
    ], {
        duration: 4000
    });
    setTimeout(() => {
        rocket.remove()
    }, 4000)
}

function moveSelfDigger(layer) {
    const digger = new Sprite(selfDiggerPic);
    digger.attr({
        size: [150, 150],
        pos: [1000, 570]
    })
    digger.animate([
        {pos: [1000, 570]},
        {pos: [980, 580]},
    ], {
        duration: 3000,
        iterations: Infinity
    });
    layer.append(digger);
    setInterval(() => {
        const selfRobot = new Sprite(rocketPic);
        selfRobot.attr({
            size: [15, 25]
        })
        layer.append(selfRobot);
        moveSelfRocket(selfRobot)
    }, 3000)
}

function moveOtherDigger(layer) {
    const digger = new Sprite(otherDiggerPic)
    digger.attr({
        size: [120, 100],
        pos: [420, 110]
    })
    digger.animate([
        {pos: [420, 110]},
        {pos: [410, 100]},
    ], {
        duration: 2000,
        iterations: Infinity
    });
    layer.append(digger);
    setInterval(() => {
        const othersRobot = new Sprite(rocketPic);
        othersRobot.attr({
            size: [15, 25]
        })
        layer.append(othersRobot);
        moveOthersRocket(othersRobot)
    }, 2000)
}

function initRocket(layer) {
    let rocket
    let loader
    let obj = {
        init: () => {
            rocket = new Sprite(rocket1Pic)
            loader = new Sprite(loaderPic)
            loader.attr({
                pos: [590, 60]
            })
            rocket.attr({
                pos: [840, -50]
            })
            layer.append(loader)
            layer.append(rocket)
        },
        fire: () => {
            rocket.animate([
                {pos: [840, -50]},
                {pos: [840, -500]},
            ], {
                duration: 1000,
            })
            setTimeout(() => {
                loader.animate([
                    {pos: [590, 60]},
                    {pos: [1500, -500]},
                ], {
                    duration: 1000
                })
            }, 1000)
            setTimeout(() => {
                rocket.remove()
            }, 1000)
            setTimeout(() => {
                loader.remove()
                obj.init()
            }, 2000)
        }
    }
    obj.init()
    return obj
}

export default init
