import './App.css'

import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { MemoryRouter as Router, Route } from 'react-router-dom'

import AddItem from './components/AddItem/AddItem'
import Button from './components/buttons'
import Content from './components/Content/Content'
import EditItem from './components/EditItem/EditItem'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Items from './components/Items/Items'
import Logout from './components/Logout/Logout'
import Stats from './components/Stats/Stats'
import { app } from './firebase'

// Sovelluksen juurikomponentti
const App = () => {
  const [data, setData] = useState([])
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  // const [progresspercent, setProgresspercent] = useState(0)

  const provider = new GoogleAuthProvider()
  const auth = getAuth(app)
  const db = getFirestore(app)
  const storage = getStorage(app)

  // Sortataan ja haetaan data Firestoresta. Tallennetaan haettu data state-muuttujaan.
  // Suoritetaan kerran komponentin renderöidyttyä (mount).
  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user) {
        setUser(user)
        // Hae data Firestoresta koon mukaan lajiteltuna
        const q = query(collection(db, 'users', user.uid, 'data'), orderBy('koko'))

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          setData(data)
        })
      }
    })
  }, [auth, db]) // [] on tärkeä! Muuten useEffect suoritetaan uudestaan ja uudestaan.

  /**
   * Funktio, jota ItemForm-komponentti kutsuu lähettäessään datan.
   * Tallentaa datan Firestoren tietokantaan.
   * @param {Object} newData
   * @param {any} file
   */
  const handleFormSubmit = async(newData, file) => {
    // Jos lähetetään lomakkeen mukana kuvatiedosto, tallennetaan se ensin Storageen
    if(file) {
      const storageRef = ref(storage, `${user.uid}/${newData.id}/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on('state_changed',
        (snapshot) => {
          // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          // setProgresspercent(progress)
        },
        (error) => {
          toast.error('Virhe kuvan tallennuksessa: ' + error.message)
          return false
        },
        async() => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          newData.imgUrl = downloadURL
          newData.tiedostonimi = file.name
          return await sendDataToFirestore(newData)
        }
      )
    } else {
      return await sendDataToFirestore(newData)
    }
  }

  const sendDataToFirestore = async(newData) => {
    const toastId = toast.loading('Tallennetaan...')

    try {
      await setDoc(doc(db, 'users', user.uid, 'data', newData.id), newData, { merge: true })
      toast.success(`'${newData.nimike}' tallennettu!`, {
        id: toastId
      })
      return true
    } catch (error) {
      toast.error('Virhe nimikkeen tallennuksessa: ' + error, {
        id: toastId
      })
      return false
    }
  }

  /**
   * Funktio, jota ItemForm-komponentti kutsuu, kun halutaan poistaa yksittäinen nimike.
   * Poistaa nimikkeen datan Firestoren tietokannasta. Näytetään palaute-toast.
   * @param {Object} data
   */
  const handleItemDelete = async(data) => {
    const toastId = toast.loading('Poistetaan...')

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'data', data.id))
      toast.success(`'${data.nimike}' poistettu!`, {
        id: toastId
      })
      return true
    } catch (error) {
      toast.error('Virhe tietoa poistettaessa: ' + error, {
        id: toastId
      })
      return false
    }
  }

  /**
   * Funktio, jota ItemForm-komponentti kutsuu, kun halutaan poistaa yksittäinen kuva.
   * Poistaa kuvan Firebase Storagesta ja tiedostoviittaukset Firestoresta. Näytetään palaute-toast.
   * @param {Object} data
   */
  const handleImageDelete = async(data) => {
    const imageRef = ref(storage, `${user.uid}/${data.id}/${data.tiedostonimi}`)

    const toastId = toast.loading('Poistetaan...')

    try {
      await deleteObject(imageRef)

      const kuvaData = {
        tiedostonimi: '',
        imgUrl: ''
      }

      try {
        await setDoc(doc(db, 'users', user.uid, 'data', data.id), kuvaData, { merge: true })
        toast.success('Kuva poistettu', {
          id: toastId
        })
        return true
      } catch (error) {
        toast.error('Virhe kuvan viittausta poistettaessa: ' + error, {
          id: toastId
        })
        return false
      }
    } catch (error) {
      toast.error('Virhe kuvan viittausta poistettaessa: ' + error, {
        id: toastId
      })
      return false
    }
  }

  /**
   * Funktio, joka hoitaa sisäänkirjautumisen (Firebase Authentication, Googlen tunnuksilla).
   * Tallentaa käyttäjän tiedot state-muuttujaan (user). Jos kirjautuminen ei onnistu, tallentaa
   * state-muuttujaan virheilmoituksen.
   * */
  const login = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user
        setUser(user)
        setError(null)
      })
      .catch(error => {
        const errorMessage = error.message
        setError(errorMessage)
      })
  }

  /**
   * Funktio, joka hoitaa uloskirjautumisen. Tallentaa state-muuttujaan user: null ja
   * tyhjentää viittauksen tietokantaan.
   */
  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null)
      })
  }

  // Sisäänkirjautumissivu (näytetään, jos user-muuttujaan ei ole tallennettu käyttäjän tietoja)
  if(!user) {
    return (
      <Router>
        <div className='App'>
          <Header />
          <Content>
            <div className='app__header'><h2>Avaa Komero</h2></div>
            <div className='app__login'>
              <div className='app_login-legend'>Et ole vielä kirjautunut sisään Komeroon.</div>
              <div className='app__login-button'><Button primary onClick={login} >Kirjaudu sisään</Button></div>
              {/* Jos sisäänkirjautuminen ei onnistu, näytetään state-muuttujaan tallennettu virheilmoitus */}
              <div>{error ? <p>{error}</p> : null}</div>
            </div>
          </Content>
        </div>
      </Router>
    )
  }

  // Kirjautuneelle käyttäjälle:
  return (
    <Router>
      <div className='App'>
        <Header />
        <Route path='/' exact component={Home} />
        <Route path='/list/:selectedCategory' render={(props) =>
          <Items data={data} {...props} />} />
        <Route path='/add' render={() =>
          <AddItem
            onFormSubmit={handleFormSubmit} />
        } />
        <Route path='/edit/:id' render={(props) =>
          <EditItem
            data={data}
            onFormSubmit={handleFormSubmit}
            onDeleteImage={handleImageDelete}
            onDeleteItem={handleItemDelete}
            {...props} />} />
        <Route path='/stats' render={() => <Stats data={data} />} />
        <Route path='/logout' render={() => <Logout onLogout={logout} user={user} />} />
        <Toaster />
      </div>
    </Router>
  )
}

export default App
