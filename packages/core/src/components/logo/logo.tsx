import { Component, h, getAssetPath } from '@stencil/core';

@Component({
  tag: 'dso-logo',
  assetsDirs: ['logo-assets'],
  // styleUrl: 'logo.scss', in de header.scss wordt voor `header .logo` de breedte op 300px gezet
  shadow: false
})
export class Logo {
  render() {
    return (
      <img src={`${getAssetPath('./logo-assets/omgevingsloket.png')}`} alt="Omgevingsloket" class="logo"></img>
    );
  }
}
