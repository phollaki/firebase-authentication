import { UserCredential } from 'firebase/auth'
import { atomWithStorage } from 'jotai/utils'

const userAtom = atomWithStorage<UserCredential | undefined>('user', undefined)

export { userAtom }