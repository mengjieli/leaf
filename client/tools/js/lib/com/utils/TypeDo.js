class Enum {
    constructor(strs) {
        this.strs = strs;
    }
    assert(str) {
        for(let i = 0; i < this.strs.length; i++){
            if(this.strs[i] == str) return true;
        }
        return false;
    }
    toString() {
        return this.strs.toString();
    }
}

global.Enum = Enum;