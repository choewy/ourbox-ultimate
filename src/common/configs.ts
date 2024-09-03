export class Configs {
  public get newboxApiUrl() {
    return process.env.REACT_APP_NEWBOX_API_URL;
  }
}

export const configs = new Configs();
