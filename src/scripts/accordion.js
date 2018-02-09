$('.section-body').on('hidden.bs.collapse', function () {
  const body = $(this);
  const id = body.attr('id');

  const toggle = body.closest('.accordion').find(`.section-toggle h2 a[href="#${id}"]`);

  toggle.closest('.section-toggle').find('span.toggle-icon')
    .removeClass('fa-angle-down')
    .addClass('fa-angle-right');
});

$('.section-body').on('shown.bs.collapse', function () {
  const body = $(this);
  const id = body.attr('id');

  const toggle = body.closest('.accordion').find(`.section-toggle h2 a[href="#${id}"]`);

  toggle.closest('.section-toggle').find('span.toggle-icon').removeClass('fa-angle-right').addClass('fa-angle-down');
});
