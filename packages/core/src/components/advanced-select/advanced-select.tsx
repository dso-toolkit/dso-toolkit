import {Component, ComponentInterface, Prop, h, FunctionalComponent} from "@stencil/core";

import {AdvancedSelectOption, AdvancedSelectOptionsOrGroup} from "./advanced-select.models";

@Component({
  tag: "dso-advanced-select",
  styleUrl: "advanced-select.scss",
  shadow: true,
})
export class AdvancedSelect implements ComponentInterface {
  /**
   * The options to display in the select.
   */
  @Prop()
  options: AdvancedSelectOptionsOrGroup<any>[] = [];

  /**
   * The active option. By object reference.
   */
  @Prop()
  active?: AdvancedSelectOption<any>;

  /**
   * The open state of the options list.
   */
  @Prop()
  open?: boolean;

  render() {
    return (
      <div>
        <div class={{"active-option": true, "open": this.open === true}}>
          <span class="active-option-label">{this.active?.label ?? 'Selecteer een optie'}</span>
          <div class="active-option-aside">
            {this.options.some(option => 'summaryCounter' in option && option?.summaryCounter) ?
              <div class="badges">
                {this.options.filter(option => 'summaryCounter' in option && option?.summaryCounter).map(option => {
                  if ('options' in option) {
                    return <dso-badge status={option.variant ?? 'outline'}>{option.options.length}</dso-badge>;
                  }
                })}
              </div> : ''}
            <dso-icon icon="caret-down"></dso-icon>
          </div>
        </div>
        <div class={{"groups-container": true, "open": this.open === true}}>
          <div class="groups">
            {this.options.map(optionsOrGroup => {
              if ('options' in optionsOrGroup) {
                return <div class={{"group": true, [`group-${optionsOrGroup.variant ?? 'outline'}`]: true}}>
                  {optionsOrGroup.label && <p class="group-label">{optionsOrGroup.label}</p>}
                  <div class="options">
                    {optionsOrGroup.options.map(option => (
                      <OptionElement option={option} active={this.active}/>
                    ))}
                  </div>
                  {optionsOrGroup.redirect && <a class="group-link" href={optionsOrGroup.redirect.href}>
                    {optionsOrGroup.redirect.label}
                      <dso-icon icon="chevron-right"></dso-icon>
                  </a>}
                </div>
              }
              return <OptionElement option={optionsOrGroup} active={this.active}/>
            })}
          </div>
        </div>
      </div>
    );
  }
}

const OptionElement: FunctionalComponent<{
  option: AdvancedSelectOption<any>;
  active?: AdvancedSelectOption<any>;
}> = ({option, active}) => <div class={{"option": true, "option-active": active === option}}>
  <span class="option-label">{option.label}</span>
</div>
