import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

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
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthroizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  };
};

// Libs e configs para realizar a autenticação com o discord
import * as AuthSession from 'expo-auth-session';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLLECTION_USERS } from '../configs/database';

const SCOPE = process.env.SCOPE;
const CLIENT_ID = process.env.CLIENT_ID;
const CDN_IMAGE = process.env.CDN_IMAGE;
const REDIRECT_URI = process.env.REDIRECT_URI;
const RESPONSE_TYPE = process.env.RESPONSE_TYPE;

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
      if (type === 'success' && !params.error) {
        api.defaults.headers.authorization = `Bearer ${params.access_token}`;

        //Pegando as informações do usuário através da rota do discord
        const userInfo = await api.get('/users/@me');

        //Dividindo e pegando apenas o primeiro nome
        const firstName = userInfo.data.username.split(' ')[0];

        //Formatando a imagem para pegar a url além do hash
        userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

        const userData = {
          ...userInfo.data,
          firstName,
          token: params.access_token,
        };

        //salvando os dados no asyncstorage
        await AsyncStorage.setItem(COLLLECTION_USERS, JSON.stringify(userData));

        setUser(userData);
      }
    } catch {
      throw new Error('Não foi possível autenticar');
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(COLLLECTION_USERS);
  }

  // Função que verifica se existe os dados do usuário estão salvo no storage
  // e persiste os dados para que não precise mais autenticar
  async function loadUserStorageData() {
    const storage = await AsyncStorage.getItem(COLLLECTION_USERS);

    if (storage) {
      const userLogged = JSON.parse(storage) as User;
      api.defaults.headers.authorization = `Bearer ${userLogged.token}`;

      setUser(userLogged);
    }
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
