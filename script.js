$(function() {
  const $flip = $("#flipbook");
  const totalPages = 36;

  // 1) Página em branco no início
  $flip.append('<div class="page blank"></div>');

  // 2) Gera as páginas reais
  for (let i = 1; i <= totalPages; i++) {
    $flip.append(`
      <div class="page">
        <img src="pages/page${i}.png" alt="Página ${i}" />
      </div>
    `);
  }

  // 3) Inicializa o Turn.js em modo 'double' com drag habilitado
  $flip.turn({
    width:       $flip.parent().width(),
    height:      $flip.parent().height(),
    display:     'double',
    autoCenter:  true,
    duration:    500,
    gradients:   true,
    elevation:   50,
    acceleration:true,   // usa GPU para performance
    drag:        true,   // habilita virar arrastando
    when: {
      turned: function(event, page) {
        console.log("📖 virou pra página", page);
      }
    }
  });

  // 4) Ajusta no resize
  $(window).on("resize", () => {
    $flip.turn("size",
      $flip.parent().width(),
      $flip.parent().height()
    );
  });

  // 5) Clique puro sem atrapalhar o drag
  let isDragging = false;
  $flip
    .on('mousedown', () => isDragging = false)
    .on('mousemove', () => isDragging = true)
    .on('mouseup', function(e) {
      if (!isDragging) {
        const clickX = e.pageX - $flip.offset().left;
        if (clickX > $flip.width() / 2) {
          $flip.turn("next");
        } else {
          $flip.turn("previous");
        }
      }
    });
});

function cyberpunkGlitch(element) {
  const doGlitch = () => {
    element.classList.add('glitch-blink');
    setTimeout(() => {
      element.classList.remove('glitch-blink');
    }, Math.random() * 200 + 100); // entre 100ms e 300ms
  };

  setInterval(() => {
    if (Math.random() > 0.7) { // 30% de chance de piscar
      doGlitch();
    }
  }, Math.random() * 3000 + 1000); // entre 1s e 4s
}

cyberpunkGlitch(document.querySelector('.titulo-topo'));
cyberpunkGlitch(document.querySelector('.subtitulo-fundo'));
