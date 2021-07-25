import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { AddItemService } from 'src/app/service/add-item.service';

@Component({
  selector: 'add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  getAllItemToCart: any;
  contactForm: FormGroup;
  itemQty: number = 1;
  newItem: string;
  valueChangedTracked;
  //itemAmount = [] as any;//THIS IS THE DECLARATION FOR addToCart
  itemAmount: number;
  totalAmount;
  item;

  constructor(
    private addItemService: AddItemService,
    private formBuilder:FormBuilder
    ) {

      //INITIALIZE FORM
      this.contactForm = this.formBuilder.group({
        selectValue: new FormControl(),
        items: this.formBuilder.array([
          this.formBuilder.group({
            itemName: new FormControl(),
            itemPrice: new FormControl(),
            itemQty: new FormControl(),
            itemAmount: new FormControl()
          })
        ])
      });

    }

  ngOnInit(): void {

    //This will get all the data and will be stored in select tag
    this.addItemService.getAllItemToCart().subscribe( data => {
      this.getAllItemToCart = data;
    });

  }

  //TO GET THE INITIAL VALUE OF FORM ARRAY
  get items(){
    return this.contactForm.get('items') as FormArray;
  }

  //WALA SA GIGAMIT KAY NAG CHANGE KO TO ONCLICK
  selectItem(){
    console.log('yow');

  }

  addToCart(){
    let newItem = this.contactForm.value.selectValue;

    //const itemLength = this.items.length + 1; //getting the current id
    const newAddedItem = this.formBuilder.group({
      //itemId: [itemLength],
      itemName: [newItem.itemName],
      itemPrice: [newItem.amount],
      itemQty: [this.itemQty],
      itemAmount: [newItem.amount*this.itemQty]
    });

    //This is to add the created newAddedItem into the html
    this.items.push(newAddedItem);

  }

  calculate(event: any, i){
    //TO GET THE CURRENT VALUE OF INPUT QUANTITY EVERY THERE IS CHANGES
    this.itemQty = event.target.value;

    //THIS IS TO GET THE VALUE OF itemPrice
    let itemPrice: any = (document.getElementById("itemPrice" + i) as HTMLInputElement).value;

    //THIS IS THE FORMULA
    let calculatedAmount: any = this.itemQty*itemPrice;

    //THIS IS TO TELL TYPESCRIPT TO WORK WITH getElementById
    let newAmount = (document.getElementById("itemAmount" + i) as HTMLInputElement);

    //THIS IS TO CHANGE THE itemAmount in html to calculated one
    newAmount.value = calculatedAmount;

    //This will jump to method autoCalculate
    this.autoCalculate();
  }

  removeItem(itemId){
    this.items.removeAt(itemId);
  }

  //This will auto calculate for totalAmount
  autoCalculate(){
    //This will make the itemAmount refresh to zero everytime there is a new quantity to calculate
    this.itemAmount = 0;

    for(let i = 1; i <= this.items.length-1; i ++){

      this.item = document.getElementById("itemAmount" + i) as HTMLInputElement;

      //This adds the total amount
      //And the parseInt is for the HTMLInputElement to convert it to a number so it will add all the itemAmount
      this.itemAmount += parseInt(this.item.value);

    }

    this.totalAmount = document.getElementById("totalAmount") as HTMLInputElement;
    this.totalAmount.innerHTML = "Php " + this.itemAmount;
    //console.log(this.totalAmount);
  }
}
