import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {

    const [movies, setMovies] = useState(undefined);

    useEffect(() => {
        const urlMovies = "https://mock-api.driven.com.br/api/v8/cineflex/movies";
        const promise = axios.get(urlMovies);
        promise.then(response => {
            (console.log(response.data));
            setMovies(response.data);
        });

        promise.catch(error => (console.log(error.response.data)));
    }, []);

    if (movies === undefined) {
        return (
            <>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>Loading...</div>
                <div>Loading...</div>
            </>);
    }


    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {movies.map((m) => <Movie
                    key={m.id}
                    id={m.id}
                    poster={m.posterURL}
                    title={m.title} />)}
            </ListContainer>

        </PageContainer>
    );
}

function Movie({ poster, title, id }) {
    return (
        <Link to={`/sessoes/${id}`}>
            <MovieContainer>
                <img src={poster} alt={title} />
            </MovieContainer>
        </Link>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    cursor: pointer;
    img {
        width: 130px;
        height: 190px;
    }
`;