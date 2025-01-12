export class ConfigService {
  public getAppUrl() {
    return process.env.PUBLIC_URL ?? '';
  }

  public getUltimateApiUrl() {
    return process.env.REACT_APP_ULTIMATE_API_URL ?? '';
  }
}

export const configService = new ConfigService();
