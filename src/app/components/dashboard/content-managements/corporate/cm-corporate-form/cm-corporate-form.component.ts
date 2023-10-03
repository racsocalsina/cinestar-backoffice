import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Actions, AlertTypes, Trades } from '@tools/enums';
import { ContentManagementService } from '@services/content-management.service';
import { formData } from 'app/tools/general-functions';

@Component({
    selector: 'app-cm-corporate-form',
    templateUrl: './cm-corporate-form.component.html',
    styleUrls: ['./cm-corporate-form.component.scss'],
})
export class CMCorporateFormComponent implements OnInit {
    form: FormGroup;
    deleted: any;
    tradeName: string;

    @Input() data: any;
    @Output() eventShowAlert: EventEmitter<any> = new EventEmitter();
    @Output() eventClearMessage: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private contentManagementService: ContentManagementService
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        this.tradeName = this.data.trade_name;
        this.setData();
    }

    addItem() {
        let items = this.form.get('services') as FormArray;
        items.push(this.createItemForm());
    }

    deleteItem(item) {
        let key = item.get('key').value;
        let id = item.get('id').value;
        let items = this.form.get('services') as FormArray;
        items.removeAt(items.value.findIndex((x) => x.key === key));

        let itemHasId = id !== null;
        if (itemHasId) {
            let itemDeleted = this.data.services.find((e) => {
                return e.id === id;
            });

            this.deleted.push(itemDeleted);
        }
    }

    uploadFileImage(file) {
        if (file == null) this.form.controls.image.setValue(null);
        else {
            this.form.patchValue({
                image: file,
            });
        }
    }

    private setData() {
        this.deleted = [];
        this.form.patchValue({
            title: this.data.title,
            email: this.data.email,
            description: this.data.description,
        });

        let items = this.form.get('services') as FormArray;

        if (this.data.services) {
            this.data.services.forEach((element) => {
                items.push(this.createItemForm(element));
            });
        }
    }

    private createForm() {
        this.form = this.fb.group({
            title: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            description: [null, [Validators.required]],
            image: [null, null],
            services: this.fb.array([]),
        });
    }

    createItemForm(element = null): FormGroup {
        const uuid = uuidv4();

        return this.fb.group({
            action: element ? Actions.UPDATE : Actions.CREATE,
            key: uuid,
            id: element ? element.id : null,
            title: element
                ? [element.title, [Validators.required]]
                : [null, [Validators.required]],
            image_url: element ? element.image : null,
            image: null,
            description: element
                ? [element.description, [Validators.required]]
                : [null, [Validators.required]],
        });
    }

    uploadFile(file, item = null) {
        if (item == null) this.form.controls.image.setValue(file);
        else {
            let key = item.get('key').value;

            let items = this.form.get('services') as FormArray;
            let itemFound = items.at(
                items.value.findIndex((x) => x.key === key)
            );

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
            this.contentManagementService.saveCorporate(data).subscribe(
                (res: any) => {
                    this.eventShowAlert.emit({
                        type: AlertTypes.SUCCESS,
                        message: `Se han guardado correctamente los cambios para ${this.tradeName.toLowerCase()}`,
                    });
                },
                (e) => {
                    this.eventShowAlert.emit({
                        type: AlertTypes.ERROR,
                        message: e.error.message,
                    });
                }
            );
        } else {
            this.eventShowAlert.emit({
                type: AlertTypes.WARNING,
                message: 'Por favor verifique algunos datos requeridos',
            });
        }
    }

    dataToSend() {
        let value = this.form.value;
        value.trade_name = this.tradeName;

        let form = formData(value);
        let lastIndex = 0;

        value.services.forEach((e, index) => {
            if (e.action) form.append(`services[${index}][action]`, e.action);

            if (e.id) form.append(`services[${index}][id]`, e.id);

            if (e.title) form.append(`services[${index}][title]`, e.title);

            if (e.description)
                form.append(`services[${index}][description]`, e.description);

            if (e.image) form.append(`services[${index}][image]`, e.image);

            lastIndex = index;
        });

        this.deleted.forEach((e) => {
            lastIndex += 1;
            form.append(`services[${lastIndex}][action]`, Actions.DELETE);
            form.append(`services[${lastIndex}][id]`, e.id);
        });

        return form;
    }
}
