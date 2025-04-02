// Easter Egg - Enigma que aparece ao clicar no título ORDO REMIER
// Versão corrigida para evitar que o usuário possa reiniciar o enigma

function setupEasterEgg() {
    const headerTitle = document.querySelector('header h1');
    
    if (headerTitle) {
      headerTitle.style.cursor = 'pointer';
      
      headerTitle.addEventListener('click', function() {
        // Verificar IP e permissão para acessar o enigma
        checkIPAndShowEnigma();
      });
    }
  }
  
  // Função para verificar o IP e permissões antes de mostrar o enigma
  function checkIPAndShowEnigma() {
    // Exibir loader
    showLoader();
    
    // Fazer uma requisição para verificar o IP e tentativas
    fetch('ip-check.php')
      .then(response => response.json())
      .then(data => {
        // Ocultar loader
        hideLoader();
        
        if (data.status === 'success') {
          // Usuário ainda não iniciou o enigma, pode começar
          showEnigmaIntro();
        } else if (data.error === 'vpn_detected') {
          // Exibir mensagem de erro de VPN
          showErrorModal('Acesso Bloqueado', 'O uso de VPN não é permitido para acessar este conteúdo.');
        } else if (data.error === 'attempt_exists') {
          // Exibir mensagem que o usuário já iniciou ou completou o enigma
          showErrorModal('Tentativa Já Utilizada', data.message);
        } else {
          // Outro erro
          showErrorModal('Erro', data.message || 'Ocorreu um erro ao verificar seu acesso.');
        }
      })
      .catch(error => {
        // Ocultar loader
        hideLoader();
        console.error('Erro ao verificar IP:', error);
        
        // Fallback para executar localmente (apenas para desenvolvimento)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          showEnigmaIntro();
        } else {
          showErrorModal('Erro de Conexão', 'Não foi possível verificar suas permissões. Tente novamente mais tarde.');
        }
      });
  }
  
  // Exibir um loader enquanto verifica o IP
  function showLoader() {
    const loaderOverlay = document.createElement('div');
    loaderOverlay.className = 'enigma-loader-overlay';
    
    const loader = document.createElement('div');
    loader.className = 'enigma-loader';
    loader.innerHTML = '<div class="enigma-spinner"></div><p>Verificando acesso...</p>';
    
    loaderOverlay.appendChild(loader);
    document.body.appendChild(loaderOverlay);
    
    setTimeout(() => {
      loaderOverlay.classList.add('active');
    }, 10);
  }
  
  // Ocultar o loader
  function hideLoader() {
    const loaderOverlay = document.querySelector('.enigma-loader-overlay');
    if (loaderOverlay) {
      loaderOverlay.classList.remove('active');
      setTimeout(() => {
        loaderOverlay.remove();
      }, 300);
    }
  }
  
  // Exibir modal de erro
  function showErrorModal(title, message) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'enigma-modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'enigma-modal error-modal';
    
    modalContent.innerHTML = `
      <div class="enigma-header">
        <h2>${title}</h2>
      </div>
      <div class="enigma-content">
        <div class="error-icon"><i class="fas fa-exclamation-triangle"></i></div>
        <p>${message}</p>
      </div>
      <div class="enigma-footer">
        <button class="enigma-btn enigma-cancel-btn">Fechar</button>
      </div>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    setTimeout(() => {
      modalOverlay.classList.add('active');
      modalContent.classList.add('active');
    }, 10);
    
    const closeButton = modalContent.querySelector('.enigma-cancel-btn');
    closeButton.addEventListener('click', () => {
      closeEnigmaModal(modalOverlay);
    });
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
        <div class="attempts-counter">Atenção: Você tem apenas <span>UMA</span> tentativa!</div>
      </div>
      <div class="enigma-content">
        <p>Você encontrou um portal secreto. Responda 5 enigmas para descobrir o que há além.</p>
        <div class="enigma-glitch-text">INICIAR O TESTE</div>
        <div class="enigma-disclaimer">Esta é sua <strong>ÚNICA</strong> chance de resolver este enigma. Se sair ou desistir, não poderá tentar novamente.</div>
        <div class="enigma-warning">Apenas aqueles que acertarem todas as perguntas receberão o código.</div>
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
      // Registrar tentativa no servidor
      registerAttempt()
        .then(response => {
          if (response.status === 'success') {
            // Iniciar o enigma
            showQuestion(currentQuestionIndex);
          } else {
            // Se houve erro ao registrar tentativa
            closeEnigmaModal(modalOverlay);
            
            if (response.error === 'attempt_exists') {
              // O usuário já iniciou ou completou o enigma
              showErrorModal('Tentativa Já Utilizada', response.message);
            } else {
              // Outro erro
              showErrorModal('Erro', response.message || 'Não foi possível iniciar o enigma.');
            }
          }
        })
        .catch(error => {
          console.error('Erro ao registrar tentativa:', error);
          // Fallback para executar localmente (apenas para desenvolvimento)
          if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            showQuestion(currentQuestionIndex);
          } else {
            closeEnigmaModal(modalOverlay);
            showErrorModal('Erro de Conexão', 'Não foi possível registrar sua tentativa. Tente novamente mais tarde.');
          }
        });
    });
    
    // Evento do botão "Fechar Portal"
    const cancelButton = modalContent.querySelector('.enigma-cancel-btn');
    cancelButton.addEventListener('click', () => {
      closeEnigmaModal(modalOverlay);
    });
  }
  
  // Função para registrar uma tentativa no servidor
  function registerAttempt() {
    return fetch('register-attempt.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action: 'register_attempt' })
    })
    .then(response => response.json());
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
          
          playSound('correct');
          
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
          
          playSound('wrong');
          
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
      
      playSound('hint');
    });
    
    // Evento do botão "Desistir"
    const cancelButton = modalContent.querySelector('.enigma-cancel-btn');
    cancelButton.addEventListener('click', () => {
      // Confirmar com o usuário se realmente deseja desistir
      if (confirm("ATENÇÃO: Se você desistir agora, não poderá tentar novamente. Sua tentativa já foi registrada. Tem certeza que deseja sair?")) {
        const modalOverlay = document.querySelector('.enigma-modal-overlay');
        closeEnigmaModal(modalOverlay);
        
        // Mostrar mensagem informando que a tentativa foi contabilizada
        showErrorModal('Tentativa Finalizada', 'Você desistiu do enigma. Esta tentativa foi contabilizada e você não poderá tentar novamente.');
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
        
        playSound('reward');
        
        // Salvar o resultado no servidor
        saveEnigmaResult(correctAnswers, rewardCode);
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
              <p>Esta foi sua única chance. Não haverá outra oportunidade.</p>
            </div>
          </div>
        </div>
        <div class="enigma-footer">
          <button class="enigma-btn enigma-close-btn">Fechar Portal</button>
        </div>
      `;
      
      playSound('wrong');
      
      // Salvar o resultado como falha no servidor
      saveEnigmaResult(correctAnswers, "");
    }
    
    // Evento do botão "Fechar Portal"
    const closeButton = modalContent.querySelector('.enigma-close-btn');
    closeButton.addEventListener('click', () => {
      const modalOverlay = document.querySelector('.enigma-modal-overlay');
      closeEnigmaModal(modalOverlay);
    });
  }
  
  // Função para salvar o resultado do enigma no servidor
  function saveEnigmaResult(score, code) {
    fetch('save-result.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'save_result',
        score: score,
        code: code ? code : ""
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Resultado salvo:', data);
    })
    .catch(error => {
      console.error('Erro ao salvar resultado:', error);
    });
  }
  
  // Função para fechar o modal
  function closeEnigmaModal(modalOverlay) {
    const modalContent = modalOverlay.querySelector('.enigma-modal');
    
    modalContent.classList.remove('active');
    modalOverlay.classList.remove('active');
    
    setTimeout(() => {
      modalOverlay.remove();
    }, 300);
  }
  
  // Função para tocar sons
  function playSound(type) {
    const audio = new Audio();
    
    switch(type) {
      case 'correct':
        audio.src = 'data:audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkuY29tIFNvdW5kIEVmZmVjdHMA//uSwAAAAAABLBQAAAL6QWwrFAACAAAAAABERERE18tRGA0AIAmOP/1/DsQBBEYiQGD4P4gef//iIIQDvP//////4kYQGBA8DwgCAIA//////////+ICAgBkAAAAAAAH/////jw/Igj4Pn/w+D//+JGIEBgQBAwIAgQEB///////+JAJBETK3LbgAQgAFLC1//c0DDRAzMHXKAk4HihpAxKAJEKAQ2Sga+vPk4Mlw0Qd5gVGBkYKRpv/7kmQRgCTqQdxzL2FwLGhLXj3sSANxCXXHsYbAtyGuJPexKAsAwEg4TP5g5/6Z/p+Ojn/9ejRpwFjyMMXgxGn+n9enRzp9GmKhIg2LSgTKIgJJbmCbFDa8qSZum5aBBICgaOmRhUFzRsQG0r6h2wEAByZEOk4kDgcHjpBRkFihgIgCgHMlgoxcCzFgFMUAMAIHmAgEYFF5hYbGA4YYRAaLxgyeAYEzAILQkBQuYnBhjYCmDAKICw0BkViwtMFgIwKAgwEQSHQkFiIFpiICmBAGf/7kmQPgAS8Ql1x6WG4K6hbjj2MNwN9CXHHpSlgs6FuOPSlKBcYEAJgIXACBjAQrMCiQCIDgAd/BAeMCgUwSJVcYEBBhQMGBwGFgGYBAQKAZh+Lf9jxYl+5ZrVcq5V/3//7///+pZzg/GYsVVMQU1FMy45OS41VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7kmRAj8AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==';
        break;
      case 'wrong':
        audio.src = 'data:audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkuY29tIFNvdW5kIEVmZmVjdHMA//uSwAAAAAABLBQAAAL6QEwRBAACAAAAAABUWGluZwAAAA8AAAAOAAAUXgA9PT09PT09PT09XV1dXV1dXV1dXX19fX19fX19fX2cnJycnJycnJyctbW1tbW1tbW1tcnJycnJycnJycnS0tLS0tLS0tLS6enp6enp6enp6f39/f39/f39/f0REREREREREREnJycnJycnJycnQEBAQEBAQEBAQFVVVVVVVVVVVVVmZmZmZmZmZmZmc3Nzc3Nzc3Nzc4iIiIiIiIiIiIiTk5OTk5OTk5OTqKioqKioqKioqAAAAAFQTEFNRTMuMTAwBLgAAAAAAAAAABUgJAUHQQAB4AAAFFdbVyC5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uSYAAA8rRN2aktKuJWKZs9KSVeAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==';
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
  }
  
  // Adicionar manipulador para a tecla ESC
  document.addEventListener('keydown', function(e) {
    // Se pressionar ESC enquanto o enigma está aberto
    if (e.key === 'Escape') {
      const enigmaOverlay = document.querySelector('.enigma-modal-overlay');
      if (enigmaOverlay) {
        e.preventDefault();
        
        // Verificar se estamos na fase de introdução ou já resolvendo o enigma
        const startButton = enigmaOverlay.querySelector('.enigma-start-btn');
        if (startButton) {
          // Fase de introdução, pode fechar normalmente
          closeEnigmaModal(enigmaOverlay);
        } else {
          // Já está resolvendo o enigma, pedir confirmação
          if (confirm("ATENÇÃO: Se você sair agora, não poderá tentar novamente. Sua tentativa já foi registrada. Tem certeza que deseja sair?")) {
            closeEnigmaModal(enigmaOverlay);
            
            // Mostrar mensagem informando que a tentativa foi contabilizada
            showErrorModal('Tentativa Finalizada', 'Você desistiu do enigma. Esta tentativa foi contabilizada e você não poderá tentar novamente.');
          }
        }
      }
    }
  });
  
  // Inicializar o Easter Egg quando o DOM estiver carregado
  document.addEventListener('DOMContentLoaded', function() {
    setupEasterEgg();
    
    // Adicionar evento para impedir navegação acidental durante o enigma
    window.addEventListener('beforeunload', function(e) {
      const enigmaOverlay = document.querySelector('.enigma-modal-overlay');
      if (enigmaOverlay && !enigmaOverlay.querySelector('.enigma-start-btn') && !enigmaOverlay.querySelector('.enigma-close-btn')) {
        // Enigma em andamento (não está na introdução nem no final)
        e.preventDefault();
        e.returnValue = 'Você está no meio do enigma. Se sair agora, sua tentativa será contabilizada e você não poderá tentar novamente.';
        return e.returnValue;
      }
    });
  });