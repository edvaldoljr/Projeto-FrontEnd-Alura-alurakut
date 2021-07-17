 import React from 'react';
 import MainGrid from '../src/components/MainGrid'
 import Box from '../src/components/Box'
 import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons';  
 import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

 function ProfileSidebar(propriedades){
   return(
    <Box as="aside">
    <img src = {`https://github.com/${propriedades.githubUser}.png`} style = {{ borderRadius: '8px '}} />
    <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
   </Box>
   )
 }
function ProfileRelationsBox(propriedades) {
  return(
    <ProfileRelationsBoxWrapper>
       <h2 className="smallTitle">
              {propriedades.title} ({propriedades.items.length})
            </h2>
          <ul>
            {propriedades.items.map((itemAtual) => {
              return (
                  <li key = {itemAtual.id}>
                      <a href={itemAtual.html_url}>
                        <img src={itemAtual.avatar_url} /> 
                        <span>{itemAtual.login}</span>
                      </a>
                  </li>
                )
              })}
          </ul>
       </ProfileRelationsBoxWrapper>
  )
}

 export default function Home() {
  
  const usuarioAleatorio = 'edvaldoljr'
  const [comunidades, setComunidades] = React.useState([{
    id: '12802378123789378912789789123896123',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  // const comunidades = ['AluraKut' ];
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

      const [seguidores, setSeguidores] = React.useState([]);
      const [amigos, setAmigos] = React.useState([]);
      // 0 -  Pegar o array de dados do github
      React.useEffect(function(){
        //GET 
        fetch('https://api.github.com/users/edvaldoljr/followers')
        .then(function (respostaDoServidor) {
          return respostaDoServidor.json();
        })
        .then(function(respostaCompleta){
          setSeguidores(respostaCompleta);
        })

        fetch('https://api.github.com/users/edvaldoljr/following')
        .then(function (respostaDoServidor) {
          return respostaDoServidor.json();
        })
        .then(function(respostaCompleta){
          setAmigos(respostaCompleta);
        })
      }, [])

      console.log(seguidores);

      // 1 - Criar um box que vaiu ter um map, baseados no item do array 
      // que pegamos do github

    return (
    <>
    <AlurakutMenu githubUser={usuarioAleatorio}/>
     <MainGrid>
       <div className ="profileArea" style={{ gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser = {usuarioAleatorio} />
       </div>
       <div className ="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
       <Box>
            <h1 className="title">
              Bem vindo (a) Edvaldo Junior
              <hr/>
            </h1>

            <OrkutNostalgicIconSet />
            <hr/>
            <div>
                  <h4>Quem eu sou:</h4>
                   Meu nome é Edvaldo tenho 27 anos e atualmente estudo Desenvolvimento de Software 
            </div>
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit = {function handleCriaComunidade(e){
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              console.log('Campos', dadosDoForm.get('title'));
              console.log('Campos', dadosDoForm.get('image'));
              
              const comunidade = {
                id: new Date().toISOString,
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }
              const comunidadesAtualizadas = [...comunidades,comunidade];
              setComunidades (comunidadesAtualizadas);
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                  />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>

       </div>
       <div className ="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
         
       {/* <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Amigos ({pessoasFavoritas.length})
            </h2>

          <ul>
            {pessoasFavoritas.map((itemAtual) => {
              return (
                <li key = {itemAtual}>
                     <a href={`/users/${itemAtual}`}>
                        <img src={`https://github.com/${itemAtual}.png`} />
                        <span>{itemAtual}</span>
                      </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper> */}

          <ProfileRelationsBox title = "Amigos" items = {amigos}/>   
           
          <ProfileRelationsBox title = "Seguidores" items = {seguidores}/>
          
       <ProfileRelationsBoxWrapper>
       <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
          <ul>
            {comunidades.map((itemAtual) => {
              return (
                  <li key = {itemAtual.id}>
                      <a href={`/users/${itemAtual.title}`}>
                        <img src={itemAtual.image} /> 
                        <span>{itemAtual.title}</span>
                      </a>
                  </li>
                )
              })}
          </ul>
       </ProfileRelationsBoxWrapper>
       </div>
     </MainGrid>
     </>
     )
}
