import { atom, useRecoilState } from 'recoil';
import { User } from "firebase/auth";
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()


export const userState = atom<User | null>({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});


export const useAuth = () => useRecoilState(userState);