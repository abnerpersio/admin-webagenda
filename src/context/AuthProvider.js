import { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';

import UserService from '../services/UserService';
import EventService from '../services/EventService';

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

    setLoading(true);

    const data = await EventService.getScheduleData({
      user,
      selectedDate,
    });

    if (data) {
      setRangeDate({
        from: moment(selectedDate).subtract(5, 'days').toISOString(),
        to: moment(selectedDate).add(5, 'days').toISOString(),
      });

      setUser((prevState) => ({
        ...prevState,
        schedule: [...data],
      }));
    }

    setLoading(false);
  }

  async function getNewFreeHoursData() {
    if (!user) {
      return;
    }

    setLoading(true);

    const data = await EventService.getFreeHours({
      user,
      selectedDate,
      returningFormat: 'json',
    });

    if (data) {
      setUser((prevState) => ({
        ...prevState,
        freeHours: [...data],
      }));
    }

    setLoading(false);
  }

  async function getUserData() {
    if (location.pathname.includes(['/login'])) {
      return null;
    }

    const localStorageUser = JSON.parse(localStorage.getItem('wa_user'));

    if (!localStorageUser) {
      return null;
    }

    setLoading(true);

    const data = await UserService.getUserWithToken({
      user: localStorageUser,
    });

    setLoading(false);
    return data || null;
  }

  async function getUser() {
    if (location.pathname.includes(['/login'])) {
      return;
    }

    try {
      setLoading(true);
      const localStorageUser = JSON.parse(localStorage.getItem('wa_user'));

      if (!localStorageUser) {
        throw new Error('Falha ao encontrar usuário');
      }

      const data = await UserService.getUserWithToken({
        user: localStorageUser,
      });

      if (data) {
        localStorage.setItem('wa_user', JSON.stringify(data));
        setUser(data);
        setLoading(false);
        return;
      }

      throw new Error('Falha ao encontrar usuário');
    } catch (error) {
      setLoading(false);
      history.push('/login');
    }
  }

  async function login({ username, password }) {
    setLoading(true);

    const data = await UserService.getUserWithLogin({
      username,
      password,
    });

    if (data) {
      localStorage.setItem('wa_user', JSON.stringify(data));
      setUser(data);

      toast.success(`seja bem vindo ${data.username}!`);
      history.push('/');
    }

    setLoading(false);
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
