const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");

let yesScale = 1.0; // başlangıç ölçeği

noBtn.addEventListener("click", () => {
  const container = document.querySelector(".container");
  const containerRect = container.getBoundingClientRect();
  const maxX = containerRect.width - noBtn.offsetWidth;
  const maxY = containerRect.height - noBtn.offsetHeight;

  const randX = Math.random() * maxX;
  const randY = Math.random() * maxY;

  noBtn.style.left = `${randX}px`;
  noBtn.style.top = `${randY}px`;

  // Ölçek değerini her seferinde artır
  yesScale += 0.3;
  yesBtn.style.transform = `scale(${yesScale})`;
  yesBtn.style.transition = "transform 0.3s ease";
});

yesBtn.addEventListener("click", () => {
  Swal.fire({
    title: 'Teşekkür ederim 💖',
    text: 'Seni kırmak istememiştim, sen benim en değerlimsin ve mutlu olman için benim için en önemli şey. Seni çok seviyorum 🤍❤️',
    confirmButtonText: 'Sen de beni çok seviyorsan tıklamalısın🥹'
  }).then((result) => {
    if (result.isConfirmed) {
        fetch('https://app-backend-skq9.onrender.com/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Sen de beni çok sevdiğin için teşekkür ederim sevgilim 💖'
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          Swal.fire('Mail gönderildi! ✉️');
        } else {
          Swal.fire('Hata oluştu 😢', data.message, 'error');
        }
      })
      .catch(err => {
        Swal.fire('Hata oluştu 😢', err.message, 'error');
      });
    }
  });
});
