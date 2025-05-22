import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent {

  presentation:string = 'My devtag is NewmanDev';

  cardData = {
    imageUrl: "https://placehold.co/500x150",
    title: "Placeholder title",
    description: "Dolore duis qui velit exercitation sunt veniam dolore et labore pariatur excepteur."
  }

  onTitleChange(event:any) : void {
    console.log(typeof(event));
    this.cardData.title = event.target.value;
  }

  changeTitle() : void {
    this.cardData.title = "NewTitle"
  }

}
