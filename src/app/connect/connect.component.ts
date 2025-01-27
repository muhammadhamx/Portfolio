import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-connect',
  imports: [CommonModule],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.scss'
})
export class ConnectComponent implements AfterViewInit {

  contactInfo = [
    { platform: 'LinkedIn', link: 'https://linkedin.com/in/muhammad-hamza-sajid-033b53232', icon: 'assets/icons/linkedin.gif' },
    { platform: 'GitHub', link: 'https://github.com/muhammadhamx', icon: 'assets/icons/cloud.gif' },
    { platform: 'Twitter', link: 'https://twitter.com/muhammadhamxs', icon: 'assets/icons/twitter.gif' },
    { platform: 'Email', link: 'mailto:muhammadhamzasajid6@gmail.com', icon: 'assets/icons/mail.gif' }
  ];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    // Wait until Angular completes its rendering and the page is fully loaded
    setTimeout(() => {
      const sections = this.el.nativeElement.querySelectorAll('.contact-card');

      // Delay IntersectionObserver initialization slightly to avoid issues on initial load
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            } else {
              entry.target.classList.remove('in-view');
            }
          });
          this.cdr.detectChanges();  // Trigger change detection after the intersection logic
        },
        { threshold: 0.2 }
      );

      // Force a reflow of elements to make sure layout is recalculated
      sections.forEach((section: HTMLElement) => {
        section.offsetHeight;  // Read property to trigger reflow
        observer.observe(section);
      });
    }, 300); // Delay the observer initialization to ensure everything is rendered
  }
}