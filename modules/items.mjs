class ICss {
    ID="";
    #style="";
    constructor(clsId, css) {
        this.ID = clsId;
        this.#style = css;
    }

    build(css) {
        this.#style = css;
        return this;
    }

    declare() {
        return this;
    }

    static k(clsId) {
        return new ICss(clsId, "");
    }
}


class Item {
    id;
    type = "div";
    style = "";
    clses = [];

    onclick = [];
    others;

    innerText;
    innerHtml;

    constructor(id, type, style, clses=[], onclick, others, ...childs) {
        this.id = id;
        this.type = type;
        this.style += style;
        this.clses.concat(clses);
        if(onclick) this.onclick.push(onclick);
        this.others = others;
        this.append(childs);
        return this.build();
    }

    classes() {
        let cls = "";
        for(let i=0; i<this.clses.length; i++) cls += this.clses[i] + " ";
        return cls;
    }

    append(...items) {

    }

    build() {
        return (<div>"HEllo built !!"</div>);
    }
}


// horizontal flex
class HFlex extends Item {
    constructor(id, style, clses, onclick, others) {
        this.style += "display: flex; flex-direction: row; ";
    }
}


// horizontal flex
class VFlex extends Item {
    constructor(id, style="", clses, onclick, others) {
        super(id, "div", "display: flex; flex-direction: column; " + style, clses, onclick, others);
    }
}