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