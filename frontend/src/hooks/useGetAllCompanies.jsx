import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setCompanies } from '@/redux/companySlice';

const COMPANY_API_END_POINT = import.meta.env.VITE_COMPANY_API;

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });

        console.log('called');

        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, [dispatch]); // Include dispatch in dependency array
};

export default useGetAllCompanies;
