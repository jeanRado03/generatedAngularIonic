import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {

  public folder!: string
  private activatedRoute = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  public object: any[] = [];
  public foreignkey: any[] = [];
  afficherFormulaire = false;
  updateFormulaire = false;
  formData: any = {};
  public idUpdater!: string
  updateData: any = {};
  public totalPages: number = 0;
  public currentPage: number = 1;
  pages: number[] = [1,2];

  public colfk!: string;

  selectedOptionIndex: number = 0;
  constructor(private router: Router) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.loadBouquets(this.folder, 1);
  }

  loadBouquets(objet: string, page: number) {
    this.projectService.getObjectsAuthenticated(objet,page).subscribe((data: any) => {
      console.log(data);
      this.object = data.donnees;
      this.totalPages = data.page;
      this.pages = Array(this.totalPages).fill(0).map((x, i) => i);

      for (var i in this.object) {
        var obj = this.object[i];
        var keys = Object.keys(obj);
        console.log("Clés de l'objet " + i + ": " + keys.join(", "));

        for (var j in keys) {
          var key = keys[j];
          if (typeof obj[key] === 'object' && obj[key] !== null) {
              var nestedKeys = Object.keys(obj[key]);
              if (nestedKeys.length > 0) {
                  console.log("La clé '" + key + "' contient d'autres clés : " + nestedKeys.join(", "));
                  this.colfk = key;
              }
          }
        }
      }
      console.log("La valeur de colfk est : " + this.colfk);
    });
  }

  loadForeignKey() {
    this.afficherFormulaire = !this.afficherFormulaire;
    if(this.afficherFormulaire==true && this.colfk !== undefined) {
      this.projectService.getObjectsAuthenticated(this.colfk,0).subscribe((data: any) => {
        console.log(data);
        this.foreignkey = data.donnees;
      });
    }
  }

  updateSelectedOption(event: any) {
    this.selectedOptionIndex = this.foreignkey.findIndex(option => option === event);
}

  submitForm() {
    this.projectService.createObject(this.folder, this.formData).subscribe(response => {
      // Traitez la réponse du serveur ici
      console.log('Réponse du serveur :', response);
    });
  }
  deleteItem(item: any) {
    console.log(item);
    this.projectService.deleteObject(this.folder, item.id).subscribe((data: any) => {
      console.log(data);
      this.object = data.donnees;
      this.totalPages = data.page;
      this.pages = Array(this.totalPages).fill(0).map((x, i) => i);
    });
  }

  showUpdate(item: any) {
    this.updateData.id = item.id;
    this.updateFormulaire = !this.updateFormulaire;
    if(this.updateFormulaire==true && this.colfk !== undefined) {
      this.projectService.getObjectsAuthenticated(this.colfk,0).subscribe((data: any) => {
        console.log(data);
        this.foreignkey = data.donnees;
      });
    }
  }
  updateItem() {
    //console.log(this.updateData);
    this.projectService.updateObject(this.folder, this.updateData).subscribe(response => {
      // Traitez la réponse du serveur ici (par exemple, actualisez la liste des éléments)
      console.log('Réponse du serveur :', response);
    });
  }

  loginOut() {
    this.projectService.deleteToken().subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['login/login']);
    });
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadBouquets(this.folder, page);
  }

  functionNext(): void {
    this.goToPage(this.currentPage+1)
  }

  functionPervious(): void {
    this.goToPage(this.currentPage-1)
  }

}
