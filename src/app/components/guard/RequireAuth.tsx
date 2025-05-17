import { StorageUtils } from '@/app/lib/storage';
import { useAppSelector } from '@/app/stores';
import type { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    let token = useAppSelector((state) => state.auth.token);
    const location = useLocation();

    if(token === "") {
        token = StorageUtils.getStringItem("token")
    }

    if (!token) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
