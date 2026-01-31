import { Dispatch, SetStateAction } from 'react';
import { Address, User, UserProfile, Userresponse } from '../type/usertype';
import api from '../utils/api';

export async function fetchUsers(
  setloading: Dispatch<SetStateAction<boolean>>,
  setusers: Dispatch<SetStateAction<User | null>>,
  setuprofile: Dispatch<SetStateAction<UserProfile | null>>,
  setadress: Dispatch<SetStateAction<Address[] | null>>,
) {
  setloading(true);
  try {
    const res = await api.get<Userresponse>('/api/auth/register/');
    const { profile, ...useronly } = res.data;
    const { addresses, ...profileonly } = profile;
    setusers(useronly);
    setuprofile(profileonly);
    setadress(addresses);
  } catch (error) {
    console.log(error);
  } finally {
    setloading(false);
  }
}
