export class ConfigHelper {
   /**
    * Base URL for API requests.
    * This value is retrieved from environment variables or defaults to an empty string.
    */
   public static API_URL: string = process.env["API_URL"] || '';
}
