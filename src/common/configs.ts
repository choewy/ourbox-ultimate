export class Configs {
  public get apiUrl() {
    return process.env.REACT_APP_API_URL;
  }
}

export const configs = new Configs();
