// Elementos do DOM
const welcomeScreen = document.getElementById('welcome-screen');
const mainMenu = document.getElementById('main-menu');
const level1Screen = document.getElementById('level1-screen');
const level2Screen = document.getElementById('level2-screen');
const level3Screen = document.getElementById('level3-screen');
const level4Screen = document.getElementById('level4-screen');
const startBtn = document.getElementById('start-btn');
const level1Btn = document.getElementById('level1-btn');
const level2Btn = document.getElementById('level2-btn');
const level3Btn = document.getElementById('level3-btn');
const level4Btn = document.getElementById('level4-btn');
const backToMenuBtn = document.getElementById('back-to-menu');
const checkAnswerBtn = document.getElementById('check-answer-btn');
const nextChallengeBtn = document.getElementById('next-challenge-btn');
const feedbackContainer = document.getElementById('feedback');
const feedbackText = document.getElementById('feedback-text');
const currentChallengeText = document.getElementById('current-challenge-text');
const elementsContainer = document.getElementById('elements-container');
const vennDiagram = document.getElementById('venn-diagram');
const setA = document.getElementById('set-a');
const setB = document.getElementById('set-b');
const intersection = document.getElementById('intersection');
const backBtns = document.querySelectorAll('.back-to-menu');

// Elementos da Fase 2: Caverna das Relações
const relationDefinition = document.getElementById('relation-definition');
const relationVisual = document.getElementById('relation-visual');
const checkRelationBtn = document.getElementById('check-relation-btn');
const nextRelationBtn = document.getElementById('next-relation-btn');
const relationFeedback = document.getElementById('relation-feedback');
const relationFeedbackText = document.getElementById('relation-feedback-text');
const relationChallengeText = document.getElementById('relation-challenge-text');
const reflexiveCheckbox = document.getElementById('reflexive');
const symmetricCheckbox = document.getElementById('symmetric');
const transitiveCheckbox = document.getElementById('transitive');
const equivalenceCheckbox = document.getElementById('equivalence');

// Elementos da Fase 3: Torre das Funções
const functionDefinition = document.getElementById('function-definition');
const functionVisual = document.getElementById('function-visual');
const checkFunctionBtn = document.getElementById('check-function-btn');
const nextFunctionBtn = document.getElementById('next-function-btn');
const functionFeedback = document.getElementById('function-feedback');
const functionFeedbackText = document.getElementById('function-feedback-text');
const functionChallengeText = document.getElementById('function-challenge-text');
const injectiveCheckbox = document.getElementById('injective');
const surjectiveCheckbox = document.getElementById('surjective');
const bijectiveCheckbox = document.getElementById('bijective');

// Elementos da Fase 4: Vale das Sequências
const sequenceTerms = document.getElementById('sequence-terms');
const checkSequenceBtn = document.getElementById('check-sequence-btn');
const nextSequenceBtn = document.getElementById('next-sequence-btn');
const sequenceFeedback = document.getElementById('sequence-feedback');
const sequenceFeedbackText = document.getElementById('sequence-feedback-text');
const sequenceChallengeText = document.getElementById('sequence-challenge-text');
const paRadio = document.getElementById('pa');
const pgRadio = document.getElementById('pg');
const term1Input = document.getElementById('term1');
const term2Input = document.getElementById('term2');
const term3Input = document.getElementById('term3');

// Estado do jogo
let currentChallenge = 0;
let draggedElement = null;
let currentRelationChallenge = 0;
let currentFunctionChallenge = 0;
let currentSequenceChallenge = 0;

// Desafios da Fase 1 - Templo dos Conjuntos
const challenges = [
    {
        instruction: 'Classifique os números em conjuntos A (pares) e B (múltiplos de 3)',
        elements: [2, 3, 4, 6, 7, 9, 10, 12, 15, 18],
        setA: { name: 'pares', check: num => num % 2 === 0 },
        setB: { name: 'múltiplos de 3', check: num => num % 3 === 0 }
    },
    {
        instruction: 'Classifique os números em conjuntos A (primos) e B (maiores que 10)',
        elements: [2, 3, 5, 7, 11, 12, 13, 15, 17, 20],
        setA: { name: 'primos', check: num => isPrime(num) },
        setB: { name: 'maiores que 10', check: num => num > 10 }
    },
    {
        instruction: 'Classifique os números em conjuntos A (quadrados perfeitos) e B (ímpares)',
        elements: [1, 4, 5, 9, 10, 11, 15, 16, 25, 36],
        setA: { name: 'quadrados perfeitos', check: num => Math.sqrt(num) % 1 === 0 },
        setB: { name: 'ímpares', check: num => num % 2 !== 0 }
    }
];

// Função auxiliar para verificar se um número é primo
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    let i = 5;
    while (i * i <= num) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
        i += 6;
    }
    return true;
}

// Eventos
document.addEventListener('DOMContentLoaded', initGame);

// Função de inicialização do jogo
function initGame() {
    // Adicionar event listeners para os botões de navegação
    startBtn.addEventListener('click', showMainMenu);
    level1Btn.addEventListener('click', showLevel1);
    level2Btn.addEventListener('click', showLevel2);
    level3Btn.addEventListener('click', showLevel3);
    level4Btn.addEventListener('click', showLevel4);
    backToMenuBtn.addEventListener('click', showMainMenu);
    backBtns.forEach(btn => btn.addEventListener('click', showMainMenu));
    
    // Adicionar event listeners para os botões de controle do jogo
    checkAnswerBtn.addEventListener('click', checkAnswer);
    nextChallengeBtn.addEventListener('click', loadNextChallenge);
    
    // Adicionar event listeners para os botões de controle da Fase 2
    checkRelationBtn.addEventListener('click', checkRelationAnswer);
    nextRelationBtn.addEventListener('click', loadNextRelationChallenge);
    
    // Adicionar event listeners para os botões de controle da Fase 3
    checkFunctionBtn.addEventListener('click', checkFunctionAnswer);
    nextFunctionBtn.addEventListener('click', loadNextFunctionChallenge);
    
    // Adicionar event listeners para os botões de controle da Fase 4
    checkSequenceBtn.addEventListener('click', checkSequenceAnswer);
    nextSequenceBtn.addEventListener('click', loadNextSequenceChallenge);
    
    // Inicializar o primeiro desafio
    initDragAndDrop();
}

// Funções de navegação
function showMainMenu() {
    hideAllScreens();
    mainMenu.classList.remove('hidden');
}

function showLevel1() {
    hideAllScreens();
    level1Screen.classList.remove('hidden');
    loadChallenge(currentChallenge);
}

function showLevel2() {
    hideAllScreens();
    level2Screen.classList.remove('hidden');
    loadRelationChallenge(currentRelationChallenge);
}

function showLevel3() {
    hideAllScreens();
    level3Screen.classList.remove('hidden');
    loadFunctionChallenge(currentFunctionChallenge);
}

function showLevel4() {
    hideAllScreens();
    level4Screen.classList.remove('hidden');
    loadSequenceChallenge(currentSequenceChallenge);
}

function hideAllScreens() {
    welcomeScreen.classList.add('hidden');
    mainMenu.classList.add('hidden');
    level1Screen.classList.add('hidden');
    level2Screen.classList.add('hidden');
    level3Screen.classList.add('hidden');
    level4Screen.classList.add('hidden');
}

// Carrega um desafio específico
function loadChallenge(challengeIndex) {
    if (challengeIndex >= challenges.length) {
        // Todos os desafios foram concluídos
        alert('Parabéns! Você completou todos os desafios do Templo dos Conjuntos!');
        showMainMenu();
        return;
    }
    
    const challenge = challenges[challengeIndex];
    currentChallengeText.textContent = `Desafio: ${challenge.instruction}`;
    
    // Limpar elementos anteriores
    elementsContainer.innerHTML = '';
    
    // Limpar elementos dentro dos conjuntos
    Array.from(document.querySelectorAll('.set .draggable-element')).forEach(el => el.remove());
    
    // Adicionar novos elementos
    challenge.elements.forEach(num => {
        const element = document.createElement('div');
        element.className = 'draggable-element';
        element.textContent = num;
        element.setAttribute('data-value', num);
        element.draggable = true;
        elementsContainer.appendChild(element);
    });
    
    // Resetar feedback
    feedbackContainer.classList.add('hidden');
    nextChallengeBtn.classList.add('hidden');
}

// Inicializa o sistema de drag and drop
function initDragAndDrop() {
    // Event delegation para os elementos arrastáveis
    document.addEventListener('dragstart', e => {
        if (e.target.classList.contains('draggable-element')) {
            draggedElement = e.target;
            setTimeout(() => {
                e.target.style.opacity = '0.4';
            }, 0);
        }
    });
    
    document.addEventListener('dragend', e => {
        if (e.target.classList.contains('draggable-element')) {
            e.target.style.opacity = '1';
        }
    });
    
    // Conjuntos alvo
    setA.addEventListener('dragover', e => {
        e.preventDefault();
        setA.classList.add('drag-over');
    });
    
    setB.addEventListener('dragover', e => {
        e.preventDefault();
        setB.classList.add('drag-over');
    });
    
    intersection.addEventListener('dragover', e => {
        e.preventDefault();
        intersection.classList.add('drag-over');
    });
    
    elementsContainer.addEventListener('dragover', e => {
        e.preventDefault();
    });
    
    // Remover highlight quando o mouse sai
    setA.addEventListener('dragleave', () => setA.classList.remove('drag-over'));
    setB.addEventListener('dragleave', () => setB.classList.remove('drag-over'));
    intersection.addEventListener('dragleave', () => intersection.classList.remove('drag-over'));
    
    // Eventos de drop
    setA.addEventListener('drop', e => {
        handleDrop(e, 'set-a');
        setA.classList.remove('drag-over');
    });
    
    setB.addEventListener('drop', e => {
        handleDrop(e, 'set-b');
        setB.classList.remove('drag-over');
    });
    
    intersection.addEventListener('drop', e => {
        handleDrop(e, 'intersection');
        intersection.classList.remove('drag-over');
    });
    
    elementsContainer.addEventListener('drop', e => handleDrop(e, 'elements-container'));
}

// Função que substitui allowDrop e drop
function handleDrop(e, targetId) {
    e.preventDefault();
    
    if (!draggedElement) return;
    
    // Move o elemento para o alvo
    if (targetId === 'elements-container') {
        elementsContainer.appendChild(draggedElement);
    } else {
        document.getElementById(targetId).appendChild(draggedElement);
    }
    
    // Atualiza o atributo de dados para marcar a posição atual
    draggedElement.setAttribute('data-position', targetId);
    
    // Adiciona uma classe visual que indica onde o elemento está
    draggedElement.className = 'draggable-element';
    if (targetId === 'set-a') {
        draggedElement.classList.add('in-set-a');
    } else if (targetId === 'set-b') {
        draggedElement.classList.add('in-set-b');
    } else if (targetId === 'intersection') {
        draggedElement.classList.add('in-intersection');
    }
    
    draggedElement = null;
}

// Verifica a resposta do usuário
function checkAnswer() {
    const challenge = challenges[currentChallenge];
    let isCorrect = true;
    
    // Obter todos os elementos dentro dos conjuntos
    const elementsInSetA = Array.from(setA.querySelectorAll('.draggable-element')).map(el => parseInt(el.getAttribute('data-value')));
    const elementsInSetB = Array.from(setB.querySelectorAll('.draggable-element')).map(el => parseInt(el.getAttribute('data-value')));
    const elementsInIntersection = Array.from(intersection.querySelectorAll('.draggable-element')).map(el => parseInt(el.getAttribute('data-value')));
    const elementsNotPlaced = Array.from(elementsContainer.querySelectorAll('.draggable-element')).map(el => parseInt(el.getAttribute('data-value')));
    
    // Verificar se todos os elementos estão posicionados corretamente
    challenge.elements.forEach(num => {
        const belongsToA = challenge.setA.check(num);
        const belongsToB = challenge.setB.check(num);
        
        if (belongsToA && belongsToB) {
            // Deve estar na interseção
            if (!elementsInIntersection.includes(num)) {
                isCorrect = false;
                highlightIncorrectElement(num);
            }
        } else if (belongsToA) {
            // Deve estar apenas no conjunto A
            if (!elementsInSetA.includes(num)) {
                isCorrect = false;
                highlightIncorrectElement(num);
            }
        } else if (belongsToB) {
            // Deve estar apenas no conjunto B
            if (!elementsInSetB.includes(num)) {
                isCorrect = false;
                highlightIncorrectElement(num);
            }
        } else {
            // Não deve estar em nenhum conjunto
            if (!elementsNotPlaced.includes(num)) {
                isCorrect = false;
                highlightIncorrectElement(num);
            }
        }
    });
    
    // Exibir feedback
    feedbackContainer.classList.remove('hidden');
    
    if (isCorrect) {
        feedbackContainer.className = 'success';
        feedbackText.textContent = 'Parabéns! Você classificou corretamente todos os elementos!';
        nextChallengeBtn.classList.remove('hidden');
    } else {
        feedbackContainer.className = 'error';
        feedbackText.textContent = 'Ops! Parece que alguns elementos estão no lugar errado. Tente novamente!';
        
        // Exibir dica
        const setAName = challenge.setA.name;
        const setBName = challenge.setB.name;
        feedbackText.textContent += ` Lembre-se: conjunto A = ${setAName}, conjunto B = ${setBName}, e a interseção (A ∩ B) são elementos que pertencem aos dois conjuntos simultaneamente.`;
    }
}

// Função para destacar elementos incorretos
function highlightIncorrectElement(value) {
    const elements = document.querySelectorAll(`.draggable-element[data-value="${value}"]`);
    elements.forEach(el => {
        el.classList.add('incorrect');
        // Remover a classe após 2 segundos
        setTimeout(() => el.classList.remove('incorrect'), 2000);
    });
}

// Carrega o próximo desafio
function loadNextChallenge() {
    currentChallenge++;
    loadChallenge(currentChallenge);
}

// =================================================
// FASE 2: CAVERNA DAS RELAÇÕES
// =================================================

// Desafios da Fase 2 - Caverna das Relações
const relationChallenges = [
    {
        set: [1, 2, 3, 4],
        relation: [[1, 1], [2, 2], [3, 3], [4, 4], [1, 2], [2, 1], [2, 3], [3, 2]],
        properties: {
            reflexive: true,
            symmetric: true,
            transitive: false,
            equivalence: false
        },
        description: "Relação R no conjunto A = {1, 2, 3, 4} definida por xRy se e somente se |x-y| ≤ 1"
    },
    {
        set: [1, 2, 3, 4, 5],
        relation: [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [1, 3], [3, 1], [2, 4], [4, 2], [3, 5], [5, 3]],
        properties: {
            reflexive: true,
            symmetric: true,
            transitive: false,
            equivalence: false
        },
        description: "Relação R no conjunto A = {1, 2, 3, 4, 5} definida por xRy se e somente se x e y têm a mesma paridade ou |x-y| = 2"
    },
    {
        set: [1, 2, 3, 4],
        relation: [[1, 1], [2, 2], [3, 3], [4, 4], [1, 2], [2, 3], [3, 4], [1, 3], [2, 4], [1, 4]],
        properties: {
            reflexive: true,
            symmetric: false,
            transitive: true,
            equivalence: false
        },
        description: "Relação R no conjunto A = {1, 2, 3, 4} definida por xRy se e somente se x ≤ y"
    },
    {
        set: [1, 2, 3, 4, 5, 6],
        relation: [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [1, 4], [4, 1], [2, 5], [5, 2], [3, 6], [6, 3]],
        properties: {
            reflexive: true,
            symmetric: true,
            transitive: true,
            equivalence: true
        },
        description: "Relação R no conjunto A = {1, 2, 3, 4, 5, 6} definida por xRy se e somente se x ≡ y (mod 3)"
    }
];

// Carrega um desafio específico da Fase 2
function loadRelationChallenge(challengeIndex) {
    if (challengeIndex >= relationChallenges.length) {
        // Todos os desafios foram concluídos
        alert('Parabéns! Você completou todos os desafios da Caverna das Relações!');
        showMainMenu();
        return;
    }
    
    const challenge = relationChallenges[challengeIndex];
    relationChallengeText.textContent = `Desafio: Identifique as propriedades da relação.`;
    relationDefinition.textContent = challenge.description;
    
    // Limpar elementos anteriores
    relationVisual.innerHTML = '';
    
    // Adicionar representação visual da relação
    challenge.relation.forEach(pair => {
        const pairElement = document.createElement('div');
        pairElement.className = 'relation-pair';
        pairElement.innerHTML = `<span>(${pair[0]}, ${pair[1]})</span>`;
        relationVisual.appendChild(pairElement);
    });
    
    // Resetar checkboxes
    reflexiveCheckbox.checked = false;
    symmetricCheckbox.checked = false;
    transitiveCheckbox.checked = false;
    equivalenceCheckbox.checked = false;
    
    // Resetar feedback
    relationFeedback.classList.add('hidden');
    nextRelationBtn.classList.add('hidden');
}

// Verifica a resposta do usuário para a Fase 2
function checkRelationAnswer() {
    const challenge = relationChallenges[currentRelationChallenge];
    
    // Verificar as respostas
    const reflexiveCorrect = reflexiveCheckbox.checked === challenge.properties.reflexive;
    const symmetricCorrect = symmetricCheckbox.checked === challenge.properties.symmetric;
    const transitiveCorrect = transitiveCheckbox.checked === challenge.properties.transitive;
    const equivalenceCorrect = equivalenceCheckbox.checked === challenge.properties.equivalence;
    
    const allCorrect = reflexiveCorrect && symmetricCorrect && transitiveCorrect && equivalenceCorrect;
    
    // Exibir feedback
    relationFeedback.classList.remove('hidden');
    
    if (allCorrect) {
        relationFeedback.className = 'feedback success';
        relationFeedbackText.textContent = 'Parabéns! Você identificou corretamente todas as propriedades da relação!';
        nextRelationBtn.classList.remove('hidden');
    } else {
        relationFeedback.className = 'feedback error';
        relationFeedbackText.textContent = 'Ops! Algumas propriedades estão incorretas. Revise os conceitos e tente novamente!';
        
        // Dicas específicas para cada propriedade
        if (!reflexiveCorrect) {
            relationFeedbackText.textContent += '\n- Uma relação é reflexiva se todo elemento está relacionado consigo mesmo (∀a ∈ A, aRa).';
        }
        if (!symmetricCorrect) {
            relationFeedbackText.textContent += '\n- Uma relação é simétrica se quando aRb, então bRa (∀a,b ∈ A, aRb → bRa).';
        }
        if (!transitiveCorrect) {
            relationFeedbackText.textContent += '\n- Uma relação é transitiva se quando aRb e bRc, então aRc (∀a,b,c ∈ A, aRb ∧ bRc → aRc).';
        }
        if (!equivalenceCorrect) {
            relationFeedbackText.textContent += '\n- Uma relação de equivalência é reflexiva, simétrica e transitiva.';
        }
    }
}

// Carrega o próximo desafio da Fase 2
function loadNextRelationChallenge() {
    currentRelationChallenge++;
    loadRelationChallenge(currentRelationChallenge);
}

// =================================================
// FASE 3: TORRE DAS FUNÇÕES
// =================================================

// Desafios da Fase 3 - Torre das Funções
const functionChallenges = [
    {
        domain: [1, 2, 3],
        codomain: ['a', 'b', 'c', 'd'],
        mapping: [[1, 'a'], [2, 'b'], [3, 'c']],
        properties: {
            injective: true,
            surjective: false,
            bijective: false
        },
        definition: "f: A → B, onde A = {1, 2, 3} e B = {a, b, c, d}. f(1) = a, f(2) = b, f(3) = c"
    },
    {
        domain: [1, 2, 3, 4],
        codomain: ['a', 'b'],
        mapping: [[1, 'a'], [2, 'b'], [3, 'a'], [4, 'b']],
        properties: {
            injective: false,
            surjective: true,
            bijective: false
        },
        definition: "f: A → B, onde A = {1, 2, 3, 4} e B = {a, b}. f(1) = a, f(2) = b, f(3) = a, f(4) = b"
    },
    {
        domain: [1, 2, 3],
        codomain: ['a', 'b', 'c'],
        mapping: [[1, 'a'], [2, 'b'], [3, 'c']],
        properties: {
            injective: true,
            surjective: true,
            bijective: true
        },
        definition: "f: A → B, onde A = {1, 2, 3} e B = {a, b, c}. f(1) = a, f(2) = b, f(3) = c"
    },
    {
        domain: [1, 2, 3, 4],
        codomain: ['a', 'b', 'c'],
        mapping: [[1, 'a'], [2, 'a'], [3, 'b'], [4, 'c']],
        properties: {
            injective: false,
            surjective: true,
            bijective: false
        },
        definition: "f: A → B, onde A = {1, 2, 3, 4} e B = {a, b, c}. f(1) = a, f(2) = a, f(3) = b, f(4) = c"
    }
];

// Carrega um desafio específico da Fase 3
function loadFunctionChallenge(challengeIndex) {
    if (challengeIndex >= functionChallenges.length) {
        // Todos os desafios foram concluídos
        alert('Parabéns! Você completou todos os desafios da Torre das Funções!');
        showMainMenu();
        return;
    }
    
    const challenge = functionChallenges[challengeIndex];
    functionChallengeText.textContent = `Desafio: Identifique as propriedades da função.`;
    functionDefinition.textContent = challenge.definition;
    
    // Limpar elementos anteriores
    functionVisual.innerHTML = '';
    
    // Criar a visualização da função
    const domainContainer = document.createElement('div');
    domainContainer.className = 'domain';
    domainContainer.innerHTML = '<div class="domain-title">Domínio A</div>';
    
    const arrowsContainer = document.createElement('div');
    arrowsContainer.className = 'function-arrows';
    
    const codomainContainer = document.createElement('div');
    codomainContainer.className = 'codomain';
    codomainContainer.innerHTML = '<div class="codomain-title">Contradomínio B</div>';
    
    // Adicionar elementos do domínio
    challenge.domain.forEach(item => {
        const element = document.createElement('div');
        element.className = 'element';
        element.textContent = item;
        domainContainer.appendChild(element);
    });
    
    // Adicionar elementos do contradomínio
    challenge.codomain.forEach(item => {
        const element = document.createElement('div');
        element.className = 'element';
        element.textContent = item;
        codomainContainer.appendChild(element);
    });
    
    // Adicionar setas
    challenge.mapping.forEach((pair, index) => {
        const arrow = document.createElement('div');
        arrow.className = 'arrow';
        arrow.setAttribute('data-from', pair[0]);
        arrow.setAttribute('data-to', pair[1]);
        arrowsContainer.appendChild(arrow);
    });
    
    functionVisual.appendChild(domainContainer);
    functionVisual.appendChild(arrowsContainer);
    functionVisual.appendChild(codomainContainer);
    
    // Resetar checkboxes
    injectiveCheckbox.checked = false;
    surjectiveCheckbox.checked = false;
    bijectiveCheckbox.checked = false;
    
    // Resetar feedback
    functionFeedback.classList.add('hidden');
    nextFunctionBtn.classList.add('hidden');
}

// Verifica a resposta do usuário para a Fase 3
function checkFunctionAnswer() {
    const challenge = functionChallenges[currentFunctionChallenge];
    
    // Verificar as respostas
    const injectiveCorrect = injectiveCheckbox.checked === challenge.properties.injective;
    const surjectiveCorrect = surjectiveCheckbox.checked === challenge.properties.surjective;
    const bijectiveCorrect = bijectiveCheckbox.checked === challenge.properties.bijective;
    
    const allCorrect = injectiveCorrect && surjectiveCorrect && bijectiveCorrect;
    
    // Exibir feedback
    functionFeedback.classList.remove('hidden');
    
    if (allCorrect) {
        functionFeedback.className = 'feedback success';
        functionFeedbackText.textContent = 'Parabéns! Você identificou corretamente todas as propriedades da função!';
        nextFunctionBtn.classList.remove('hidden');
    } else {
        functionFeedback.className = 'feedback error';
        functionFeedbackText.textContent = 'Ops! Algumas propriedades estão incorretas. Revise os conceitos e tente novamente!';
        
        // Dicas específicas para cada propriedade
        if (!injectiveCorrect) {
            functionFeedbackText.textContent += '\n- Uma função é injetora (injetiva) quando elementos diferentes do domínio têm imagens diferentes no contradomínio.';
        }
        if (!surjectiveCorrect) {
            functionFeedbackText.textContent += '\n- Uma função é sobrejetora (sobrejetiva) quando todo elemento do contradomínio é imagem de pelo menos um elemento do domínio.';
        }
        if (!bijectiveCorrect) {
            functionFeedbackText.textContent += '\n- Uma função é bijetora (bijetiva) quando é simultaneamente injetora e sobrejetora.';
        }
    }
}

// Carrega o próximo desafio da Fase 3
function loadNextFunctionChallenge() {
    currentFunctionChallenge++;
    loadFunctionChallenge(currentFunctionChallenge);
}

// =================================================
// FASE 4: VALE DAS SEQUÊNCIAS
// =================================================

// Desafios da Fase 4 - Vale das Sequências
const sequenceChallenges = [
    {
        terms: [2, 5, 8, 11, 14],
        type: 'pa',
        nextTerms: [17, 20, 23],
        razao: 3,
        description: "Sequência: 2, 5, 8, 11, 14, ..."
    },
    {
        terms: [3, 6, 12, 24, 48],
        type: 'pg',
        nextTerms: [96, 192, 384],
        razao: 2,
        description: "Sequência: 3, 6, 12, 24, 48, ..."
    },
    {
        terms: [4, 1, -2, -5, -8],
        type: 'pa',
        nextTerms: [-11, -14, -17],
        razao: -3,
        description: "Sequência: 4, 1, -2, -5, -8, ..."
    },
    {
        terms: [2, 4, 8, 16, 32],
        type: 'pg',
        nextTerms: [64, 128, 256],
        razao: 2,
        description: "Sequência: 2, 4, 8, 16, 32, ..."
    }
];

// Carrega um desafio específico da Fase 4
function loadSequenceChallenge(challengeIndex) {
    if (challengeIndex >= sequenceChallenges.length) {
        // Todos os desafios foram concluídos
        alert('Parabéns! Você completou todos os desafios do Vale das Sequências!');
        showMainMenu();
        return;
    }
    
    const challenge = sequenceChallenges[challengeIndex];
    sequenceChallengeText.textContent = `Desafio: Identifique o tipo de sequência e encontre os próximos termos.`;
    
    // Limpar elementos anteriores
    sequenceTerms.innerHTML = '';
    
    // Adicionar visualização da sequência
    challenge.terms.forEach(term => {
        const termElement = document.createElement('div');
        termElement.className = 'sequence-term';
        termElement.textContent = term;
        sequenceTerms.appendChild(termElement);
    });
    
    // Resetar entradas
    paRadio.checked = false;
    pgRadio.checked = false;
    term1Input.value = '';
    term2Input.value = '';
    term3Input.value = '';
    
    // Resetar feedback
    sequenceFeedback.classList.add('hidden');
    nextSequenceBtn.classList.add('hidden');
}

// Verifica a resposta do usuário para a Fase 4
function checkSequenceAnswer() {
    const challenge = sequenceChallenges[currentSequenceChallenge];
    
    // Verificar o tipo de sequência selecionado
    const typeCorrect = 
        (challenge.type === 'pa' && paRadio.checked) || 
        (challenge.type === 'pg' && pgRadio.checked);
    
    // Verificar os próximos termos
    const term1Correct = parseInt(term1Input.value) === challenge.nextTerms[0];
    const term2Correct = parseInt(term2Input.value) === challenge.nextTerms[1];
    const term3Correct = parseInt(term3Input.value) === challenge.nextTerms[2];
    
    const termsCorrect = term1Correct && term2Correct && term3Correct;
    const allCorrect = typeCorrect && termsCorrect;
    
    // Exibir feedback
    sequenceFeedback.classList.remove('hidden');
    
    if (allCorrect) {
        sequenceFeedback.className = 'feedback success';
        sequenceFeedbackText.textContent = 'Parabéns! Você identificou corretamente o tipo de sequência e os próximos termos!';
        nextSequenceBtn.classList.remove('hidden');
    } else {
        sequenceFeedback.className = 'feedback error';
        sequenceFeedbackText.textContent = 'Ops! Há algo incorreto na sua resposta. Revise os conceitos e tente novamente!';
        
        // Dicas específicas
        if (!typeCorrect) {
            sequenceFeedbackText.textContent += '\n- Verifique se a sequência é uma PA (termos com diferença constante) ou PG (termos com razão constante).';
        }
        
        if (!termsCorrect) {
            if (challenge.type === 'pa') {
                sequenceFeedbackText.textContent += '\n- Em uma PA, cada termo é obtido somando a razão ao termo anterior.';
            } else {
                sequenceFeedbackText.textContent += '\n- Em uma PG, cada termo é obtido multiplicando o termo anterior pela razão.';
            }
        }
    }
}

// Carrega o próximo desafio da Fase 4
function loadNextSequenceChallenge() {
    currentSequenceChallenge++;
    loadSequenceChallenge(currentSequenceChallenge);
} 