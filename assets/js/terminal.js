const terminalBody = document.getElementsByClassName("terminal-body")[0];
let exitPressed = false;

function extraerContenidoEval(codigo) {
    var evalMatch = codigo.match(/eval\(([\s\S]+)\)/);
    if (evalMatch && evalMatch.length > 1) {
      return evalMatch[1];
    } else {
      return false;
    }
}

function createNewLine(randomNum) {
    new TypeIt("#command" + randomNum, {
        speed: 25,
        humanLike: true,
        afterComplete: function (instance) {
            instance.destroy();
            terminalBody.scrollTop = terminalBody.scrollHeight;
            const editableSpan = document.getElementById("editable" + randomNum);
            editableSpan.focus();
            enableTerminal(editableSpan);
        }
    }).type("<span contenteditable='false'>C:\\Users\\MixDev&gt;&nbsp;</span><span id='editable" + randomNum +"' contenteditable='true'>&zwnj;</span>").go();
}

function createNewNodeLine(randomNum) {
    new TypeIt("#commandNode" + randomNum, {
        speed: 25,
        humanLike: true,
        afterComplete: function (instance) {
            instance.destroy();
            terminalBody.scrollTop = terminalBody.scrollHeight;
            const editableSpan = document.getElementById("editable" + randomNum);
            editableSpan.focus();
            enableNodeTerminal(editableSpan);
        }
    }).type("<span contenteditable='false'>>&nbsp;</span><span id='editable" + randomNum +"' contenteditable='true'>&zwnj;</span>").go();
}

function enableNodeTerminal(span) {
    span.addEventListener('keydown', async (e) => {
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 67) {
            const randomNum = Math.floor(Math.random() * 1000);
            e.preventDefault();
            e.stopPropagation();

            // Crear un nuevo elemento div para contener el contenido
            var newDiv = document.createElement('div');

            // Construir el contenido que deseas agregar como una cadena de texto
            var content = '<p id="commandExec' + randomNum + '"></p>';

            // Asignar la cadena de texto como el innerHTML del nuevo div
            newDiv.innerHTML = content;

            // Agregar el nuevo div donde desees en tu documento, por ejemplo, después del span
            span.parentNode.insertBefore(newDiv, span.nextSibling);
            span.removeAttribute('contenteditable');

            if(!exitPressed) {
                new TypeIt(`#commandExec${randomNum}`, {
                    speed: 25,
                    humanLike: true,
                    afterComplete: function (instance) {
                        instance.destroy();
                        var pElement = document.createElement('p');
                        pElement.id = `commandNode${randomNum}`;
                        newDiv.appendChild(pElement);
                        createNewNodeLine(randomNum);
                    }
                }).type("To exit, press Ctrl+C again or type .exit").go();
                exitPressed = true;
            } else {
                new TypeIt(`#commandExec${randomNum}`, {
                    speed: 25,
                    humanLike: true,
                    afterComplete: function (instance) {
                        instance.destroy();
                        var pElement = document.createElement('p');
                        pElement.id = `command${randomNum}`;
                        newDiv.appendChild(pElement);
                        createNewLine(randomNum);
                    }
                }).go();
                exitPressed = false;
            }
        }
        if (e.key === 'Enter') {
            const randomNum = Math.floor(Math.random() * 1000);
            e.preventDefault();
            e.stopPropagation();
            const line = span.textContent.replace("‌", '');

            if(line.startsWith("eval")) {
                // Crear un nuevo elemento div para contener el contenido
                var newDiv = document.createElement('div');

                // Construir el contenido que deseas agregar como una cadena de texto
                var content = '<p id="commandExec' + randomNum + '"></p>';

                // Asignar la cadena de texto como el innerHTML del nuevo div
                newDiv.innerHTML = content;

                // Agregar el nuevo div donde desees en tu documento, por ejemplo, después del span
                span.parentNode.insertBefore(newDiv, span.nextSibling);
                span.removeAttribute('contenteditable');

                try {
                    new TypeIt(`#commandExec${randomNum}`, {
                        speed: 25,
                        humanLike: true,
                        afterComplete: function (instance) {
                            instance.destroy();
                            var pElement = document.createElement('p');
                            pElement.id = `commandNode${randomNum}`;
                            newDiv.appendChild(pElement);
                            createNewNodeLine(randomNum);
                        }
                    }).type(await eval(extraerContenidoEval(line))).go();
                } catch (error) {
                    new TypeIt(`#commandExec${randomNum}`, {
                        speed: 25,
                        humanLike: true,
                        afterComplete: function (instance) {
                            instance.destroy();
                            var pElement = document.createElement('p');
                            pElement.id = `commandNode${randomNum}`;
                            newDiv.appendChild(pElement);
                            createNewNodeLine(randomNum);
                        }
                    }).type(error).go();
                }
            } else if (line == ".exit") {
                // Crear un nuevo elemento div para contener el contenido
                var newDiv = document.createElement('div');

                // Construir el contenido que deseas agregar como una cadena de texto
                var content = '<p id="commandExec' + randomNum + '"></p>';

                // Asignar la cadena de texto como el innerHTML del nuevo div
                newDiv.innerHTML = content;

                // Agregar el nuevo div donde desees en tu documento, por ejemplo, después del span
                span.parentNode.insertBefore(newDiv, span.nextSibling);
                span.removeAttribute('contenteditable');
                new TypeIt(`#commandExec${randomNum}`, {
                    speed: 25,
                    humanLike: true,
                    afterComplete: function (instance) {
                        instance.destroy();
                        var pElement = document.createElement('p');
                        pElement.id = `command${randomNum}`;
                        newDiv.appendChild(pElement);
                        createNewLine(randomNum);
                    }
                }).go();
                exitPressed = false;
            }
        }
    })
}

function enableTerminal(span) {
    span.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            const line = span.textContent.replace("‌", '').split(' ');
            const command = line.shift();
            const randomNum = Math.floor(Math.random() * 1000);
            switch (command) {
                case 'fire':
                    // Crear un nuevo elemento div para contener el contenido
                    var newDiv = document.createElement('div');

                    // Construir el contenido que deseas agregar como una cadena de texto
                    var content = '<br><img src="https://fire.mixdev.online/' + line.join('%20') + '.gif" alt="Generated GIF" class="img-fluid"><br><p id="command' + randomNum + '"></p>';

                    // Asignar la cadena de texto como el innerHTML del nuevo div
                    newDiv.innerHTML = content;

                    // Agregar el nuevo div donde desees en tu documento, por ejemplo, después del span
                    span.parentNode.insertBefore(newDiv, span.nextSibling);
                    span.removeAttribute('contenteditable');
                    createNewLine(randomNum);
                    break;
                case 'help':
                    // Crear un nuevo elemento div para contener el contenido
                    var newDiv = document.createElement('div');

                    // Construir el contenido que deseas agregar como una cadena de texto
                    var content = '<p id="commandExec' + randomNum + '"></p>';

                    // Asignar la cadena de texto como el innerHTML del nuevo div
                    newDiv.innerHTML = content;

                    // Agregar el nuevo div donde desees en tu documento, por ejemplo, después del span
                    span.parentNode.insertBefore(newDiv, span.nextSibling);
                    span.removeAttribute('contenteditable');
                    new TypeIt(`#commandExec${randomNum}`, {
                        speed: 25,
                        humanLike: true,
                        afterComplete: function (instance) {
                            instance.destroy();
                            var pElement = document.createElement('p');
                            pElement.id = `command${randomNum}`;
                            newDiv.appendChild(pElement);
                            createNewLine(randomNum);
                        }
                    }).type("There's no salvation for you...").go();
                    break;
                case 'echo':
                    // Crear un nuevo elemento div para contener el contenido
                    var newDiv = document.createElement('div');

                    // Construir el contenido que deseas agregar como una cadena de texto
                    var content = '<p id="commandExec' + randomNum + '"></p>';

                    // Asignar la cadena de texto como el innerHTML del nuevo div
                    newDiv.innerHTML = content;

                    // Agregar el nuevo div donde desees en tu documento, por ejemplo, después del span
                    span.parentNode.insertBefore(newDiv, span.nextSibling);
                    span.removeAttribute('contenteditable');
                    new TypeIt(`#commandExec${randomNum}`, {
                        speed: 25,
                        humanLike: true,
                        afterComplete: function (instance) {
                            instance.destroy();
                            var pElement = document.createElement('p');
                            pElement.id = `command${randomNum}`;
                            newDiv.appendChild(pElement);
                            createNewLine(randomNum);
                        }
                    }).type(line.join(' ')).go();
                    break;
                case 'cls':
                    // Paso 1: Selecciona el span con el ID deseado
                    var spanID = document.getElementById("editable");

                    // Paso 2: Encuentra el contenedor del span
                    var contenedor = spanID.parentElement;

                    // Paso 3: Elimina todos los elementos que siguen al span dentro del contenedor
                    var elementosAEliminar = [];
                    var siguienteElemento = spanID.nextElementSibling;

                    while (siguienteElemento) {
                        elementosAEliminar.push(siguienteElemento);
                        siguienteElemento = siguienteElemento.nextElementSibling;
                    }

                    elementosAEliminar.forEach(function (elemento) {
                        contenedor.removeChild(elemento);
                    });

                    spanID.setAttribute('contenteditable', 'true');
                    spanID.textContent = "‌";
                    spanID.focus();
                    break;
                default:
                    break;
            }

            if(command === 'node') {
                if(line.length > 0) {
                    switch(line[0]) {
                        case 'changeTheme.js':
                            resetTheme();
                            // Crear un nuevo elemento div para contener el contenido
                            var newDiv = document.createElement('div');

                            // Construir el contenido que deseas agregar como una cadena de texto
                            var content = '<p id="commandExec' + randomNum + '"></p>';

                            // Asignar la cadena de texto como el innerHTML del nuevo div
                            newDiv.innerHTML = content;

                            // Agregar el nuevo div donde desees en tu documento, por ejemplo, después del span
                            span.parentNode.insertBefore(newDiv, span.nextSibling);
                            span.removeAttribute('contenteditable');
                            new TypeIt(`#commandExec${randomNum}`, {
                                speed: 25,
                                humanLike: true,
                                afterComplete: function (instance) {
                                    instance.destroy();
                                    var pElement = document.createElement('p');
                                    pElement.id = `command${randomNum}`;
                                    newDiv.appendChild(pElement);
                                    createNewLine(randomNum);
                                }
                            }).type(`${localStorage.getItem("theme") && localStorage.getItem("theme") === "light" ? "Light" : "Dark"} mode selected ;).`).go();
                            break;
                        default:
                            break;
                    }
                } else {
                    // Crear un nuevo elemento div para contener el contenido
                    var newDiv = document.createElement('div');

                    // Construir el contenido que deseas agregar como una cadena de texto
                    var content = '<p id="commandExec' + randomNum + '"></p>';

                    // Asignar la cadena de texto como el innerHTML del nuevo div
                    newDiv.innerHTML = content;

                    // Agregar el nuevo div donde desees en tu documento, por ejemplo, después del span
                    span.parentNode.insertBefore(newDiv, span.nextSibling);
                    span.removeAttribute('contenteditable');
                    new TypeIt(`#commandExec${randomNum}`, {
                        speed: 25,
                        humanLike: true,
                        afterComplete: function (instance) {
                            instance.destroy();
                            var pElement = document.createElement('p');
                            pElement.id = `commandNode${randomNum}`;
                            newDiv.appendChild(pElement);
                            createNewNodeLine(randomNum);
                        }
                    }).type("Welcome to Node.js.").break().type("Type 'help' for more information.").break().go();
                }
            }

            if(command === 'homura') {
                switch (line[0]) {
                    case 'iluminame':
                        const frases = [
                            "dt es la mejor forma de mejorar",
                            "si no tiene 13 no sirve",
                            "creeme con hdhr cuesta mucho un 6* ni te imaginas como duele un 9* xd",
                            "La consistencia se mejora con sightread"
                        ];
                        // Crear un nuevo elemento div para contener el contenido
                        var newDiv = document.createElement('div');
    
                        // Construir el contenido que deseas agregar como una cadena de texto
                        var content = '<p id="commandExec' + randomNum + '"></p>';
    
                        // Asignar la cadena de texto como el innerHTML del nuevo div
                        newDiv.innerHTML = content;
    
                        // Agregar el nuevo div donde desees en tu documento, por ejemplo, después del span
                        span.parentNode.insertBefore(newDiv, span.nextSibling);
                        span.removeAttribute('contenteditable');
                        new TypeIt(`#commandExec${randomNum}`, {
                            speed: 25,
                            humanLike: true,
                            afterComplete: function (instance) {
                                instance.destroy();
                                var pElement = document.createElement('p');
                                pElement.id = `command${randomNum}`;
                                newDiv.appendChild(pElement);
                                createNewLine(randomNum);
                            }
                        }).type(frases[Math.floor(Math.random() * frases.length)]).go();
                        break;
                    default:
                        break;
                }
            }
        }
    })
}