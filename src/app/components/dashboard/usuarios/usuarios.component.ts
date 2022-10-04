import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {


  listUsuarios: Usuario[] = [];

  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'dni', 'fNacimiento', 'telefono', 'direccion', 'editar', 'eliminar'];
  dataSource!: MatTableDataSource<any>;


  constructor(private _usuarioService: UsuarioService,  private _snackBar: MatSnackBar) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.listUsuarios = this._usuarioService.getUsuario();
    this.dataSource = new MatTableDataSource(this.listUsuarios)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarUsuario(index: number) {
    this._usuarioService.eliminarUsuario(index);
    this.cargarUsuarios();

    this._snackBar.open('El usuariio fue eliminado con éxito', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

  editarUsuario(i: number){
    this.listUsuarios = this._usuarioService.getUsuario();
    let usuarioEditar = this.listUsuarios[i];
    this._usuarioService.editarUsuario(usuarioEditar);
    this._usuarioService.eliminarUsuario(i);
  }
}