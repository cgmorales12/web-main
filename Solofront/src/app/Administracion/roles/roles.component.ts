import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RolService } from '../../Services/rol.service';
import { IRol } from '../../interfases/irol';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent {
  roles: IRol[] = [];
  nuevoRol: IRol = { nombre: '' };

  constructor(private rolService: RolService) {}

  ngOnInit() {
    this.cargarRoles();
  }

  cargarRoles() {
    this.rolService.getRoles().subscribe((roles) => (this.roles = roles));
  }

  agregarRol() {
    if (!this.nuevoRol.nombre.trim()) {
      return;
    }
    this.rolService
      .addRole({ nombre: this.nuevoRol.nombre })
      .subscribe(() => {
        this.nuevoRol.nombre = '';
        this.cargarRoles();
      });
  }
}
