import { useEffect, useState } from "react"
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&colo=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App () {
    const [fact, setFact] = useState()
    const [ imageUrl, setImageUrl] = useState()
    const [factError, setFactError] = useState()

    // para recuperar la cita al cargar la página
    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => {
                if (!res.ok) {
                    setFactError('No se ha podido recuperar la cita')
                }
                return res.json()
            })
            .then(data => {
                const { fact } = data
                setFact(fact)
            })
    }, [])

    // para recuperar la imagen cada vez que tenemos una cita nueva
    
    useEffect(() => {
        if (!fact) return
        const threeFirstWords = fact.split('').slice(0, 3).join(' ')

        fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&colo=red&json=true`)
            .then(res => res.json())
            .then(response => {
                const { url } = response
                setImageUrl(url)
        })
    }, [fact])

    return (
        <main>
            <h1>App de gatitos</h1>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the first three words for ${fact}`} />}
        </main>
    )
}