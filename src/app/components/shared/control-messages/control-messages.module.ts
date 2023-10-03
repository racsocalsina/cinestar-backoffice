import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlMessagesComponent } from './control-messages.component';

@NgModule({
   imports: [
      CommonModule,
      ReactiveFormsModule
   ],
   declarations: [
      ControlMessagesComponent
   ],
   entryComponents: [],
   exports: [
      ControlMessagesComponent
   ],
   providers: []
})
export class ControlMessagesModule {
    // @ts-ignore
  static forRoot(): ModuleWithProviders {
        return {
            ngModule: ControlMessagesModule
        };
    }
}
