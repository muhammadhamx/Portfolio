import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {

  downloadResume() {
    const link = document.createElement('a');
    link.href = '../../assets/resume.pdf'; // Path to your resume file
    link.target = '_blank'; // Opens in a new tab
    link.download = 'Muhammad_Hamza_Sajid_Resume.pdf'; // File name for download
    link.click();
  }
}
