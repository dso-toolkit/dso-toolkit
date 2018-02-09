$('.section-body').on('hide.bs.collapse', function () {
  const body = $(this);
  const id = body.attr('id');

  const toggle = body.closest('.accordion').find(`.section-toggle[href="#${id}"]`);

  toggle.closest('.section-toggle').find('span.toggle-icon')
    .removeClass('toggle-open')
    .addClass('toggle-closed');
});

$('.section-body').on('show.bs.collapse', function () {
  const body = $(this);
  const id = body.attr('id');

  const toggle = body.closest('.accordion').find(`.section-toggle[href="#${id}"]`);

  toggle.closest('.section-toggle').find('span.toggle-icon').removeClass('toggle-closed').addClass('toggle-open');
});
