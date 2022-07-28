



class SplayArray extends Array{
    push(){
        const arrLen = this.length;
        const superLen = super.push(...arguments);
        setTimeout(() => {
            for(let i = arrLen; i<superLen; i++){
                // delete this[i];
                this.pop();
            }
        },2000);
        // console.log("splay length: ", arrLen);
        // console.log("super length: ", superLen.length);

        return superLen;
    }
}


export default SplayArray;