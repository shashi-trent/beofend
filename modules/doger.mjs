if(Pager) throw new Error("Pager already there!!");

const Pager = {
    NG: {},
    imMjs(src, onLoad) {
        let script = document.createElement("script");
        if(onLoad) script.onload = onLoad;
        script.src = src + ".mjs";
        document.head.appendChild(script);
    },

}


class Layer {
    // version is a state
    version;
    #uuid;
    childs;

    constructor(uuid){this.#uuid=uuid;}
    static u(uuid){return new Layer(uuid);}
    getLID(){return this.#uuid;}

    n(obj){
        
    }

    signalParent(){

    }

    declare(){
        
    }
}