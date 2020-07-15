import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoimg from '../../assets/github-explorer.svg';

import { Title, Form, Repositories } from './styles';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo ] = useState('');

    const [repositores, setRepositories] = useState<Repository[]>([]);


    async function handleAddRepositories(event: FormEvent<HTMLFormElement>): Promise<void>{
        event.preventDefault();

        const response = await api.get<Repository>(`repos/${newRepo}`);

        const repository = response.data;
        setRepositories([...repositores, repository]);
        setNewRepo('');
    }

    return (
        <>
        <img src={logoimg} alt="Github Explorer" />
        <Title>Explore repositórios no Github</Title>

        <Form onSubmit={handleAddRepositories}>
            <input
                value={newRepo}
                onChange={(e) => setNewRepo(e.target.value)}
                placeholder="Digite o nome do repositório"
            />
            <button type="submit">Pesquisar</button>
        </Form>
        <Repositories>
            {repositores.map(repository => (
                <a key={repository.full_name} href="teste">
                    <img src={repository.owner.avatar_url} 
                        alt={repository.owner.login} 
                    />
                    <div>
                        <strong>{repository.full_name}</strong>
                        <p>{repository.description}</p>
                    </div>
                    <FiChevronRight  size={20}/>
                </a>
            ))}
        </Repositories>
        </>
    );
};
// gabrielvanjura/conceito_nodejs
export default Dashboard;