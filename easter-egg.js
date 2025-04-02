// Easter Egg - Enigma que aparece ao clicar no título ORDO REMIER
// Versão simplificada sem verificação de IP ou VPN

// Função principal que configura o evento de clique no título
function setupEasterEgg() {
    console.log('Configurando Easter Egg');
    
    // Seleciona o título principal do header
    const headerTitle = document.querySelector('header h1');
    
    if (headerTitle) {
      headerTitle.style.cursor = 'pointer';
      
      // Adiciona o evento de clique
      headerTitle.onclick = function() {
        console.log('Título clicado, iniciando enigma');
        showEnigmaIntro();
      };
    }
  }
  
  // Array com as perguntas do enigma
  const enigmaQuestions = [
    {
      question: "O que está além do véu que separa nosso mundo do Outro Lado?",
      options: ["Monstros", "Poder", "Conhecimento", "Verdade"],
      answer: 3, // Índice da resposta correta (começa em 0)
      hint: "Aquilo que todos buscam, mas poucos estão preparados para aceitar."
    },
    {
      question: "Quando o medo encontra o desconhecido, o que se forma?",
      options: ["Paranóia", "Paranormalidade", "Ocultismo", "Loucura"],
      answer: 1,
      hint: "É o nome do que estuda a Ordem."
    },
    {
      question: "Qual símbolo representa o equilíbrio entre o caos e a ordem?",
      options: ["Círculo", "Triângulo", "Espiral", "Olho"],
      answer: 2,
      hint: "A forma que se repete infinitamente, nunca começando ou terminando."
    },
    {
      question: "Qual elemento é o mais potente condutor de energia paranormal?",
      options: ["Sangue", "Medo", "Conhecimento", "Rituais"],
      answer: 0,
      hint: "Líquido vital, portador de memórias ancestrais."
    },
    {
      question: "O que está no centro do Outro Lado?",
      options: ["O Ocultista", "O Vazio", "O Medo Primordial", "A Espiral"],
      answer: 1,
      hint: "A ausência que tudo consome e de onde tudo surge."
    }
  ];
  
  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  
  // Função para mostrar a introdução do enigma
  function showEnigmaIntro() {
    // Resetar o enigma
    currentQuestionIndex = 0;
    correctAnswers = 0;
    
    // Criar o container do modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'enigma-modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'enigma-modal';
    
    // Adicionar conteúdo inicial
    modalContent.innerHTML = `
      <div class="enigma-header">
        <h2>Enigma do Outro Lado</h2>
        <p>Prove seu conhecimento para desbloquear segredos ocultos.</p>
      </div>
      <div class="enigma-content">
        <p>Você encontrou um portal secreto. Responda 5 enigmas para descobrir o que há além.</p>
        <div class="enigma-glitch-text">INICIAR O TESTE</div>
      </div>
      <div class="enigma-footer">
        <button class="enigma-btn enigma-start-btn">Aceitar o Desafio</button>
        <button class="enigma-btn enigma-cancel-btn">Fechar Portal</button>
      </div>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Adicionar efeito de entrada
    setTimeout(() => {
      modalOverlay.classList.add('active');
      modalContent.classList.add('active');
    }, 10);
    
    // Evento do botão "Aceitar o Desafio"
    const startButton = modalContent.querySelector('.enigma-start-btn');
    startButton.addEventListener('click', () => {
      showQuestion(currentQuestionIndex);
    });
    
    // Evento do botão "Fechar Portal"
    const cancelButton = modalContent.querySelector('.enigma-cancel-btn');
    cancelButton.addEventListener('click', () => {
      closeEnigmaModal(modalOverlay);
    });
  }
  
  // Função para mostrar a pergunta atual
  function showQuestion(index) {
    if (index >= enigmaQuestions.length) {
      showResult();
      return;
    }
    
    const modalContent = document.querySelector('.enigma-modal');
    const question = enigmaQuestions[index];
    
    // Atualizar o conteúdo do modal com a pergunta
    modalContent.innerHTML = `
      <div class="enigma-header">
        <h2>Enigma ${index + 1}/5</h2>
        <div class="enigma-progress">
          <div class="enigma-progress-bar" style="width: ${(index / enigmaQuestions.length) * 100}%"></div>
        </div>
      </div>
      <div class="enigma-content">
        <div class="enigma-question">${question.question}</div>
        <div class="enigma-options">
          ${question.options.map((option, i) => `
            <button class="enigma-option" data-index="${i}">${option}</button>
          `).join('')}
        </div>
        <div class="enigma-hint">
          <button class="enigma-hint-btn">Revelar Dica</button>
          <div class="enigma-hint-text">${question.hint}</div>
        </div>
      </div>
      <div class="enigma-footer">
        <button class="enigma-btn enigma-cancel-btn">Desistir</button>
      </div>
    `;
    
    // Eventos dos botões de opção
    const optionButtons = modalContent.querySelectorAll('.enigma-option');
    optionButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const selectedIndex = parseInt(e.target.dataset.index);
        
        // Desativar todos os botões após a escolha
        optionButtons.forEach(btn => btn.disabled = true);
        
        // Verificar se a resposta está correta
        if (selectedIndex === question.answer) {
          correctAnswers++;
          e.target.classList.add('correct');
          
          try { playSound('correct'); } catch(e) {}
          
          // Efeito visual de resposta correta
          const pulseEffect = document.createElement('div');
          pulseEffect.className = 'enigma-correct-pulse';
          e.target.appendChild(pulseEffect);
          
          setTimeout(() => {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
          }, 1500);
        } else {
          e.target.classList.add('wrong');
          
          try { playSound('wrong'); } catch(e) {}
          
          // Mostrar qual era a resposta correta
          optionButtons[question.answer].classList.add('correct');
          
          setTimeout(() => {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
          }, 2000);
        }
      });
    });
    
    // Evento do botão de dica
    const hintButton = modalContent.querySelector('.enigma-hint-btn');
    const hintText = modalContent.querySelector('.enigma-hint-text');
    
    hintButton.addEventListener('click', () => {
      hintText.style.display = 'block';
      hintButton.style.display = 'none';
      
      try { playSound('hint'); } catch(e) {}
    });
    
    // Evento do botão "Desistir"
    const cancelButton = modalContent.querySelector('.enigma-cancel-btn');
    cancelButton.addEventListener('click', () => {
      // Confirmar com o usuário se realmente deseja desistir
      if (confirm("Tem certeza que deseja desistir do enigma?")) {
        const modalOverlay = document.querySelector('.enigma-modal-overlay');
        closeEnigmaModal(modalOverlay);
      }
    });
  }
  
  // Função para mostrar o resultado final
  function showResult() {
    const modalContent = document.querySelector('.enigma-modal');
    
    // Agora só teremos uma recompensa para quem acerta tudo
    if (correctAnswers === 5) {
      // Acertou todas - recebe o código
      const rewardCode = "ORDEM-SUPREMA-2024";
      
      // Atualizar o conteúdo do modal com o resultado
      modalContent.innerHTML = `
        <div class="enigma-header">
          <h2>Resultado do Enigma</h2>
          <div class="enigma-progress">
            <div class="enigma-progress-bar" style="width: 100%"></div>
          </div>
        </div>
        <div class="enigma-content result">
          <div class="enigma-result-score">
            <div class="enigma-score-text">Respostas corretas:</div>
            <div class="enigma-score-number">${correctAnswers}/5</div>
          </div>
          <div class="enigma-reward">
            <h3 class="enigma-glitch-text">ACESSO COMPLETO CONCEDIDO</h3>
            <p>Você provou ser digno do conhecimento proibido. A Ordem acolhe sua perspicácia.</p>
            <div class="enigma-reward-code">
              <span>Seu código de acesso:</span>
              <div class="enigma-code">${rewardCode}</div>
            </div>
          </div>
          <div class="enigma-reward-instruction">
            Use este código na próxima reunião da Ordem para receber materiais exclusivos.
          </div>
        </div>
        <div class="enigma-footer">
          <button class="enigma-btn enigma-close-btn">Fechar Portal</button>
        </div>
      `;
      
      // Efeito de revelação do código
      const codeElement = modalContent.querySelector('.enigma-code');
      codeElement.innerHTML = '';
      
      setTimeout(() => {
        const codeText = rewardCode;
        let i = 0;
        
        const typeCode = setInterval(() => {
          if (i < codeText.length) {
            codeElement.textContent += codeText.charAt(i);
            i++;
          } else {
            clearInterval(typeCode);
            codeElement.classList.add('revealed');
            
            // Adicionar efeito de pulsação após revelação completa
            codeElement.classList.add('pulse');
          }
        }, 100);
        
        try { playSound('reward'); } catch(e) {}
      }, 1000);
    } else {
      // Não acertou todas - não recebe código
      modalContent.innerHTML = `
        <div class="enigma-header">
          <h2>Resultado do Enigma</h2>
          <div class="enigma-progress">
            <div class="enigma-progress-bar" style="width: 100%"></div>
          </div>
        </div>
        <div class="enigma-content result">
          <div class="enigma-result-score">
            <div class="enigma-score-text">Respostas corretas:</div>
            <div class="enigma-score-number">${correctAnswers}/5</div>
          </div>
          <div class="enigma-reward no-reward">
            <h3 class="enigma-glitch-text">ACESSO NEGADO</h3>
            <p>Você não acertou todas as perguntas. Apenas aqueles que demonstram completo conhecimento recebem o código da Ordem.</p>
            <div class="enigma-failed">
              <i class="fas fa-lock"></i>
            </div>
          </div>
        </div>
        <div class="enigma-footer">
          <button class="enigma-btn enigma-close-btn">Fechar Portal</button>
        </div>
      `;
      
      try { playSound('wrong'); } catch(e) {}
    }
    
    // Evento do botão "Fechar Portal"
    const closeButton = modalContent.querySelector('.enigma-close-btn');
    closeButton.addEventListener('click', () => {
      const modalOverlay = document.querySelector('.enigma-modal-overlay');
      closeEnigmaModal(modalOverlay);
    });
  }
  
  // Função para fechar o modal
  function closeEnigmaModal(modalOverlay) {
    if (!modalOverlay) return;
    
    const modalContent = modalOverlay.querySelector('.enigma-modal');
    if (modalContent) {
      modalContent.classList.remove('active');
    }
    modalOverlay.classList.remove('active');
    
    setTimeout(() => {
      if (modalOverlay && modalOverlay.parentNode) {
        modalOverlay.remove();
      }
    }, 300);
  }
  
  // Função para tocar sons (simplificada)
  function playSound(type) {
    try {
      const audio = new Audio();
      
      switch(type) {
        case 'correct':
          audio.src = 'data:audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkuY29tIFNvdW5kIEVmZmVjdHMA//uSwAAAAAABLBQAAAL6QWwrFAACAAAAAABERERE18tRGA0AIAmOP/1/DsQBBEYiQGD4P4gef//iIIQDvP//////4kYQGBA8DwgCAIA//////////+ICAgBkAAAAAAAH/////jw/Igj4Pn/w+D//+JGIEBgQBAwIAgQEB///////+JAJBETK3LbgAQgAFLC1//c0DDRAzMHXKAk4HihpAxKAJEKAQ2Sga+vPk4Mlw0Qd5gVGBkYKRpv/7kmQRgCTqQdxzL2FwLGhLXj3sSANxCXXHsYbAtyGuJPexKAsAwEg4TP5g5/6Z/p+Ojn/9ejRpwFjyMMXgxGn+n9enRzp9GmKhIg2LSgTKIgJJbmCbFDa8qSZum5aBBICgaOmRhUFzRsQG0r6h2wEAByZEOk4kDgcHjpBRkFihgIgCgHMlgoxcCzFgFMUAMAIHmAgEYFF5hYbGA4YYRAaLxgyeAYEzAILQkBQuYnBhjYCmDAKICw0BkViwtMFgIwKAgwEQSHQkFiIFpiICmBAGf/7kmQPgAS8Ql1x6WG4K6hbjj2MNwN9CXHHpSlgs6FuOPSlKBcYEAJgIXACBjAQrMCiQCIDgAd/BAeMCgUwSJVcYEBBhQMGBwGFgGYBAQKAZh+Lf9jxYl+5ZrVcq5V/3//7///+pZzg/GYsVVMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7kmRAj8AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==';
          break;
        case 'wrong':
          audio.src = 'data:audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkuY29tIFNvdW5kIEVmZmVjdHMA//uSwAAAAAABLBQAAAL6QEwRBAACAAAAAABUWGluZwAAAA8AAAAOAAAUXgA9PT09PT09PT09XV1dXV1dXV1dXX19fX19fX19fX2cnJycnJycnJyctbW1tbW1tbW1tcnJycnJycnJycnS0tLS0tLS0tLS6enp6enp6enp6f39/f39/f39/f0REREREREREREnJycnJycnJycnQEBAQEBAQEBAQFVVVVVVVVVVVVVmZmZmZmZmZmZmc3Nzc3Nzc3Nzc4iIiIiIiIiIiIiTk5OTk5OTk5OTqKioqKioqKioqAAAAAFQTEFNRTMuMTAwBLgAAAAAAAAAABUgJAUHQQAB4AAAFFdbVyC5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uSYAAA8rRN2aktKuJWKZs9KSVeAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
          break;
        case 'hint':
          audio.src = 'data:audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkuY29tIFNvdW5kIEVmZmVjdHMA//uSwAAAAAABLBQAAAL6QEwRBAACAAAAAABUWGluZwAAAA8AAAAZAAAUXgAbGxsbGxsbGxsbJCQkJCQkJCQkJCwsLCwsLCwsLCw1NTU1NTU1NTU1Pj4+Pj4+Pj4+PkdHR0dHR0dHR0dPT09PT09PT09PWFhYWFhYWFhYWGFhYWFhYWFhYWFqampqampqampqdHR0dHR0dHR0dH19fX19fX19fX2Hh4eHh4eHh4eHkJCQkJCQkJCQkJiYmJiYmJiYmJihoaGhoaGhoaGhqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuMTAwBLgAAAAAAAAAABUgJAXMQQAB4AAAFJFPNxgvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQYAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
          break;
        case 'reward':
          audio.src = 'data:audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkuY29tIFNvdW5kIEVmZmVjdHMA//uSwAAAAAABLBQAAAL6QCwVBAACAAAAAABUWGluZwAAAA8AAAAaAAAM7gAtLS0tLS0tLS0tOTk5OTk5OTk5OUVFRUVFRUVFRUVRUVFRUVFRUVFRXFxcXFxcXFxcXGhoaGhoaGhoaGh0dHR0dHR0dHR0gICAgICAgICAgIyMjIyMjIyMjIyYmJiYmJiYmJiYpKSkpKSkpKSkpLCwsLCwsLCwsLC8vLy8vLy8vLy8zMzMzMzMzMzMzM/Pz8/Pz8/Pz8/b29vb29vb29vb6Ojo6Ojo6Ojo6AAAAAFQTEFNRTMuMTAwBLgAAAAAAAAAABUgJAYQQQAB4AAAM3MsZ+D1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQYAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
          break;
      }
      
      audio.volume = 0.5;
      audio.play();
    } catch (error) {
      // Ignorar erros de som
    }
  }
  
  // Adicionar manipulador para a tecla ESC
  document.addEventListener('keydown', function(e) {
    // Se pressionar ESC enquanto o enigma está aberto
    if (e.key === 'Escape') {
      const enigmaOverlay = document.querySelector('.enigma-modal-overlay');
      if (enigmaOverlay) {
        e.preventDefault();
        closeEnigmaModal(enigmaOverlay);
      }
    }
  });
  
  // Inicializar o Easter Egg quando o DOM estiver carregado
  document.addEventListener('DOMContentLoaded', function() {
    setupEasterEgg();
  });