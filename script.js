const tagsEl = document.querySelectorAll('.tag');
const chartsEl = document.querySelectorAll('.chart');

tagsEl.forEach(tagEl => {
  tagEl.addEventListener('click', () => {
    const tag = tagEl.getAttribute('data-tag');

    clearTagsActiveClass();
    // active
    tagEl.classList.add('bluebnohover');
    // inactive
    tagEl.classList.remove('text-blue-400', 'bg-blue-200');

    chartsEl.forEach(chart => {
      const chartTags = chart.getAttribute('data-tags');
      let show = false;
      if (tag === chartTags) {
        show = true;
      }

      if (tag === 'stack overflow' || show) {
        chart.classList.remove('hidden');
      } else {
        chart.classList.add('hidden');
      }
    });
  });
});

function clearTagsActiveClass() {
  tagsEl.forEach(tagEl => {
    tagEl.classList.remove('bluebnohover', 'text-white', 'bg-blue-400');
    tagEl.classList.add('text-blue-400', 'bg-blue-200');
  });
};
