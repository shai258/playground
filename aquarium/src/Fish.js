class Fish {
  constructor(url, speed) {
    this._url = url;
    this._speed = speed;
    this.x =  0;
    this.toRight = false;
  }

  render(container){
    const fishImg = document.createElement("img");
    fishImg.src = this._url;
    fishImg.onclick = this.deleteFish;
    
    const fishContainer = document.createElement("div");
    fishContainer.id = "fishContainer";
    fishContainer.style.top = (Math.floor(Math.random() * (document.body.offsetHeight - 200)) + 100) + "px";
    fishContainer.appendChild(fishImg);

    container.appendChild(fishContainer);

    setInterval(this.swim.bind(this, fishContainer), 50/this._speed);
  }

  swim(fishContainer){
    if (this.x === 0) {
      this.toRight = false;
      fishContainer.style.transform = "scaleX(1)";
      ++this.x; 
    }
    if ((this.x < document.body.offsetWidth - 100) && this.toRight === false) {
      fishContainer.style.right =  ++this.x + "px";
    }
    else if(this.x < document.body.offsetWidth - 100 && this.toRight === true) {
      fishContainer.style.right =  --this.x + "px";
    }
    else {
      this.toRight = true;
      fishContainer.style.transform = "scaleX(-1)";
      --this.x;
    }
  }
  deleteFish(){
    this.parentElement.remove();
  }
}

module.exports = Fish;