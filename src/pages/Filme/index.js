import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import './filme-info.css'
import { toast } from "react-toastify";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "aac6403467be615d65e4e8ae9d19ad41",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Filme nao encontrado");
          navigate("/", {replace:true});
          return;
        });
    }
    loadFilme();

    return () => {
      console.log("COMPONENTE DESMONTADO");
    };
  }, [id, navigate]);

  function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmeSalvo)=> filmeSalvo.id === filme.id)
    if(hasFilme){
      toast.warn("Esse filme já está na sua lista.")
      return;
    }

    filmesSalvos.push(filme); //AQUI EU ADICIONO O FILME PRA MINHA LISTA DE FILMES SALVOS.
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));//AQUI EU SALVO A LISTA ATUALIZADA NO MEU LOCALSTORAGE
    toast.success("Filme salvo com sucesso.")
  }


  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
      <button onClick={salvarFilme}>Salvar</button>
      <button>
        <a target="blank" rel="external" href={`http://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
      </button>

      </div>
    </div>
  );
}

export default Filme;
