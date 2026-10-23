/* Paired copy: each language keeps the same thought and emphasis. */
(() => {
  const copy = [
    {
      selector: '.intro h1',
      lines: {
        my: [['ခံစားချက်တိုင်းအတွက်၊', 'သီချင်းတစ်ပုဒ်။'], ['သံစဉ်လေးတွေနဲ့၊', 'စိတ်ကိုအနားပေး။'], ['ချစ်တဲ့သီချင်းကို၊', 'ကိုယ့်ဟန်နဲ့တီးပါ။'], ['အမှတ်တရတွေကို၊', 'သီချင်းနဲ့ပြန်ဆုံ။']],
        en: [['A song for', 'every feeling.'], ['A melody for', 'a quiet moment.'], ['Play the songs', 'you love.'], ['Find memories', 'in every melody.']],
      },
    },
    {
      selector: '.hero h2',
      lines: {
        my: [['ကြိုးခြောက်ချောင်းနဲ့၊', 'ရင်ထဲကစကားတွေ။'], ['ဂစ်တာတစ်လက်နဲ့၊', 'ကိုယ့်အချိန်လေး။'], ['သံစဉ်တစ်ပုဒ်နဲ့၊', 'အမှတ်တရများစွာ။'], ['ချစ်တဲ့သီချင်းတွေ၊', 'အတူတူတီးကြမယ်။']],
        en: [['Six strings.', 'Endless stories.'], ['One guitar.', 'A moment for you.'], ['One melody.', 'So many memories.'], ['Songs we love.', 'Let’s play together.']],
      },
    },
  ];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let timer;
  const headings = copy.map(group => ({ ...group, element: document.querySelector(group.selector) })).filter(group => group.element);

  function render() {
    const language = window.TayWineI18n?.getLanguage() === 'en' ? 'en' : 'my';
    for (const group of headings) {
      group.element.dataset.noI18n = '';
      group.element.classList.add('rotating-headline');
      group.element.replaceChildren(...group.lines[language].map(([lead, emphasis], position) => {
        const line = document.createElement('span');
        line.className = 'headline-variant';
        line.classList.toggle('is-current', position === index);
        line.setAttribute('aria-hidden', String(position !== index));
        const accent = document.createElement('em');
        accent.textContent = emphasis;
        line.append(document.createTextNode(lead), group.selector === '.hero h2' ? document.createElement('br') : document.createTextNode(' '), accent);
        return line;
      }));
    }
  }

  function schedule() {
    clearInterval(timer);
    // Keep a static heading when reduced motion is requested or the page is hidden.
    if (motion.matches || document.hidden || !headings.length) return;
    timer = setInterval(() => {
      if (headings.some(group => group.element.closest('[hidden]'))) return;
      index = (index + 1) % 4;
      for (const group of headings) {
        [...group.element.children].forEach((line, position) => {
          line.classList.toggle('is-current', position === index);
          line.setAttribute('aria-hidden', String(position !== index));
        });
      }
    }, 6000);
  }
  document.addEventListener('taywine:languagechange', () => { render(); schedule(); });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', schedule);
  render();
  schedule();
})();
