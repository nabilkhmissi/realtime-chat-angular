import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.sidebar();
  }


  sidebar() {
    let sidebar = document.getElementById('sidebar') as HTMLElement;

    document.getElementById('sidebar-toggler')!.addEventListener('click', () => {
      let sidebar_display = sidebar.style.transform;
      if (sidebar_display == 'translate(-100%)') {
        sidebar.style.transform = 'translate(0)';
      } else {
        sidebar.style.transform = 'translate(-100%)';
      }
    });
    document.getElementsByClassName('discussion')[0]!.addEventListener('click', () => {
      if ((sidebar.style.transform = 'translate(0)') && (window.innerWidth <= 500)) {
        sidebar.style.transform = 'translate(-100%)';
      }
    });

  }


}
