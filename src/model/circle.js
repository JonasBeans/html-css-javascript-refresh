class Circle{
    id = "";
    x = 50;
    y = 50; 

    constructor(id, x, y){
        this.id = id;
        this.x = x; 
        this.y = y;
    }

    draw(canvas){
        throw new Error("Not yet implemented");
    }

    print(){
        console.log(this.toString());
    }

    toString(){
        return " id: " + this.id;
    }
}