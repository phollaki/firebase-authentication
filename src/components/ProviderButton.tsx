import { LoginProvider, signInWithProvider } from "@/utils/auth"
import { ReactSVG } from "react-svg"
import { useRouter } from 'next/navigation';

const ProviderButton = ({provider}: {provider: LoginProvider}) => {
  const router = useRouter()

  const handleSignInWithProvider = async () => {
    await signInWithProvider(provider)
    router.push('/')
  }
return (

  <button className="bg-gray-200 p-2 rounded-md flex items-center justify-center space-x-5" onClick={()=>handleSignInWithProvider()}>
  <ReactSVG src={`/${provider}.svg`}
    beforeInjection={(svg) => {
      svg.classList.add('svg-class-name')
      svg.setAttribute('style', 'width: 32px; height: 32px;')
    }}
  />
  <span>Sign in with {provider}</span>
</button>
)
  }
export default ProviderButton