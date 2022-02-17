export default class Track {
    constructor(target) {
        this.target = target;
        this.parent = null;
        this.start = target.start || 0;
        this.timeLen = target.timeLen || 5;
        this.loop = target.loop !== undefined ? target.loop : false;
        this.keyMap = target.keyMap || new Map();
    }

    update(t) {
        const { start, loop, timeLen, keyMap, target } = this;
        let time = t - start;
        if (loop) {
            time = time % timeLen;
        }

        for (const [key, fms] of keyMap.entries()) {
            const last = fms.length - 1;
            if (time < fms[0][0]) {
                target[key] = fms[0][1];
            } else if (time > fms[last][0]) {
                target[key] = fms[last][1];
            } else {
                target[key] = getValBetweenFms(time, fms);
            }
        }
    }
}

function getValBetweenFms(time, fms) {
    for (let i = 0; i < fms.length - 1; i++) {
        const fms_start = fms[i];
        const fms_end = fms[i+1];
        if (time >= fms_start[0] && time <= fms_end[0]) {
            const delta = {
                x: fms_end[0] - fms_start[0],
                y: fms_end[1] - fms_start[1]
            };
            const k = delta.y / delta.x;
            const b = fms_end[1] - k * fms_end[0];
            return k * time + b;
        }
    }
}