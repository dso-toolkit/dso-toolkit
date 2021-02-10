import { attachShadow, h, getAssetPath, proxyCustomElement } from '@stencil/core/internal/client';
export { setAssetPath } from '@stencil/core/internal/client';

function toVal(mix) {
	var k, y, str='';

	if (typeof mix === 'string' || typeof mix === 'number') {
		str += mix;
	} else if (typeof mix === 'object') {
		if (Array.isArray(mix)) {
			for (k=0; k < mix.length; k++) {
				if (mix[k]) {
					if (y = toVal(mix[k])) {
						str && (str += ' ');
						str += y;
					}
				}
			}
		} else {
			for (k in mix) {
				if (mix[k]) {
					str && (str += ' ');
					str += k;
				}
			}
		}
	}

	return str;
}

function clsx () {
	var i=0, tmp, x, str='';
	while (i < arguments.length) {
		if (tmp = arguments[i++]) {
			if (x = toVal(tmp)) {
				str && (str += ' ');
				str += x;
			}
		}
	}
	return str;
}

const alertCss = ":host{display:block;--di-status-success:url(\"data:image/svg+xml,%3csvg id='status-success' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e %3cg%3e %3ccircle cx='12' cy='12' r='11' style='fill: %2339870c'/%3e %3cpath d='M12%2c1A11%2c11%2c0%2c1%2c1%2c1%2c12%2c11%2c11%2c0%2c0%2c1%2c12%2c1m0-1A12%2c12%2c0%2c1%2c0%2c24%2c12%2c12%2c12%2c0%2c0%2c0%2c12%2c0Z' style='fill: white'/%3e %3c/g%3e %3cpath d='M10.11%2c18%2c5.29%2c13.31A.92.92%2c0%2c0%2c1%2c5.3%2c12a1%2c1%2c0%2c0%2c1%2c1.41%2c0l3.4%2c3.3%2c7.18-7a1%2c1%2c0%2c0%2c1%2c1.41%2c0%2c.92.92%2c0%2c0%2c1%2c0%2c1.35Z' style='fill: white'/%3e %3c/svg%3e\");--di-status-danger:url(\"data:image/svg+xml,%3csvg id='status-danger-line' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e %3cg%3e %3cpath d='M22.6%2c18.51c.86%2c1.37.29%2c2.49-1.25%2c2.49H2.65C1.11%2c21%2c.54%2c19.88%2c1.4%2c18.51L10.44%2c4a1.7%2c1.7%2c0%2c0%2c1%2c3.12%2c0Z' style='fill: %23ce3f51'/%3e %3cpath d='M12%2c3a1.9%2c1.9%2c0%2c0%2c1%2c1.56%2c1l9%2c14.48c.86%2c1.37.29%2c2.49-1.25%2c2.49H2.65C1.11%2c21%2c.54%2c19.88%2c1.4%2c18.51L10.44%2c4A1.9%2c1.9%2c0%2c0%2c1%2c12%2c3m0-1A2.89%2c2.89%2c0%2c0%2c0%2c9.6%2c3.5L.55%2c18a2.75%2c2.75%2c0%2c0%2c0-.28%2c2.81A2.59%2c2.59%2c0%2c0%2c0%2c2.65%2c22h18.7a2.59%2c2.59%2c0%2c0%2c0%2c2.38-1.21A2.75%2c2.75%2c0%2c0%2c0%2c23.45%2c18L14.4%2c3.5A2.89%2c2.89%2c0%2c0%2c0%2c12%2c2Z' style='fill: white'/%3e %3c/g%3e %3cpath d='M12%2c16a1%2c1%2c0%2c0%2c1-1-.91V8.91a1%2c1%2c0%2c0%2c1%2c2%2c0v6.18A1%2c1%2c0%2c0%2c1%2c12%2c16Zm0%2c1a1%2c1%2c0%2c1%2c0%2c1%2c1A1%2c1%2c0%2c0%2c0%2c12%2c17Z' style='fill: white'/%3e %3c/svg%3e\");--di-status-warning:url(\"data:image/svg+xml,%3csvg id='status-warning' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e %3cg%3e %3cpath d='M22.6%2c18.51c.86%2c1.37.29%2c2.49-1.25%2c2.49H2.65C1.11%2c21%2c.54%2c19.88%2c1.4%2c18.51L10.44%2c4a1.7%2c1.7%2c0%2c0%2c1%2c3.12%2c0Z' style='fill: %23dcd400'/%3e %3cpath d='M12%2c3a1.9%2c1.9%2c0%2c0%2c1%2c1.56%2c1l9%2c14.48c.86%2c1.37.29%2c2.49-1.25%2c2.49H2.65C1.11%2c21%2c.54%2c19.88%2c1.4%2c18.51L10.44%2c4A1.9%2c1.9%2c0%2c0%2c1%2c12%2c3m0-1A2.89%2c2.89%2c0%2c0%2c0%2c9.6%2c3.5L.55%2c18a2.75%2c2.75%2c0%2c0%2c0-.28%2c2.81A2.59%2c2.59%2c0%2c0%2c0%2c2.65%2c22h18.7a2.59%2c2.59%2c0%2c0%2c0%2c2.38-1.21A2.75%2c2.75%2c0%2c0%2c0%2c23.45%2c18L14.4%2c3.5A2.89%2c2.89%2c0%2c0%2c0%2c12%2c2Z' style='fill: white'/%3e %3c/g%3e %3cpath d='M11.73%2c15.85a1%2c1%2c0%2c0%2c1-1-.91V8.76a1%2c1%2c0%2c0%2c1%2c2%2c0v6.18A1%2c1%2c0%2c0%2c1%2c11.73%2c15.85Zm0%2c1a1%2c1%2c0%2c1%2c0%2c1%2c1A1%2c1%2c0%2c0%2c0%2c11.73%2c16.85Z'/%3e %3c/svg%3e\");--di-status-info:url(\"data:image/svg+xml,%3csvg id='status-info' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e %3cg%3e %3ccircle cx='12' cy='12' r='11' style='fill: %232b5780'/%3e %3cpath d='M12%2c1A11%2c11%2c0%2c1%2c1%2c1%2c12%2c11%2c11%2c0%2c0%2c1%2c12%2c1m0-1A12%2c12%2c0%2c1%2c0%2c24%2c12%2c12%2c12%2c0%2c0%2c0%2c12%2c0Z' style='fill: white'/%3e %3c/g%3e %3cpath d='M11%2c8a1%2c1%2c0%2c1%2c1%2c1%2c1A1%2c1%2c0%2c0%2c1%2c11%2c8Zm2%2c8.79V11.21A1.12%2c1.12%2c0%2c0%2c0%2c12%2c10a1.12%2c1.12%2c0%2c0%2c0-1%2c1.21v5.58A1.12%2c1.12%2c0%2c0%2c0%2c12%2c18%2c1.12%2c1.12%2c0%2c0%2c0%2c13%2c16.79Z' style='fill: white'/%3e %3c/svg%3e\");}:host *,:host *::after,:host *::before{box-sizing:border-box}:host .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}:host .alert{border:1px solid transparent;line-height:24px;margin-bottom:24px;min-height:64px;padding:19px 16px 19px 63px;position:relative}:host .alert:not(:first-child){margin-top:24px}:host .alert::before{content:\"\";left:15px;position:absolute;top:15px}:host .alert.alert-success{color:#191919;background-color:#e4f1d4;border-color:#e4f1d4}:host .alert.alert-success::before{background:var(--dso-icon, var(--di-status-success)) no-repeat;background-position:center;background-size:cover;height:32px;vertical-align:top;width:32px}:host .alert.alert-danger{color:#191919;background-color:#f5d8dc;border-color:#f5d8dc}:host .alert.alert-danger::before{background:var(--dso-icon, var(--di-status-danger)) no-repeat;background-position:center;background-size:cover;height:32px;vertical-align:top;width:32px}:host .alert.alert-warning{color:#191919;background-color:#f8f6cc;border-color:#f8f6cc}:host .alert.alert-warning::before{background:var(--dso-icon, var(--di-status-warning)) no-repeat;background-position:center;background-size:cover;height:32px;vertical-align:top;width:32px}:host .alert.alert-info{color:#191919;background-color:#e1ecf7;border-color:#e1ecf7}:host .alert.alert-info::before{background:var(--dso-icon, var(--di-status-info)) no-repeat;background-position:center;background-size:cover;height:32px;vertical-align:top;width:32px}:host(:not(:first-child)){margin-top:24px}";

const Alert = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
  }
  render() {
    const status = Alert.statusMap.get(this.status);
    if (!status) {
      throw new Error(`Invalid status ${this.status}`);
    }
    return (h("div", { class: clsx('alert', `alert-${this.status}`), role: "alert" }, h("span", { class: "sr-only" }, status, ":"), h("slot", null)));
  }
  static get style() { return alertCss; }
};
Alert.statusMap = new Map([
  ['success', 'Gelukt'],
  ['info', 'Opmerking'],
  ['warning', 'Waarschuwing'],
  ['danger', 'Fout']
]);

const attachmentsCounterCss = ":host{display:inline-block;--di-paperclip-grijs:url(\"data:image/svg+xml,%3csvg id='paperclip' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='color: %23666%3b'%3e %3cpath fill='currentColor' d='M21.88%2c8.94%2c10%2c20.6A4.63%2c4.63%2c0%2c0%2c1%2c6.62%2c22h0a5.78%2c5.78%2c0%2c0%2c1-4.05-1.81%2c5.34%2c5.34%2c0%2c0%2c1%2c0-7.56l9.3-9.26a1%2c1%2c0%2c1%2c1%2c1.48%2c1.48l-9.3%2c9.26h0a3.26%2c3.26%2c0%2c0%2c0%2c0%2c4.6%2c3.79%2c3.79%2c0%2c0%2c0%2c2.58%2c1.21%2c2.55%2c2.55%2c0%2c0%2c0%2c1.85-.81h0L20.4%2c7.46a1.83%2c1.83%2c0%2c0%2c0%2c.5-1.39%2c2.24%2c2.24%2c0%2c0%2c0-.63-1.44%2c1.85%2c1.85%2c0%2c0%2c0-2.61%2c0h0L7.43%2c14.73a.48.48%2c0%2c0%2c0%2c0%2c.67.48.48%2c0%2c0%2c0%2c.34.14.46.46%2c0%2c0%2c0%2c.34-.14l7.36-7.28a1%2c1%2c0%2c0%2c1%2c1.48%2c0A1%2c1%2c0%2c0%2c1%2c17%2c9.6h0L9.6%2c16.88h0a2.66%2c2.66%2c0%2c0%2c1-3.65%2c0%2c2.55%2c2.55%2c0%2c0%2c1%2c0-3.63L16.17%2c3.15a4%2c4%2c0%2c0%2c1%2c5.59%2c0A4.31%2c4.31%2c0%2c0%2c1%2c23%2c6%2c3.89%2c3.89%2c0%2c0%2c1%2c21.88%2c8.94Z'/%3e %3c/svg%3e\");--di-paperclip-wit:url(\"data:image/svg+xml,%3csvg id='paperclip' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' style='color: white%3b'%3e %3cpath fill='currentColor' d='M21.88%2c8.94%2c10%2c20.6A4.63%2c4.63%2c0%2c0%2c1%2c6.62%2c22h0a5.78%2c5.78%2c0%2c0%2c1-4.05-1.81%2c5.34%2c5.34%2c0%2c0%2c1%2c0-7.56l9.3-9.26a1%2c1%2c0%2c1%2c1%2c1.48%2c1.48l-9.3%2c9.26h0a3.26%2c3.26%2c0%2c0%2c0%2c0%2c4.6%2c3.79%2c3.79%2c0%2c0%2c0%2c2.58%2c1.21%2c2.55%2c2.55%2c0%2c0%2c0%2c1.85-.81h0L20.4%2c7.46a1.83%2c1.83%2c0%2c0%2c0%2c.5-1.39%2c2.24%2c2.24%2c0%2c0%2c0-.63-1.44%2c1.85%2c1.85%2c0%2c0%2c0-2.61%2c0h0L7.43%2c14.73a.48.48%2c0%2c0%2c0%2c0%2c.67.48.48%2c0%2c0%2c0%2c.34.14.46.46%2c0%2c0%2c0%2c.34-.14l7.36-7.28a1%2c1%2c0%2c0%2c1%2c1.48%2c0A1%2c1%2c0%2c0%2c1%2c17%2c9.6h0L9.6%2c16.88h0a2.66%2c2.66%2c0%2c0%2c1-3.65%2c0%2c2.55%2c2.55%2c0%2c0%2c1%2c0-3.63L16.17%2c3.15a4%2c4%2c0%2c0%2c1%2c5.59%2c0A4.31%2c4.31%2c0%2c0%2c1%2c23%2c6%2c3.89%2c3.89%2c0%2c0%2c1%2c21.88%2c8.94Z'/%3e %3c/svg%3e\");}:host *,:host *::after,:host *::before{box-sizing:border-box}:host .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}:host .dso-attachments{color:var(--dso-attachments-counter-color, #666);display:inline-block;font-weight:400;text-decoration:none;white-space:nowrap;}:host .dso-attachments::after{background:var(--dso-icon, var(--di-paperclip-grijs)) no-repeat;background-position:center;background-size:cover;height:1.5em;vertical-align:top;width:1.5em;content:\"\";display:inline-block}";

const AttachmentsCounter = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
  }
  render() {
    return (h("span", { class: "dso-attachments" }, this.count, " ", h("span", { class: "sr-only" }, "bijlage", this.count !== 1 ? 'n' : '')));
  }
  static get style() { return attachmentsCounterCss; }
};

const badgeCss = ":host{}:host *,:host *::after,:host *::before{box-sizing:border-box}:host .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}:host .dso-badge{background-color:#666;border-radius:1em;color:#fff;display:inline-block;font-size:0.875em;line-height:1em;padding:4px 8px}:host .dso-badge.badge-info{background-color:#6ca4d9;color:#191919}:host .dso-badge.badge-primary{background-color:#275937;color:#fff}:host .dso-badge.badge-success{background-color:#39870c;color:#fff}:host .dso-badge.badge-warning{background-color:#dcd400;color:#191919}:host .dso-badge.badge-danger{background-color:#ce3f51;color:#fff}";

const Badge = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
  }
  render() {
    return (h("span", { class: clsx('dso-badge', { [`badge-${this.status}`]: this.status }) }, h("span", { class: "sr-only" }, this.status ? Badge.statusMap.get(this.status) : 'Badge', ": "), h("slot", null)));
  }
  static get style() { return badgeCss; }
};
Badge.statusMap = new Map([
  ['primary', 'Primair'],
  ['success', 'Gelukt'],
  ['info', 'Opmerking'],
  ['warning', 'Waarschuwing'],
  ['danger', 'Fout']
]);

const highlightBoxCss = ":host{display:block;}:host *,:host *::after,:host *::before{box-sizing:border-box}:host .dso-highlight-box{background-color:#e5e5e5;margin-top:16px;padding:16px}:host .dso-highlight-box.dso-white{background-color:#fff}:host .dso-highlight-box.dso-yellow{background-color:#f8f6cc}:host .dso-highlight-box.dso-drop-shadow{box-shadow:0 6px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 8px 0 rgba(0, 0, 0, 0.1)}:host .dso-highlight-box.dso-border{background-color:#fff;border:1px solid #ccc;padding:15px}:host .dso-highlight-box.dso-has-counter{margin-top:48px}:host .dso-highlight-box.dso-has-counter{padding-top:40px;position:relative}:host .dso-highlight-box .dso-step-counter{background-color:#39870c;border:8px solid #79b929;border-radius:50%;box-sizing:content-box;color:#fff;font-size:1.25em;font-weight:500;height:32px;left:16px;line-height:32px;position:absolute;text-align:center;top:-24px;width:32px}:host .dso-highlight-box .btn-link:not([disabled]),:host dso-highlight-box .btn-link:not([disabled]){color:#000}:host .dso-highlight-box .btn-link:not([disabled]):hover,:host .dso-highlight-box .btn-link:not([disabled]):hover dso-icon,:host .dso-highlight-box .btn-link:not([disabled]):hover svg.di,:host .dso-highlight-box .btn-link:not([disabled]):focus,:host .dso-highlight-box .btn-link:not([disabled]):focus dso-icon,:host .dso-highlight-box .btn-link:not([disabled]):focus svg.di,:host dso-highlight-box .btn-link:not([disabled]):hover,:host dso-highlight-box .btn-link:not([disabled]):hover dso-icon,:host dso-highlight-box .btn-link:not([disabled]):hover svg.di,:host dso-highlight-box .btn-link:not([disabled]):focus,:host dso-highlight-box .btn-link:not([disabled]):focus dso-icon,:host dso-highlight-box .btn-link:not([disabled]):focus svg.di{color:#666;text-decoration:underline}:host .dso-highlight-box:not(.dso-border):not(.dso-drop-shadow) a:not(.btn),:host .dso-highlight-box:not(.dso-border):not(.dso-drop-shadow) a:visited:not(.btn),:host dso-highlight-box:not([border]):not([drop-shadow]) a:not(.btn),:host dso-highlight-box:not([border]):not([drop-shadow]) a:visited:not(.btn){color:#191919}:host-context(.row.dso-equal-heights){height:100%;min-height:auto}:host-context(.row.dso-equal-heights)>.dso-highlight-box{min-height:auto}:host-context(.row.dso-equal-heights)>.dso-highlight-box.dso-has-counter{height:calc(100% - 48px)}:host-context(.row.dso-equal-heights)>.dso-highlight-box:not(.dso-has-counter){height:calc(100% - 16px)}";

const HighlightBox = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
  }
  render() {
    var _a;
    const hasCounter = this.step || !!this.element.querySelector('[slot=icon]');
    const classes = clsx('dso-highlight-box', {
      'dso-yellow': this.yellow,
      'dso-border': this.border,
      'dso-white': this.white,
      'dso-drop-shadow': this.dropShadow,
      'dso-has-counter': hasCounter
    });
    return (h("div", { class: classes }, hasCounter && (h("div", { class: "dso-step-counter" }, (_a = this.step) !== null && _a !== void 0 ? _a : (h("slot", { name: "icon" })))), h("slot", null)));
  }
  get element() { return this; }
  static get style() { return highlightBoxCss; }
};

const iconCss = ":host{display:inline-block;height:1.5em;vertical-align:top;width:1.5em}:host *,:host *::after,:host *::before{box-sizing:border-box}:host svg.di{height:1.5em;vertical-align:top;width:1.5em}";

const Icon = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
  }
  render() {
    return (h("svg", { class: clsx('di', this.icon) }, h("use", { href: `${getAssetPath('./icon-assets/dso-icons.svg')}#${this.icon}` })));
  }
  static get assetsDirs() { return ["icon-assets"]; }
  static get style() { return iconCss; }
};

const labelCss = ":host{display:inline-block;}:host *,:host *::after,:host *::before{box-sizing:border-box}:host .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}:host .dso-label{background-color:#e4f1d4;border:1px solid #e4f1d4;border-radius:4px;color:#275937;display:inline-block;line-height:1em;padding:4px 8px}:host .dso-label.dso-label-info{background-color:#6ca4d9;border:1px solid #6ca4d9;color:#191919}:host .dso-label.dso-label-primary{background-color:#275937;border:1px solid #275937;color:#fff}:host .dso-label.dso-label-success{background-color:#39870c;border:1px solid #39870c;color:#fff}:host .dso-label.dso-label-warning{background-color:#dcd400;border:1px solid #dcd400;color:#191919}:host .dso-label.dso-label-danger{background-color:#ce3f51;border:1px solid #ce3f51;color:#fff}";

const Label = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
  }
  render() {
    const status = this.status && Label.statusMap.get(this.status);
    return (h("span", { class: clsx('dso-label', { [`dso-label-${this.status}`]: this.status }) }, status && (h("span", { class: "sr-only" }, status, ": ")), h("slot", null), h("slot", { name: "action" })));
  }
  static get style() { return labelCss; }
};
Label.statusMap = new Map([
  ['primary', 'Primair'],
  ['info', 'Info'],
  ['success', 'Succes'],
  ['warning', 'Waarschuwing'],
  ['danger', 'Gevaar']
]);

const progressBarCss = ":host{display:block;}:host *,:host *::after,:host *::before{box-sizing:border-box}:host .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}:host .progress{background-color:#fff;border:1px solid #39870c;height:16px;margin-bottom:calc(16px + 1em);position:relative}:host .progress-bar{background-color:#39870c;color:#fff;float:left;font-size:14px;height:100%;line-height:16px;text-align:center;width:0%}:host .progress-bar>span:not(.sr-only){color:#191919;left:0;position:absolute;top:calc(100% + 8px)}";

const ProgressBar = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
    this.min = 0;
    this.max = 100;
  }
  render() {
    const progress = Math.round(this.progress / this.max * 100);
    return (h("div", { class: "progress" }, h("div", { class: "progress-bar", role: "progressbar", "aria-valuenow": progress, "aria-valuemin": this.min, "aria-valuemax": this.max, style: { width: `${progress}%` } }, h("span", null, h("slot", null, `${progress}%`)))));
  }
  static get style() { return progressBarCss; }
};

const whiteboxCss = ":host{display:block;}:host *,:host *::after,:host *::before{box-sizing:border-box}:host .dso-whitebox{background:#fff;box-shadow:0 6px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 8px 0 rgba(0, 0, 0, 0.1);margin-bottom:56px;min-height:540px;padding:16px 24px 0;position:relative;top:56px}:host .dso-whitebox .dso-whitebox-title h2{margin:0 0 48px}:host .dso-whitebox .dso-whitebox-link{margin-bottom:32px;text-align:center}:host .dso-whitebox .dso-whitebox-icon{margin-bottom:32px;text-align:center}:host .dso-whitebox .dso-whitebox-icon img{height:160px;width:160px}:host .dso-whitebox.dso-has-counter{min-height:580px}:host .dso-whitebox.dso-has-counter{padding-top:40px;position:relative}:host .dso-whitebox .dso-step-counter{background-color:#39870c;border:8px solid #79b929;border-radius:50%;box-sizing:content-box;color:#fff;font-size:1.25em;font-weight:500;height:32px;left:16px;line-height:32px;position:absolute;text-align:center;top:-24px;width:32px}:host .dso-whitebox-small{background:#fff;box-shadow:0 6px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 8px 0 rgba(0, 0, 0, 0.1);margin-bottom:56px;min-height:200px;padding:24px 16px 16px;position:relative;top:56px}:host .dso-whitebox-small a{text-decoration:none}:host .dso-whitebox-small a:hover .dso-whitebox-link{border-bottom:4px solid #39870c}:host .dso-whitebox-small .dso-whitebox-icon{display:block;margin-bottom:16px;text-align:center}:host .dso-whitebox-small .dso-whitebox-icon img{height:80px;width:80px}:host .dso-whitebox-small .dso-whitebox-link{border-bottom:4px solid transparent;color:#39870c;display:block;font-size:1rem;font-weight:bold;line-height:1.167;padding-bottom:4px;text-align:center}";

const WhiteBox = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
  }
  render() {
    var _a;
    const whiteboxClass = this.small ? 'dso-whitebox-small' : 'dso-whitebox';
    const hasCounter = this.step || !!this.element.querySelector('[slot=icon]');
    const classes = clsx(whiteboxClass, {
      'dso-has-counter': hasCounter
    });
    return (h("div", { class: classes }, hasCounter && (h("div", { class: "dso-step-counter" }, (_a = this.step) !== null && _a !== void 0 ? _a : (h("slot", { name: "icon" })))), this.small ? (h("a", { href: "#" }, h("span", { class: "dso-whitebox-icon" }, h("slot", { name: "img" })), h("span", { class: "dso-whitebox-link" }, this.label))) : (h("p", null, "ik ben groot"))));
  }
  get element() { return this; }
  static get style() { return whiteboxCss; }
};

const DsoAlert = /*@__PURE__*/proxyCustomElement(Alert, [1,"dso-alert",{"status":[1]}]);
const DsoAttachmentsCounter = /*@__PURE__*/proxyCustomElement(AttachmentsCounter, [1,"dso-attachments-counter",{"count":[2]}]);
const DsoBadge = /*@__PURE__*/proxyCustomElement(Badge, [1,"dso-badge",{"status":[1]}]);
const DsoHighlightBox = /*@__PURE__*/proxyCustomElement(HighlightBox, [1,"dso-highlight-box",{"yellow":[4],"border":[4],"white":[4],"dropShadow":[4,"drop-shadow"],"step":[2]}]);
const DsoIcon = /*@__PURE__*/proxyCustomElement(Icon, [1,"dso-icon",{"icon":[1]}]);
const DsoLabel = /*@__PURE__*/proxyCustomElement(Label, [1,"dso-label",{"status":[1]}]);
const DsoProgressBar = /*@__PURE__*/proxyCustomElement(ProgressBar, [1,"dso-progress-bar",{"progress":[2],"min":[2],"max":[2]}]);
const DsoWhitebox = /*@__PURE__*/proxyCustomElement(WhiteBox, [1,"dso-whitebox",{"small":[4],"label":[1],"step":[2]}]);
const defineCustomElements = (opts) => {
  if (typeof customElements !== 'undefined') {
    [
      DsoAlert,
  DsoAttachmentsCounter,
  DsoBadge,
  DsoHighlightBox,
  DsoIcon,
  DsoLabel,
  DsoProgressBar,
  DsoWhitebox
    ].forEach(cmp => {
      if (!customElements.get(cmp.is)) {
        customElements.define(cmp.is, cmp, opts);
      }
    });
  }
};

export { DsoAlert, DsoAttachmentsCounter, DsoBadge, DsoHighlightBox, DsoIcon, DsoLabel, DsoProgressBar, DsoWhitebox, defineCustomElements };
