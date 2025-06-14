import React, { useEffect, useState } from "react";
import './Fav.scss'
import { fetchByIds } from "../../http/itemAPI";
import { Item } from "../../components/item/Item";
import { checkUser } from "../../http/userAPI";
import { findUserFav } from "../../http/favAPI";
import { useNavigate } from "react-router-dom";

export const Fav = () => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const [count, setCount] = useState(5)

    const navigate = useNavigate()

    const navigateToCatalogue = () => {
        navigate('/catalogue')
        window.scrollTo({
            top: 0,
        })
    }

    const findItems = async () => {
        try {
            const wishArr = JSON.parse(localStorage.getItem('wish'))
            if (wishArr && Array.isArray(wishArr)) {
                await fetchByIds(wishArr).then(data => {
                    setItems(data)
                    setLoading(false)
                })
            } else {
                setLoading(false)
            }
        } catch (e) {
            setLoading(false)
        }
    }

    const checkUserId = async () => {
        try {
            await checkUser().then(async (data) => {
                await findUserFav(data.user.id).then(async (data2) => {
                    await fetchByIds(data2.map(item => item.item_uid)).then(data3 => {
                        setItems(data3)
                        setLoading(false)
                    })
                })
            })
        } catch (e) {
            findItems()
        }
    }

    useEffect(() => {
        checkUserId()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width > 1240) setCount(5)
            else if (width <= 1240 && width > 1025) setCount(5 * 0.8)
            else if (width <= 1025 && width > 720) setCount(5 * 0.6)
            else if (width <= 720) setCount(6)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className="Fav MBInfo">
            <div className="BreadCrumbs">
                <span className="LastCrumb">Главная</span>
                <span className="SlashCrumb">/</span>
                <span className="NewCrumb">Избранное</span>
            </div>
            <h2 className="FavSub">Избранное</h2>
            {!loading && (!items || items.length === 0) ?
                <div className="EmptyCart">
                    <h2>Избранных товаров нет</h2>
                    <p>Кажется, вы еще не добавили товары в избранное. Откройте наш каталог и найдите что-то интересное для себя.</p>
                    <div className="ToMain" onClick={navigateToCatalogue}>Перейти в каталог</div>
                </div>
                :
                <>
                    <div className="MainPopularContainer MT-32">
                        <div className="MPItems">
                            {!loading && items && items.length > 0 && items.map((item, i) => {
                                if (i < count) return <Item key={item.id} item={item} />
                                else return null
                            })}
                            {loading &&
                                <div className="LoaderBox2">
                                    <div className="Loader"></div>
                                </div>
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    )
}