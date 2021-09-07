import { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';
import { useQuery } from 'react-query';
import { API_URL } from '../utils/constants';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().toISOString());
  const [rangeDate, setRangeDate] = useState({
    from: moment().subtract(5, 'days').toISOString(),
    to: moment().add(5, 'days').toISOString(),
  });

  const history = useHistory();
  const location = useLocation();

  function checkSelectedDateInRange() {
    const formatSelectedDate = moment(selectedDate);
    const formatFromRange = moment(rangeDate.from);
    const formatToRange = moment(rangeDate.to);

    return formatSelectedDate.isBetween(
      formatFromRange,
      formatToRange,
    );
  }

  async function getNewScheduleData() {
    if (checkSelectedDateInRange() || !user) {
      return;
    }

    try {
      const response = await axios.get(
        `${API_URL}/events?dateRange=${moment(selectedDate).format('DD-MM-YYYY')}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'x-wa-username': user.username,
          },
        },
      );

      setRangeDate({
        from: moment(selectedDate).subtract(5, 'days').toISOString(),
        to: moment(selectedDate).add(5, 'days').toISOString(),
      });

      setUser((prevState) => ({
        ...prevState,
        schedule: [...response.data],
      }));
    } catch (error) {
      toast.error('Falha ao buscar dados atualizados');
    }
  }

  async function getNewFreeHoursData() {
    if (!user) {
      return;
    }

    try {
      const response = await axios.get(
        `${API_URL}/webhooks/freehours?getJSON=true`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'x-wa-username': user.username,
            eventdate: moment(selectedDate).format('DD/MM/YYYY'),
          },
        },
      );

      setUser((prevState) => ({
        ...prevState,
        freeHours: [...response.data],
      }));
    } catch (error) {
      toast.error('Falha ao buscar dados atualizados');
    }
  }

  async function getUserData() {
    if (location.pathname.includes(['/login'])) {
      return null;
    }

    try {
      const localStorageUser = JSON.parse(localStorage.getItem('wa_user'));

      if (!localStorageUser) {
        return null;
      }

      const response = await axios.get(
        `${API_URL}/login`,
        {
          headers: {
            Authorization: `Bearer ${localStorageUser.token}`,
            'x-wa-username': localStorageUser.username,
          },
        },
      );

      if (!response.data) {
        return null;
      }

      return response.data;
    } catch (error) {
      toast.error('Ocorreu um erro ao conectar com a nossa api!');
      return null;
    }
  }

  async function getUser() {
    if (location.pathname.includes(['/login'])) {
      return;
    }

    try {
      setLoading(true);
      const localStorageUser = JSON.parse(localStorage.getItem('wa_user'));

      if (!localStorageUser) {
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${API_URL}/login`,
        {
          headers: {
            Authorization: `Bearer ${localStorageUser.token}`,
            'x-wa-username': localStorageUser.username,
          },
        },
      );

      if (response.data) {
        localStorage.setItem('wa_user', JSON.stringify(response.data));
        setUser(response.data);
      }
    } catch (error) {
      setLoading(false);
      history.push('/login');
      toast.error('Ocorreu um erro ao conectar com a nossa api!');
    }
  }

  async function login({ username, password }) {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/login`, {
        headers: {
          'x-wa-username': username,
          'x-wa-password': password,
        },
      });

      if (response.data) {
        localStorage.setItem('wa_user', JSON.stringify(response.data));
        setUser(response.data);

        toast.success(`seja bem vindo ${response.data.username}!`);
        history.push('/');

        setLoading(false);
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        setLoading(false);
        toast.error('este usuário não existe!');
        return;
      }

      if (error?.response?.status === 403) {
        setLoading(false);
        toast.error('usuario ou senha incorretos!');
        return;
      }

      setLoading(false);
      toast.error('ocorreu um erro ao conectar com os nossos servidores');
    }
  }

  async function logout() {
    localStorage.removeItem('wa_user');
    history.push('/login');
  }

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem('wa_user'));

    if (!localStorageUser) {
      history.push('/login');
      return;
    }

    getUser();
  }, [location.pathname]);

  useEffect(() => {
    getNewScheduleData();
    getNewFreeHoursData();
  }, [selectedDate]);

  const { data } = useQuery('userdata', getUserData, {
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setUser(data);
  }, [data]);

  return (
    <AuthContext.Provider value={{
      user, login, logout, setSelectedDate, selectedDate, isLoading,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
