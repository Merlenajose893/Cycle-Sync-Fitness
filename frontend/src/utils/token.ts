export const setAuthData=(token:string,role:string)=>{
    localStorage.setItem('token',token);
    localStorage.setItem('role',role);

}

export const getToken=()=>localStorage.getItem('token');
export const getRole=()=>localStorage.getItem('role');

export const clearAuthData=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('role');
}