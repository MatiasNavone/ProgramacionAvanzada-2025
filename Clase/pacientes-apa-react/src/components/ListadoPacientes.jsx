import Paciente from './Paciente'

const ListadoPacientes = () => {
  return (
    <div className="w-1/2 lg:w-3/5">
      <h2>ListadoPacientes</h2>

     {
      pacientes.map(paciente => (
        <Paciente
          key={paciente.id}
          paciente={paciente}
          setPaciente={setPaciente}
        />
      ))
     }
    </div>
  )
}

export default ListadoPacientes