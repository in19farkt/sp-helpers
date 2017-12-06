import { bind } from 'decko';
import HttpActions from './HttpActions';

class Api {
  private actions: HttpActions;

  constructor(public baseUrl: string, public version: string = 'v1') {
    this.actions = new HttpActions(`${baseUrl}/${version}`);
  }

  @bind
  public async loadCategories(): Promise<{}> {
    const response = await this.actions.get<{}>('/categories/');
    return response.data;
  }
}

export default Api;
