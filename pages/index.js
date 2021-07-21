 import React from 'react';
 import nookies from 'nookies';
 import jwt from 'jsonwebtoken';
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

//  export default function Home() {
//   const usuarioAleatorio = 'edvaldoljr'
export default function Home(props) {
  const usuarioAleatorio = props.githubUser;
  const [comunidades, setComunidades] = React.useState([]);
  // const comunidades = ['AluraKut' ];
  // const pessoasFavoritas = [
  //   'juunegreiros',
  //   'omariosouto',
  //   'peas',
  //   'rafaballerini',
  //   'marcobrunodev',
  //   'felipefialho'
  // ]

      const [seguidores, setSeguidores] = React.useState([]);
      const [seguindo, setAmigos] = React.useState([]);
      // 0 -  Pegar o array de dados do github
      React.useEffect(function(){
        //GET 
        fetch(`https://api.github.com/users/${usuarioAleatorio}/followers`)
        .then(function (respostaDoServidor) {
          return respostaDoServidor.json();
        })
        .then(function(respostaCompleta){
          setSeguidores(respostaCompleta);
        })

        fetch(`https://api.github.com/users/${usuarioAleatorio}/following`)
        .then(function (respostaDoServidor) {
          return respostaDoServidor.json();
        })
        .then(function(respostaCompleta){
          setAmigos(respostaCompleta);
        })

        // API GraphQL
        fetch('https://graphql.datocms.com/',{
          method: 'POST', 
          headers: {
            'Authorization': '9a21a208727d61f8b83d3753e02998 ',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ "query": `query {
             allCommunities {
              title
              id
              imageUrl
              creatorSlug
            }
          }` })
        })
        .then((response) => response.json()) // Pega o retorno do response.json e já retorna
        .then((respostaCompleta) => {
            const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
            console.log(comunidadesVindasDoDato)
            setComunidades(comunidadesVindasDoDato)

            
        }) 
        // .then(function(response){
        //   return response.json()
        // })
      }, [])

      //console.log(seguidores);

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
               Bem vindo {usuarioAleatorio}
              <hr/>
            </h1>
 
            <OrkutNostalgicIconSet />
            <hr/>
            {/* <div>
               <p>Quem sou eu: <h5>Meu nome é Edvaldo tenho 27 anos e atualmente estudo Desenvolvimento de Software</h5></p>   
                 <img src="https://img.ibxk.com.br/materias/3991/81224.gif"/> 
                 <h5>
              Loading…
              5%
              █▒▒▒▒▒▒▒▒
              10%
              ███▒▒▒▒▒▒
              30%
              █████▒▒▒▒
              50%
              ███████▒▒▒▒
              100%
              ██████████
              </h5>
            </div> */}
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit = {function handleCriaComunidade(e){
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              console.log('Campos', dadosDoForm.get('title'));
              console.log('Campos', dadosDoForm.get('image'));
              
              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: usuarioAleatorio,
              }
              
              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas)
              })

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
  

           <ProfileRelationsBox title = "Seguindo" items = {seguindo}/>   
           
          <ProfileRelationsBox title = "Seguidores" items = {seguidores}/>
          
       <ProfileRelationsBoxWrapper>
       <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
          <ul>
            {comunidades.map((itemAtual) => {
              return (
                  <li key = {itemAtual.id}>
                      <a href={`/comunidades/${itemAtual.id}`}>
                        <img src={itemAtual.imageUrl} /> 
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

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((resposta) => resposta.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}
