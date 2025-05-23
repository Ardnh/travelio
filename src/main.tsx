import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import router from '@/app/routes'
import store from '@/app/stores'
import './index.css'
// import { Toaster } from './app/components/ui/sonner';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
            {/* <Toaster /> */}
        </Provider>
    </StrictMode>,
)
