import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from 'src/app/models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
public usuario = {} as Usuario;
  constructor(private AFauth : AngularFireAuth,private firestore: AngularFirestore) { }

  login(email:string, password:string){
    return new Promise((resolve, rejected) => {
      this.AFauth.signInWithEmailAndPassword(email,password).then(user=>{
        resolve(user);
      }).catch(err => rejected(err));
    });
  }

  getDatosUsuario(loader?:HTMLIonLoadingElement): Usuario{
    this.getUserAuth().subscribe(async (user)=> {
      await this.getUsuarioActual(user.uid).subscribe((actual) => {
        actual.forEach(data => {
          this.usuario.id = data.get("id");
          this.usuario.idRow = data.get("idRow");
          this.usuario.nombre = data.get("nombre");
          this.usuario.apellidos = data.get("apellidos");
          this.usuario.email = data.get("email");
          this.usuario.contrasena = data.get("contrasena");
          this.usuario.telefono = data.get("telefono");
          this.usuario.imagen = data.get("imagen");
          this.usuario.genero = data.get("genero");
          this.usuario.direccion = data.get("direccion");
          this.usuario.ciudad = data.get("ciudad");
          this.usuario.codigoPostal = data.get("codigoPostal");

        })
        loader.dismiss()
      })
    })
    return this.usuario;
  }

  getUsuarioActual(idActual:string){
    return this.firestore.collection('usuario', ref => ref.where('id', '==', idActual)).get()
  }
  getUserAuth(){
    return this.AFauth.authState;
  }

  }

