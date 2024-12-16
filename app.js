"use strict";
class PixelArt {
    constructor(containerSelector, widthElSelector, heightElSelector, colorSelector, resetBtnSelector) {
        this.container = document.querySelector(containerSelector);
        this.widthEl = document.querySelector(widthElSelector);
        this.heightEl = document.querySelector(heightElSelector);
        this.color = document.querySelector(colorSelector);
        this.resetBtn = document.querySelector(resetBtnSelector);

        this.width = parseInt(this.widthEl.value); 
        this.height = parseInt(this.heightEl.value); 
        this.draw = false;

        this.populate = this.populate.bind(this);
        this.reset = this.reset.bind(this);
        this.exportToJson = this.exportToJson.bind(this);
        this.importFromJson = this.importFromJson.bind(this);

        this.populate(this.width, this.height);

        this.addEventListeners();
    }

    addEventListeners() {
        window.addEventListener("mousedown", () => this.draw = true);
        window.addEventListener("mouseup", () => this.draw = false);
        
        this.resetBtn.addEventListener('click', this.reset);
        
        this.widthEl.addEventListener('keyup', () => {
            this.width = parseInt(this.widthEl.value);
            this.reset();
        });
        this.heightEl.addEventListener('keyup', () => {
            this.height = parseInt(this.heightEl.value);
            this.reset();
        });
    }

    populate(width, height) {
        this.container.innerHTML = ''; 
        this.container.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
        this.container.style.gridTemplateRows = `repeat(${height}, 1fr)`;
    
        for (let i = 0; i < width * height; i++) {
            const div = document.createElement('div');
            div.classList.add('pixels');
    
            const x = i % width + 1; 
            const y = Math.floor(i / width) + 1; 
    
            div.addEventListener('mouseover', () => {
                if (!this.draw) return;
                div.style.backgroundColor = this.color.value;
                console.log(`Ik ben veld ${x}, ${y} en ik werd zopas ${this.color.value} gekleurd`);
            });
    
            div.addEventListener('mousedown', () => {
                div.style.backgroundColor = this.color.value;
                console.log(`Ik ben veld ${x}, ${y} en ik ben ${div.style.backgroundColor}`);
            });
    
            this.container.appendChild(div);
        }
    
        console.log(this.container.innerHTML);
    }

    resizePixels(width, height) {
        const containerWidth = this.container.offsetWidth;
        const containerHeight = this.container.offsetHeight;

        const pixelSize = Math.min(containerWidth / width, containerHeight / height);

   
    }

    reset() {
        this.width = parseInt(this.widthEl.value);
        this.height = parseInt(this.heightEl.value);
        this.populate(this.width, this.height);
        console.log("Grid Reset");
    }

    exportToJson() {
        const pixels = Array.from(this.container.querySelectorAll('.pixels')).map(pixel => ({
            color: pixel.style.backgroundColor
        }));
        const json = JSON.stringify({ width: this.width, height: this.height, pixels });
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'pixels.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    importFromJson(event) {
        const file = event.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
    
                this.width = data.width;
                this.height = data.height;
                this.widthEl.value = this.width;
                this.heightEl.value = this.height;
    
                this.reset();
    
                const pixels = Array.from(this.container.querySelectorAll('.pixels'));
                data.pixels.forEach((pixelData, index) => {
                    if (pixels[index]) {
                        pixels[index].style.backgroundColor = pixelData.color || 'transparent';
                    }
                });
            } catch (error) {
                console.error('Error to import JSON:', error);
                alert('Invalid JSON file.');
            }
        };
    
        reader.readAsText(file);
    }
    
}

const pixelArtApp = new PixelArt('.paintboard', '.width', '.height', '.color', '.btn');

document.querySelector('.json button').addEventListener('click', () => pixelArtApp.exportToJson());
document.querySelector('#import-json').addEventListener('change', (event) => pixelArtApp.importFromJson(event));
