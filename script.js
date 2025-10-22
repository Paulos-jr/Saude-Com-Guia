document.addEventListener('DOMContentLoaded', () => {
  const TELEFONE_AGENCIA = '5598991466611'; // Seu número com código do país

  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');
  const whatsappInput = document.getElementById('whatsapp');
  const mensagemInput = document.getElementById('mensagem');
  const whatsappCTA = document.getElementById('whatsapp-cta');
  const form = document.getElementById('consultaForm');

  // Impedir envio com Enter nos campos (exceto textarea)
  [nomeInput, emailInput, whatsappInput].forEach((input) => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') e.preventDefault();
    });
  });

  // Atualiza o link do WhatsApp em tempo real
  const atualizarWhatsAppLink = () => {
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const whatsapp = whatsappInput.value.trim();
    const mensagem = mensagemInput.value.trim();

    if (nome && whatsapp && mensagem) {
      const textoWhatsApp =
        `Olá, Paulo! Meu nome é *${nome}*.\n\n` +
        `Gostaria de agendar uma consulta como Farmacêutico Clínico.\n\n` +
        `*WhatsApp:* ${whatsapp}\n` +
        `*E-mail:* ${email || 'Não informado'}\n\n` +
        `*Mensagem:*\n${mensagem}`;

      const urlWhatsApp = `https://api.whatsapp.com/send?phone=${TELEFONE_AGENCIA}&text=${encodeURIComponent(textoWhatsApp)}`;
      whatsappCTA.href = urlWhatsApp;
    } else {
      whatsappCTA.href = '#';
    }
  };

  // Ouvir mudanças nos campos
  nomeInput.addEventListener('input', atualizarWhatsAppLink);
  emailInput.addEventListener('input', atualizarWhatsAppLink);
  whatsappInput.addEventListener('input', atualizarWhatsAppLink);
  mensagemInput.addEventListener('input', atualizarWhatsAppLink);

  // Fallback por e-mail se o link não estiver pronto
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = nomeInput.value.trim();
    const whatsapp = whatsappInput.value.trim();
    const mensagem = mensagemInput.value.trim();

    if (!nome || !whatsapp || !mensagem) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (whatsappCTA.href && whatsappCTA.href !== '#') {
      window.open(whatsappCTA.href, '_blank');
    } else {
      const seuEmail = 'paulojunior.farmaceutico@gmail.com';
      const assunto = 'Nova Solicitação de Consulta - Farmacêutico Clínico';
      const corpo = `Nome: ${nome}\nWhatsApp: ${whatsapp}\nE-mail: ${emailInput.value}\n\nMensagem:\n${mensagem}`;
      window.location.href = `mailto:${seuEmail}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    }
  });
});