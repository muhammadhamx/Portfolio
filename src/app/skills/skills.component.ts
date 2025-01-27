import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';


@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements AfterViewInit {

  skills = [
    {
      name: 'Frontend',
      items: ['Angular', 'Ionic', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'PrimeNG'],
    },
    {
      name: 'Backend',
      items: ['Node.js', 'Express.js', 'NestJS', 'PostgreSQL', 'MongoDB'],
    },
    {
      name: 'Tools & Platforms',
      items: ['Git', 'GitHub', 'Docker', 'VS Code', 'Figma'],
    },
  ];

  @ViewChild('skillsGrid') skillsGrid!: ElementRef;
  private inView = new Set<number>();

  constructor(private renderer: Renderer2, private el: ElementRef, private cdRef: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges(); // Manually trigger change detection
    const cards = this.el.nativeElement.querySelectorAll('.skill-category');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'in-view');
          } else {
            this.renderer.removeClass(entry.target, 'in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card: Element) => observer.observe(card));
  }
}

