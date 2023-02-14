const json = '{"map":{"1":{"7":["21","22","12","11","2"],"77":["33","91","92","93","94"]},"2":{"11":["77","76","75","74","73"]},"3":{"22":["88","87","86","85","84"]},"4":{"33":["99","98","97","96","95"]},"5":{"44":["41","42","43","44","45"]}},"detail":{"zones":[{"id":"1","title":"Zone name 1","status":true,"state":null,"zone":null,"section":null},{"id":"2","title":"Zone name 2","status":true,"state":null,"zone":null,"section":null},{"id":"3","title":"Zone name 3","status":true,"state":null,"zone":null,"section":null},{"id":"4","title":"Zone name 4","status":true,"state":null,"zone":null,"section":null},{"id":"5","title":"Zone name 5","status":true,"state":null,"zone":null,"section":null}],"sections":[{"id":"7","title":"Section name 7","status":true,"state":null,"zone":"1","section":null},{"id":"77","title":"Section name 77","status":true,"state":null,"zone":"1","section":null},{"id":"11","title":"Section name 11","status":true,"state":null,"zone":"2","section":null},{"id":"22","title":"Section name 22","status":true,"state":null,"zone":"3","section":null},{"id":"33","title":"Section name 33","status":true,"state":null,"zone":"4","section":null},{"id":"44","title":"Section name 44","status":true,"state":null,"zone":"5","section":null}],"punktirs":[{"id":"21","title":"Punktir name 21","status":true,"state":true,"zone":"1","section":"7"},{"id":"22","title":"Punktir name 22","status":true,"state":true,"zone":"1","section":"7"},{"id":"12","title":"Punktir name 12","status":true,"state":true,"zone":"1","section":"7"},{"id":"11","title":"Punktir name 11","status":true,"state":true,"zone":"1","section":"7"},{"id":"2","title":"Punktir name 2","status":true,"state":true,"zone":"1","section":"7"},{"id":"33","title":"Punktir name 33","status":true,"state":true,"zone":"1","section":"77"},{"id":"91","title":"Punktir name 91","status":true,"state":true,"zone":"1","section":"77"},{"id":"92","title":"Punktir name 92","status":true,"state":true,"zone":"1","section":"77"},{"id":"93","title":"Punktir name 93","status":true,"state":true,"zone":"1","section":"77"},{"id":"94","title":"Punktir name 94","status":true,"state":true,"zone":"1","section":"77"},{"id":"77","title":"Punktir name 77","status":true,"state":true,"zone":"2","section":"11"},{"id":"76","title":"Punktir name 76","status":true,"state":true,"zone":"2","section":"11"},{"id":"75","title":"Punktir name 75","status":true,"state":true,"zone":"2","section":"11"},{"id":"74","title":"Punktir name 74","status":true,"state":true,"zone":"2","section":"11"},{"id":"73","title":"Punktir name 73","status":true,"state":true,"zone":"2","section":"11"},{"id":"88","title":"Punktir name 88","status":true,"state":true,"zone":"3","section":"22"},{"id":"87","title":"Punktir name 87","status":true,"state":true,"zone":"3","section":"22"},{"id":"86","title":"Punktir name 86","status":true,"state":true,"zone":"3","section":"22"},{"id":"85","title":"Punktir name 85","status":true,"state":true,"zone":"3","section":"22"},{"id":"84","title":"Punktir name 84","status":true,"state":true,"zone":"3","section":"22"},{"id":"99","title":"Punktir name 99","status":true,"state":true,"zone":"4","section":"33"},{"id":"98","title":"Punktir name 98","status":true,"state":true,"zone":"4","section":"33"},{"id":"97","title":"Punktir name 97","status":true,"state":true,"zone":"4","section":"33"},{"id":"96","title":"Punktir name 96","status":true,"state":true,"zone":"4","section":"33"},{"id":"95","title":"Punktir name 95","status":true,"state":true,"zone":"4","section":"33"},{"id":"41","title":"Punktir name 41","status":true,"state":true,"zone":"5","section":"44"},{"id":"42","title":"Punktir name 42","status":true,"state":true,"zone":"5","section":"44"},{"id":"43","title":"Punktir name 43","status":true,"state":true,"zone":"5","section":"44"},{"id":"44","title":"Punktir name 44","status":true,"state":true,"zone":"5","section":"44"},{"id":"45","title":"Punktir name 45","status":true,"state":true,"zone":"5","section":"44"}]}}';
data = JSON.parse(json);
let detail = data.detail;

document.addEventListener("DOMContentLoaded", function(event) {

    let block = document.querySelector('#container');
    for (const zone of detail.zones) {
        let div_zone = creatDiv(zone, 'zone');
        block.appendChild(div_zone);
        for (const section of detail.sections){
            if(section.zone === zone.id){
                var div_section = creatDiv(section, 'section')
                div_zone.appendChild(div_section);
            }
            for (const punktir of detail.punktirs) {
                if(punktir.section === section.id){
                    div_section.appendChild(creatDiv(punktir, 'punktir'));
                }
            }
        }
    }
    let divs = block.querySelectorAll('div');
    for (const div of divs) {
        if(div.className !== 'head'){
            div.appendChild(addCheckbox(div));
        }
    }

    block.addEventListener('click', (e) => {
        trigger(e);

        closeOrOpenDiv(block, e);
        for (let i = 0; i < block.children.length; i++) {
            closeOrOpenDiv(block.children[i], e);
        }
    })

});

function trigger(e){
    if(e.target.className === "checkbox" && e.target.parentElement.className === "zone" || e.target.parentElement.className === "section"){
        if(e.target.checked === true){
            switchCheckbox(e, true)
        }else if (e.target.checked === false){
            switchCheckbox(e, false)
        }
    }

    if(e.target.className === "checkbox" && e.target.checked === true && e.target.parentElement.className === "punktir"){
        let checkbox = e.target.parentElement.parentElement.lastChild;


        checkbox.checked = true;
        checkbox = e.target.parentElement.parentElement.parentElement.lastChild;
        checkbox.checked = true;
    }

    if(e.target.className === "checkbox" && e.target.checked === true && e.target.parentElement.className === "section"){
        let checkbox = e.target.parentElement.parentElement.lastChild;
        checkbox.checked = true;
    }
}
function closeOrOpenDiv(div, e){
    const blockChildren = div.children;
    for (let i = 0; i < blockChildren.length; i++) {
        if(blockChildren[i].id === e.target.id && e.target.type !== "checkbox"){
            const zoneChildren = blockChildren[i].children;

            for (let i = 0; i < zoneChildren.length; i++){
                if(zoneChildren[i].style.display === 'none') {
                    zoneChildren[i].style.display = 'block';
                }else if(zoneChildren[i].tagName !== 'INPUT'){
                    zoneChildren[i].style.display = 'none';
                }
            }
        }
    }
}
function switchCheckbox(e, flag){
    for (let i = 0; i < e.target.parentElement.children.length; i++) {
        if(e.target.parentElement.children[i].className === "section")/*tyt*/{
            let children = e.target.parentElement.children[i];
            if(e.target.parentElement.children[i].lastChild.className === "checkbox"){
                e.target.parentElement.children[i].lastChild.checked = flag;
            }
            for (let i = 0; i < children.children.length; i++) {
                if(children.children[i].lastChild && children.children[i].lastChild.type === "checkbox"){
                    children.children[i].lastChild.checked = flag;
                }
            }
        }else{
            if(e.target.parentElement.children[i].lastChild && e.target.parentElement.children[i].lastChild.className === "checkbox"){
                e.target.parentElement.children[i].lastChild.checked = flag;
            }
        }
    }
}
function creatDiv(obj, str){
    let div = document.createElement('div');
    div.innerHTML = '[' + obj.id + '] ' + obj.title;
    div.className = str;
    if(str !== "zone"){
        div.style.display = "none";
    }
    div.id = obj.id;
    return div;
}

function addCheckbox(div){
    let check = document.createElement("input");
    check.id = div.id;
    check.className = 'checkbox';
    check.type = "checkbox";
    check.checked = true;
    return check;
}
