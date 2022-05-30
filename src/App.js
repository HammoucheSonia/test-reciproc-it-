import React from 'react';
import logo from './logo.jpg';
import refresh from './refresh.png';
import './App.css';

const randomUserURL = "https://randomuser.me/api/";
//A partir d'une api public on va recuperer des profils et on va les afficher//


class App extends React.Component {
  //on definie un composant React avec une classe,on dois l'ettendre étendre React.Component//
  state = {
    data: [],
    isLoaded: false,
  };
  // apartir de l'url on recupere les donnes de l api//
  componentDidMount() {
    fetch(randomUserURL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ data, isLoaded: true });
      })
      .catch((error) => this.setState({ error, isLoaded: true }));
  }

  onButtonClick() {
    console.log(this.myRef.current.value);
  }
  //seule methode obligatoire dans une sous-class React.Component//
  render() {
    const { data, isLoaded, error } = this.state;
    if (error) return <div>Error: {error.message}</div>;
    if (!isLoaded) return <div>...loading</div>;
    //a ce stade de notre code on a bien recupere la data, on passe a l'affichage//
    else {
      return (
        <div className="App">

          <div className="logo">
          <img src={logo} alt="Logo" /></div>
          <div className='profil'>
            <div className= "photo_de_profil">
            <img src = {data.results[0].picture.large} alt="photo_de_profil" width="150" height="150" />
            </div >
            <div className='info'>
            {data.results[0].name.first} &nbsp;   
            {data.results[0].name.last}
            <div>
            {data.results[0].email}</div>
            <div>
            {data.results[0].dob.date}</div>
            </div>
          </div>
          <div className='bouton'>
          <button onClick={() => window.location.reload(false)} ><img src = {refresh} alt = "refresh"></img> </button>
          </div>
          <div className='formulaire'>
          <form>
          <select id = "nationalite">
            
              <option value="au">AU</option>
              <option value="br">BR</option>
              <option value="ca">CA</option>
              <option value="ch">CH</option>
              <option value="de">DE</option>
              <option value="dk">DK</option>
              <option value="es">ES</option>
              <option value="fi">FI</option>
              <option value="fr">FR</option>
              <option value="gb">GB</option>
              <option value="ie">IE</option>
              <option value="ir">IR</option>
              <option value="no">NO</option>
              <option value="nl">NL</option>
              <option value="nz">NZ</option>
              <option value="tr">TR</option>
              <option value="us">US</option>
            </select>
            <div>
            <label>
            NB profils à afficher :
            <input type="number" name="nombre"  id = "nb"/>
            </label>
            </div>
            <input type="submit" value="Envoyer" />
            
          </form>
          </div>
          </div>
      );
    }
  }
}
export default App;

