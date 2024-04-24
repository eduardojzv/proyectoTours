export function EmailTemplate(data) {
  console.log("data",data);
  return (
    <div>
      <h1>Datos del cliente</h1>
      <ul>
        <li>Nombre : {`${data.name} ${data.lastName}`}</li>
        <li>Email : {data.email}</li>
        <li>Numero de telefono/celular : {data.phone}</li>
      </ul>
      <div>
        <h2>Comentario</h2>
        <p>{data.description}</p>
      </div>
    </div>
  );
}