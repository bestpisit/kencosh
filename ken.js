function color_element(){
    this.self= null;
    this.x = 0;
    this.width = 0;
    this.pw = 0;
    this.update = function(){
        if(this.self != null){
            this.self.style.left = this.x.toString()+'%';;
            this.self.style.width = this.width.toString()+'%';
        }
    };
}
function main_line(){
    this.self = document.getElementById('main_line');
    this.width = 100;
    this.head = this.tail = null;
    this.element_list = [];
    this.btail = this.atail = null;
    this.rep = null;
    this.create = function (num){
        var elements = document.createElement('div');
        //elements.style.borderTopLeftRadius = '5px';
        //elements.style.borderBottomLeftRadius = '5px';
        elements.style.width = '0%';
        elements.classList.add('pline');
        var ee = new color_element();
        ee.self = elements;
        this.rep = ee;
        this.self.appendChild(elements);
        var width = this.width;
        var rg = width / num;
        while(width){
            var rand = Math.random()*rg + 1;
            var element = document.createElement('div');
            if(width-rand < 0){
                rand = width;
            }
            element.style.width = rand.toString()+'%';
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            element.style.backgroundColor = "rgb("+r+","+g+","+b+")";
            element.style.left = 100-width.toString() + '%';
            var el = new color_element();
            el.self = element;
            el.x = 100-width;
            el.width = rand+0.2;
            el.pw = rand;
            el.px = (100-width)
            element.classList.add('pline');
            this.element_list.push(el);
            if(width == 100){
                //element.style.borderTopLeftRadius = '5px';
                //element.style.borderBottomLeftRadius = '5px';
            }
            else if(width - rand == 0){
                //element.style.borderTopRightRadius = '5px';
                //element.style.borderBottomRightRadius = '5px';
                this.tail = element;
            }
            this.self.appendChild(element);
            width -= rand;
        }
    }
    this.move = function(step){
        this.rep.width += step;
        this.rep.update();
        this.rep.self.style.backgroundColor = this.btail;
        for(var i=0;i<this.element_list.length;i++){
            var obj = this.element_list[i];
            if(obj.self == this.tail){
                if(this.btail == this.atail){
                    var r = Math.floor(Math.random() * 256);
                    var g = Math.floor(Math.random() * 256);
                    var b = Math.floor(Math.random() * 256);
                    this.btail = "rgb("+r+","+g+","+b+")";
                }
                obj.x += step;
                if(obj.x < 100){
                    obj.width -= step;
                }
                else{
                    obj.x = 0;
                    obj.width = obj.pw;
                    this.rep.width = 0;
                    this.atail = this.btail;
                    obj.self.style.backgroundColor = this.btail;
                    if(i==0){
                        this.tail = this.element_list[this.element_list.length-1].self;
                    }
                    else{
                        this.tail = this.element_list[i-1].self;
                        this.tail.width -= 50;
                    }
                }
            }
            else{
                obj.x += step;
            }
            obj.update();
        }
    }
}

var color_line = new main_line();
color_line.create(10);

function move_color_line(){
    
    color_line.move(0.02);
    var el = document.getElementById("head").getBoundingClientRect();
    document.getElementById("hb").style.height = (el.height).toString()+'px';
    if(el.width >= 848){
        document.getElementById("col1").style.cssFloat = "left";
        document.getElementById("col2").style.cssFloat = "right";
        document.getElementById("col1").style.padding = "0px";
    }
    else{
        document.getElementById("col1").style.cssFloat = "none";
        document.getElementById("col2").style.cssFloat = "none";
        document.getElementById("col1").style.padding = "10px";
    }
}
setInterval(move_color_line,1);