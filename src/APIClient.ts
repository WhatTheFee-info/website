export default class APIClient {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * HTTP GET request
   * @param path
   * @returns
   */
  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`);
    const body = await response.json();
    if (response.status >= 200 && response.status < 300) {
      return body;
    } else {
      const error = new Error(body);
      throw error;
    }
  }
}
