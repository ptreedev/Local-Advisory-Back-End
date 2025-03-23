import { User as MyUser } from "./src/database/models/user";
import * as passport from "passport";
// to make the file a module and avoid the TypeScript error
// export {};

// declare global {
//   namespace Express {
//     export interface User extends MyUser {}
//   }
// }

declare global {
  namespace Express {
    interface User extends MyUser {}
  }
}
