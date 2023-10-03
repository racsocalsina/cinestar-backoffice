import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Actions, AlertTypes, Trades } from '@tools/enums';
import { ContentManagementService } from '@services/content-management.service';
import { formData } from 'app/tools/general-functions';

@Component({
    selector: 'app-cm-partner-form',
    templateUrl: './cm-partner-form.component.html',
    styleUrls: ['./cm-partner-form.component.scss'],
})
export class CMPartnerFormComponent implements OnInit {
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
        let items = this.form.get('benefits') as FormArray;
        items.push(this.createItemForm());
    }

    deleteItem(item) {
        let key = item.get('key').value;
        let id = item.get('id').value;
        let items = this.form.get('benefits') as FormArray;
        items.removeAt(items.value.findIndex((x) => x.key === key));

        let itemHasId = id !== null;
        if (itemHasId) {
            let itemDeleted = this.data.benefits.find((e) => {
                return e.id === id;
            });

            this.deleted.push(itemDeleted);
        }
    }

    private setData() {
        this.deleted = [];
        this.form.patchValue({
            title: this.data.title,
            sub_title: this.data.sub_title,
            description: this.data.description,
            terms: this.data.terms,
        });

        let items = this.form.get('benefits') as FormArray;

        if (this.data.benefits) {
            this.data.benefits.forEach((element) => {
                items.push(this.createItemForm(element));
            });
        }
    }

    private createForm() {
        this.form = this.fb.group({
            title: [null, [Validators.required]],
            sub_title: [null, [Validators.required]],
            description: [null, [Validators.required]],
            terms: [null, [Validators.required]],
            image: [null, null],
            file: [null, null],
            benefits: this.fb.array([]),
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
        });
    }

    uploadFile(file, item = null) {
        if (item == null) this.form.controls.image.setValue(file);
        else {
            let key = item.get('key').value;

            let items = this.form.get('benefits') as FormArray;
            let itemFound = items.at(
                items.value.findIndex((x) => x.key === key)
            );

            itemFound.patchValue({
                image: file,
            });
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

    uploadFilePDF(file) {
        if (file == null) this.form.controls.file.setValue(null);
        else {
            this.form.patchValue({
                file: file,
            });
        }
    }

    onClickSave() {
        this.eventClearMessage.emit();
        this.form.markAllAsTouched();
        if (this.form.valid) {
            let data = this.dataToSend();
            this.contentManagementService.savePartner(data).subscribe(
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

        value.benefits.forEach((e, index) => {
            if (e.action) form.append(`benefits[${index}][action]`, e.action);

            if (e.id) form.append(`benefits[${index}][id]`, e.id);

            if (e.title) form.append(`benefits[${index}][title]`, e.title);

            if (e.image) form.append(`benefits[${index}][image]`, e.image);

            lastIndex = index;
        });

        this.deleted.forEach((e) => {
            lastIndex += 1;
            form.append(`benefits[${lastIndex}][action]`, Actions.DELETE);
            form.append(`benefits[${lastIndex}][id]`, e.id);
        });

        return form;
    }
}
