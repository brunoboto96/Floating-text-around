$(function() {
    let btn = document.getElementById("go")
    $("#loopToggle").change(function() {
        console.log("changed")
        if (isLooping()) {
            btn.classList.add("disabled")
        } else {
            btn.classList.remove("disabled")
        }
    })
})

function isLooping() {
    return $("#loopToggle").prop('checked')
}

function floatyText() {
    isLooping()
    var inputText = document.getElementById("textBox").value;
    console.log(inputText)
    let x = 0
    for (let i = inputText.length - 1; i >= 0; i--) {
        animationStart(inputText[i], x, 0)
        x++
    }
}

function animationStart(txt, l, total) {
    var speed = 5
    var w = null
    var id = null
    var pos = 0;
    var para = document.createElement("span"); // Create a <span> element
    let marginUp = 10
    let posY = 0
    var leftie = null
    var upup = null
    let wc = 0 //waiting counter

    para.innerText = txt; // Insert text
    para.id = "output" + Math.random()
    para.style.position = "absolute"
    para.style.top = "0px"
    document.body.appendChild(para);
    console.log(txt, l, total)

    if (total == 0)
        w = setInterval(waiting, speed)
    else {
        id = setInterval(frame, speed);
    }

    function waiting() {
        let queue = (l + 1) * (para.offsetHeight + marginUp)
        if (queue <= wc) {
            console.log("go: ", txt)
            clearInterval(w)
            w = null
            id = setInterval(frame, speed);
        } else {
            wc++
        }
    }

    function frame() {
        if (pos >= window.innerHeight - para.offsetHeight) {
            clearInterval(id);
            id = null
            pos = 0
            leftie = setInterval(goLeft, speed)
        } else {
            pos++;
            para.style.top = pos + 'px';
        }
    }

    function goLeft() {
        if (pos >= window.innerWidth - para.offsetWidth) {
            clearInterval(leftie)
            leftie = null
            upup = setInterval(goUp, speed)
        } else {
            pos++
            para.style.left = pos + "px"
        }
    }


    function goUp() {
        posY = para.offsetTop
        if (posY <= para.offsetHeight) {
            console.log("Finished ", txt)
            clearInterval(upup)
            upup = null
            para.remove()
            if (isLooping()) {
                animationStart(txt, l, 1)
            } else {}
        } else {
            posY--
            para.style.top = posY + "px"
        }
    }
}