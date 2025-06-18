import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import './Header.scss'
import './Menu.scss'

import logoNew from '../../assets/logoNew.png'
import loop1 from '../../assets/loop1.svg'
import wish from '../../assets/wish.svg'
import wish2 from '../../assets/wish5.svg'
import cart from '../../assets/cart.svg'
import arr1 from '../../assets/arr1.svg'
import burger from '../../assets/burger.svg'
import loop2 from '../../assets/loop2.svg'
import profile from '../../assets/avatar.png'

import close from '../../assets/close.svg'
import arr from '../../assets/arr6.svg'
import signOut from '../../assets/signOut.svg'
import { checkAuth, checkAuthBrowser, createAuth } from "../../http/authAPI"
import { checkUser } from "../../http/userAPI"
import { compareSearchWord, fetchByIds, fetchCartItems } from "../../http/itemAPI";
import { findUserFav } from "../../http/favAPI";
import { findUserCart } from "../../http/cartAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

const brandsRecommended = [
    { brand: 'Adidas', type: 'brand' },
    { brand: 'New Balance', type: 'brand' },
    { brand: 'Nike', type: 'brand' },
    { brand: 'Reebok', type: 'brand' },
    { brand: 'Puma', type: 'brand' },
    { brand: 'Adidas Originals', type: 'brand' },
    { brand: 'Jordan', type: 'brand' },
    { brand: 'Vans', type: 'brand' },
]

export const Header = observer(({ authcode, token }) => {
    const { user_fav, user_cart, brand_check } = useContext(Context)
    const [isFocus, setIsFocus] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState({})
    const [autocomplete, setAutocomplete] = useState(brandsRecommended)
    const [searchWord, setSearchWord] = useState('')
    const [autocompleteStart, setAutocompleteStart] = useState(true)

    const location = useLocation()
    const navigate = useNavigate()

    const handleNavigate = (e) => {
        brand_check.setBrand('')
        handleMenuClose()
        navigate(e.target.id)
        window.scrollTo({
            top: 0,
        })
    }

    const handleBurger = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        document.querySelector('.App').classList.add('Lock')

        const menu = document.querySelector('.MenuContainer')
        const menuBox = document.querySelector('.MenuBox')
        menuBox.classList.toggle('None')
        setTimeout(() => {
            menu.classList.toggle('MenuHide')
            menuBox.classList.toggle('MenuBoxHide')
        }, 1);
    }

    const handleMenuClose = () => {
        document.querySelector('.App').classList.remove('Lock')

        const menu = document.querySelector('.MenuContainer')
        menu.classList.add('MenuHide')
        const menuBox = document.querySelector('.MenuBox')
        menuBox.classList.add('MenuBoxHide')
        menuBox.scrollTo(0, 0)
        setTimeout(() => {
            menuBox.classList.add('None')
        }, 200);
    }

    const clickMenuAway = (e) => {
        if (!e.target.closest('.MenuContainer') && !e.target.closest('.BurgerBtn')) {
            handleMenuClose()
        }
    }

    const formatePhone = (phone) => {
        return `+${phone.slice(0, 1)} (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9, 11)}`
    }

    const handleAuth = async () => {
        await createAuth().then(data => {
            let telegramUrl
            telegramUrl = process.env.REACT_APP_BOT_URL + data.code

            setTimeout(() => {
                let newWindow = window.open(telegramUrl, '_blank')

                if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                    window.location.href = telegramUrl
                }
            }, 10)

            const authenticate = setInterval(async () => {
                await checkAuthBrowser(data.code).then(data2 => {
                    if (data2) {
                        checkToken().then(() => {
                            clearInterval(authenticate)
                        })
                    }
                })
            }, 1000)
        })
    }

    const checkToken = async () => {
        try {
            await checkUser().then(data => {
                setUser(data.user)
            })
            setIsAuth(true)
        } catch (e) {

        }
    }

    const logOut = async () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setIsAuth(false)
        setUser({})
        if (location.pathname === '/profile') {
            navigate('/')
        }
        window.location.reload()
    }

    const authenticate = async (authcode) => {
        try {
            await checkAuth(authcode).then(data => {
                setUser(data.user)
            })
            setIsAuth(true)
        } catch (e) {

        }
    }

    const checkUserId = async () => {
        try {
            if (user.id) {
                await findUserFav(user.id).then(async (data2) => {
                    await fetchByIds(data2.map(item => item.item_uid)).then(data3 => {
                        user_fav.setFav(data3)
                    })
                })
                await findUserCart(user.id).then(async data2 => {
                    user_cart.setCart(data2)
                })
            } else {
                const wishArr = JSON.parse(localStorage.getItem('wish'))
                if (wishArr && Array.isArray(wishArr)) {
                    await fetchByIds(wishArr).then(data => {
                        user_fav.setFav(data)
                    })
                }
                await fetchCartItems(JSON.parse(localStorage.getItem('cart'))).then(data => {
                    user_cart.setCart(data)
                })
            }
        } catch (e) {
            const wishArr = JSON.parse(localStorage.getItem('wish'))
            if (wishArr && Array.isArray(wishArr)) {
                await fetchByIds(wishArr).then(data => {
                    user_fav.setFav(data)
                })
            }
            await fetchCartItems(JSON.parse(localStorage.getItem('cart'))).then(data => {
                user_cart.setCart(data)
            })
        }
    }

    const blurSearch = (e) => {
        if (!e.target.closest('.HeaderSearch')) {
            setIsFocus(false)
        }
    }

    const closeSearch = (e) => {
        if (e.target.classList.contains('HeaderSearchCertainBG')) {
            handleSearchClose()
        }
    }

    const handleNavigateToBrand = (brand) => {
        brand_check.setBrand(brand)
        brand_check.setModel('')
        navigate('/catalogue/?brandset=true')
        window.scrollTo({
            top: 0,
        })
        handleSearchClose()
    }

    const handleNavigateToModel = (brand, model) => {
        brand_check.setBrand(brand)
        brand_check.setModel(model)
        navigate('/catalogue/?brandset=true&modelset=true')
        window.scrollTo({
            top: 0,
        })
        handleSearchClose()
    }

    const handleNavigateToSearch = (e) => {
        e.preventDefault()
        if (searchWord.length > 0) {
            navigate(`/catalogue/?search=${searchWord}`)
            window.scrollTo({
                top: 0,
            })
            setIsFocus(false)
            const inputs = document.querySelectorAll('.HeaderSearchInput')
            for (let i of inputs) {
                i.blur()
            }
            handleSearchClose()
            setSearchWord('')
        }
    }

    const compareSearch = async () => {
        await compareSearchWord(searchWord).then(data => {
            if (data.length > 0) {
                const first11 = data.slice(0, 11)
                const sortedArr = first11.sort((a, b) => {
                    if (a.brand === b.brand) {
                        return "model" in a ? 1 : -1
                    }
                    return a.brand.localeCompare(b.brand)
                })
                setAutocomplete(sortedArr)
                setAutocompleteStart(false)
            }
            else {
                setAutocomplete(brandsRecommended)
                setAutocompleteStart(true)
            }
        })
    }

    const handleSearchCertain = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        document.querySelector('.App').classList.add('Lock')
        document.querySelector('.HeaderSearchCertain').classList.add('Visible')
        document.querySelector('.HeaderSearchCertainBG').classList.add('Visible')
        document.querySelector('.HeaderSearchInputMob').focus()
    }

    const handleSearchClose = () => {
        document.querySelector('.App').classList.remove('Lock')
        document.querySelector('.HeaderSearchCertain').classList.remove('Visible')
        document.querySelector('.HeaderSearchCertainBG').classList.remove('Visible')
    }

    useEffect(() => {
        checkToken()
    }, [])

    useEffect(() => {
        if (authcode) authenticate(authcode)
    }, [authcode])

    useEffect(() => {
        if (token) checkToken()
    }, [token])

    useEffect(() => {
        checkUserId()
        // eslint-disable-next-line
    }, [user])

    useEffect(() => {
        if (searchWord.length > 0) compareSearch()
        else {
            setAutocomplete(brandsRecommended)
            setAutocompleteStart(true)
        }
        // eslint-disable-next-line
    }, [searchWord])

    useEffect(() => {
        document.addEventListener('click', blurSearch)
        document.addEventListener('click', closeSearch)

        return () => {
            document.removeEventListener('click', blurSearch)
            document.removeEventListener('click', closeSearch)
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <header className='Header'>
                <div className="HeaderPC">
                    <div className='HeaderTop'>
                        <img className='HeaderLogo' src={logoNew} alt="WearPoizon" id="/" onClick={handleNavigate} />
                        <div className='HeaderNav'>
                            <span id="/payment" onClick={handleNavigate}>Оплата и доставка</span>
                            <span id="/guarantee" onClick={handleNavigate}>Гарантия оригинальности</span>
                        </div>
                        <div
                            className={`HeaderSearch ${isFocus ? 'Focused' : ''}`}
                            onClick={(e) => {
                                if (!e.target.closest('.HeaderSearchMenu')) {
                                    setIsFocus(true)
                                    document.querySelector('.HeaderSearchInput').focus()
                                }
                            }}
                        >
                            <img src={loop1} alt="Поиск" />
                            <form onSubmit={(e) => handleNavigateToSearch(e)}>
                                <input
                                    className="HeaderSearchInput"
                                    type="text"
                                    placeholder='Поиск по бренду, названию и т.д.'
                                    onFocus={() => setIsFocus(true)}
                                    value={searchWord}
                                    onChange={(e) => setSearchWord(e.target.value)}
                                    maxLength={60}
                                />
                            </form>
                            <div className={`HeaderSearchMenu ${isFocus ? '' : 'Invisible'}`}>
                                {searchWord.length > 0 &&
                                    <div
                                        className="HeaderSearchItem WordBreak"
                                        onClick={handleNavigateToSearch}
                                    >
                                        <span>Поиск по запросу: </span>{searchWord}
                                    </div>
                                }
                                {autocompleteStart &&
                                    <div className="HeaderSearchHead">Рекомендуемые бренды</div>
                                }
                                {autocomplete.map((item, i) => {
                                    if (i <= 10) {
                                        return (
                                            <div
                                                key={i}
                                                className="HeaderSearchItem"
                                                onClick={() => {
                                                    if (item.type === 'brand') {
                                                        handleNavigateToBrand(item.brand)
                                                        setIsFocus(false)
                                                        setSearchWord('')
                                                    }
                                                    if (item.type === 'model') {
                                                        handleNavigateToModel(item.brand, item.model)
                                                        setIsFocus(false)
                                                        setSearchWord('')
                                                    }
                                                }}
                                            >
                                                {item.type === 'model' ?
                                                    <>
                                                        <span className="LightAutocomplete">{item.brand + ' — '}</span>
                                                        <span>{item.model}</span>
                                                    </>
                                                    :
                                                    item.brand
                                                }
                                            </div>
                                        )
                                    } else return null
                                })}
                            </div>
                        </div>
                        <div className='HeaderBtns'>
                            <div className="FavHeaderBox" id="/fav" onClick={handleNavigate}>
                                {user_fav && user_fav.fav && user_fav.fav.length > 0 ?
                                    <img src={wish2} alt="Избранное" id="/fav" />
                                    :
                                    <img src={wish} alt="Избранное" id="/fav" />
                                }
                                {user_fav && user_fav.fav && user_fav.fav.length > 0 && <span id="/fav">{user_fav.fav.length}</span>}
                            </div>
                            <div className="CartHeaderBox" id="/cart" onClick={handleNavigate}>
                                <img src={cart} alt="Корзина" id="/cart" />
                                {user_cart && user_cart.cart && user_cart.cart.length > 0 && <span id="/cart">{user_cart.cart.length}</span>}
                            </div>
                        </div>
                        {!isAuth ?
                            <div className='HeaderAuth' onClick={handleAuth}>
                                <span>Вход</span>
                                <img src={arr1} alt="Вход" />
                            </div>
                            :
                            <div className={`HProfileInitials ${(!user || (!user.name && !user.surname)) ? 'GradientProfile' : ''}`} id="/profile" onClick={handleNavigate}>
                                {(!user || (!user.name && !user.surname)) &&
                                    <img src={profile} id="/profile" alt="" />
                                }
                                {user && user.name &&
                                    <span id="/profile">{user.name[0]}</span>
                                }
                                {user && user.surname &&
                                    <span id="/profile">{user.surname[0]}</span>
                                }
                            </div>
                        }
                    </div>
                    <div className='HeaderBottom'>
                        <div className='HeaderNav2'>
                            <span id={process.env.REACT_APP_SHOES_PATH} onClick={handleNavigate}>Обувь</span>
                            <span id={process.env.REACT_APP_CLOTHES_PATH} onClick={handleNavigate}>Одежда</span>
                        </div>
                    </div>
                </div>
                <div className="HeaderMobile">
                    <div className="BurgerBtn" onClick={handleBurger}>
                        <img src={burger} alt="Меню" />
                    </div>
                    <img className='HeaderLogo' src={logoNew} alt="WearPoizon" id="/" onClick={handleNavigate} />
                    <div className="HeaderBtns">
                        <img className="SearchLoop" src={loop2} alt="Поиск" onClick={handleSearchCertain} />
                        <div className="FavHeaderBox" id="/fav">
                            <img src={wish} alt="Избранное" id="/fav" onClick={handleNavigate} />
                            {user_fav && user_fav.fav && user_fav.fav.length > 0 && <span id="/fav">{user_fav.fav.length}</span>}
                        </div>
                        <div className="CartHeaderBox" id="/cart">
                            <img src={cart} alt="Корзина" id="/cart" onClick={handleNavigate} />
                            {user_cart && user_cart.cart && user_cart.cart.length > 0 && <span id="/cart">{user_cart.cart.length}</span>}
                        </div>
                    </div>
                    <div className="HeaderSearchCertain">
                        <div className="HeaderSearchRow">
                            <div className="HeaderSearch">
                                <img src={loop1} alt="Поиск" />
                                <form onSubmit={(e) => handleNavigateToSearch(e)}>
                                    <input
                                        className="HeaderSearchInput HeaderSearchInputMob"
                                        type="text"
                                        placeholder='Поиск по бренду, названию и т.д.'
                                        onFocus={() => setIsFocus(true)}
                                        value={searchWord}
                                        onChange={(e) => setSearchWord(e.target.value)}
                                    />
                                </form>
                            </div>
                            <img className="HeaderSearchClose" src={close} alt="" onClick={handleSearchClose} />
                        </div>
                        <div className={`HeaderSearchMenu`}>
                            {searchWord.length > 0 &&
                                <div
                                    className="HeaderSearchItem WordBreak"
                                    onClick={handleNavigateToSearch}
                                >
                                    <span>Поиск по запросу: </span>{searchWord}
                                </div>
                            }
                            {autocompleteStart &&
                                <div className="HeaderSearchHead">Рекомендуемые бренды</div>
                            }
                            {autocomplete.map((item, i) => {
                                if (i <= 10) {
                                    return (
                                        <div
                                            key={i}
                                            className="HeaderSearchItem"
                                            onClick={() => {
                                                if (item.type === 'brand') {
                                                    handleNavigateToBrand(item.brand)
                                                    setIsFocus(false)
                                                    setSearchWord('')
                                                }
                                                if (item.type === 'model') {
                                                    handleNavigateToModel(item.brand, item.model)
                                                    setIsFocus(false)
                                                    setSearchWord('')
                                                }
                                            }}
                                        >
                                            {item.type === 'model' ?
                                                <>
                                                    <span className="LightAutocomplete">{item.brand + ' — '}</span>
                                                    <span>{item.model}</span>
                                                </>
                                                :
                                                item.brand
                                            }
                                        </div>
                                    )
                                } else return null
                            })}
                        </div>
                    </div>
                    <div className="HeaderSearchCertainBG"></div>
                </div>
            </header>
            <div className="MenuBox MenuBoxHide None" onClick={clickMenuAway}>
                <div className="MenuContainer MenuHide">
                    <div className="MenuTop">
                        <span></span>
                        <span>Каталог</span>
                        <div className="MenuClose" onClick={handleMenuClose}>
                            <img src={close} alt="Закрыть" />
                        </div>
                    </div>
                    <div className="MenuCatalogue">
                        <div className="MenuItem" id={process.env.REACT_APP_SHOES_PATH} onClick={handleNavigate}>
                            <span id={process.env.REACT_APP_SHOES_PATH}>Обувь</span>
                            <img src={arr} alt="Стрелка" id={process.env.REACT_APP_SHOES_PATH} />
                        </div>
                        <div className="MenuLine" />
                        <div className="MenuItem" id={process.env.REACT_APP_CLOTHES_PATH} onClick={handleNavigate}>
                            <span id={process.env.REACT_APP_CLOTHES_PATH}>Одежда</span>
                            <img src={arr} alt="Стрелка" id={process.env.REACT_APP_CLOTHES_PATH} />
                        </div>
                        <div className="MenuLine" />
                    </div>
                    <div className="MenuCatalogue">
                        <div className="MenuItem2" id="/payment" onClick={handleNavigate}>
                            <span id="/payment">Оплата и доставка</span>
                        </div>
                        <div className="MenuLine" />
                        <div className="MenuItem2" id="/guarantee" onClick={handleNavigate}>
                            <span id="/guarantee">Гарантия оригинальности</span>
                        </div>
                        <div className="MenuLine" />
                    </div>
                    {isAuth ?
                        <div className="MenuProfile">
                            <div className="MProfileData">
                                <div className={`MProfileInitials ${(!user || (!user.name && !user.surname)) ? 'MGradientProfile' : ''}`} id="/profile" onClick={handleNavigate}>
                                    {(!user || (!user.name && !user.surname)) &&
                                        <img src={profile} id="/profile" alt="" />
                                    }
                                    {user && user.name &&
                                        <span id="/profile">{user.name[0]}</span>
                                    }
                                    {user && user.surname &&
                                        <span id="/profile">{user.surname[0]}</span>
                                    }
                                </div>
                                <div className="MProfileNP">
                                    {user && user.name &&
                                        <div className="MProfileName">{user.name}</div>
                                    }
                                    {user && user.phone &&
                                        <div className="MProfilePhone">{formatePhone(user.phone)}</div>
                                    }
                                </div>
                            </div>
                            <div className="MenuCatalogue">
                                <div className="MenuItem2" id="/profile" onClick={handleNavigate}>
                                    <span id="/profile">Личные данные</span>
                                </div>
                                <div className="MenuLine" />
                                <div className="MenuItem2" id="/profile/?tab=orders" onClick={handleNavigate}>
                                    <span id="/profile/?tab=orders">Мои заказы</span>
                                </div>
                                <div className="MenuLine" />
                                <div className="MenuItem2" id="/fav" onClick={handleNavigate}>
                                    <span id="/fav">Избранное</span>
                                </div>
                                <div className="MenuLine" />
                                <div className="MenuItem2" id="/profile/?tab=sync" onClick={handleNavigate}>
                                    <span id="/profile/?tab=sync">Синхронизация</span>
                                </div>
                                <div className="MenuLine" />
                            </div>
                            <div className="MenuAuth" onClick={logOut}>
                                <img src={signOut} alt="Выйти" />
                                <span>Выйти из аккаунта</span>
                            </div>
                        </div>
                        :
                        <div className="MenuAuth" onClick={handleAuth}>Авторизация через Telegram</div>
                    }
                </div>
            </div >
        </>
    )
})