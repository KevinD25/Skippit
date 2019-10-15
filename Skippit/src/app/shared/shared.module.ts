import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { GeneratedMapComponent } from './maps/generated-map/generated-map.component';
import { LocationMarkerComponent } from './maps/location-marker/location-marker.component';


@NgModule({
    declarations: [
    GeneratedMapComponent,
    LocationMarkerComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        GeneratedMapComponent,
        LocationMarkerComponent
    ],
    entryComponents: [
        GeneratedMapComponent
    ]
})

export class SharedModule {
}