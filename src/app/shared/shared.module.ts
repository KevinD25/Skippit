import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { GeneratedMapComponent } from './maps/generated-map/generated-map.component';
import { LocationMarkerComponent } from './maps/location-marker/location-marker.component';
import { DistanceComponent } from './maps/distance/distance.component';


@NgModule({
    declarations: [
    GeneratedMapComponent,
    LocationMarkerComponent,
    DistanceComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        GeneratedMapComponent,
        LocationMarkerComponent,
        DistanceComponent
    ],
    entryComponents: [
        GeneratedMapComponent
    ]
})

export class SharedModule {
}