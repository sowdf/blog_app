var fonts = {
    arrow : function(parent,direction,size,color) {
        var getSize;
        var getColor;
        /*jshint -W030 */
        !size ? getSize = 1 : getSize = size;
        !color ? getColor = "#000000" : getColor = color;
        var can = function() {
            var div = document.createElement('DIV');
            var setCanvas = document.createElement('canvas');
            parent.appendChild(div);
            div.appendChild(setCanvas);
            div.style.textAlign = 'center';
            div.style.position = 'absolute';
            setCanvas.setAttribute('width', 150 * getSize);
            setCanvas.setAttribute('height', 100 * getSize);
            return setCanvas;
        };
        var canvas = can();

        if(canvas.getContext){
            var thisFont = canvas.getContext('2d');
            thisFont.beginPath();
            switch(direction){
                case 'left' :
                    break;
                case 'right' :
                    thisFont.translate(150*getSize, 100*getSize);
                    thisFont.rotate(180*Math.PI/180);
                    break;
                case 'top' :
                    thisFont.translate(125*getSize, -25*getSize);
                    thisFont.rotate(90*Math.PI/180);
                    break;
                case 'bottom' :
                    thisFont.translate(25*getSize, 125*getSize);
                    thisFont.rotate(270*Math.PI/180);
                    break;
            }
            thisFont.moveTo(50*getSize, 50*getSize);
            thisFont.lineTo(100*getSize, 75*getSize);
            thisFont.lineTo(70*getSize, 50*getSize);
            thisFont.lineTo(100*getSize, 25*getSize);
            thisFont.fillStyle = getColor;
            thisFont.fill();
        }
        var top = parent.clientHeight / 2 - canvas.parentNode.clientHeight / 2;
        canvas.parentNode.style.top = top + 'px';
        var left = parent.clientWidth / 2 - canvas.parentNode.clientWidth / 2;
        canvas.parentNode.style.left = left + 'px';
    },
    //example : fonts.arrow(body,'left',2,'red');
    edit : function(parent,size,color) {
        var getSize;
        var getColor;
        !size ? getSize = 1 : getSize = size;
        !color ? getColor = "#000000" : getColor = color;
        var can = function() {
            var div = document.createElement('DIV');
            var setCanvas = document.createElement('canvas');
            parent.appendChild(div);
            div.appendChild(setCanvas);
            div.style.textAlign = 'center';
            div.style.position = 'absolute';
            setCanvas.setAttribute('class', 'ss-edit');
            setCanvas.setAttribute('width', 100 * getSize);
            setCanvas.setAttribute('height', 110 * getSize);
            return setCanvas;
        };
        var canvas = can();
        var top = parent.clientHeight / 2 - canvas.parentNode.clientHeight / 2;
        canvas.parentNode.style.top = top + 'px';
        var left = parent.clientWidth / 2 - canvas.parentNode.clientWidth / 2;
        canvas.parentNode.style.left = left + 'px';

        if(canvas.getContext){
            var thisFont = canvas.getContext('2d');

            var e,c;

            function defaultFont() {
                thisFont.beginPath();
                thisFont.moveTo(45*getSize, 10*getSize);
                thisFont.lineTo(55*getSize, 10*getSize);
                thisFont.lineTo(55*getSize, 70*getSize);
                thisFont.lineTo(50*getSize, 85*getSize);
                thisFont.lineTo(45*getSize, 70*getSize);
                thisFont.fillStyle = getColor;
                thisFont.fill();
                thisFont.save();


                thisFont.beginPath();
                thisFont.arc(50*getSize,80*getSize,20*getSize,(Math.PI*7)/4,(Math.PI*13)/4,false);
                thisFont.strokeStyle = getColor;
                thisFont.stroke();
            }
            defaultFont();

            var i = 7;
            function start() {
                thisFont.clearRect(0,0,300,300);

                thisFont.beginPath();
                thisFont.moveTo(45*getSize, 10*getSize);
                thisFont.lineTo(55*getSize, 10*getSize);
                thisFont.lineTo(55*getSize, 70*getSize);
                thisFont.lineTo(50*getSize, 85*getSize);
                thisFont.lineTo(45*getSize, 70*getSize);
                thisFont.fillStyle = getColor;
                thisFont.fill();
                thisFont.save();

                if(i < 11) {
                    thisFont.beginPath();
                    thisFont.arc(50*getSize,80*getSize,20*getSize,(Math.PI*i)/4,(Math.PI*(i+6))/4,false);
                    thisFont.strokeStyle = getColor;
                    thisFont.stroke();
                    i = i + 0.1;
                } else {
                    if (i < 14) {
                        thisFont.beginPath();
                        thisFont.arc(50*getSize,80*getSize,20*getSize,(Math.PI*i)/4,(Math.PI*18)/4,false);
                        strokeStyle = getColor;
                        thisFont.stroke();
                        thisFont.save();

                        thisFont.beginPath();
                        thisFont.moveTo(50*getSize, 100*getSize);
                        thisFont.lineTo((50-(i-11)*13.3)*getSize, 100*getSize);
                        thisFont.stroke();
                        i = i + 0.1;
                    } else {
                        clearInterval(c);
                        i = 14;
                        thisFont.beginPath();
                        thisFont.arc(50*getSize,80*getSize,20*getSize,(Math.PI*14)/4,(Math.PI*18)/4,false);
                        thisFont.stroke();
                        thisFont.save();

                        thisFont.beginPath();
                        thisFont.moveTo(50*getSize, 100*getSize);
                        thisFont.lineTo(10*getSize, 100*getSize);
                        thisFont.strokeStyle = getColor;
                        thisFont.stroke();

                    }
                }
            }

            function end() {
                thisFont.clearRect(0,0,300,300);

                thisFont.beginPath();
                thisFont.moveTo(45*getSize, 10*getSize);
                thisFont.lineTo(55*getSize, 10*getSize);
                thisFont.lineTo(55*getSize, 70*getSize);
                thisFont.lineTo(50*getSize, 85*getSize);
                thisFont.lineTo(45*getSize, 70*getSize);
                thisFont.fillStyle = getColor;
                thisFont.fill();
                thisFont.save();

                if(i > 7) {
                    if (i > 11) {
                        thisFont.beginPath();
                        thisFont.arc(50*getSize,80*getSize,20*getSize,(Math.PI*i)/4,(Math.PI*18)/4,false);
                        strokeStyle = getColor;
                        thisFont.stroke();
                        thisFont.save();

                        thisFont.beginPath();
                        thisFont.moveTo(50*getSize, 100*getSize);
                        thisFont.lineTo((50-(i-11)*13.3)*getSize, 100*getSize);
                        thisFont.stroke();
                        i = i - 0.1;
                    } else {
                        thisFont.beginPath();
                        thisFont.arc(50*getSize,80*getSize,20*getSize,(Math.PI*i)/4,(Math.PI*(i+6))/4,false);
                        thisFont.strokeStyle = getColor;
                        thisFont.stroke();
                        i = i - 0.1;
                    }
                } else {
                    clearInterval(e);
                    defaultFont();
                }
            }
            function over(){
                clearInterval(e);
                c = setInterval(start, 1);
            }
            function out(){
                clearInterval(c);
                e = setInterval(end, 1);
            }
            function ready(){
                if (document.readyState === 'complete') {
                    clearInterval(r);
                    canvas.addEventListener('mouseover', over);
                    canvas.addEventListener('mouseout', out);
                }
            }
            var r = setInterval(ready,1)
        }
    }
    //fonts.edit(body,2,'red');
};
module.exports = fonts;
