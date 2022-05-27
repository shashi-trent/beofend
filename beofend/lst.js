class Loof {
    #data;
    constructor(setter=(val)=>{}, defaultData={}) {
        this.setter = setter;
        this.#data = defaultData;
    }

    get() {
        return this.#data;
    }

    set(data) {
        this.setter.apply(data);
        this.#data = data;
    }
}

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


// interactor => to others
const UrlOptions = {
    BASIC: {
        "GET": {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json"
            }
        },
        "POST": {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            }
        }
    }
}

class Agent {
    baseUrl;
    constructor(baseUrl, urlOptions={}, onError=(err)=>{console.log("onError :: ", err);}) {
        this.baseUrl = baseUrl;
        this.urlOptions = urlOptions;
        if(!this.urlOptions["DEFAULT"]) this.urlOptions["DEFAULT"] = {"method": "GET"};
        this.onError = onError;
    }

    yieldAsJson(state, url, body=null, useOption="DEFAULT", errorHandler=this.onError) {
        fetch(this.baseUrl + "/" + url, {...this.urlOptions[useOption], ...(body ? {"body" : JSON.stringify(body)} : {})})
        .then(response => response.json)
        .then(jsonRes => {
            state.set(jsonRes);
        })
        .catch(err => {
            errorHandler.apply(err);
        });
    }

    yieldAsRaw(state, url, body=null, useOption="DEFAULT", errorHandler=this.onError) {
        fetch(this.baseUrl + "/" + url, {...this.urlOptions[useOption], ...(body ? {"body" : JSON.stringify(body)} : {})})
        .then(response => response.text())
        .then(textRes => {
            state.set(textRes);
        })
        .catch(err => {
            errorHandler.apply(err);
        });
    }
}
