import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    obtenerProductos()
  }, [])

  async function obtenerProductos() {
    const { data, error } = await supabase
      .from('productos')
      .select('*')

    if (error) console.log(error)
    else setProductos(data)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>Cachivacheros 🛒</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 20
      }}>
        {productos.map(p => (
          <div key={p.id} style={{
            border: '1px solid #ddd',
            borderRadius: 10,
            padding: 10,
            textAlign: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <img src={p.imagen} width="100%" />
            <h3>{p.nombre}</h3>
            <p><b>{p.precio} Bs</b></p>
            <button style={{
              background: 'black',
              color: 'white',
              padding: '10px',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer'
            }}>
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App