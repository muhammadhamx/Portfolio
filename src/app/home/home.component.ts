import { Component, ElementRef, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ProjectsComponent } from "../projects/projects.component";
import { ButtonModule } from 'primeng/button';
import { Dock, DockModule } from 'primeng/dock';
import { MenuItem } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { AboutMeComponent } from "../about-me/about-me.component";
import { SkillsComponent } from "../skills/skills.component";
import { ConnectComponent } from "../connect/connect.component";

@Component({
  selector: 'app-home',
  imports: [DockModule, Dock, TooltipModule, MenuModule, ButtonModule, BadgeModule, RippleModule, AvatarModule, CommonModule, AboutMeComponent, ProjectsComponent, SkillsComponent, ConnectComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

})
export class HomeComponent implements OnInit {

  items: MenuItem[] | undefined;
  section: any
  scrollToSection(sectionId: string): void {
    console.log(`Scrolling to section: ${sectionId}`);

    if (sectionId == 'about') {
      this.section = document.getElementById('about-me');
    } else if (sectionId == 'skills') {
      this.section = document.getElementById('my-skills');
    } else if (sectionId == 'projects') {
      this.section = document.getElementById('my-projects');
    } else if (sectionId == 'connect') {
      this.section = document.getElementById('connect-me');
    }

    if (this.section) {
      console.log(`Section found:`, this.section);
      this.section.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    } else {
      console.error(`Section with id "${sectionId}" not found.`);
    }
  }

  ngOnInit() {
    this.items = [
      {
        label: 'About Me',
        icon: 'assets/icons/about-me.gif',
        id: 'about'
      },
      {
        label: 'Skills',
        icon: 'assets/icons/docs.gif',
        id: 'skills'
      },
      {
        label: 'Projects',
        icon: 'assets/icons/cmd.gif',
        id: 'projects'
      },
      {
        label: 'Contact',
        icon: 'assets/icons/link.gif',
        id: 'connect'
      }
    ];
  }

}
