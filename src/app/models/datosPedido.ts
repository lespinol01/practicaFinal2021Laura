export class DatosPedido {
  public idUsuario:string;
  public idPedido:string;
  constructor(
    public numeroButaca: string,
    public idCartelera: string,
    public resultado: number,
    public horarioClickeado: string,
    public titulo:string
  ) {}
}
