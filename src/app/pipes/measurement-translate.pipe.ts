import { Pipe, PipeTransform } from '@angular/core';
import { MeasurementType } from '../services/glucose.model';

@Pipe({
  name: 'measurementTranslate',
  standalone: true
})
export class MeasurementTranslatePipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (!value) return '';

    return MeasurementType[value as keyof typeof MeasurementType] || value;
  }

}
