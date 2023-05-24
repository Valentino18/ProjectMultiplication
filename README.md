## Project Multiplication

Repo : https://github.com/Valentino18/ProjectMultiplication
<br>
TD : https://slam-vinci-melun.github.io/sio22/phase2/TP-3.2-Angular-Multiplication.pdf
<br>
Durée de réalisation : 4h

Pour lancer le projet :

git clone https://github.com/Valentino18/ProjectMultiplication
cd ProjectMultiplication 
npm i (install)
ng serve (pour Lancer le serveur)

### Description du Project

Partie 1 :

On souhaite concevoir une application web qui affiche une table de multiplication (1 à 10 voir plus), selon une valeur soumise par l’utilisateur.

<img width="221" alt="image" src="https://user-images.githubusercontent.com/38391212/142346722-85f9042a-3bbf-4409-9b5f-a6f893fb3513.png">

Partie 2 :

On souhaite concevoir une application web qui affiche les table de multiplications, selon une valeur soumise par l’utilisateur.

Choix 1 : Entrez une valeur // Choix 2 : Selectionner une valeur de 1 à 10 :

<img width="546" alt="image" src="https://user-images.githubusercontent.com/38391212/142346775-fd5b3b2e-916a-487c-a02e-d85c74b2c57e.png">

J'ai choisi le choix un pour le test et comme valeur 3, il a donc affiché la table de multiplication 1 / 2 / 3, Si je souhaite modifié après cette valeur il faudra que j'utilise le selecteur pour varié de 1 à 10.

### Configuration du Project

Création du Project :

```
ng new ProjectMultiplication --style=css --routing=false
```

Créations des components :

```
ng generate component components/TableMultiplication

ng generate component components/TablesMultiplication
```

Description technique du Projet :

- Partie 1 :

app.component.html :

```
<p class="subtitle"> Multiplier par un nombre : </p>
        <form [formGroup]="nbForm" (ngSubmit)="forMultiplication()">
          <div class="field">
            <label class="label"></label>
            <div class="control">
              <input class="input is-success" formControlName="nombre" type="number" placeholder="Entrez un nombre"
                value="">
                <div *ngIf="badNumber" class="help-block">
                  <div *ngIf="badNumber">Un nombre a multiplier est demandé !</div>
                </div>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link">Soumettre</button>
            </div>
          </div>
        </form>
        <br>
        <div *ngIf="isSubmitted">
          <app-table-multiplication [nbChoose]="nbChoose"></app-table-multiplication>
        </div>
```

Étape 1 : Entrez un Nombre 
Étape 2 : Appelle la function forMultiplication() lorsque l'utilisateur aura appuyé sur le button Soumettre (isSubmitted = sera alors a true) et enverra la valeur a table-multiplication
Étape 2 : Si c'est autre chose qu'un nombre qui est envoyé comme valheur alros badNumber réagit et retourne "Un nombre a multiplier est demandé !" en dessous de l'input 

Tout cela s'executera dans le code app.component.ts :

Valeur a initié de base :

```
  nbForm!: FormGroup;
  nbChoose: number = 0;
  isSubmitted = false;
  badNumber = false;

ngOnInit(): void {
    this.nbForm = new FormGroup({
      nombre: new FormControl(''),
      nbChoose: new FormControl(''),
    });
```

Nous allons définir quelque variable et valeur que nous allons réutiliser dans le code et récuper la valeur de nombre en passant par le nbForm 
pour pouvoir être réutilisé dans la function forMultiplication : 

```
forMultiplication() {
    this.isSubmitted = true;
    if(this.nbForm.value.nombre !== '' && this.nbForm.value.nombre != null) {
      this.badNumber = false;
      this.nbChoose = this.nbForm.value.nombre;
    } else {
      this.isSubmitted = false;
      this.badNumber = true;
      return;
    }
  }
  ```

  Elle effectura le changement de status pour la variable isSubmitted, Verifira que la valeur n'est pas blank ou incorrect si c'est le cas elle affichera le message d'erreur décrit plus haut, si c'est valide alors elle enverra la variable a l'enfant table-multiplication.

  dans table-multiplication nous allons récuper la variable nbChoose que qui a été défini dans app.component et crée un tableau de nombre a multiplier (de 1 à 10 puisque nous voulons multiplier jusqu'a 10)

Il faudra rajouté Input dans le import : 

```
import { Component, OnInit, Input } from '@angular/core';
```

Et voici le code pour récuperer la valeur et la création du tableau :

  ```
@Input() nbChoose!: number;

nbMultiplications: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  ```

  Puis dans le table-multiplication.component.html 
  On va retourner un tableau sous forme de boucle for pour pouvoir éffectuer les 10 multiplications de la valeur définie :

```
  <table>
    <tr><th>Table pour le nombre {{nbChoose}}</th></tr>
    <tr *ngFor="let nb of nbMultiplications"> {{nbChoose}} x {{nb}} = {{nbChoose * nb}} </tr>
</table>
```

(on va donc récuperer les valeurs du tableau que l'ont va définir nb et les multiplie par le nombre choisi  donc : nbChoose * nb)

- Partie 2 : 

app-component.html :

```
 <p class="subtitle"> Afficher les tables de multiplication (input) : </p>
          <div class="group">
            <form [formGroup]="nbForm" (ngSubmit)="forMultiplicationTAB(nbChoose)">
              <input class="input is-success" formControlName="nbChoose" type="number" placeholder="Entrez un nombre">
              <div class="field is-grouped">
              <div class="control">
                <button class="button">Soumettre</button>
              </div>
            </div>
          </form>
              <br>
              <p class="subtitle"> Ou via un choix sous forme de tableau : </p>
              <table class="nombre">
              <td>
                <input *ngFor="let nbChoose of nbBouton" type='button'
                  (click)='forMultiplicationTAB(nbChoose) ' value='{{nbChoose}}' />
              </td>
            </table>
          </div>
          <div *ngIf="isSubmitted2">
            <app-tables-multiplication [nbChoose]="nbChoose"></app-tables-multiplication>
        </div>
```

On va ajouter 2 possibilité : une possibilité d'entrez le nombre que le veux si nous souhaitons afficher les 20 premières tables ou alors si jamais la valuer de l'input est invalide on va affiché par default les 10 premières tables de multiplications

Choix par défault car caractère alphabétique dans l'input : 

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/38391212/142348255-557e6cdf-fa31-4ecb-9686-0040d78b075a.png">

le premier option est un form qui va donc être récupere dans app.components.ts via un new formControl

```
      nbChoose: new FormControl(''),
```

Et qui va grace a l'input de l'utilisateur si il met 20 ou 30 affichera les 20/30 tables de multiplication Il faudra alors appuyez sur le button submit pour valider le choix et alors définir isSubmitted 2 comme true pour pouvoir envoyez la valuer :

```
<app-tables-multiplication [nbChoose]="nbChoose"></app-tables-multiplication>
```

Et cela va executer la function forMultiplciationTAB dans le fichier app.component.ts

La deuxième option, on ne va pas avoir besoin de form car elle enverra la valeur automatiquement dans la function en passant par forMultiplicationTAB(NBChoose) lorsque ont va cliqué sur l'un des buttons,  on va définir le selecteur de 1 à 10 comme demander dans le TD : 

```
  nbBouton: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

Une boucle for grade a ng sera executé pour afficher les 10 buttons input avec la valeur de celui-ci 

Regardons la function forMultiplicationTAB de plus près :

```
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
```

Étape 1 : Si la valeur par la méthod 1 est executé alors je définie le isSubmitted2 comme valeur true et je donne la valeur a la variable NBChoose, si la méthod1 est utilisé mais de la mauvaise manière par exemple Variable String au lieu de Number alors il va définir la variable NBChoose comme étant 10 par default
Étape 2 : Si je suis passé par la méthod 2 le selecteur alors je définie directement this.NbChoose comme étant NBChoose du selecteur 

On va maintenant passé a l'affichage dans tables-multiplication (c'est a dire l'enfant), L'enfant récupère alors la valeur du parent.

Fichier tables-mutliplications.component.ts :

```
import { Component, OnInit, Input } from '@angular/core';

  @Input() nbChoose!: number;
```

Et dans l'affichage html nous allons tous simplement appelé la Partie 1 pour chaque Nombre 

```
 <td *ngFor="let item of [].constructor(nbChoose); let i = index">
```

On va donc récupérer par exemple nbChoose = 5 on va récupere 1,2,3,4,5 et le définir grace a la méthod via le constructor on aurait aussi pu faire un .map

```
 <table>
                <app-table-multiplication [nbChoose]="i + 1"></app-table-multiplication>
            </table>
        </td>
```

On va ensuite réutilisé la partie pour chaque valeur trouvé entre 1 jusqu'a nbChoose cela nous permettra d'avoir toutes les tables d'afficher 

Par exemple voila un affichage avec 16 il va donc afficher toutes les tables de multiplication compris de 1 à 16 (1 2 3 4 5 ....)

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/38391212/142349587-aa0389aa-d8a6-44da-acaf-dfac43dfcac4.png">

### Conclusion 

Ce projet ma permis de bien comprendre le framework Angular, j'ai pu découvrir la puissance de NG et les différentes possibilités de l'utiliser pour faire des boucles ou encore des IF ayant des connaissances en Typescript je n'ai pas eu grande difficulté à effectuer ce TD, ma seule difficulté a été de bien comprendre le mode Parent/Enfant d'angualr mais une fois cela comprit j'ai pu mieux m'y retrouver.
<br>
J'ai appris seulement le mercredi 17 novembre que mes camarades avaient effectué ce TD je tenais à le faire tout d'abord pour éviter d'être trop en retard sur eux, mais c'était aussi intérresant à effectuer.
<br>
Je ne sais pas si j'ai bien respecté les consignes données puisque je n'ai pas pu demander d'aide où des explications à par a Google :), je pense que j'aurais pu améliorer mon README et je n'ai pas pu réaliser comme demandé les diagrammes ULM (je n'ai pas du tout compris ce qu'il fallait faire j'ai donc juste lu https://blog.anoff.io/2018-07-31-diagrams-with-plantuml/ mais je n'ai compris comment l'utiliser sur mon projet)
<br>
Il manque aussi de design CSS mais je me sentais pas de la faire, j'ai juste éffectuer quelque chose de fonctionnelle.

