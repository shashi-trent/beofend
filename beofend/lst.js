class State {
    #id = "";
    #data;
    #callbacks = [];

    constructor(id="") {
        this.#id = id;
    }

    set(data) {
        this.#data = data;
        this.#runCallbacks();
        return this;
    }

    get() {
        return this.#data;
    }

    addCallback(callback) {
        this.#callbacks.push(callback);
        return this;
    }

    resetCallbacks() {
        this.#callbacks = [];
        return this;
    }

    #runCallbacks() {
        for(let i=0; i < this.#callbacks.length; i++){
            this.#callbacks[i].run();
        }
    }
}

class Callback {
    #id = "";
    #func = null;

    constructor(func) {
        this.#func = func;
    }

    run() {
        this.#func(); 
    }
}

function state(data, id="") {
    return (new State(id)).set(data);
}

function effect(func, states) {
    let callback = new Callback(func);
    for(let i=0; i< states.length; i++) {
        states[i].addCallback(callback);
    }
}

