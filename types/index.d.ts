export {};
declare global {
  namespace Express {
    interface Request {
      flash: any;
    }
  }
}
