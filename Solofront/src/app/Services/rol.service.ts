import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IRol } from '../interfases/irol';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private roles: IRol[] = [];

  getRoles(): Observable<IRol[]> {
    return of(this.roles);
  }

  addRole(rol: IRol): Observable<IRol> {
    const id = this.roles.length > 0 ? Math.max(...this.roles.map(r => r.id ?? 0)) + 1 : 1;
    const nuevo: IRol = { id, nombre: rol.nombre };
    this.roles.push(nuevo);
    return of(nuevo);
  }
}
