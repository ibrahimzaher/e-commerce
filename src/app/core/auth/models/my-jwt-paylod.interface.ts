import { JwtPayload } from 'jwt-decode';

export interface MyJwtPaylod extends JwtPayload {
  id: string;
  name: string;
  role: string;
}
