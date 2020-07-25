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
    for (let i = 0; i < inputText.length; i++) {
        animationStart(inputText[i], i)
    }
}

function animationStart(txt, l) {
    console.log(txt)
    var para = document.createElement("span"); // Create a <p> element
    para.innerText = txt; // Insert text
    para.id = "output" + Math.random()
    para.style.position = "absolute"

    mtop = 30 * l //spacing
    para.style.top = mtop + "px"
    document.body.appendChild(para);
    //console.log(para.offsetTop)
    //console.log(window.innerHeight)
    //console.log("mtop", mtop)

    offtop = mtop + (para.offsetHeight * l) + 60
        //console.log("offtop", offtop)

    var pos = 0 + mtop;
    var id = setInterval(frame, 5);
    let posY = 0
    var leftie = null
    var upup = null

    function frame() {
        if (pos >= window.innerHeight - para.offsetHeight) {
            clearInterval(id);

            console.log("posY: ", posY)
            pos = 0
            leftie = setInterval(goLeft, 5)
                //console.log("id: ", id)
                //console.log("leftie: ", leftie)


        } else {
            //console.log("top: ", para.offsetTop)
            pos++;
            para.style.top = pos + 'px';
        }
    }

    function goLeft() {
        if (para.offsetTop > window.innerHeight - para.offsetHeight)
            para.style.top = window.innerWidth - para.offsetWidth + "px"
        if (pos >= window.innerWidth - para.offsetWidth) {
            //console.log("pos: ", pos)
            //pos = window.innerWidth
            clearInterval(leftie)


            upup = setInterval(goUp, 5)

            //console.log("leftie: ", leftie)
            //console.log("up: ", upup)


        } else {
            //console.log("left: ", txt, para.offsetLeft)
            pos++
            para.style.left = pos + "px"
        }
    }


    function goUp() {
        posY = para.offsetTop
        if (para.offsetLeft > window.innerWidth - para.offsetWidth)
            para.style.left = window.innerWidth - para.offsetWidth + "px"
        if (posY <= para.offsetHeight) {
            console.log("Finished ", txt)
            clearInterval(upup)
            para.remove()
            if (isLooping())
                floatyText()
        } else {
            //console.log("top: ", txt, para.offsetTop)
            //console.log("posY: ", txt, posY)

            posY--
            para.style.top = posY + "px"
        }
    }
}