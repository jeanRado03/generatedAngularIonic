import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  formData: any = {};

  constructor(private router: Router) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  submitForm() {
    this.projectService.authentification('utilisateur/authenticate', this.formData).subscribe((response:any) => {
      // Traitez la réponse du serveur ici
      console.log('Réponse du serveur :', response);
      const userId = response.id_user;
      const token = response.token;
      if(userId != null) {
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
        this.router.navigate(['language/language']);
      }
    });
  }

}
