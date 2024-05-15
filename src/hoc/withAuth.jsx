import React, { useState, useEffect } from "react";

import serverAddress from '../constants/serverAddress';

const withAuth = (WrappedComponent) => {
    
    const WithAuthUser = () => {
        const [userId, setUserId] = useState(null);
        
        const getUserIdFromSession = async () => {
            await fetch(`${serverAddress.BACKEND_IP_PORT}/users/session`, { credentials: 'include' })
                .then(async(response) => {
                    const responseJson = await response.json();
                    setUserId(responseJson.result);
                })
                .catch(error => {
                    console.error(`auth fetch error:`, error);
                });
        }

        useEffect(() => {
            getUserIdFromSession();
        }, []);

        if (userId === 0) {
            
            alert('인증실패! 로그아웃'); // 인증실패하면 서버로부터 0을 받아서 오기 때문에 로그인 페이지로 이동
            window.location.href = '/users/sign-in';
        
            return;    
        }
        
        return <WrappedComponent userId={userId} />; // 인증 성공 후 props로 userId전달하고 정상적으로 진행
    }

    return WithAuthUser;
}

export default withAuth;