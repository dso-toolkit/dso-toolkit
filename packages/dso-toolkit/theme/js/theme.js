import $ from 'jquery';
import 'jquery-pjax';

import framed from './components/frame';
import events from './events';
import * as utils from './utils';
import Tree from './components/tree';
import Filter from './components/filter';
import Pen from './components/pen';
import VersionSelector from './components/version-selector';
import './versions';
import './resize-iframe';
import './restore-nav-scroll';

const doc = $(document);
const frctl = window.frctl || {};

window.fractal = {
  events: events
};

const frame = framed($('#frame'));
const navTrees = $.map($('[data-behaviour="tree"]'), t => new Tree(t));
new Filter($('#menu-filter'), navTrees);
let pens = [];

loadPen();

new VersionSelector();

if (frctl.env == 'server') {
  doc.pjax('a[data-pjax], code a[href], .Prose a[href]:not([data-no-pjax]), .Browser a[href]:not([data-no-pjax])', '#pjax-container', {
    fragment: '#pjax-container',
    timeout: 10000
  }).on('pjax:start', function (e, xhr, options) {
    if (utils.isSmallScreen()) {
      frame.closeSidebar();
    }
    frame.startLoad();
    events.trigger('main-content-preload', options.url);
  }).on('pjax:end', function () {
    events.trigger('main-content-loaded');
    frame.endLoad();
  });
}

events.on('main-content-loaded', loadPen);

function loadPen() {
  setTimeout(function () {
    pens = $.map($('[data-behaviour="pen"]'), p => new Pen(p));
  }, 1);
}
