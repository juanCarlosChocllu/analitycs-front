import { createContext, useEffect, useState, type ReactNode } from "react";
import type { AutenticacionContextI } from "../interfaces/autenticacion";
import { verificarRol } from "../service/appService";

export const AutenticacionContext = createContext<AutenticacionContextI>({
    isAuntenticacion:false,
    guardarToken() {},
    rol:''
})


export const AutenticacionProvider  = ({children}:{children:ReactNode}) => {
  const [isAuntenticacion, setIsAuntenticacion] = useState(false)
    const [rol, setRol] = useState<string>('')
  const guardarToken=(token:string)=>{
    setIsAuntenticacion(true)
    localStorage.setItem('ctx', token)
  }
  useEffect(()=>{
    const token = localStorage.getItem('ctx')
    if(token){
      role()
      setIsAuntenticacion(true)
    }else {
      setIsAuntenticacion(false)
    }
    

  },[])

  const role = async()=>{
    try {
        const reponse= await verificarRol()  
          if(reponse){
            setRol(reponse.rol)
          }
    } catch (error) {
      console.log(error);
      
    }
  }
  
  return (
    <AutenticacionContext.Provider value={{guardarToken,isAuntenticacion,rol}}>
      {children}
    </AutenticacionContext.Provider>
  )
}
