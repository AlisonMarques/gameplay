import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
};

type AuthContextData = {
  user: User;
  loading: boolean;
  signIn: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthroizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token: string;
  };
};

// Libs e configs para realizar a autenticação com o discord
import * as AuthSession from 'expo-auth-session';

import {
  SCOPE,
  CLIENT_ID,
  CDN_IMAGE,
  REDIRECT_URI,
  RESPONSE_TYPE,
} from '../configs';
import { api } from '../servers/api';

//hooks do context api
export const AuthContext = createContext({} as AuthContextData);

// função que centraliza as rotas que vão receber os dados e passando os dados no value
function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  // função de Login/autenticação
  async function signIn() {
    try {
      setLoading(true);

      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthroizationResponse;

      //Se o type der sucesso, o headers da api vai receber o token para fazer a autorização
      //Fazendo assim ele não vai precisar ficar logando toda hora
      if (type === 'success') {
        api.defaults.headers.authorization = `Bearer ${params.access_token}`;

        //Pegando as informações do usuário através da rota do discord
        const userInfo = await api.get('/users/@me');

        //Dividindo e pegando apenas o primeiro nome
        const firstName = userInfo.data.username.split(' ')[0];

        //Formatando a imagem para pegar a url além do hash
        userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

        setUser({
          ...userInfo.data,
          firstName,
          token: params.access_token,
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch {
      throw new Error('Não foi possível autenticar');
    }
  }
  return (
    <AuthContext.Provider value={{ user, loading, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
