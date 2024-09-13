import { Directive, Input, ElementRef, HostListener, Renderer2, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements OnDestroy {
  @Input('appTooltip') tooltipText = '';
  private tooltip: HTMLElement | null = null;
  private delay = 400;
  private tooltipDelay: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnDestroy(): void {
    this.clearTooltip();
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.tooltipDelay = setTimeout(() => {
      this.show();
    }, this.delay);
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltipDelay) clearTimeout(this.tooltipDelay);
    this.hide();
  }

  private show() {
    this.create();
    this.setPosition();
    this.renderer.setStyle(this.tooltip, 'opacity', '1');
  }

  private hide() {
    if (this.tooltip) {
      this.renderer.setStyle(this.tooltip, 'opacity', '0');
      setTimeout(() => {
        this.clearTooltip();
      }, 300);
    }
  }

  private create() {
    this.clearTooltip();

    this.tooltip = this.renderer.createElement('div');
    const text = this.renderer.createText(this.tooltipText);
    this.renderer.appendChild(this.tooltip, text);
    this.renderer.appendChild(document.body, this.tooltip);

    this.setTooltipStyles();
  }

  private setTooltipStyles() {
    if (this.tooltip) {
      this.renderer.addClass(this.tooltip, 'tooltip');
      this.renderer.setStyle(this.tooltip, 'position', 'fixed');
      this.renderer.setStyle(this.tooltip, 'background-color', 'black');
      this.renderer.setStyle(this.tooltip, 'color', 'white');
      this.renderer.setStyle(this.tooltip, 'padding', '5px 10px');
      this.renderer.setStyle(this.tooltip, 'border-radius', '3px');
      this.renderer.setStyle(this.tooltip, 'z-index', '1000');
      this.renderer.setStyle(this.tooltip, 'opacity', '0');
      this.renderer.setStyle(this.tooltip, 'transition', 'opacity 0.3s');
    }
  }

  private setPosition() {
    if (this.tooltip) {
      const hostPos = this.el.nativeElement.getBoundingClientRect();
      const tooltipPos = this.tooltip.getBoundingClientRect();

      const top = hostPos.top - tooltipPos.height - 10;
      const left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;

      this.renderer.setStyle(this.tooltip, 'top', `${top}px`);
      this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
    }
  }

  private clearTooltip() {
    if (this.tooltip) {
      this.renderer.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    }
  }
}
