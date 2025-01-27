import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, AfterViewInit {

  projects = [
    {
      name: 'HR Management System',
      description:
        'An advanced HR system designed to streamline operations and enhance productivity.',
      technologies: ['Angular', 'Material-UI', 'Chart.js', 'Translation'],
      link: 'https://hr-angular-front.vercel.app/overview',
    },
    {
      name: 'Drag-and-Drop Node System',
      description:
        'An interactive node editor for creating, positioning, and connecting nodes.',
      technologies: ['Angular', 'Tailwind', 'ngx-drag-drop', 'ngx-vflow"', 'RxJS'],
      link: 'https://ngx-vflow.vercel.app/',
    },
    {
      name: 'Foodify',
      description:
        'A restaurant management app allowing customers to place orders and chefs to manage them efficiently.',
      technologies: ['Angular', 'Tailwind', 'DaisyUI', 'Chart.js'],
      link: 'https://foodify-three.vercel.app/floors',
    },
    {
      name: 'Costify',
      description:
        'A simple yet powerful expense manager app designed to help users track spending and stay within budget. ',
      technologies: ['Ionic', 'Angular', 'PouchDB', 'Chart.js'],
      link: 'https://costify-six.vercel.app/',
    },
  ];


  constructor(private renderer: Renderer2, private el: ElementRef, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges(); // Manually trigger change detection
    const cards = this.el.nativeElement.querySelectorAll('.project-card');
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
