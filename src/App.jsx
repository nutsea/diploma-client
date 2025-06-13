import './base.scss'
import './App.scss'
import { Header } from './components/header/Header';
import { AppRoutes } from './AppRoutes';
import { Footer } from './components/footer/Footer';
import { useContext, useEffect, useState } from 'react';
import { fetchCategoriesShip, fetchCourse, fetchExpressShip, fetchFee, fetchStandartShip } from './http/constantsAPI';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import { DocumentHeader } from './components/documentHeader/DocumentHeader';

export const App = observer(() => {
    const [authcode, setAuthCode] = useState()
    const [token, setToken] = useState()
    const { constants } = useContext(Context)
    const location = useLocation()

    const getCourse = async () => {
        await fetchCourse().then(data => {
            constants.setCourse(data.value)
        })
        await fetchStandartShip().then(data => {
            constants.setStandartShip(data.value)
        })
        await fetchExpressShip().then(data => {
            constants.setExpressShip(data.value)
        })
        await fetchFee().then(data => {
            constants.setFee(data.value)
        })
        await fetchCategoriesShip().then(data => {
            constants.setCategoriesShips(data)
        })
    }

    useEffect(() => {
        getCourse()
        // eslint-disable-next-line
    }, [])

    return (
        <div className='App'>
            {location.pathname !== '/privacy-policy' && location.pathname !== '/privacy-policy/' &&
                location.pathname !== '/user-agreement' && location.pathname !== '/user-agreement/' &&
                location.pathname !== '/payment-and-refund' && location.pathname !== '/payment-and-refund/' ?
                <>
                    {constants.course && constants.standartShip && constants.expressShip && constants.categoriesShips && constants.fee ?
                        <>
                            <Header authcode={authcode} token={token} />
                            <AppRoutes getAuthCode={setAuthCode} onAuth={setToken} />
                            <Footer />
                        </>
                        :
                        <div className='LoaderBox3'>
                            <div className='Loader'></div>
                        </div>
                    }
                </>
                :
                <>
                    <DocumentHeader />
                    <AppRoutes getAuthCode={setAuthCode} />
                </>
            }
        </div>
    );
})