import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingService } from '@services/setting.service';
import { AlertTypes } from '@tools/enums';

@Component({
    selector: 'app-settings-system-configuration',
    templateUrl: './system-configuration.component.html',
    styleUrls: ['./system-configuration.component.scss'],
})
export class SystemConfigurationComponent implements OnInit {
    form: FormGroup;
    loading = false;
    data: any = {};
    textMessage: string;
    iconMessage: string;
    colorMessage: string;

    constructor(
        private fb: FormBuilder,
        private settingService: SettingService
    ) {
        this.createForm();
    }

    ngOnInit(): void {
        this.getData();
    }

    public getData() {
        this.loading = true;
        this.settingService.getSystemConfiguration().subscribe((res: any) => {
            this.data = res.data;
            this.setData();
            this.loading = false;
        });
    }

    private setData() {
        this.form.patchValue({
            max_minutes_to_buy: this.data.max_minutes_to_buy,
            system_days_to_delete: this.data.system_days_to_delete,
            send_email_internal_errors: this.data.send_email_internal_errors,
            accumulate_points: this.data.accumulate_points,
            cinestar_support_email: this.data.cinestar_support_email,
            movietime_support_email: this.data.movietime_support_email,
            system_support_emails: this.data.system_support_emails,
            fe_api_url_top_rank: this.data.fe_api_url_top_rank,
            fe_token_top_rank: this.data.fe_token_top_rank,
            fe_api_url_star_plaza: this.data.fe_api_url_star_plaza,
            fe_token_star_plaza: this.data.fe_token_star_plaza,
            url_info_receipt: this.data.url_info_receipt,
            payu_test: this.data.payu_test,
            payu_url_transaction_process: this.data.payu_url_transaction_process,
            payu_url_queries: this.data.payu_url_queries,
            payu_top_rank_api_key: this.data.payu_top_rank_api_key,
            payu_top_rank_api_login: this.data.payu_top_rank_api_login,
            payu_top_rank_account_id: this.data.payu_top_rank_account_id,
            payu_top_rank_merchant_id: this.data.payu_top_rank_merchant_id,
            payu_star_plaza_api_key: this.data.payu_star_plaza_api_key,
            payu_star_plaza_api_login: this.data.payu_star_plaza_api_login,
            payu_star_plaza_account_id: this.data.payu_star_plaza_account_id,
            payu_star_plaza_merchant_id: this.data.payu_star_plaza_merchant_id,
        });
    }

    private createForm() {
        this.form = this.fb.group({
            max_minutes_to_buy: [null, [Validators.required]],
            system_days_to_delete: [null, [Validators.required]],
            send_email_internal_errors: [null, [Validators.required]],
            accumulate_points: [null, [Validators.required]],
            cinestar_support_email: [null, [Validators.required]],
            movietime_support_email: [null, [Validators.required]],
            system_support_emails: [null, [Validators.required]],
            url_info_receipt: [null, [Validators.required]],
            fe_api_url_top_rank: [null, [Validators.required]],
            fe_token_top_rank: [null, [Validators.required]],
            fe_api_url_star_plaza: [null, [Validators.required]],
            fe_token_star_plaza: [null, [Validators.required]],
            payu_test: [null, [Validators.required]],
            payu_url_transaction_process: [null, [Validators.required]],
            payu_url_queries: [null, [Validators.required]],
            payu_top_rank_api_key: [null, [Validators.required]],
            payu_top_rank_api_login: [null, [Validators.required]],
            payu_top_rank_account_id: [null, [Validators.required]],
            payu_top_rank_merchant_id: [null, [Validators.required]],
            payu_star_plaza_api_key: [null, [Validators.required]],
            payu_star_plaza_api_login: [null, [Validators.required]],
            payu_star_plaza_account_id: [null, [Validators.required]],
            payu_star_plaza_merchant_id: [null, [Validators.required]],
        });
    }

    onClickSave() {
        this.clearMessage();
        this.form.markAllAsTouched();
        if (this.form.valid) {
            const value = this.form.value;
            this.settingService.saveSystemConfiguration(value).subscribe(
                (res: any) => {
                    this.data = res.data;
                    this.setData();
                    this.showAlert(
                        AlertTypes.SUCCESS,
                        'Los cambios han sido guardados'
                    );
                    window.scroll(0, 0);
                },
                (e) => {
                    this.showAlert(AlertTypes.ERROR, e.error.message);
                    window.scroll(0, 0);
                }
            );
        }
    }

    showAlert(type, message) {
        if (type == AlertTypes.WARNING) {
            this.textMessage = message;
            this.iconMessage = 'mdi-alert-outline';
            this.colorMessage = 'alert-warning';
        } else if (type == AlertTypes.ERROR) {
            this.textMessage = message;
            this.iconMessage = 'mdi-alert-circle';
            this.colorMessage = 'alert-danger';
        } else {
            this.textMessage = message;
            this.iconMessage = 'mdi-check';
            this.colorMessage = 'alert-success';
        }
    }

    clearMessage() {
        this.textMessage = null;
        this.iconMessage = null;
        this.colorMessage = null;
    }
}
