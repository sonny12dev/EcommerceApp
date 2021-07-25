import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { EncodeItemService } from 'src/app/service/encode-item.service';

@Component({
  selector: 'encode-item',
  templateUrl: './encode-item.component.html',
  styleUrls: ['./encode-item.component.scss']
})
export class EncodeItemComponent implements OnInit {

  encodeItemForm: FormGroup;
  dataSuccess: any;
  imageData: string;

  constructor(
    private formBuilder: FormBuilder,
    private itemService: EncodeItemService
    ) { }

  ngOnInit(): void {

    this.encodeItemForm = this.formBuilder.group({
      itemName: new FormControl(),
      itemDescription: new FormControl(),
      image: new FormControl(null),
      amount: new FormControl()
    });
  }

  postItem(){
    //console.log(this.encodeItemForm.value.itemName);

    // let newItemData = {
    //   itemName: this.encodeItemForm.value.itemName,
    //   itemDescription: this.encodeItemForm.value.itemDescription,
    //   //imagePath: this.encodeItemForm.value.image,
    //   amount: this.encodeItemForm.value.amount
    // }

    //console.log(newItemData);

    // this.itemService.addItem(newItemData).subscribe( data => {
      this.itemService.addItem(
        this.encodeItemForm.value.itemName,
        this.encodeItemForm.value.itemDescription,
        this.encodeItemForm.value.amount,
        this.encodeItemForm.value.image)
        .subscribe( data => {
      //console.log('added');
      console.log(data['success']);
      console.log(data['msg']);
      this.encodeItemForm.reset();
    });
  }

  onFileSelect(event: Event){
    const file = (event.target as HTMLInputElement).files[0]; //This is to access or get only the first files during the user selects
    this.encodeItemForm.patchValue({ image: file }); //This will get the file
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];

    if(file && allowedMimeTypes.includes(file.type)){
      const reader =  new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
