import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

	private countriesUrl = environment.luv2shopApiUrl + '/api/countries';
	private statesUrl = environment.luv2shopApiUrl + '/api/states';

  constructor(private httpClient: HttpClient) { }

	getCountries(): Observable<Country[]> {

		return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
			map(response => response._embedded.countries)
		);
	}

	getStates(theCountryCode: string): Observable<State[]> {

		const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
		return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
			map(response => response._embedded.states)
		);
	}

	getCreditCardMonths(startMonth: number): Observable<number[]> {

		let data: number[] = [];

		// build an array for "Month" dropdown list
		// - start at current and loop until 12

		for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
			data.push(theMonth);
		}

		return of(data);
	}

	getCreditCardYears(): Observable<number[]> {

		let data: number[] = [];

		// build an array for "year" dropdown list
		// - start at current year and loop for next 10 years

		const startYear: number = new Date().getFullYear();
		const endYear: number = startYear + 10;
		for (let theYear = startYear; theYear <= endYear; theYear++) {
			data.push(theYear);
		}

		return of(data);
	}
}

interface GetResponseCountries {
	_embedded: {
		countries: Country[];
	}
}

interface GetResponseStates {
	_embedded: {
		states: State[];
	}
}