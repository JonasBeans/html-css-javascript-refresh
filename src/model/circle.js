class Circle{
    text = "";
    constructor(text){
        this.text = text;
    }

    print(){
        console.log(this.toString());
    }

    toString(){
        return "Circle text: " + this.text;
    }
}

let circle = new Circle("Hello World");
circle.print();