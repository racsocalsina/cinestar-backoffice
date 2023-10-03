import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import {Actions, AlertTypes, Trades} from "@tools/enums";
import { ContentManagementService } from '@services/content-management.service';
import { formData } from 'app/tools/general-functions';

@Component({
  selector: 'app-cm-about-form',
  templateUrl: './cm-about-form.component.html',
  styleUrls: ['./cm-about-form.component.scss']
})
export class CMAboutFormComponent implements OnInit {      
  form: FormGroup;  
  deleted: any;
  tradeName: string;
  
  @Input() data: any;  
  @Output() eventShowAlert: EventEmitter<any> = new EventEmitter();  
  @Output() eventClearMessage: EventEmitter<any> = new EventEmitter();  

  constructor(private fb: FormBuilder, private contentManagementService: ContentManagementService) { 
    this.createForm();       
  }

  ngOnInit(): void {        
    this.tradeName = this.data.trade_name;
    this.setData();         
  }  
  
  addItem()
  {    
    let items = this.form.get('items') as FormArray;    
    items.push(this.createItemForm());
  }

  deleteItem(item)
  {         
    let key = item.get('key').value;
    let id = item.get('id').value;
    let items = this.form.get('items') as FormArray;      
    items.removeAt(items.value.findIndex(x => x.key === key));

    let itemHasId = id !== null
    if(itemHasId){
      let itemDeleted = this.data.items.find(e => {
        return e.id === id;
      })  
      
      this.deleted.push(itemDeleted);
    }    
  }

  private setData(){        
    this.deleted = [];
    this.form.patchValue({
      title: this.data.title,                 
    });    
    
    let items = this.form.get('items') as FormArray;

    if(this.data.items){
      this.data.items.forEach(element => {                     
        items.push(this.createItemForm(element));           
      });   
    }    
  }

  private createForm(){
    this.form = this.fb.group({           
      title: [null, [Validators.required]],                 
      items: this.fb.array([]) 
    });    
  }   

  createItemForm(element = null): FormGroup {    

    const uuid = uuidv4();

    return this.fb.group({
      action: element ? Actions.UPDATE : Actions.CREATE,  
      key: uuid,
      id: element ? element.id : null,
      description: element ? [element.description, [Validators.required]] : [null, [Validators.required]],               
      image_url: element ? element.image : null,
      image: null
    });
  }

  uploadFile(file, item = null) {   
    if(item == null) 
      this.form.controls.image.setValue(file);     
    else
    {          
      let key = item.get('key').value;
      
      let items = this.form.get('items') as FormArray;      
      let itemFound = items.at(items.value.findIndex(x => x.key === key));

      itemFound.patchValue({
        image: file,         
      });     
    }      
  }
  
  onClickSave() {             
    this.eventClearMessage.emit();
    this.form.markAllAsTouched();
    if (this.form.valid) {      
      let data = this.dataToSend();           
      this.contentManagementService.saveAbout(data).subscribe(
        (res: any) => {               
          this.eventShowAlert.emit({
            type: AlertTypes.SUCCESS,
            message: `Se han guardado correctamente los cambios para ${this.tradeName.toLowerCase()}`
          });                  
        },
        (e) => { 
          this.eventShowAlert.emit({
            type: AlertTypes.ERROR,
            message: e.error.message
          });          
        }
      );         
    } else {
      this.eventShowAlert.emit({
        type: AlertTypes.WARNING,
        message: 'Por favor verifique algunos datos requeridos'
      });
    }    
  }

  dataToSend()
  {        
    let value = this.form.value; 
    value.trade_name = this.tradeName;    

    let form = formData(value);   
    let lastIndex = 0;
            
    value.items.forEach((e, index) => {    
      if(e.action)
        form.append(`items[${index}][action]`, e.action);

      if(e.id)
        form.append(`items[${index}][id]`, e.id);

      if(e.description)
        form.append(`items[${index}][description]`, e.description);

      if(e.image)
        form.append(`items[${index}][image]`, e.image);            

      lastIndex = index;          
    });
    
    this.deleted.forEach(e => {
      lastIndex+=1;
      form.append(`items[${lastIndex}][action]`, Actions.DELETE);
      form.append(`items[${lastIndex}][id]`, e.id);                    
    });        

    return form;
  }
  
}

