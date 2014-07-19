class AnimationTimingEngine {
    constructor() {
        this.currentIndex = 0;
        this.running = false;
        this.rafId = null;
        this.lastFrameTime = null;
        this.updatables = [];
    }

    start() {
        this.running = true;
        this.lastFrameTime = null;
        this.gameLoop();
    }

    stop() {
        this.running = false;
    }

    reset() {
        if (this.rafId) {
            window.cancelAnimationFrame(this.rafId);
        }
        this.start();
    }

    gameLoop(paintTime) {
        if (!this.lastFrameTime) {
            this.lastFrameTime = paintTime;
        } else {
            var dt = paintTime - this.lastFrameTime; // dt in ms
            this.lastFrameTime = paintTime;

            this.tick(dt);
        }

        if (this.running) {
            this.rafId = window.requestAnimationFrame(this.gameLoop.bind(this));
        }
    }

    tick(dt) {
        this.updatables.forEach(
            (updateWrapper) => updateWrapper.component.update(dt));
    }

    addUpdatable(component) {
        var index = this.currentIndex++;
        // fine to put this at the end, it's just getting bigger
        this.updatables.push({component: component, index: index});
        return index;
    }

    removeUpdatable(index) {
        var arrayIndex = _.sortedIndex(this.updatables, {index:index}, (u) => u.index);
        if (this.updatables[arrayIndex].index === index) {
            this.updatables.splice(arrayIndex, 1);
        }
    }
};

module.exports = AnimationTimingEngine;
