import { Subject } from 'rxjs';

export class FilterHelpers {

  private urlParams: URLSearchParams = null;
  public filters: Subject<any> = new Subject();
  private filtersValues: Subject<any> = new Subject();

  constructor() {
    this.urlParams = new URLSearchParams(window.location.search);
    window.addEventListener('locationchange', () => {
      this.urlParams = new URLSearchParams(window.location.search);
    });
  }

  public getUrlParams() {
    return this.urlParams;
  }

  private updateUrl() {
    window.history.pushState('', '', '?' + this.urlParams.toString());
  }

  public setFilter(filterValue: any, key: string, urlValue: string) {
    this.filtersValues[key] = filterValue;
    this.filters.next(this.filtersValues);
    urlValue = urlValue.replace(/ /g, '-').toLowerCase();
    this.urlParams.set(key, urlValue);
    this.updateUrl();
  }


  public removeFilter(key: string) {
    delete this.filtersValues[key];
    this.filters.next(this.filtersValues);
    this.urlParams.delete(key);
    this.updateUrl();
  }
}
