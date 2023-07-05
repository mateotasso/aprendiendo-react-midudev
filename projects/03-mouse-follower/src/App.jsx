import { useEffect, useState } from "react"

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // pointer move
  useEffect(() => {
    console.log('effect', { enabled })
    const handleMove = (event) => {
    const { clientX, clientY } = event
    setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // cleanup
    // se ejecuta cuando el componente se desmonta
    // o cuando cambian las dependencias, antes de ejecutar
    // el efecto de nuevo
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  // change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  } )
  return (
    <>
  <div style={{
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    border: '1px solid #fff',
    borderRadius: '50%',
    opacity: 0.8,
    pointerEvents: 'none',
    left: -25,
    top: -25,
    width: 40,
    height: 40,
    transform: `translate(${position.x}px, ${position.y}px)`
  }}
  />
    <button onClick={() => setEnabled(!enabled)}>
      {enabled ? 'Desactivar ' : 'Activar '} seguir puntero
    </button>    
  </>
  )
  
}

function App() {
  const [mounted, setMounted] = useState(true)

  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
