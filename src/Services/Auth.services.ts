import { API_CONFIG } from "../Config/API_CONFIG";
import type { loginResponse, loginRequest, registerResponse, registerRequest  } from "../Interfaces/Auth/Auth.Interfaces";
import api from "./Api";
import Cookies from "js-cookie";
import axios from "axios";

export const LoginSerivces={
    //Servicio de login
    // Datos a enviar ↓
    login: async (log: loginRequest): Promise<loginResponse> => {
        try{
            console.log("URL ",API_CONFIG.BASE_URL+" url:" + API_CONFIG.ENDPOINTS.AUTH.LOGIN);
            // ↓ espera una resuesta a la solicitud de los datos.
            const response = await api.post<loginResponse>(
                API_CONFIG.ENDPOINTS.AUTH.LOGIN,
                log
            );
            //Si existe un token de llegada se guarda en el encabezado con reglas basicas.
            if(response.data.data?.token){
                Cookies.set('token', response.data.data.token, { expires: 7 });
                return response.data;
            }else{
                return  {
                status: 200,
                message: "Token no recibido",
                data: null
            }
        }
            
             
            //Errores de axios para las intercepciones
        }catch(error: unknown){
            if(axios.isAxiosError(error) && error.response?.data){
                return error.response.data as loginResponse;
            }
            return{
                status: 500,
                message: "Error de conexión",
                data: null
            };
        }
        
    },
    register: async(reg: registerRequest): Promise<registerResponse> =>{
        try{
            const response = await api.post<registerResponse>(
                API_CONFIG.ENDPOINTS.AUTH.REGISTER,
                reg
            );
            return response.data;
        }catch(error: unknown){
            if(axios.isAxiosError(error) && error.response?.data){
                return error.response.data as registerResponse;
            }
            return{
                status: 500,
                message: "Error de conexión",
                data: null
            };
        }
    }

}