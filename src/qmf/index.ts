import {BehaviorSubject, Observable} from 'rxjs';
import QMFObject from './QMFObject';

export class QmfService {
  private readonly subjectLastSearchResult = new BehaviorSubject<Array<QMFObject>>([]);
  private readonly subjectLastSearchErrors = new BehaviorSubject<Array<Error>>([]);
  private readonly subjectSearchStatus = new BehaviorSubject<boolean>(false);

  observableLastSearchResult(): Observable<Array<QMFObject>> {
    return this.subjectLastSearchResult;
  }

  observableSearchStatus(): Observable<boolean> {
    return this.subjectSearchStatus;
  }

  observableLastSearchErrors(): Observable<Array<Error>> {
    return this.subjectLastSearchErrors;
  }

  async refresh(): Promise<string> {
    this.subjectLastSearchErrors.next([]);
    this.subjectSearchStatus.next(true);
    try {
      const response = await fetch('http://qmf-agent.s4y.solutions:8081/catalog', {
        method: 'GET',
      });

      if (response.ok) {
        console.log(await response.text());
        return '';
      } else {
        throw Error(`Error (${response.status}): ${response.statusText}`);
      }
    } catch (error) {
      this.subjectLastSearchErrors.next([error]);
      throw error;
    }
  }

  async search(query: string): Promise<Array<QMFObject>> {
    this.subjectLastSearchErrors.next([]);
    this.subjectSearchStatus.next(true);
    try {
      const response = await fetch('http://qmf-agent.s4y.solutions:8081/retrieve?search=' + encodeURIComponent(query), {
        method: 'GET',
      });

      if (response.ok) {
        return response.json();
      } else {
        throw Error(`Error (${response.status}): ${response.statusText}`);
      }
    } catch (error) {
      this.subjectLastSearchErrors.next([error]);
      throw error;
    }
  }
}

const qmfService = new QmfService();

export default qmfService;
