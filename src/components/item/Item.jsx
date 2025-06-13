import React, { useContext, useEffect, useState } from "react";
import './Item.scss'

import { checkUser } from "../../http/userAPI";
import { addToFav, deleteFromFav, findUserFav } from "../../http/favAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { fetchByIds } from "../../http/itemAPI";
import FormatPrice from "../../utils/FormatPrice";

import wish from '../../assets/wish2.svg'
import wish2 from '../../assets/wish5.svg'
import timer from '../../assets/timer.svg'
import fast from '../../assets/fastShip2.svg'

export const Item = observer(({ item, globalCatalogue, sizes, checkedSizes }) => {
    const { constants, user_fav } = useContext(Context)
    const [isWished, setIsWished] = useState(false)
    const [userId, setUserId] = useState()

    const handleNavigate = (e) => {
        if (e.target.id !== 'wish') {
            window.open(`/item/${item.id}`, '_blank')
        }
    }

    const checkUserId = async () => {
        try {
            await checkUser().then(async (data) => {
                setUserId(data.user.id)
                await findUserFav(data.user.id).then(async (data2) => {
                    const itemId = item.id
                    if (data2.find(item => item.item_uid === itemId)) {
                        setIsWished(true)
                    }
                })
            })
        } catch (e) {
            const wishArr = JSON.parse(localStorage.getItem('wish'))
            const itemId = item.id
            if (wishArr && Array.isArray(wishArr) && wishArr.find(item => item === itemId)) {
                setIsWished(true)
            }
        }
    }

    const toWish = async () => {
        setIsWished(!isWished)
        if (userId) {
            await findUserFav(userId).then(async (data) => {
                const itemId = item.id
                if (data.find(item => item.item_uid === itemId)) {
                    await deleteFromFav(item.id, userId).then(async () => {
                        await findUserFav(userId).then(async (data2) => {
                            await fetchByIds(data2.map(item => item.item_uid)).then((data3) => {
                                user_fav.setFav(data3)
                            })
                        })
                    })
                } else {
                    await addToFav(item.id, userId).then(async () => {
                        await findUserFav(userId).then(async (data2) => {
                            await fetchByIds(data2.map(item => item.item_uid)).then((data3) => {
                                user_fav.setFav(data3)
                            })
                        })
                    })
                }
            })
        } else {
            const wishArr = JSON.parse(localStorage.getItem('wish'))
            if (wishArr && Array.isArray(wishArr)) {
                if (wishArr.includes(item.id)) {
                    wishArr.splice(wishArr.indexOf(item.id), 1)
                } else {
                    wishArr.push(item.id)
                }
                localStorage.setItem('wish', JSON.stringify(wishArr))
                await fetchByIds(wishArr).then((data) => {
                    user_fav.setFav(data)
                })
            } else {
                localStorage.setItem('wish', JSON.stringify([item.id]))
                user_fav.setFav([item.id])
            }
        }
    }

    // const findSize = () => {
    //     let minimal = 1000000000
    //     if (checkedSizes && sizes) {
    //         const found = sizes.filter(i => i.item_uid === item.item_uid)
    //         for (let i of found) {
    //             if (i.price < minimal) minimal = i.price
    //         }
    //     }
    //     if (minimal === 1000000000) minimal = item.min_price
    //     return minimal
    // }

    useEffect(() => {
        checkUserId()
        // eslint-disable-next-line
    }, [])

    return (
        <div className={`ItemContainer ${globalCatalogue ? 'Global' : ''}`}>
            <div className="ItemTop">
                <div className={`ItemImg ${globalCatalogue ? 'Global' : ''}`} onClick={handleNavigate}>
                    <div className="ItemImgBox">
                        {/* <img className="ItemImgStyle" src={item.img ? item.img : item.photos[0].img} alt="Фото товара" /> */}
                        <img className="ItemImgStyle" src={item.img} alt="Фото товара" />
                    </div>
                    <div className="WishIconBox" id="wish" onClick={toWish}>
                        {/* <img className={`WishIcon ${!isWished ? 'Active' : ''}`} src={wish} alt="wish" id="wish" onClick={toWish} />
                        <img className={`WishIcon ${isWished ? 'Active' : ''}`} src={wish2} alt="wish" id="wish" onClick={toWish} /> */}
                        <img className={`WishIcon ${!isWished ? 'Active' : ''}`} src={wish} alt="wish" />
                        <img className={`WishIcon ${isWished ? 'Active' : ''}`} src={wish2} alt="wish" />
                    </div>
                </div>
                <div className="ItemSub" onClick={handleNavigate}>{item.name}</div>
            </div>
            <div className={`ItemInfo ${globalCatalogue ? 'Global' : ''}`}>
                <div className="IIBottom">
                    {item.category === 'shoes' &&
                        <>
                            <div className="ItemSplit"><span>по {FormatPrice.formatPrice3(FormatPrice.slowShipPrice(item.price ? item.price : item.min_price, constants.course, constants.standartShip, constants.fee))} ₽ x 2 платежа</span></div>
                            <div className="ItemPrice">{FormatPrice.formatPrice2(FormatPrice.slowShipPrice(item.price ? item.price : item.min_price, constants.course, constants.standartShip, constants.fee))} ₽</div>
                        </>
                    }
                    {item.category === 'clothes' &&
                        <>
                            <div className="ItemSplit"><span>по {FormatPrice.formatPrice3(FormatPrice.slowShipPrice(item.price ? item.price : item.min_price, constants.course, constants.categoriesShips.find(i => i.name === item.brand).standart, constants.fee))} ₽ x 2 платежа</span></div>
                            <div className="ItemPrice">{FormatPrice.formatPrice2(FormatPrice.slowShipPrice(item.price ? item.price : item.min_price, constants.course, constants.categoriesShips.find(i => i.name === item.brand).standart, constants.fee))} ₽</div>
                        </>
                    }
                    <div className="ItemShip">
                        <img src={timer} alt="timer" />
                        <span>Стандартная ~25 дней</span>
                    </div>
                    <div className="ItemShip">
                        <img src={fast} alt="fast" />
                        <span>Экспресс ~10 дней</span>
                    </div>
                </div>
            </div>
        </div>
    )
})