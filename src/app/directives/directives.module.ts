import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumbersDirective } from './only-numbers.directive';
import { SpecialCharacterDirective } from './specialChracter.directive';


@NgModule( {
    declarations: [
        OnlyNumbersDirective,
        SpecialCharacterDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OnlyNumbersDirective,
        SpecialCharacterDirective
    ]
} )
export class DirectivesModule {}
