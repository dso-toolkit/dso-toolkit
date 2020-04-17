---
label: Typografie
---

## Asap

Het webfont "Asap" is onderdeel van de vrij beschikbare [Google Fonts](https://fonts.google.com/specimen/Asap). Dit webfont is optimaal voor schermweergave. Asap heeft als eigenschap dat alle karakters in het lettertype een gedeelde breedte hebben. De lopende tekst blijft er voor de eindgebruiker rustig uitzien, ook bij veranderingen van de stijl van het lettertype.

- Het webfont mag door alle betrokken partijen in publicaties ingezet worden.
- Het is aan te bevelen ook een fallback systeemfont als alternatieve weergave te bepalen voor situaties waarin het webfont niet getoond kan worden. Standaard instelling is `sans-serif`.
- Met de opkomst van mobiele apparaten is er een trend waarneembaar om grotere corpsen toe te passen.

## Headings
| Beschrijving      | Markup                                 | Preview                                                                                                                                                                                                                              |
| ----------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Heading 1         | `<h1>Heading</h1>`                     | <h1>Bold 32px #275937</h1>                                                                                                                                                                                                           |
| Heading 2         | `<h2>Heading</h2>`                     | <h2>Bold 24px #275937</h2>                                                                                                                                                                                                           |
| Heading 3         | `<h3>Heading</h3>`                     | <h3>SemiBold 20px #275937</h3>                                                                                                                                                                                                       |
| Heading 4         | `<h4>Heading</h4>`                     | <h4>SemiBold 16px #275937</h4>                                                                                                                                                                                                       |
| Heading 5         | `<h5>Heading</h5>`                     | <h5>SemiBold 16px #191919</h5>                                                                                                                                                                                                       |
| Body text         | `<p>Text</p>`                          | <p>Regular 16px #191919</p>                                                                                                                                                                                                          |
| Small text        | `<small>Klein</small>`                 | <small>Regular 14px #191919</small>                                                                                                                                                                                                  |
| Caption           | `<span class="caption">Caption</span>` | <span class="caption">Caption</span>                                                                                                                                                                                                 |
| Anchor            | `<a href="#">Anchor</a>`               | <a href="#" id="anchor-example">example</a><ul><li><a href="#" class="static">anchor #39870C</a></li><li><a href="#" class="static-hover">hover #676CB0</a></li><li><a href="#" class="static-visited">visited #8B4A6A</a></li></ul> |

Line height samples

<h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla nisl ante, eget ornare diam mollis at.</h1>
<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla nisl ante, eget ornare diam mollis at.</h2>
<h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla nisl ante, eget ornare diam mollis at.</h3>
<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla nisl ante, eget ornare diam mollis at.</h4>
<h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla nisl ante, eget ornare diam mollis at.</h5>
<p>
  Lorem ipsum dolor sit amet, consectrur adipiscing elit. Aliquam viverra purus sit amet maximus semper. Quisque suscipit varius finibus. Ut accumsan ligula vitae tortor lobortis commodo sit amet id lacus. Vivamus sed quam metus. Morbi ornare quis nibh ac efficitur. ut pharetra ultrices placerat. Aliquam ornare pretium eros, vel gravida lacus aliquam id. Etiam nec faucibus urna. Quisque lacinia riss id augue ornare commodo sed et lectus. Maecenas consecttetur eget tellus at egestas. Integer eleifend lacinia dolor, vitae dapibus eros pulvinar id. Curabitur eu pretium magna, sit amet malesuada odio. Sed condimentum elit lectus, sit amet tincidunt metus sollicitudin a.
</p>
<p><span class="caption">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra purus sit amet maximus semper.</span></p>
<p><small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam viverra purus sit amet maximus semper.</small></p>
<script>
  document.getElementById('anchor-example').setAttribute('href', '#' + (+new Date()));
</script>
