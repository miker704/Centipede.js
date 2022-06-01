

const Util = {


    inherits (childClass, parentClass) {
        function Surrogate () { }
        Surrogate.prototype = parentClass.prototype;
        childClass.prototype = new Surrogate();
        childClass.prototype.constructor = childClass;
        // childClass.prototype = Object.create(parentClass.prototype);
        // childClass.prototype.constructor = childClass;

    },

    // randomColor () {

    //     return '#' + Math.floor(Math.random() * 16777215).toString(16);
    // }
    randomColors () {
        let color = '#';
        let hexcode = '0123456789ABCDEF';
        for (let i = 0; i < 6; i++) {
            color += hexcode[Math.floor((Math.random() * 16))];
        }
        // console.log(color);
        return color;
    },
    // the mushrooms cannot be black #000000 as it matches the play field nor can they start
    // of as purple '#800080' as they are poison mushrooms 
    mushroomRandomColors () {
        let color = '#';
        let hexcode = '0123456789ABCDEF';
        for (let i = 0; i < 6; i++) {
            color += hexcode[Math.floor((Math.random() * 16))];
        }
        if (color === '#000000' || color === '#800080') {
            alert("color is black or purple");
        }
        
        return color === '#000000' ? color = '#ff4100' : color === '#800080' ? color = '#ff4100' : color;
    }


    //this is for bullet speed 
    

};


export default Util;