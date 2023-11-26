declare module '@analytics/customerio' {

    interface Options {
      siteId: string; 
      apiKey?: string;
    }
  
    function customerIOServer(options: Options): void;
  
    export default customerIOServer;
  
  }