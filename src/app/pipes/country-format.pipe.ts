import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryFormat',
  standalone: true
})
export class CountryFormatPipe implements PipeTransform {
  transform(value: string): string {
    const flags: any = {
      'France': '🇫🇷',
      'Ukraine': '🇺🇦',
      'Austria': '🇦🇹',
      'Italy': '🇮🇹',
      'Poland': '🇵🇱',
      'Germany': '🇩🇪',
      'Switzerland': '🇨🇭',
      'Spain': '🇪🇸'
    };

    return `${flags[value] || ''} ${value}`;
  }
}