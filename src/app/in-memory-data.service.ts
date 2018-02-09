import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const ballots = [
      { id: '11', vote: 'Mr. Nice' },
      { id: '12', vote: 'Narco' },
      { id: '13', vote: 'Bombasto' },
      { id: '14', vote: 'Celeritas' },
      { id: '15', vote: 'Magneta' },
      { id: '16', vote: 'RubberMan' },
      { id: '17', vote: 'Dynama' },
      { id: '18', vote: 'Dr IQ' },
      { id: '19', vote: 'Magma' },
      { id: '20', vote: 'Tornado' }
    ];
    return {ballots};
  }
}
