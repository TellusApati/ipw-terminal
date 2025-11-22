const lines = [
    "...",
    "5%"
]

const click = new Audio('sfx/click.mp3');
const standby = new Audio('sfx/standby.flac');
standby.volume = .7;

const renderKey = (content) => {
    let ps = content.querySelectorAll("p");

    ps.forEach(element => {
        element.innerHTML = " ";
    });


    let currentRotation = 1;
    let frames = 7;
    let cooldown = 700;
    let cooldownOffset = 0;
    let index = 0;

    let absoluteElement = document.createElement("div");
    absoluteElement.style.position = "absolute";
    absoluteElement.style.marginTop = "-930px";
    absoluteElement.style.marginLeft = "-8px";
    absoluteElement.style.fontFamily = "Pixel";
    content.append(absoluteElement);

    const rendering = () => {
        cooldownOffset = 0;
    // Render line
        const renderLine = (line, element) => {
            let symbol = line.charAt(index);
            if (symbol != " ") {
                click.currentTime = 0;
                click.play();
            }
            element.innerHTML += symbol;
            index++;
        }
    // Standby
        if (currentRotation == 1) {
            let input = ""
            if (frames%2 == 0) {
                input = "_";
                standby.currentTime = 0;
                standby.play();
            }
            ps[0].innerHTML = input;
            frames--;
            if (frames == 0) {
                currentRotation = 2;
                cooldown = 400;
            }
        }
    // Render first line
        else if (currentRotation == 2) {
            renderLine(lines[0], ps[0]);
            if (index == lines[0].length) {
                currentRotation = 3;
                index = 0;
                cooldownOffset = 700;
            }
        }
    // Render second line
        else if (currentRotation == 3) {
            if (ps[1].innerHTML == " ") {
                ps[1].innerHTML = "";
            }
            renderLine(lines[1], ps[1]);
            if (index == lines[1].length){
                currentRotation = 0;
                index = 0;
                cooldownOffset = 700;
            }
        }



    // Recursion
        if (currentRotation != 0) {
            setTimeout(()=>{rendering()}, cooldown + cooldownOffset);
        }

    }
    rendering();
}