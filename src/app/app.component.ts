import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjectMultiplication';
  nbForm!: FormGroup;
  nbChoose: number = 0;
  isSubmitted = false;
  isSubmitted2 = false;
  badNumber = false;
  nbBouton: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  ngOnInit(): void {
    this.nbForm = new FormGroup({
      nombre: new FormControl(''),
      nbChoose: new FormControl(''),
    });
  }

  get formControls() { return this.nbForm.controls; }

  forMultiplication() {
    this.isSubmitted = true;
    console.log(this.nbForm.value.nombre)
    if(this.nbForm.value.nombre !== '' && this.nbForm.value.nombre != null) {
      this.badNumber = false;
      this.nbChoose = this.nbForm.value.nombre;
    } else {
      this.isSubmitted = false;
      this.badNumber = true;
      return;
    }
  }

  forMultiplicationTAB(nbChoose: number) {
      if(this.nbForm.value.nbChoose != null) {
          this.isSubmitted2 = true;
          this.nbChoose = this.nbForm.value.nbChoose;
      } else if (this.nbChoose == 0) {
        this.isSubmitted2 = true;
        this.nbChoose = 10;
      } else {
        this.isSubmitted2 = true;
        this.nbChoose = 10;
      }
      if(nbChoose != 0 && nbChoose != null) {
        this.nbChoose = nbChoose;
      }
    } 
}
