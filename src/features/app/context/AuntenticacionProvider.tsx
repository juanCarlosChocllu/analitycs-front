import React, { createContext, useEffect, useState, type ReactNode } from "react";
import type { AutenticacionContextI } from "../interfaces/autenticacion";

export const AutenticacionContext = createContext<AutenticacionContextI>({
    isAuntenticacion:false,
    guardarToken(token) {},
})


export const AutenticacionProvider  = ({children}:{children:ReactNode}) => {
  const [isAuntenticacion, setIsAuntenticacion] = useState(false)
  const guardarToken=(token:string)=>{
    setIsAuntenticacion(true)
    localStorage.setItem('ctx', token)
  }
  useEffect(()=>{
    const token = localStorage.getItem('ctx')
    if(token){
      setIsAuntenticacion(true)
    }else {
      setIsAuntenticacion(false)
    }
    

  },[])
  console.log(isAuntenticacion);
  
  return (
    <AutenticacionContext.Provider value={{guardarToken,isAuntenticacion}}>
      {children}
    </AutenticacionContext.Provider>
  )
}
